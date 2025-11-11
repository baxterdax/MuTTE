# Configuration

Environment variables:

- `PORT` – API port (default 3000)
- `DATABASE_URL` – Postgres connection string
- `ENCRYPTION_KEY` – 32-byte key for SMTP secret encryption
- `ADMIN_API_KEY` – Admin key for tenant management
- `MAX_REQUESTS_PER_MINUTE` – Rate limit per tenant
- `LOG_LEVEL` – `error|warn|info|debug`
- `RETRY_MAX_ATTEMPTS` – Max retry attempts for sending emails (default 3)
- `RETRY_BASE_DELAY_MS` – Initial backoff delay (default 500ms)
- `WEBHOOK_SIGNING_SECRET` – Optional secret for webhook signatures
- `TENANT_DEFAULT_WEBHOOK` – Optional default webhook URL

Secrets management (future): integrate AWS SSM / HashiCorp Vault. See `secrets.md`.
