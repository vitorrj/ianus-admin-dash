'use client'

import { useState, useMemo } from 'react'
import { MagnifyingGlass, Faders } from '@phosphor-icons/react'
import clsx from 'clsx'
import MultiSelect from '@/components/MultiSelect'
import {
  auditLog,
  tenants,
  formatDateTime,
  timeAgo,
  type AuditActionType,
} from '@/lib/mockData'

const actionLabels: Record<AuditActionType, string> = {
  'tenant.created': 'Created tenant',
  'tenant.updated': 'Updated tenant',
  'tenant.suspended': 'Suspended tenant',
  'user.created': 'Created user',
  'user.updated': 'Updated user',
  'user.deleted': 'Deleted user',
  'apikey.created': 'Created API key',
  'apikey.revoked': 'Revoked API key',
  'apikey.regenerated': 'Regenerated API key',
  'domain.added': 'Added domain',
  'domain.removed': 'Removed domain',
  'settings.updated': 'Updated settings',
  'user.login': 'User login',
}

const actionColors: Record<string, string> = {
  tenant: 'bg-blue-100 text-blue-700',
  user: 'bg-purple-100 text-purple-700',
  apikey: 'bg-emerald-100 text-emerald-700',
  domain: 'bg-amber-100 text-amber-700',
  settings: 'bg-gray-100 text-gray-700',
}

const resourceTypes = ['tenant', 'user', 'apikey', 'domain', 'settings']
const actionTypes = [
  'tenant.created',
  'tenant.updated',
  'tenant.suspended',
  'user.created',
  'user.updated',
  'user.deleted',
  'apikey.created',
  'apikey.revoked',
  'apikey.regenerated',
  'domain.added',
  'domain.removed',
  'settings.updated',
  'user.login',
]

export default function AuditLogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTenants, setSelectedTenants] = useState<string[]>([])
  const [selectedResourceTypes, setSelectedResourceTypes] = useState<string[]>([])
  const [selectedActions, setSelectedActions] = useState<string[]>([])

  const tenantNames = tenants.map((t) => t.name)

  const filteredLog = useMemo(() => {
    return auditLog.filter((entry) => {
      const matchesSearch =
        !searchQuery ||
        entry.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.resourceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.details.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesTenant =
        selectedTenants.length === 0 ||
        (entry.tenantName && selectedTenants.includes(entry.tenantName))

      const matchesResourceType =
        selectedResourceTypes.length === 0 ||
        selectedResourceTypes.includes(entry.resourceType)

      const matchesAction =
        selectedActions.length === 0 ||
        selectedActions.includes(entry.action)

      return matchesSearch && matchesTenant && matchesResourceType && matchesAction
    })
  }, [searchQuery, selectedTenants, selectedResourceTypes, selectedActions])

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-base font-bold text-text-main">Audit Log</h1>
          <p className="text-xs text-text-secondary mt-0.5">
            Track all admin actions across the platform
          </p>
        </div>
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
              placeholder="Search by user, resource, or details..."
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
            label="Resource"
            options={resourceTypes}
            selected={selectedResourceTypes}
            onChange={setSelectedResourceTypes}
          />
          <MultiSelect
            label="Action"
            options={actionTypes}
            selected={selectedActions}
            onChange={setSelectedActions}
          />
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Time</th>
              <th>User</th>
              <th>Action</th>
              <th>Resource</th>
              <th>Tenant</th>
              <th>Details</th>
              <th>IP Address</th>
            </tr>
          </thead>
          <tbody>
            {filteredLog.map((entry) => (
              <tr key={entry.id}>
                <td>
                  <p className="text-2xs font-medium text-text-main">{timeAgo(entry.timestamp)}</p>
                  <p className="text-2xs text-text-tertiary">{formatDateTime(entry.timestamp)}</p>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
                      <span className="text-2xs font-bold text-text-secondary">
                        {entry.username.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-xs font-medium text-text-main">{entry.username}</span>
                  </div>
                </td>
                <td>
                  <span
                    className={clsx(
                      'badge',
                      actionColors[entry.resourceType] || 'bg-gray-100 text-gray-600'
                    )}
                  >
                    {actionLabels[entry.action] || entry.action}
                  </span>
                </td>
                <td>
                  <p className="text-xs text-text-main">{entry.resourceName}</p>
                  <p className="text-2xs text-text-tertiary">{entry.resourceType}</p>
                </td>
                <td>
                  <span className="text-xs text-text-secondary">
                    {entry.tenantName || '—'}
                  </span>
                </td>
                <td>
                  <p className="text-xs text-text-secondary max-w-[200px] truncate">
                    {entry.details}
                  </p>
                </td>
                <td>
                  <code className="text-2xs font-mono text-text-tertiary">{entry.ipAddress}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between px-3 py-2 border-t border-gray-100">
          <p className="text-xs text-text-secondary">
            Showing <span className="font-medium">{filteredLog.length}</span> of{' '}
            <span className="font-medium">{auditLog.length}</span> entries
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
    </div>
  )
}
