'use client'

import { useState, useMemo } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { CaretLeft, Plus, Key, UsersThree, Globe } from '@phosphor-icons/react'
import clsx from 'clsx'
import StatusBadge from '@/components/StatusBadge'
import KPICard from '@/components/KPICard'
import CreateApiKeyModal from '@/components/modals/CreateApiKeyModal'
import CreateUserModal from '@/components/modals/CreateUserModal'
import {
  getTenantById,
  getUsersByTenantId,
  getApiKeysByTenantId,
  getDomainsByTenantId,
  getTenantStats,
  formatDate,
  formatDateTime,
  getApiKeyStatus,
} from '@/lib/mockData'

type Tab = 'overview' | 'users' | 'apikeys' | 'domains'

export default function TenantDetailPage() {
  const params = useParams()
  const tenantId = params.id as string
  const tenant = getTenantById(tenantId)

  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [showCreateApiKey, setShowCreateApiKey] = useState(false)
  const [showCreateUser, setShowCreateUser] = useState(false)

  if (!tenant) {
    return (
      <div className="p-6">
        <p className="text-xs text-text-secondary">Tenant not found.</p>
        <Link href="/tenants" className="text-xs text-primary hover:underline mt-2 inline-block">
          Back to tenants
        </Link>
      </div>
    )
  }

  const stats = getTenantStats(tenantId)
  const users = getUsersByTenantId(tenantId)
  const keys = getApiKeysByTenantId(tenantId)
  const domains = getDomainsByTenantId(tenantId)

  const tabs: { id: Tab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'users', label: `Users (${stats.userCount})` },
    { id: 'apikeys', label: `API Keys (${stats.apiKeyCount})` },
    { id: 'domains', label: `Domains (${stats.domainCount})` },
  ]

  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-text-secondary mb-1">
        <Link href="/tenants" className="hover:text-text-main flex items-center gap-1">
          <CaretLeft size={12} />
          Tenants
        </Link>
        <span>/</span>
        <span className="text-text-main font-medium">{tenant.name}</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-4 mt-2">
        <div className="flex items-center gap-3">
          <h1 className="text-base font-bold text-text-main">{tenant.name}</h1>
          <StatusBadge status={tenant.status} />
        </div>
        <div className="flex items-center gap-2">
          <button className="btn btn-secondary" onClick={() => setShowCreateUser(true)}>
            <Plus size={12} weight="bold" />
            Add User
          </button>
          <button className="btn btn-primary" onClick={() => setShowCreateApiKey(true)}>
            <Plus size={12} weight="bold" />
            Create API Key
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl w-fit mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={clsx(
              'px-4 py-1.5 text-xs font-semibold rounded-lg transition-all',
              activeTab === tab.id
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-text-secondary hover:text-gray-700'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            <KPICard
              label="Users"
              value={stats.userCount}
              icon={<UsersThree size={14} className="text-purple-600" weight="bold" />}
              iconBgColor="bg-purple-100"
              hoverColor="purple"
            />
            <KPICard
              label="API Keys"
              value={stats.apiKeyCount}
              icon={<Key size={14} className="text-blue-600" weight="bold" />}
              iconBgColor="bg-blue-100"
              hoverColor="blue"
              trend={{ value: `${stats.activeApiKeyCount} active`, direction: 'neutral' }}
            />
            <KPICard
              label="Domains"
              value={stats.domainCount}
              icon={<Globe size={14} className="text-emerald-600" weight="bold" />}
              iconBgColor="bg-emerald-100"
              hoverColor="emerald"
            />
            <KPICard
              label="Subdomains"
              value={stats.subdomainCount}
              hoverColor="gray"
            />
          </div>

          <div className="card p-4">
            <h3 className="text-xs font-semibold text-text-main mb-3">Tenant Details</h3>
            <div className="grid grid-cols-2 gap-y-3 gap-x-8">
              <div>
                <p className="text-[10px] font-semibold text-text-secondary uppercase tracking-wide mb-0.5">Tenant ID</p>
                <p className="text-xs font-mono text-text-main">{tenant.id}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-text-secondary uppercase tracking-wide mb-0.5">Status</p>
                <StatusBadge status={tenant.status} />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-text-secondary uppercase tracking-wide mb-0.5">Created</p>
                <p className="text-xs text-text-main">{formatDateTime(tenant.createdAt)}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-text-secondary uppercase tracking-wide mb-0.5">Last Updated</p>
                <p className="text-xs text-text-main">{formatDateTime(tenant.updatedAt)}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Role</th>
                <th>Last Login</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                        <span className="text-2xs font-bold text-text-secondary">
                          {user.username.slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-text-main">{user.username}</p>
                        <p className="text-2xs text-text-tertiary font-mono">{user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td><StatusBadge status={user.role} /></td>
                  <td>
                    <span className="text-xs text-text-secondary">
                      {user.lastLogin ? formatDate(user.lastLogin) : 'Never'}
                    </span>
                  </td>
                  <td>
                    <span className="text-xs text-text-secondary">{formatDate(user.createdAt)}</span>
                  </td>
                  <td>
                    <div className="flex items-center gap-1">
                      <button className="text-2xs text-primary hover:underline">Edit</button>
                      <span className="text-text-tertiary">·</span>
                      <button className="text-2xs text-red-500 hover:underline">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'apikeys' && (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Label</th>
                <th>Key Prefix</th>
                <th>Domain</th>
                <th>Subdomain</th>
                <th>Status</th>
                <th>Last Used</th>
                <th>Expires</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {keys.map((key) => {
                const status = getApiKeyStatus(key)
                return (
                  <tr key={key.id}>
                    <td>
                      <p className="text-xs font-medium text-text-main">{key.label}</p>
                    </td>
                    <td>
                      <code className="text-2xs font-mono text-text-secondary bg-gray-50 px-1.5 py-0.5 rounded">
                        {key.keyPrefix}...
                      </code>
                    </td>
                    <td><span className="text-xs text-text-main">{key.domain}</span></td>
                    <td><span className="text-xs text-text-secondary">{key.subdomain}</span></td>
                    <td><StatusBadge status={status} /></td>
                    <td>
                      <span className="text-xs text-text-secondary">
                        {key.lastUsedAt ? formatDate(key.lastUsedAt) : 'Never'}
                      </span>
                    </td>
                    <td>
                      <span className="text-xs text-text-secondary">
                        {key.expiresAt ? formatDate(key.expiresAt) : 'Never'}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        {status === 'active' && (
                          <button className="text-2xs text-red-500 hover:underline">Revoke</button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'domains' && (
        <div className="space-y-4">
          {domains.map((domain) => (
            <div key={domain.domain} className="card p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-semibold text-text-main">{domain.domain}</h3>
                <span className="text-2xs text-text-tertiary">{domain.subdomains.length} subdomains</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {domain.subdomains.map((sub) => (
                  <span key={sub} className="chip">{sub}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      <CreateApiKeyModal
        isOpen={showCreateApiKey}
        onClose={() => setShowCreateApiKey(false)}
        defaultTenantId={tenantId}
      />
      <CreateUserModal
        isOpen={showCreateUser}
        onClose={() => setShowCreateUser(false)}
        defaultTenantId={tenantId}
      />
    </div>
  )
}
