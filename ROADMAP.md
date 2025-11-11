# MuTTE Roadmap

## Near-term (Now - 1.0)
- Retry mechanism for transient SMTP failures (done)
- Attachments support (done)
- Webhooks for delivery status (tenant-level)
- CI: build, test, CodeQL (done)
- Docs: API, auth, multi-tenant, error handling (done)

## Short-term (1.1 - 1.2)
- Template variables in body (done) and template library integration (optional)
- Secrets manager adapters (AWS SSM, Vault) – optional runtime fetch
- Enhanced analytics endpoints
- Swagger UI publishing

## Mid-term (2.x)
- Queue-based sending with retries (Bull/Redis)
- Provider plugins (SES, SendGrid) with fallbacks
- Per-tenant rate limit customization via DB
- Admin UI for managing tenants

## Stretch Goals
- Multi-region deployments
- Email rendering sandbox and preview API

Contributions welcome! Open issues labeled `help wanted` or propose new ideas.
