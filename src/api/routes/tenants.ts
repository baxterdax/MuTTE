import { Router } from 'express';
import { authenticate, authenticateAdmin } from '../../middleware/auth';
import * as tenantController from '../controllers/tenantController';

const router = Router();

/**
 * @swagger
 * /tenants:
 *   post:
 *     summary: Create a new tenant
 *     tags: [Tenants]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - smtp_host
 *               - smtp_port
 *               - smtp_user
 *               - smtp_pass
 *               - from_email
 *             properties:
 *               name:
 *                 type: string
 *               smtp_host:
 *                 type: string
 *               smtp_port:
 *                 type: string
 *               smtp_user:
 *                 type: string
 *               smtp_pass:
 *                 type: string
 *               smtp_secure:
 *                 type: string
 *                 default: 'false'
 *               from_email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tenant created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     api_key:
 *                       type: string
 */
router.post('/', authenticateAdmin, tenantController.createTenant);

/**
 * @swagger
 * /tenants:
 *   get:
 *     summary: List all tenants
 *     tags: [Tenants]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: List of tenants
 */
router.get('/', authenticateAdmin, tenantController.listTenants);

/**
 * @swagger
 * /tenants/{id}:
 *   get:
 *     summary: Get tenant by ID
 *     tags: [Tenants]
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
 *         description: Tenant details
 */
router.get('/:id', authenticateAdmin, tenantController.getTenantById);

/**
 * @swagger
 * /tenants/{id}:
 *   put:
 *     summary: Update tenant
 *     tags: [Tenants]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               smtp_host:
 *                 type: string
 *               smtp_port:
 *                 type: string
 *               smtp_user:
 *                 type: string
 *               smtp_pass:
 *                 type: string
 *               smtp_secure:
 *                 type: string
 *               from_email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tenant updated successfully
 */
router.put('/:id', authenticateAdmin, tenantController.updateTenant);

/**
 * @swagger
 * /tenants/{id}:
 *   delete:
 *     summary: Delete tenant
 *     tags: [Tenants]
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
 *         description: Tenant deleted successfully
 */
router.delete('/:id', authenticateAdmin, tenantController.deleteTenant);

export default router;