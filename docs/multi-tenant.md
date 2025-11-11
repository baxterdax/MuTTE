# Multi-Tenant Architecture

Each tenant stores encrypted SMTP credentials. Isolation enforced by `tenant_id` scoping in queries.

## Tables
- `tenants`: metadata + encrypted SMTP settings.
- `email_logs`: per-tenant send logs.

## Security Considerations
- Never return SMTP secrets in responses.
- Rotate API keys periodically.
