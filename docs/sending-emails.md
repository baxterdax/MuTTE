# Sending Emails

## Endpoint
`POST /send`

## Payload
```json
{
  "to": ["user@example.com"],
  "from": "no-reply@example.com",
  "subject": "Welcome",
  "htmlBody": "<h1>Hello {{name}}</h1>",
  "textBody": "Hello {{name}}",
  "variables": { "name": "Ada" },
  "cc": ["cc@example.com"],
  "bcc": ["bcc@example.com"],
  "attachments": [
    { "filename": "file.txt", "content": "SGVsbG8=", "encoding": "base64" }
  ]
}
```

## Retries
MuTTE will retry transient failures with exponential backoff (configurable). Permanent failures (e.g., auth) will not be retried.

## Responses
- 200 on success with `messageId`.
- 4xx on validation errors.
- 5xx on server errors.
