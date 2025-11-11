# Webhooks (Delivery Status)

MuTTE can POST delivery status events to a tenant-specific webhook URL.

## Event Payload
```json
{
  "event": "sent|failed",
  "tenantId": "...",
  "emailLogId": 123,
  "to": ["user@example.com"],
  "subject": "...",
  "timestamp": "2025-11-11T00:00:00.000Z",
  "error": "optional"
}
```

## Security
- Optional HMAC signature header `X-MuTTE-Signature` using `WEBHOOK_SIGNING_SECRET`.

## Configuration
- Per-tenant `webhook_url` (preferred) or global `TENANT_DEFAULT_WEBHOOK`.
