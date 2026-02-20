'use client'

import { useState, useMemo } from 'react'
import { MagnifyingGlass, Plus, Faders } from '@phosphor-icons/react'
import clsx from 'clsx'
import StatusBadge from '@/components/StatusBadge'
import MultiSelect from '@/components/MultiSelect'
import CreateApiKeyModal from '@/components/modals/CreateApiKeyModal'
import {
  apiKeys,
  tenants,
  getTenantName,
  getApiKeyStatus,
  formatDate,
  type ApiKey,
} from '@/lib/mockData'

export default function ApiKeysPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTenants, setSelectedTenants] = useState<string[]>([])
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  const [showCreateModal, setShowCreateModal] = useState(false)

  const tenantNames = tenants.map((t) => t.name)
  const statusOptions = ['active', 'revoked', 'expired']

  const filteredKeys = useMemo(() => {
    return apiKeys.filter((key) => {
      const matchesSearch =
        !searchQuery ||
        key.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        key.keyPrefix.toLowerCase().includes(searchQuery.toLowerCase()) ||
        key.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
        key.subdomain.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesTenant =
        selectedTenants.length === 0 ||
        selectedTenants.includes(getTenantName(key.tenantId))

      const status = getApiKeyStatus(key)
      const matchesStatus =
        selectedStatuses.length === 0 ||
        selectedStatuses.includes(status)

      return matchesSearch && matchesTenant && matchesStatus
    })
  }, [searchQuery, selectedTenants, selectedStatuses])

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-base font-bold text-text-main">API Keys</h1>
          <p className="text-xs text-text-secondary mt-0.5">
            Manage API keys across all tenants
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn btn-primary"
        >
          <Plus size={14} weight="bold" />
          Create API Key
        </button>
      </div>

      {/* Filters */}
      <div className="card p-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <MagnifyingGlass
              size={14}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-secondary"
            />
            <input
              type="text"
              placeholder="Search by label, key prefix, domain..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-8"
            />
          </div>
          <MultiSelect
            label="Tenant"
            options={tenantNames}
            selected={selectedTenants}
            onChange={setSelectedTenants}
          />
          <MultiSelect
            label="Status"
            options={statusOptions}
            selected={selectedStatuses}
            onChange={setSelectedStatuses}
          />
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Key Prefix</th>
              <th>Label</th>
              <th>Tenant</th>
              <th>Domain</th>
              <th>Subdomain</th>
              <th>Status</th>
              <th>Last Used</th>
              <th>Expires</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredKeys.map((key) => {
              const status = getApiKeyStatus(key)
              const tenantName = getTenantName(key.tenantId)

              return (
                <tr key={key.id}>
                  <td>
                    <code className="text-2xs font-mono text-text-main bg-gray-50 px-1.5 py-0.5 rounded">
                      {key.keyPrefix}...
                    </code>
                  </td>
                  <td>
                    <p className="text-xs font-medium text-text-main">{key.label}</p>
                  </td>
                  <td>
                    <span className="text-xs text-text-secondary">{tenantName}</span>
                  </td>
                  <td>
                    <span className="text-xs text-text-main">{key.domain}</span>
                  </td>
                  <td>
                    <span className="text-xs text-text-secondary">{key.subdomain}</span>
                  </td>
                  <td>
                    <StatusBadge status={status} />
                  </td>
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
                    <span className="text-xs text-text-secondary">
                      {formatDate(key.createdAt)}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-1">
                      {status === 'active' && (
                        <>
                          <button className="text-2xs text-primary hover:underline">Regenerate</button>
                          <span className="text-text-tertiary">·</span>
                          <button className="text-2xs text-red-500 hover:underline">Revoke</button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className="flex items-center justify-between px-3 py-2 border-t border-gray-100">
          <p className="text-xs text-text-secondary">
            Showing <span className="font-medium">{filteredKeys.length}</span> of{' '}
            <span className="font-medium">{apiKeys.length}</span> API keys
          </p>
          <div className="flex items-center gap-2">
            <button className="px-2 py-1 text-xs text-text-secondary hover:text-text-main">
              Previous
            </button>
            <span className="text-xs text-text-secondary">Page 1 of 1</span>
            <button className="px-2 py-1 text-xs text-gray-900 font-medium hover:text-gray-600">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Create Modal */}
      <CreateApiKeyModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </div>
  )
}
