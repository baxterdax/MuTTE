import { json } from '@sveltejs/kit';
import { MTE_API_URL, MTE_API_KEY } from '$env/static/private';

/**
 * API endpoint to send emails through MTE-API
 * This handles the server-side email sending with proper authentication
 */
export async function POST({ request }) {
  try {
    // Get email data from request body
    const { name, email, subject, message, to } = await request.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Prepare email content
    const htmlBody = `
      <h2>Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
        ${message.replace(/\n/g, '<br>')}
      </div>
      <p><em>Sent from ${process.env.SITE_NAME || 'Website'}</em></p>
    `;

    const textBody = `
Contact Form Submission
=======================

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
Sent from ${process.env.SITE_NAME || 'Website'}
    `.trim();

    // Send email through MTE-API
    const response = await fetch(`${MTE_API_URL}/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': MTE_API_KEY,
      },
      body: JSON.stringify({
        to: to || process.env.CONTACT_EMAIL || 'contact@example.com',
        subject: `[${process.env.SITE_NAME || 'Website'}] ${subject}`,
        htmlBody,
        textBody,
        // Optional metadata for tracking
        metadata: {
          source: 'contact-form',
          user_agent: request.headers.get('user-agent'),
          referer: request.headers.get('referer'),
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to send email');
    }

    const data = await response.json();

    return json({
      success: true,
      message: 'Email sent successfully',
      messageId: data.messageId,
    });

  } catch (error) {
    console.error('Email sending error:', error);
    
    return json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to send email' 
      },
      { status: 500 }
    );
  }
}