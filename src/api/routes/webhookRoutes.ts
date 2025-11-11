import { Router } from 'express';
import { authenticate } from '../../middleware/auth';

const router = Router();

router.post('/', authenticate, async (req, res) => {
  res.json({ success: true, message: 'Create webhook endpoint' });
});

router.get('/', authenticate, async (req, res) => {
  res.json({ success: true, message: 'List webhooks endpoint' });
});

export default router;
