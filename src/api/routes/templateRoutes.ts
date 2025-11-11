import { Router } from 'express';
import { authenticate } from '../../middleware/auth';

const router = Router();

router.post('/', authenticate, async (req, res) => {
  res.json({ success: true, message: 'Create template endpoint' });
});

router.get('/', authenticate, async (req, res) => {
  res.json({ success: true, message: 'List templates endpoint' });
});

export default router;
