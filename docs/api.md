# API Reference

## Health
GET `/health`

## Tenants (Admin)
- POST `/tenants`
- GET `/tenants`
- GET `/tenants/:id`
- PUT `/tenants/:id`
- DELETE `/tenants/:id`

## Email
- POST `/send`
  - See `docs/sending-emails.md`
- GET `/emails`
- GET `/emails/:id`

## Demo
- GET `/demo` — sample payloads, no sending.

Authentication headers required. See `docs/authentication.md`.
