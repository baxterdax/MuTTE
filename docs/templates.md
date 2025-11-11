# Email Templates (Planned)

A lightweight templating layer will allow variable substitution in `htmlBody` and `textBody`.

## Planned Syntax
- Variables: `{{variableName}}`
- Conditionals / loops intentionally omitted for simplicity.

## Example
```html
<h1>Welcome {{name}}</h1>
<p>Your account is ready.</p>
```

Variables provided via `variables` object in send payload.
