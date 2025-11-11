# Authentication

## Headers
- Tenant requests: `X-API-Key`
- Admin requests: `X-Admin-Key`

## Flow
1. Admin creates tenant via `/tenants`.
2. Tenant receives API key.
3. Client apps call `/send` with `X-API-Key`.

## Error Responses
- 401 if key missing or invalid.
- 403 for admin-only routes.

Example:
```http
POST /send
X-API-Key: your_tenant_key
Content-Type: application/json

{ "to": "user@example.com", "subject": "Hello", "htmlBody": "<b>Hi</b>" }
```
