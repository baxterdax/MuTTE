import { Router } from 'express';
import { authenticate } from '../../middleware/auth';
import { createRateLimiter } from '../../middleware/rateLimiter';
import * as emailController from '../controllers/emailController';

const router = Router();

/**
 * @swagger
 * /send:
 *   post:
 *     summary: Send an email using tenant's SMTP credentials
 *     tags: [Email]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - to
 *               - subject
 *               - htmlBody
 *             properties:
 *               to:
 *                 oneOf:
 *                   - type: string
 *                   - type: array
 *                     items:
 *                       type: string
 *               cc:
 *                 oneOf:
 *                   - type: string
 *                   - type: array
 *                     items:
 *                       type: string
 *               bcc:
 *                 oneOf:
 *                   - type: string
 *                   - type: array
 *                     items:
 *                       type: string
 *               subject:
 *                 type: string
 *               textBody:
 *                 type: string
 *               htmlBody:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 messageId:
 *                   type: string
 */
router.post('/', authenticate, createRateLimiter(), emailController.sendEmail);

export default router;