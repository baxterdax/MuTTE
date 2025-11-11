# MTE-API: Multi-Tenant Transactional Email API

A self-hosted, lightweight RESTful API service designed for agencies or developers managing multiple client websites. It enables secure storage and usage of per-client SMTP credentials for sending transactional emails, ensuring emails are sent from the client's domain to improve deliverability and avoid spam filters.

## Features

- 🔐 **Secure Multi-Tenant Architecture**: Isolated SMTP credentials for each tenant
- 🛡️ **Encrypted Credential Storage**: AES encryption for sensitive SMTP data
- 📧 **SMTP Integration**: Works with any SMTP provider (Google Workspace, DirectAdmin, etc.)
- 🚀 **RESTful API**: Clean, documented API endpoints
- 📊 **Email Logging**: Track sent emails with status monitoring
- 🔒 **Authentication**: API key based authentication
- ⚡ **Rate Limiting**: Configurable rate limiting per tenant
- 🐳 **Docker Ready**: Easy deployment with Docker Compose
- 📈 **Scalable**: PostgreSQL backend with connection pooling
- 🛠️ **Developer Friendly**: SvelteKit integration example included

## Quick Start

### Prerequisites

- Node.js 20+
- PostgreSQL 14+
- Docker (optional, for containerized deployment)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd matte
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Setup database**
```bash
# Create PostgreSQL database
createdb mattedb

# Run schema
psql mattedb < db/schema.sql
```

5. **Start the server**
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

### Docker Deployment

```bash
# Start all services (API, PostgreSQL, Redis)
docker-compose up -d

# View logs
docker-compose logs -f api
```

## API Documentation

### Authentication

All API requests require authentication headers:
- **Tenant requests**: `X-API-Key: your_tenant_api_key`
- **Admin requests**: `X-Admin-Key: your_admin_api_key`

### Endpoints

#### Tenant Management (Admin Only)

##### Create Tenant
```http
POST /tenants
Content-Type: application/json
X-Admin-Key: your_admin_key

{
  "name": "Client Name",
  "smtp_host": "smtp.gmail.com",
  "smtp_port": "587",
  "smtp_user": "user@example.com",
  "smtp_pass": "password",
  "smtp_secure": "false",
  "from_email": "contact@client.com"
}
```

##### List Tenants
```http
GET /tenants
X-Admin-Key: your_admin_key
```

##### Get Tenant Details
```http
GET /tenants/:id
X-Admin-Key: your_admin_key
```

##### Update Tenant
```http
PUT /tenants/:id
Content-Type: application/json
X-Admin-Key: your_admin_key

{
  "name": "Updated Name",
  "smtp_host": "new.smtp.host.com"
}
```

##### Delete Tenant
```http
DELETE /tenants/:id
X-Admin-Key: your_admin_key
```

#### Email Sending

##### Send Email
```http
POST /send
Content-Type: application/json
X-API-Key: tenant_api_key

{
  "to": "recipient@example.com",
  "subject": "Email Subject",
  "htmlBody": "<h1>HTML Content</h1>",
  "textBody": "Plain text content",
  "cc": ["cc@example.com"],
  "bcc": ["bcc@example.com"]
}
```

##### List Emails (Tenant)
```http
GET /emails?page=1&limit=20&status=sent
X-API-Key: tenant_api_key
```

##### Get Email Details (Tenant)
```http
GET /emails/:id
X-API-Key: tenant_api_key
```

#### Health Check
```http
GET /health
```

### Response Format

All responses follow this format:

**Success Response:**
```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Optional message"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE"
  }
}
```

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment mode | `development` |
| `DATABASE_URL` | PostgreSQL connection string | Required |
| `ENCRYPTION_KEY` | 32-byte encryption key | Required |
| `ADMIN_API_KEY` | Admin authentication key | Required |
| `MAX_REQUESTS_PER_MINUTE` | Rate limit per tenant | `100` |
| `LOG_LEVEL` | Logging level | `info` |

### Database Schema

The API uses two main tables:

**tenants**
- Stores tenant information with encrypted SMTP credentials
- Each tenant has a unique API key
- Timestamps for audit trail

**email_logs**
- Logs all email sending attempts
- Tracks status (queued, sent, failed)
- Links to tenant for isolation

## Security Features

### Credential Encryption
- SMTP credentials are encrypted using AES-256
- Encryption key stored in environment variables
- Decryption only occurs during email sending

### Authentication
- API key based authentication for tenants
- Admin key for management operations
- No credentials exposed in API responses

### Rate Limiting
- Configurable rate limits per tenant
- Prevents abuse and ensures fair usage
- Default: 100 requests per minute

### Input Validation
- All inputs validated and sanitized
- SQL injection protection with parameterized queries
- XSS protection with proper encoding

## Integration Examples

### SvelteKit Integration

See `examples/sveltekit-integration/` for a complete example showing:
- Server-side API routes for secure email sending
- Contact form with proper error handling
- Environment-based configuration

### Other Frameworks

The API can be integrated with any framework:

```javascript
// JavaScript/Node.js example
const response = await fetch('http://localhost:3000/send', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'your_tenant_api_key'
  },
  body: JSON.stringify({
    to: 'user@example.com',
    subject: 'Hello World',
    htmlBody: '<h1>Hello World!</h1>'
  })
});

const result = await response.json();
console.log(result);
```

## Development

### Project Structure

```
matte/
├── src/
│   ├── api/
│   │   ├── controllers/     # Business logic
│   │   ├── routes/          # API routes
│   │   └── middleware/      # Express middleware
│   ├── db/                  # Database utilities
│   ├── utils/               # Helper functions
│   └── config/              # Configuration
├── db/
│   └── schema.sql           # Database schema
├── examples/                # Integration examples
└── tests/                   # Test files
```

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## Deployment

### Production Deployment

1. **Environment Setup**
   - Set `NODE_ENV=production`
   - Configure secure `ENCRYPTION_KEY` (32 bytes)
   - Set up PostgreSQL database
   - Configure admin API keys

2. **Build Application**
```bash
npm run build
```

3. **Database Migration**
```bash
psql $DATABASE_URL < db/schema.sql
```

4. **Start Server**
```bash
npm start
```

### Docker Deployment

The included `docker-compose.yml` provides:
- PostgreSQL database
- Redis (for future queueing)
- MTE-API application
- Nginx reverse proxy (optional)

### Security Considerations

- Use HTTPS in production
- Keep encryption keys secure
- Regularly rotate API keys
- Monitor email sending patterns
- Implement proper logging and monitoring

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify `DATABASE_URL` is correct
   - Ensure PostgreSQL is running
   - Check database permissions

2. **Encryption Errors**
   - Verify `ENCRYPTION_KEY` is 32 characters
   - Ensure key consistency across restarts

3. **SMTP Connection Issues**
   - Verify SMTP credentials
   - Check firewall/network access
   - Confirm SMTP provider allows the connection

4. **Rate Limiting**
   - Check rate limit configuration
   - Monitor request patterns
   - Consider increasing limits for high-volume users

### Logs

Logs are written to:
- Console (development)
- `logs/combined.log` (all logs)
- `logs/error.log` (errors only)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For support, please:
1. Check the troubleshooting section
2. Review the logs
3. Create an issue with detailed information

## Roadmap

Future enhancements:
- [ ] Email template system
- [ ] Webhook support for delivery status
- [ ] Advanced analytics and reporting
- [ ] Bulk email sending
- [ ] Integration with email delivery services
- [ ] Advanced monitoring and alerting