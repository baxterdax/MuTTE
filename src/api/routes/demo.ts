import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.json({
    name: 'MuTTE Demo',
    description: 'Public demo endpoint showcasing API capabilities (no emails are sent).',
    example: {
      endpoint: '/send',
      method: 'POST',
      headers: { 'X-API-Key': 'tenant_api_key' },
      body: {
        to: ['user@example.com'],
        subject: 'Hello from MuTTE',
        htmlBody: '<h1>Hello {{name}}</h1>',
        variables: { name: 'Ada' }
      }
    }
  });
});

export default router;
