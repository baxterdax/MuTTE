import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../middleware/auth';
import { AppError } from '../../middleware/errorHandler';
import { logger } from '../../utils/logger';
import { query, pool } from '../../db/pool';
import { decrypt } from '../../utils/encryption';

// Runtime import to avoid TypeScript issues
function getNodemailer() {
  try {
    // @ts-ignore - Bypass TypeScript for require
    return require('nodemailer');
  } catch (error) {
    logger.error('Failed to import nodemailer:', error);
    throw new Error('Email service unavailable');
  }
}

export const sendEmail = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const client = await pool.connect();
  let logId: number | null = null;
  
  try {
    const { to, from, subject, htmlBody, textBody, cc, bcc } = req.body;

    if (!to || !subject || !htmlBody) {
      throw new AppError('Missing required fields: to, subject, htmlBody', 400);
    }

    // Get tenant information from the request (set by auth middleware)
    const tenant = req.tenant;
    if (!tenant) {
      throw new AppError('Tenant not found', 401);
    }

    // Parse email addresses
    const toAddresses = Array.isArray(to) ? to : [to];
    const ccAddresses = Array.isArray(cc) ? cc : (cc ? [cc] : []);
    const bccAddresses = Array.isArray(bcc) ? bcc : (bcc ? [bcc] : []);

    // Start transaction
    await client.query('BEGIN');

    // Log email attempt
    const logResult = await client.query(
      `INSERT INTO email_logs (tenant_id, to_address, subject, status)
       VALUES ($1, $2, $3, $4) RETURNING id`,
      [tenant.id, toAddresses.join(', '), subject, 'sending']
    );

    logId = logResult.rows[0].id;

    // Get nodemailer instance
    const nodemailer = getNodemailer();

    // Create transporter with tenant's SMTP settings
    const transporter = nodemailer.createTransport({
      host: decrypt(tenant.smtp_host),
      port: parseInt(decrypt(tenant.smtp_port)),
      secure: tenant.smtp_secure === 'true',
      auth: {
        user: decrypt(tenant.smtp_user),
        pass: decrypt(tenant.smtp_pass),
      },
      // Add timeout configuration
      connectionTimeout: 30000, // 30 seconds
      greetingTimeout: 30000,
      socketTimeout: 30000,
    });

    // Prepare email options
    const mailOptions = {
      from: from || tenant.from_email,
      to: toAddresses.join(', '),
      cc: ccAddresses.length > 0 ? ccAddresses.join(', ') : undefined,
      bcc: bccAddresses.length > 0 ? bccAddresses.join(', ') : undefined,
      subject,
      html: htmlBody,
      text: textBody || undefined,
    };

    logger.info(`Sending email via ${decrypt(tenant.smtp_host)}: ${subject} -> ${toAddresses.join(', ')}`);

    // Send email
    const info = await transporter.sendMail(mailOptions);

    // Update log as sent
    await client.query(
      'UPDATE email_logs SET status = $1, sent_at = CURRENT_TIMESTAMP WHERE id = $2',
      ['sent', logId]
    );

    // Commit transaction
    await client.query('COMMIT');

    logger.info(`Email sent successfully: ${info.messageId} for tenant ${tenant.id}`);

    res.json({
      success: true,
      message: 'Email sent successfully',
      messageId: info.messageId
    });

  } catch (error) {
    // Rollback transaction
    await client.query('ROLLBACK');
    
    // Update log with error if we have a logId
    if (logId && typeof error === 'object' && error !== null) {
      try {
        await client.query(
          'UPDATE email_logs SET status = $1, error_message = $2 WHERE id = $3',
          ['failed', (error as any).message || 'Unknown error', logId]
        );
      } catch (updateError) {
        logger.error('Failed to update email log with error:', updateError);
      }
    }
    
    logger.error('Email sending failed:', error);
    next(error);
  } finally {
    client.release();
  }
};

export const getEmail = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const tenantId = req.tenantId;

    const result = await query(
      'SELECT * FROM email_logs WHERE id = $1 AND tenant_id = $2',
      [id, tenantId]
    );

    if (result.rows.length === 0) {
      throw new AppError('Email not found', 404);
    }

    res.json({
      success: true,
      data: result.rows[0]
    });

  } catch (error) {
    next(error);
  }
};

export const listEmails = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const status = req.query.status as string;
    const tenantId = req.tenantId;

    let whereClause = 'WHERE tenant_id = $1';
    const values: any[] = [tenantId];
    let paramCount = 2;

    if (status) {
      whereClause += ` AND status = $${paramCount++}`;
      values.push(status);
    }

    // Get total count
    const countResult = await query(
      `SELECT COUNT(*) as total FROM email_logs ${whereClause}`,
      values.slice(0, paramCount - 1)
    );
    const total = parseInt(countResult.rows[0].total);

    // Get emails
    values.push((page - 1) * limit, limit);
    const emailsResult = await query(
      `SELECT id, to_address, subject, status, error_message, sent_at, created_at
       FROM email_logs ${whereClause}
       ORDER BY created_at DESC
       LIMIT $${paramCount++} OFFSET $${paramCount++}`,
      values
    );

    res.json({
      success: true,
      data: emailsResult.rows,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });

  } catch (error) {
    next(error);
  }
};
