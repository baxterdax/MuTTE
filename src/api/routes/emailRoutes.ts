import { Router } from 'express';
import { authenticate } from '../../middleware/auth';
import { createRateLimiter } from '../../middleware/rateLimiter';
import * as emailController from '../controllers/emailController';

const router = Router();

/**
 * @swagger
 * /emails:
 *   post:
 *     summary: Send an email
 *     tags: [Emails]
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
 *                 type: array
 *                 items:
 *                   type: string
 *               from:
 *                 type: string
 *               subject:
 *                 type: string
 *               htmlBody:
 *                 type: string
 *               textBody:
 *                 type: string
 *               templateId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Email queued successfully
 */
router.post('/', authenticate, createRateLimiter(), emailController.sendEmail);

/**
 * @swagger
 * /emails/{id}:
 *   get:
 *     summary: Get email by ID
 *     tags: [Emails]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Email details
 */
router.get('/:id', authenticate, emailController.getEmail);

/**
 * @swagger
 * /emails:
 *   get:
 *     summary: List emails
 *     tags: [Emails]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of emails
 */
router.get('/', authenticate, emailController.listEmails);

export default router;
