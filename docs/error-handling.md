# Error Handling

## Pattern
- Validate inputs early; return 400 with details.
- Use centralized error handler for unknown errors.
- Log with correlation (email log id when applicable).

## Examples
- Missing fields: return 400 `{ error: "Missing required fields" }`.
- Invalid API key: return 401.
- Rate limit exceeded: return 429 from middleware.

## Troubleshooting
- Check `logs/error.log` and `logs/combined.log`.
- Enable verbose logs with `LOG_LEVEL=debug`.
