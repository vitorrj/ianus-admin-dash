// ============================================================
// TYPES
// ============================================================

export interface Tenant {
  id: string
  name: string
  status: 'active' | 'suspended' | 'pending'
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  tenantId: string
  username: string
  role: 'admin' | 'viewer'
  lastLogin: string | null
  createdAt: string
  updatedAt: string
}

export interface ApiKey {
  id: string
  tenantId: string
  domain: string
  subdomain: string
  keyPrefix: string
  label: string
  isActive: boolean
  expiresAt: string | null
  lastUsedAt: string | null
  createdAt: string
  updatedAt: string
}

export interface Domain {
  domain: string
  subdomains: string[]
  tenantId: string
}

export type AuditActionType =
  | 'tenant.created'
  | 'tenant.updated'
  | 'tenant.suspended'
  | 'user.created'
  | 'user.updated'
  | 'user.deleted'
  | 'apikey.created'
  | 'apikey.revoked'
  | 'apikey.regenerated'
  | 'domain.added'
  | 'domain.removed'
  | 'settings.updated'
  | 'user.login'

export interface AuditLogEntry {
  id: string
  timestamp: string
  userId: string
  username: string
  action: AuditActionType
  resourceType: 'tenant' | 'user' | 'apikey' | 'domain' | 'settings'
  resourceId: string
  resourceName: string
  tenantId: string | null
  tenantName: string | null
  details: string
  ipAddress: string
}

// ============================================================
// MOCK DATA — TENANTS
// ============================================================

export const tenants: Tenant[] = [
  {
    id: 'tn_01a2b3c4-d5e6-4f78-9abc-def012345678',
    name: 'Acme Corp',
    status: 'active',
    createdAt: '2024-08-15T10:30:00Z',
    updatedAt: '2025-01-20T14:22:00Z',
  },
  {
    id: 'tn_11b2c3d4-e5f6-4a78-9bcd-ef0123456789',
    name: 'TechFlow SaaS',
    status: 'active',
    createdAt: '2024-09-02T08:15:00Z',
    updatedAt: '2025-02-10T11:05:00Z',
  },
  {
    id: 'tn_21c2d3e4-f5a6-4b78-9cde-f01234567890',
    name: 'SecureBank',
    status: 'active',
    createdAt: '2024-07-20T16:45:00Z',
    updatedAt: '2025-02-18T09:30:00Z',
  },
  {
    id: 'tn_31d2e3f4-a5b6-4c78-9def-012345678901',
    name: 'MediaStream',
    status: 'suspended',
    createdAt: '2024-10-10T12:00:00Z',
    updatedAt: '2025-01-05T17:45:00Z',
  },
  {
    id: 'tn_41e2f3a4-b5c6-4d78-9ef0-123456789012',
    name: 'RetailHub',
    status: 'active',
    createdAt: '2024-11-01T09:00:00Z',
    updatedAt: '2025-02-15T13:10:00Z',
  },
  {
    id: 'tn_51f2a3b4-c5d6-4e78-9f01-234567890123',
    name: 'CloudNine Analytics',
    status: 'pending',
    createdAt: '2025-02-01T11:30:00Z',
    updatedAt: '2025-02-01T11:30:00Z',
  },
  {
    id: 'tn_61a2b3c4-d5e6-4f78-9012-345678901234',
    name: 'HealthFirst',
    status: 'active',
    createdAt: '2024-06-15T14:20:00Z',
    updatedAt: '2025-02-19T08:15:00Z',
  },
]

// ============================================================
// MOCK DATA — USERS
// ============================================================

export const users: User[] = [
  // Acme Corp
  { id: 'usr_01', tenantId: 'tn_01a2b3c4-d5e6-4f78-9abc-def012345678', username: 'john.admin', role: 'admin', lastLogin: '2025-02-19T08:30:00Z', createdAt: '2024-08-15T10:30:00Z', updatedAt: '2025-02-19T08:30:00Z' },
  { id: 'usr_02', tenantId: 'tn_01a2b3c4-d5e6-4f78-9abc-def012345678', username: 'sarah.viewer', role: 'viewer', lastLogin: '2025-02-18T14:10:00Z', createdAt: '2024-09-01T09:00:00Z', updatedAt: '2025-02-18T14:10:00Z' },
  { id: 'usr_03', tenantId: 'tn_01a2b3c4-d5e6-4f78-9abc-def012345678', username: 'mike.ops', role: 'admin', lastLogin: '2025-02-17T11:00:00Z', createdAt: '2024-10-15T08:00:00Z', updatedAt: '2025-02-17T11:00:00Z' },
  // TechFlow SaaS
  { id: 'usr_04', tenantId: 'tn_11b2c3d4-e5f6-4a78-9bcd-ef0123456789', username: 'alex.tech', role: 'admin', lastLogin: '2025-02-20T09:15:00Z', createdAt: '2024-09-02T08:15:00Z', updatedAt: '2025-02-20T09:15:00Z' },
  { id: 'usr_05', tenantId: 'tn_11b2c3d4-e5f6-4a78-9bcd-ef0123456789', username: 'emma.dev', role: 'viewer', lastLogin: '2025-02-19T16:30:00Z', createdAt: '2024-09-10T10:00:00Z', updatedAt: '2025-02-19T16:30:00Z' },
  { id: 'usr_06', tenantId: 'tn_11b2c3d4-e5f6-4a78-9bcd-ef0123456789', username: 'lucas.pm', role: 'viewer', lastLogin: '2025-02-15T12:00:00Z', createdAt: '2024-11-20T14:30:00Z', updatedAt: '2025-02-15T12:00:00Z' },
  { id: 'usr_07', tenantId: 'tn_11b2c3d4-e5f6-4a78-9bcd-ef0123456789', username: 'nina.sec', role: 'admin', lastLogin: '2025-02-20T07:45:00Z', createdAt: '2024-12-01T09:00:00Z', updatedAt: '2025-02-20T07:45:00Z' },
  // SecureBank
  { id: 'usr_08', tenantId: 'tn_21c2d3e4-f5a6-4b78-9cde-f01234567890', username: 'david.sec', role: 'admin', lastLogin: '2025-02-20T06:00:00Z', createdAt: '2024-07-20T16:45:00Z', updatedAt: '2025-02-20T06:00:00Z' },
  { id: 'usr_09', tenantId: 'tn_21c2d3e4-f5a6-4b78-9cde-f01234567890', username: 'lisa.audit', role: 'viewer', lastLogin: '2025-02-19T10:00:00Z', createdAt: '2024-08-05T08:30:00Z', updatedAt: '2025-02-19T10:00:00Z' },
  { id: 'usr_10', tenantId: 'tn_21c2d3e4-f5a6-4b78-9cde-f01234567890', username: 'robert.ops', role: 'admin', lastLogin: '2025-02-18T15:00:00Z', createdAt: '2024-09-20T11:00:00Z', updatedAt: '2025-02-18T15:00:00Z' },
  // MediaStream
  { id: 'usr_11', tenantId: 'tn_31d2e3f4-a5b6-4c78-9def-012345678901', username: 'carlos.media', role: 'admin', lastLogin: '2025-01-03T09:00:00Z', createdAt: '2024-10-10T12:00:00Z', updatedAt: '2025-01-03T09:00:00Z' },
  { id: 'usr_12', tenantId: 'tn_31d2e3f4-a5b6-4c78-9def-012345678901', username: 'yuki.stream', role: 'viewer', lastLogin: '2025-01-02T14:30:00Z', createdAt: '2024-10-15T10:00:00Z', updatedAt: '2025-01-02T14:30:00Z' },
  // RetailHub
  { id: 'usr_13', tenantId: 'tn_41e2f3a4-b5c6-4d78-9ef0-123456789012', username: 'sophia.retail', role: 'admin', lastLogin: '2025-02-20T08:00:00Z', createdAt: '2024-11-01T09:00:00Z', updatedAt: '2025-02-20T08:00:00Z' },
  { id: 'usr_14', tenantId: 'tn_41e2f3a4-b5c6-4d78-9ef0-123456789012', username: 'james.store', role: 'viewer', lastLogin: '2025-02-19T17:15:00Z', createdAt: '2024-11-10T11:30:00Z', updatedAt: '2025-02-19T17:15:00Z' },
  { id: 'usr_15', tenantId: 'tn_41e2f3a4-b5c6-4d78-9ef0-123456789012', username: 'priya.ops', role: 'admin', lastLogin: '2025-02-18T09:45:00Z', createdAt: '2024-12-05T14:00:00Z', updatedAt: '2025-02-18T09:45:00Z' },
  // CloudNine Analytics
  { id: 'usr_16', tenantId: 'tn_51f2a3b4-c5d6-4e78-9f01-234567890123', username: 'wei.cloud', role: 'admin', lastLogin: null, createdAt: '2025-02-01T11:30:00Z', updatedAt: '2025-02-01T11:30:00Z' },
  // HealthFirst
  { id: 'usr_17', tenantId: 'tn_61a2b3c4-d5e6-4f78-9012-345678901234', username: 'anna.health', role: 'admin', lastLogin: '2025-02-20T07:00:00Z', createdAt: '2024-06-15T14:20:00Z', updatedAt: '2025-02-20T07:00:00Z' },
  { id: 'usr_18', tenantId: 'tn_61a2b3c4-d5e6-4f78-9012-345678901234', username: 'tom.nurse', role: 'viewer', lastLogin: '2025-02-19T13:00:00Z', createdAt: '2024-07-01T09:00:00Z', updatedAt: '2025-02-19T13:00:00Z' },
  { id: 'usr_19', tenantId: 'tn_61a2b3c4-d5e6-4f78-9012-345678901234', username: 'maria.doc', role: 'viewer', lastLogin: '2025-02-17T16:30:00Z', createdAt: '2024-08-10T10:30:00Z', updatedAt: '2025-02-17T16:30:00Z' },
  { id: 'usr_20', tenantId: 'tn_61a2b3c4-d5e6-4f78-9012-345678901234', username: 'raj.admin', role: 'admin', lastLogin: '2025-02-20T10:00:00Z', createdAt: '2024-09-15T08:00:00Z', updatedAt: '2025-02-20T10:00:00Z' },
]

// ============================================================
// MOCK DATA — API KEYS
// ============================================================

export const apiKeys: ApiKey[] = [
  // Acme Corp
  { id: 'ak_01', tenantId: 'tn_01a2b3c4-d5e6-4f78-9abc-def012345678', domain: 'acme.com', subdomain: 'api.acme.com', keyPrefix: 'kai_a3f8', label: 'Production API', isActive: true, expiresAt: '2025-08-15T00:00:00Z', lastUsedAt: '2025-02-20T10:15:00Z', createdAt: '2024-08-15T10:30:00Z', updatedAt: '2025-02-20T10:15:00Z' },
  { id: 'ak_02', tenantId: 'tn_01a2b3c4-d5e6-4f78-9abc-def012345678', domain: 'acme.com', subdomain: 'dev.acme.com', keyPrefix: 'kai_b2e7', label: 'Development', isActive: true, expiresAt: '2025-06-01T00:00:00Z', lastUsedAt: '2025-02-19T15:30:00Z', createdAt: '2024-09-10T09:00:00Z', updatedAt: '2025-02-19T15:30:00Z' },
  { id: 'ak_03', tenantId: 'tn_01a2b3c4-d5e6-4f78-9abc-def012345678', domain: 'acme.com', subdomain: 'www.acme.com', keyPrefix: 'kai_c1d6', label: 'Website Frontend', isActive: true, expiresAt: null, lastUsedAt: '2025-02-20T09:00:00Z', createdAt: '2024-08-20T14:00:00Z', updatedAt: '2025-02-20T09:00:00Z' },
  { id: 'ak_04', tenantId: 'tn_01a2b3c4-d5e6-4f78-9abc-def012345678', domain: 'acme-staging.com', subdomain: 'api.acme-staging.com', keyPrefix: 'kai_d0c5', label: 'Staging API', isActive: false, expiresAt: '2025-01-01T00:00:00Z', lastUsedAt: '2024-12-28T11:00:00Z', createdAt: '2024-10-01T08:00:00Z', updatedAt: '2025-01-01T00:00:00Z' },
  { id: 'ak_05', tenantId: 'tn_01a2b3c4-d5e6-4f78-9abc-def012345678', domain: 'acme.com', subdomain: 'mobile.acme.com', keyPrefix: 'kai_e9b4', label: 'Mobile API', isActive: true, expiresAt: '2025-12-31T00:00:00Z', lastUsedAt: '2025-02-20T08:45:00Z', createdAt: '2024-11-15T10:00:00Z', updatedAt: '2025-02-20T08:45:00Z' },
  // TechFlow SaaS
  { id: 'ak_06', tenantId: 'tn_11b2c3d4-e5f6-4a78-9bcd-ef0123456789', domain: 'techflow.io', subdomain: 'api.techflow.io', keyPrefix: 'kai_f8a3', label: 'Main API', isActive: true, expiresAt: '2025-09-02T00:00:00Z', lastUsedAt: '2025-02-20T10:30:00Z', createdAt: '2024-09-02T08:15:00Z', updatedAt: '2025-02-20T10:30:00Z' },
  { id: 'ak_07', tenantId: 'tn_11b2c3d4-e5f6-4a78-9bcd-ef0123456789', domain: 'techflow.io', subdomain: 'app.techflow.io', keyPrefix: 'kai_g7b2', label: 'App Frontend', isActive: true, expiresAt: null, lastUsedAt: '2025-02-20T09:55:00Z', createdAt: '2024-09-05T10:00:00Z', updatedAt: '2025-02-20T09:55:00Z' },
  { id: 'ak_08', tenantId: 'tn_11b2c3d4-e5f6-4a78-9bcd-ef0123456789', domain: 'techflow.io', subdomain: 'webhooks.techflow.io', keyPrefix: 'kai_h6c1', label: 'Webhooks', isActive: true, expiresAt: '2025-12-01T00:00:00Z', lastUsedAt: '2025-02-19T22:00:00Z', createdAt: '2024-10-20T14:30:00Z', updatedAt: '2025-02-19T22:00:00Z' },
  { id: 'ak_09', tenantId: 'tn_11b2c3d4-e5f6-4a78-9bcd-ef0123456789', domain: 'techflow-dev.io', subdomain: 'api.techflow-dev.io', keyPrefix: 'kai_i5d0', label: 'Dev Environment', isActive: true, expiresAt: '2025-06-30T00:00:00Z', lastUsedAt: '2025-02-18T16:00:00Z', createdAt: '2024-11-01T09:00:00Z', updatedAt: '2025-02-18T16:00:00Z' },
  { id: 'ak_10', tenantId: 'tn_11b2c3d4-e5f6-4a78-9bcd-ef0123456789', domain: 'techflow.io', subdomain: 'admin.techflow.io', keyPrefix: 'kai_j4e9', label: 'Admin Panel', isActive: true, expiresAt: null, lastUsedAt: '2025-02-20T07:30:00Z', createdAt: '2024-12-10T11:00:00Z', updatedAt: '2025-02-20T07:30:00Z' },
  // SecureBank
  { id: 'ak_11', tenantId: 'tn_21c2d3e4-f5a6-4b78-9cde-f01234567890', domain: 'securebank.com', subdomain: 'api.securebank.com', keyPrefix: 'kai_k3f8', label: 'Banking API', isActive: true, expiresAt: '2025-07-20T00:00:00Z', lastUsedAt: '2025-02-20T10:00:00Z', createdAt: '2024-07-20T16:45:00Z', updatedAt: '2025-02-20T10:00:00Z' },
  { id: 'ak_12', tenantId: 'tn_21c2d3e4-f5a6-4b78-9cde-f01234567890', domain: 'securebank.com', subdomain: 'www.securebank.com', keyPrefix: 'kai_l2g7', label: 'Website', isActive: true, expiresAt: null, lastUsedAt: '2025-02-20T09:30:00Z', createdAt: '2024-07-25T10:00:00Z', updatedAt: '2025-02-20T09:30:00Z' },
  { id: 'ak_13', tenantId: 'tn_21c2d3e4-f5a6-4b78-9cde-f01234567890', domain: 'securebank.com', subdomain: 'mobile.securebank.com', keyPrefix: 'kai_m1h6', label: 'Mobile Banking', isActive: true, expiresAt: '2025-10-01T00:00:00Z', lastUsedAt: '2025-02-20T08:15:00Z', createdAt: '2024-08-10T09:00:00Z', updatedAt: '2025-02-20T08:15:00Z' },
  { id: 'ak_14', tenantId: 'tn_21c2d3e4-f5a6-4b78-9cde-f01234567890', domain: 'securebank.com', subdomain: 'auth.securebank.com', keyPrefix: 'kai_n0i5', label: 'Auth Service', isActive: true, expiresAt: '2025-07-20T00:00:00Z', lastUsedAt: '2025-02-20T10:05:00Z', createdAt: '2024-08-15T14:00:00Z', updatedAt: '2025-02-20T10:05:00Z' },
  { id: 'ak_15', tenantId: 'tn_21c2d3e4-f5a6-4b78-9cde-f01234567890', domain: 'securebank-uat.com', subdomain: 'api.securebank-uat.com', keyPrefix: 'kai_o9j4', label: 'UAT Environment', isActive: false, expiresAt: '2024-12-31T00:00:00Z', lastUsedAt: '2024-12-20T15:00:00Z', createdAt: '2024-09-01T08:00:00Z', updatedAt: '2024-12-31T00:00:00Z' },
  { id: 'ak_16', tenantId: 'tn_21c2d3e4-f5a6-4b78-9cde-f01234567890', domain: 'securebank.com', subdomain: 'partner.securebank.com', keyPrefix: 'kai_p8k3', label: 'Partner API', isActive: true, expiresAt: '2026-01-01T00:00:00Z', lastUsedAt: '2025-02-19T20:00:00Z', createdAt: '2024-11-01T10:00:00Z', updatedAt: '2025-02-19T20:00:00Z' },
  // MediaStream
  { id: 'ak_17', tenantId: 'tn_31d2e3f4-a5b6-4c78-9def-012345678901', domain: 'mediastream.tv', subdomain: 'api.mediastream.tv', keyPrefix: 'kai_q7l2', label: 'Streaming API', isActive: false, expiresAt: '2025-04-10T00:00:00Z', lastUsedAt: '2025-01-03T09:00:00Z', createdAt: '2024-10-10T12:00:00Z', updatedAt: '2025-01-05T17:45:00Z' },
  { id: 'ak_18', tenantId: 'tn_31d2e3f4-a5b6-4c78-9def-012345678901', domain: 'mediastream.tv', subdomain: 'cdn.mediastream.tv', keyPrefix: 'kai_r6m1', label: 'CDN Auth', isActive: false, expiresAt: '2025-04-10T00:00:00Z', lastUsedAt: '2025-01-02T14:00:00Z', createdAt: '2024-10-15T10:00:00Z', updatedAt: '2025-01-05T17:45:00Z' },
  // RetailHub
  { id: 'ak_19', tenantId: 'tn_41e2f3a4-b5c6-4d78-9ef0-123456789012', domain: 'retailhub.com', subdomain: 'api.retailhub.com', keyPrefix: 'kai_s5n0', label: 'Store API', isActive: true, expiresAt: '2025-11-01T00:00:00Z', lastUsedAt: '2025-02-20T10:20:00Z', createdAt: '2024-11-01T09:00:00Z', updatedAt: '2025-02-20T10:20:00Z' },
  { id: 'ak_20', tenantId: 'tn_41e2f3a4-b5c6-4d78-9ef0-123456789012', domain: 'retailhub.com', subdomain: 'checkout.retailhub.com', keyPrefix: 'kai_t4o9', label: 'Checkout', isActive: true, expiresAt: null, lastUsedAt: '2025-02-20T10:10:00Z', createdAt: '2024-11-05T14:00:00Z', updatedAt: '2025-02-20T10:10:00Z' },
  { id: 'ak_21', tenantId: 'tn_41e2f3a4-b5c6-4d78-9ef0-123456789012', domain: 'retailhub.com', subdomain: 'www.retailhub.com', keyPrefix: 'kai_u3p8', label: 'Website', isActive: true, expiresAt: '2026-01-01T00:00:00Z', lastUsedAt: '2025-02-20T09:45:00Z', createdAt: '2024-11-10T08:00:00Z', updatedAt: '2025-02-20T09:45:00Z' },
  { id: 'ak_22', tenantId: 'tn_41e2f3a4-b5c6-4d78-9ef0-123456789012', domain: 'retailhub.com', subdomain: 'mobile.retailhub.com', keyPrefix: 'kai_v2q7', label: 'Mobile App', isActive: true, expiresAt: '2025-11-01T00:00:00Z', lastUsedAt: '2025-02-20T08:30:00Z', createdAt: '2024-12-01T10:00:00Z', updatedAt: '2025-02-20T08:30:00Z' },
  { id: 'ak_23', tenantId: 'tn_41e2f3a4-b5c6-4d78-9ef0-123456789012', domain: 'retailhub-staging.com', subdomain: 'api.retailhub-staging.com', keyPrefix: 'kai_w1r6', label: 'Staging', isActive: true, expiresAt: '2025-05-01T00:00:00Z', lastUsedAt: '2025-02-17T16:00:00Z', createdAt: '2024-12-15T09:00:00Z', updatedAt: '2025-02-17T16:00:00Z' },
  // CloudNine Analytics
  { id: 'ak_24', tenantId: 'tn_51f2a3b4-c5d6-4e78-9f01-234567890123', domain: 'cloudnine.ai', subdomain: 'api.cloudnine.ai', keyPrefix: 'kai_x0s5', label: 'Analytics API', isActive: true, expiresAt: '2026-02-01T00:00:00Z', lastUsedAt: null, createdAt: '2025-02-01T11:30:00Z', updatedAt: '2025-02-01T11:30:00Z' },
  // HealthFirst
  { id: 'ak_25', tenantId: 'tn_61a2b3c4-d5e6-4f78-9012-345678901234', domain: 'healthfirst.org', subdomain: 'api.healthfirst.org', keyPrefix: 'kai_y9t4', label: 'Patient Portal API', isActive: true, expiresAt: '2025-06-15T00:00:00Z', lastUsedAt: '2025-02-20T07:00:00Z', createdAt: '2024-06-15T14:20:00Z', updatedAt: '2025-02-20T07:00:00Z' },
  { id: 'ak_26', tenantId: 'tn_61a2b3c4-d5e6-4f78-9012-345678901234', domain: 'healthfirst.org', subdomain: 'www.healthfirst.org', keyPrefix: 'kai_z8u3', label: 'Website', isActive: true, expiresAt: null, lastUsedAt: '2025-02-20T09:15:00Z', createdAt: '2024-06-20T10:00:00Z', updatedAt: '2025-02-20T09:15:00Z' },
  { id: 'ak_27', tenantId: 'tn_61a2b3c4-d5e6-4f78-9012-345678901234', domain: 'healthfirst.org', subdomain: 'ehr.healthfirst.org', keyPrefix: 'kai_a7v2', label: 'EHR Integration', isActive: true, expiresAt: '2025-12-31T00:00:00Z', lastUsedAt: '2025-02-19T23:00:00Z', createdAt: '2024-07-10T11:00:00Z', updatedAt: '2025-02-19T23:00:00Z' },
  { id: 'ak_28', tenantId: 'tn_61a2b3c4-d5e6-4f78-9012-345678901234', domain: 'healthfirst.org', subdomain: 'telehealth.healthfirst.org', keyPrefix: 'kai_b6w1', label: 'Telehealth', isActive: true, expiresAt: '2025-12-31T00:00:00Z', lastUsedAt: '2025-02-20T06:30:00Z', createdAt: '2024-09-01T08:00:00Z', updatedAt: '2025-02-20T06:30:00Z' },
  { id: 'ak_29', tenantId: 'tn_61a2b3c4-d5e6-4f78-9012-345678901234', domain: 'healthfirst-dev.org', subdomain: 'api.healthfirst-dev.org', keyPrefix: 'kai_c5x0', label: 'Dev Environment', isActive: false, expiresAt: '2025-01-15T00:00:00Z', lastUsedAt: '2025-01-10T12:00:00Z', createdAt: '2024-10-01T09:00:00Z', updatedAt: '2025-01-15T00:00:00Z' },
]

// ============================================================
// MOCK DATA — AUDIT LOG
// ============================================================

export const auditLog: AuditLogEntry[] = [
  { id: 'al_01', timestamp: '2025-02-20T10:30:00Z', userId: 'usr_01', username: 'john.admin', action: 'apikey.created', resourceType: 'apikey', resourceId: 'ak_05', resourceName: 'Mobile API', tenantId: 'tn_01a2b3c4-d5e6-4f78-9abc-def012345678', tenantName: 'Acme Corp', details: 'Created API key for mobile.acme.com', ipAddress: '203.0.113.45' },
  { id: 'al_02', timestamp: '2025-02-20T09:15:00Z', userId: 'usr_04', username: 'alex.tech', action: 'user.login', resourceType: 'user', resourceId: 'usr_04', resourceName: 'alex.tech', tenantId: 'tn_11b2c3d4-e5f6-4a78-9bcd-ef0123456789', tenantName: 'TechFlow SaaS', details: 'Successful login from 198.51.100.22', ipAddress: '198.51.100.22' },
  { id: 'al_03', timestamp: '2025-02-20T08:00:00Z', userId: 'usr_13', username: 'sophia.retail', action: 'user.login', resourceType: 'user', resourceId: 'usr_13', resourceName: 'sophia.retail', tenantId: 'tn_41e2f3a4-b5c6-4d78-9ef0-123456789012', tenantName: 'RetailHub', details: 'Successful login from 192.0.2.100', ipAddress: '192.0.2.100' },
  { id: 'al_04', timestamp: '2025-02-19T17:45:00Z', userId: 'usr_08', username: 'david.sec', action: 'apikey.revoked', resourceType: 'apikey', resourceId: 'ak_15', resourceName: 'UAT Environment', tenantId: 'tn_21c2d3e4-f5a6-4b78-9cde-f01234567890', tenantName: 'SecureBank', details: 'Revoked expired UAT API key', ipAddress: '203.0.113.88' },
  { id: 'al_05', timestamp: '2025-02-19T15:00:00Z', userId: 'usr_01', username: 'john.admin', action: 'user.created', resourceType: 'user', resourceId: 'usr_03', resourceName: 'mike.ops', tenantId: 'tn_01a2b3c4-d5e6-4f78-9abc-def012345678', tenantName: 'Acme Corp', details: 'Created new admin user', ipAddress: '203.0.113.45' },
  { id: 'al_06', timestamp: '2025-02-19T12:30:00Z', userId: 'usr_17', username: 'anna.health', action: 'domain.added', resourceType: 'domain', resourceId: 'telehealth.healthfirst.org', resourceName: 'telehealth.healthfirst.org', tenantId: 'tn_61a2b3c4-d5e6-4f78-9012-345678901234', tenantName: 'HealthFirst', details: 'Added subdomain telehealth.healthfirst.org', ipAddress: '198.51.100.55' },
  { id: 'al_07', timestamp: '2025-02-19T10:00:00Z', userId: 'usr_04', username: 'alex.tech', action: 'apikey.regenerated', resourceType: 'apikey', resourceId: 'ak_09', resourceName: 'Dev Environment', tenantId: 'tn_11b2c3d4-e5f6-4a78-9bcd-ef0123456789', tenantName: 'TechFlow SaaS', details: 'Regenerated development API key', ipAddress: '198.51.100.22' },
  { id: 'al_08', timestamp: '2025-02-18T16:00:00Z', userId: 'usr_08', username: 'david.sec', action: 'settings.updated', resourceType: 'settings', resourceId: 'global', resourceName: 'JWT Expiration', tenantId: null, tenantName: null, details: 'Updated JWT token expiration from 24h to 12h', ipAddress: '203.0.113.88' },
  { id: 'al_09', timestamp: '2025-02-18T14:20:00Z', userId: 'usr_13', username: 'sophia.retail', action: 'apikey.created', resourceType: 'apikey', resourceId: 'ak_23', resourceName: 'Staging', tenantId: 'tn_41e2f3a4-b5c6-4d78-9ef0-123456789012', tenantName: 'RetailHub', details: 'Created staging API key for retailhub-staging.com', ipAddress: '192.0.2.100' },
  { id: 'al_10', timestamp: '2025-02-18T11:00:00Z', userId: 'usr_01', username: 'john.admin', action: 'tenant.updated', resourceType: 'tenant', resourceId: 'tn_01a2b3c4-d5e6-4f78-9abc-def012345678', resourceName: 'Acme Corp', tenantId: 'tn_01a2b3c4-d5e6-4f78-9abc-def012345678', tenantName: 'Acme Corp', details: 'Updated tenant contact information', ipAddress: '203.0.113.45' },
  { id: 'al_11', timestamp: '2025-02-17T15:30:00Z', userId: 'usr_17', username: 'anna.health', action: 'user.updated', resourceType: 'user', resourceId: 'usr_20', resourceName: 'raj.admin', tenantId: 'tn_61a2b3c4-d5e6-4f78-9012-345678901234', tenantName: 'HealthFirst', details: 'Changed role from viewer to admin', ipAddress: '198.51.100.55' },
  { id: 'al_12', timestamp: '2025-02-17T10:00:00Z', userId: 'usr_08', username: 'david.sec', action: 'apikey.created', resourceType: 'apikey', resourceId: 'ak_16', resourceName: 'Partner API', tenantId: 'tn_21c2d3e4-f5a6-4b78-9cde-f01234567890', tenantName: 'SecureBank', details: 'Created partner API key for partner.securebank.com', ipAddress: '203.0.113.88' },
  { id: 'al_13', timestamp: '2025-02-16T09:00:00Z', userId: 'usr_01', username: 'john.admin', action: 'tenant.created', resourceType: 'tenant', resourceId: 'tn_51f2a3b4-c5d6-4e78-9f01-234567890123', resourceName: 'CloudNine Analytics', tenantId: 'tn_51f2a3b4-c5d6-4e78-9f01-234567890123', tenantName: 'CloudNine Analytics', details: 'Created new tenant CloudNine Analytics', ipAddress: '203.0.113.45' },
  { id: 'al_14', timestamp: '2025-02-15T14:00:00Z', userId: 'usr_04', username: 'alex.tech', action: 'domain.removed', resourceType: 'domain', resourceId: 'old.techflow.io', resourceName: 'old.techflow.io', tenantId: 'tn_11b2c3d4-e5f6-4a78-9bcd-ef0123456789', tenantName: 'TechFlow SaaS', details: 'Removed deprecated subdomain', ipAddress: '198.51.100.22' },
  { id: 'al_15', timestamp: '2025-02-14T11:30:00Z', userId: 'usr_08', username: 'david.sec', action: 'tenant.suspended', resourceType: 'tenant', resourceId: 'tn_31d2e3f4-a5b6-4c78-9def-012345678901', resourceName: 'MediaStream', tenantId: 'tn_31d2e3f4-a5b6-4c78-9def-012345678901', tenantName: 'MediaStream', details: 'Suspended tenant due to payment issues', ipAddress: '203.0.113.88' },
  { id: 'al_16', timestamp: '2025-02-13T16:45:00Z', userId: 'usr_13', username: 'sophia.retail', action: 'user.deleted', resourceType: 'user', resourceId: 'usr_deleted_01', resourceName: 'old.intern', tenantId: 'tn_41e2f3a4-b5c6-4d78-9ef0-123456789012', tenantName: 'RetailHub', details: 'Deleted inactive user account', ipAddress: '192.0.2.100' },
  { id: 'al_17', timestamp: '2025-02-12T09:00:00Z', userId: 'usr_17', username: 'anna.health', action: 'apikey.created', resourceType: 'apikey', resourceId: 'ak_28', resourceName: 'Telehealth', tenantId: 'tn_61a2b3c4-d5e6-4f78-9012-345678901234', tenantName: 'HealthFirst', details: 'Created API key for telehealth.healthfirst.org', ipAddress: '198.51.100.55' },
  { id: 'al_18', timestamp: '2025-02-11T13:00:00Z', userId: 'usr_04', username: 'alex.tech', action: 'settings.updated', resourceType: 'settings', resourceId: 'global', resourceName: 'Rate Limits', tenantId: null, tenantName: null, details: 'Updated default rate limit from 1000 to 5000 req/min', ipAddress: '198.51.100.22' },
  { id: 'al_19', timestamp: '2025-02-10T10:15:00Z', userId: 'usr_01', username: 'john.admin', action: 'user.created', resourceType: 'user', resourceId: 'usr_16', resourceName: 'wei.cloud', tenantId: 'tn_51f2a3b4-c5d6-4e78-9f01-234567890123', tenantName: 'CloudNine Analytics', details: 'Created initial admin user for CloudNine Analytics', ipAddress: '203.0.113.45' },
  { id: 'al_20', timestamp: '2025-02-09T08:30:00Z', userId: 'usr_08', username: 'david.sec', action: 'apikey.revoked', resourceType: 'apikey', resourceId: 'ak_29', resourceName: 'Dev Environment', tenantId: 'tn_61a2b3c4-d5e6-4f78-9012-345678901234', tenantName: 'HealthFirst', details: 'Revoked expired dev environment key', ipAddress: '203.0.113.88' },
]

// ============================================================
// HELPER FUNCTIONS
// ============================================================

export function getTenantById(id: string): Tenant | undefined {
  return tenants.find((t) => t.id === id)
}

export function getUsersByTenantId(tenantId: string): User[] {
  return users.filter((u) => u.tenantId === tenantId)
}

export function getApiKeysByTenantId(tenantId: string): ApiKey[] {
  return apiKeys.filter((k) => k.tenantId === tenantId)
}

export function getDomainsByTenantId(tenantId: string): Domain[] {
  const keys = apiKeys.filter((k) => k.tenantId === tenantId)
  const domainMap = new Map<string, Set<string>>()

  for (const key of keys) {
    if (!domainMap.has(key.domain)) {
      domainMap.set(key.domain, new Set())
    }
    domainMap.get(key.domain)!.add(key.subdomain)
  }

  return Array.from(domainMap.entries()).map(([domain, subdomains]) => ({
    domain,
    subdomains: Array.from(subdomains),
    tenantId,
  }))
}

export function getTenantName(tenantId: string): string {
  return tenants.find((t) => t.id === tenantId)?.name ?? 'Unknown'
}

export function getApiKeyStatus(key: ApiKey): 'active' | 'revoked' | 'expired' {
  if (!key.isActive) return 'revoked'
  if (key.expiresAt && new Date(key.expiresAt) < new Date()) return 'expired'
  return 'active'
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function formatDateTime(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function timeAgo(dateStr: string): string {
  const now = new Date()
  const date = new Date(dateStr)
  const diffMs = now.getTime() - date.getTime()
  const diffMin = Math.floor(diffMs / 60000)
  const diffHr = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHr / 24)

  if (diffMin < 1) return 'Just now'
  if (diffMin < 60) return `${diffMin}m ago`
  if (diffHr < 24) return `${diffHr}h ago`
  if (diffDay < 7) return `${diffDay}d ago`
  return formatDate(dateStr)
}

// ============================================================
// AGGREGATED STATS (for dashboard)
// ============================================================

export function getDashboardStats() {
  const activeKeys = apiKeys.filter((k) => k.isActive).length
  const totalUsers = users.length
  const totalTenants = tenants.length

  return {
    totalTenants,
    totalUsers,
    activeApiKeys: activeKeys,
    totalApiKeys: apiKeys.length,
    apiRequestsToday: 284_519,
    apiRequestsTrend: '+12.3%',
  }
}

export function getTenantStats(tenantId: string) {
  const tenantUsers = getUsersByTenantId(tenantId)
  const tenantKeys = getApiKeysByTenantId(tenantId)
  const tenantDomains = getDomainsByTenantId(tenantId)

  return {
    userCount: tenantUsers.length,
    apiKeyCount: tenantKeys.length,
    activeApiKeyCount: tenantKeys.filter((k) => k.isActive).length,
    domainCount: tenantDomains.length,
    subdomainCount: tenantDomains.reduce((acc, d) => acc + d.subdomains.length, 0),
  }
}

// Mock API request data per tenant for charts
export const apiRequestsByTenant = [
  { tenantName: 'Acme Corp', data: [4200, 3800, 5100, 4800, 5300, 4900, 5500, 5200, 4600, 5800, 6100, 5400] },
  { tenantName: 'TechFlow SaaS', data: [3100, 2800, 3500, 3200, 3800, 3400, 4000, 3700, 3300, 4200, 4500, 3900] },
  { tenantName: 'SecureBank', data: [8500, 7900, 9200, 8800, 9500, 9100, 10200, 9800, 8700, 10500, 11000, 10300] },
  { tenantName: 'RetailHub', data: [2500, 2200, 2800, 2600, 3000, 2700, 3200, 2900, 2400, 3400, 3700, 3100] },
  { tenantName: 'HealthFirst', data: [5800, 5400, 6200, 5900, 6500, 6100, 6800, 6400, 5700, 7000, 7400, 6900] },
]

export const chartLabels = ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00']

export const chartColors = ['#5e72e4', '#f5365c', '#2dce89', '#fb6340', '#8965e0', '#11cdef']
