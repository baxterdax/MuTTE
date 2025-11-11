-- Migration: Add webhook_url to tenants
ALTER TABLE tenants ADD COLUMN IF NOT EXISTS webhook_url TEXT;
