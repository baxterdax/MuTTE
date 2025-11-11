# SvelteKit Integration Example

This example demonstrates how to integrate the MTE-API (Multi-Tenant Transactional Email API) with a SvelteKit application.

## Features

- Contact form that sends emails through MTE-API
- Server-side API routes for secure email sending
- Environment-based configuration
- Error handling and user feedback

## Prerequisites

1. MTE-API server running (see main project README)
2. A tenant account created in MTE-API with API key
3. Node.js 18+ and SvelteKit

## Setup

1. Copy the `.env.example` file to `.env` and configure your MTE-API endpoint:
```env
MTE_API_URL=http://localhost:3000
MTE_API_KEY=your_tenant_api_key_here
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## API Key Management

The SvelteKit app needs your MTE-API tenant API key to send emails. The key should be kept secure and not exposed to the client.

### Production Security

In production, consider:
- Using environment variables with proper secrets management
- Implementing rate limiting on your SvelteKit app
- Adding authentication to your contact form
- Using HTTPS for all communications

## Usage

1. Navigate to `/contact` page
2. Fill out the contact form
3. Submit to send email through MTE-API

## API Routes

- `src/routes/api/send/+server.ts` - Handles email sending through MTE-API
- `src/routes/contact/+page.svelte` - Contact form page

## Configuration

All MTE-API configuration is handled through environment variables:
- `MTE_API_URL`: The base URL of your MTE-API instance
- `MTE_API_KEY`: Your tenant API key for authentication