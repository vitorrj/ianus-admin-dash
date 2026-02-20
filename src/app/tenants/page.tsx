'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { MagnifyingGlass, Buildings, UserPlus, Plus, DotsThree, Key, Trash, EnvelopeSimple, PencilSimple, Globe } from '@phosphor-icons/react'
import clsx from 'clsx'
import StatusBadge from '@/components/StatusBadge'
import CreateUserModal from '@/components/modals/CreateUserModal'
import CreateTenantModal from '@/components/modals/CreateTenantModal'
import DetailPanel from '@/components/DetailPanel'
import {
  tenants,
  getUsersByTenantId,
  getApiKeysByTenantId,
  getDomainsByTenantId,
  formatDate,
  getApiKeyStatus,
  type Tenant,
} from '@/lib/mockData'

type StatusFilter = 'all' | 'active' | 'suspended' | 'pending'

export default function TenantsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('active')
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null)
  const [panelTab, setPanelTab] = useState<'users' | 'apikeys'>('users')
  const [showCreateUserModal, setShowCreateUserModal] = useState(false)
  const [showCreateTenantModal, setShowCreateTenantModal] = useState(false)

  const filteredTenants = useMemo(() => {
    let result = tenants
    if (statusFilter !== 'all') {
      result = result.filter((t) => t.status === statusFilter)
    }
    if (searchQuery) {
      result = result.filter((t) =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    return result
  }, [searchQuery, statusFilter])

  const statusCounts = useMemo(() => ({
    all: tenants.length,
    active: tenants.filter((t) => t.status === 'active').length,
    suspended: tenants.filter((t) => t.status === 'suspended').length,
    pending: tenants.filter((t) => t.status === 'pending').length,
  }), [])

  const filters: { id: StatusFilter; label: string }[] = [
    { id: 'active', label: 'Active' },
    { id: 'pending', label: 'Pending' },
    { id: 'suspended', label: 'Suspended' },
    { id: 'all', label: 'All' },
  ]

  return (
    <div className="p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-[13px] font-semibold text-gray-900 tracking-tight">Tenants</h1>
          <p className="text-[11px] text-gray-500 mt-0.5">
            Manage platform tenants and their resources
          </p>
        </div>
        <button
          onClick={() => setShowCreateTenantModal(true)}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] font-medium bg-gray-900 text-white hover:bg-gray-800 transition-colors"
        >
          <Plus size={12} weight="bold" />
          Create Tenant
        </button>
      </div>

      {/* Filters & Search Row */}
      <div className="flex items-center gap-3 mb-4">
        {/* Quick Filters */}
        <div className="flex items-center border-b border-gray-200">
          {filters.map((filter) => {
            const isActive = statusFilter === filter.id
            return (
              <button
                key={filter.id}
                onClick={() => setStatusFilter(filter.id)}
                className={clsx(
                  'px-3 py-2 text-[10px] font-medium transition-all flex items-center gap-1.5 border-b-2 -mb-px',
                  isActive
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-400 hover:text-gray-600'
                )}
              >
                {filter.label}
                <span className={clsx(
                  'text-[9px] tabular-nums px-1.5 py-0.5 rounded-full',
                  isActive ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-400'
                )}>
                  {statusCounts[filter.id]}
                </span>
              </button>
            )
          })}
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-xs">
          <MagnifyingGlass
            size={12}
            className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search tenants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-7 pr-3 py-1.5 rounded-md border border-gray-200 bg-white text-[11px] text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-200 transition-all"
          />
        </div>
      </div>

      {/* Tenants Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-3 py-2 text-[9px] font-semibold text-gray-400 uppercase tracking-wider">Tenant</th>
              <th className="text-left px-3 py-2 text-[9px] font-semibold text-gray-400 uppercase tracking-wider">Status</th>
              <th className="text-left px-3 py-2 text-[9px] font-semibold text-gray-400 uppercase tracking-wider">Users</th>
              <th className="text-left px-3 py-2 text-[9px] font-semibold text-gray-400 uppercase tracking-wider">API Keys</th>
              <th className="text-left px-3 py-2 text-[9px] font-semibold text-gray-400 uppercase tracking-wider">Domains</th>
              <th className="text-left px-3 py-2 text-[9px] font-semibold text-gray-400 uppercase tracking-wider">Created</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredTenants.map((tenant) => {
              const userCount = getUsersByTenantId(tenant.id).length
              const keyCount = getApiKeysByTenantId(tenant.id).length
              const domainCount = getDomainsByTenantId(tenant.id).length

              return (
                <tr
                  key={tenant.id}
                  className="cursor-pointer hover:bg-gray-50/50 transition-colors"
                  onClick={() => setSelectedTenant(tenant)}
                >
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <Buildings size={12} className="text-gray-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-medium text-gray-900 truncate">{tenant.name}</p>
                        <p className="text-[9px] text-gray-400 font-mono truncate">{tenant.id.split('-')[0].toUpperCase()}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2.5">
                    <StatusBadge status={tenant.status} size="sm" />
                  </td>
                  <td className="px-3 py-2.5">
                    <span className="text-[11px] text-gray-600 tabular-nums">{userCount}</span>
                  </td>
                  <td className="px-3 py-2.5">
                    <span className="text-[11px] text-gray-600 tabular-nums">{keyCount}</span>
                  </td>
                  <td className="px-3 py-2.5">
                    <span className="text-[11px] text-gray-600 tabular-nums">{domainCount}</span>
                  </td>
                  <td className="px-3 py-2.5">
                    <span className="text-[10px] text-gray-400">{formatDate(tenant.createdAt)}</span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className="flex items-center justify-between px-3 py-2 border-t border-gray-100 bg-gray-50/50">
          <p className="text-[10px] text-gray-400">
            Showing <span className="font-medium text-gray-600">{filteredTenants.length}</span> of{' '}
            <span className="font-medium text-gray-600">{tenants.length}</span> tenants
          </p>
        </div>
      </div>

      {/* Detail Panel */}
      {selectedTenant && (
        <DetailPanel
          isOpen={!!selectedTenant}
          onClose={() => setSelectedTenant(null)}
          title={selectedTenant.name}
          subtitle={`ID: ${selectedTenant.id}`}
          width="xl"
          tabs={[
            { id: 'users', label: 'Users & Domains', onClick: () => setPanelTab('users') },
            { id: 'apikeys', label: 'API Keys', onClick: () => setPanelTab('apikeys') },
          ]}
          activeTab={panelTab}
        >
          <TenantPanelContent
            tenantId={selectedTenant.id}
            tab={panelTab}
            onAddUser={() => setShowCreateUserModal(true)}
          />
        </DetailPanel>
      )}

      {/* Create User Modal */}
      <CreateUserModal
        isOpen={showCreateUserModal}
        onClose={() => setShowCreateUserModal(false)}
        defaultTenantId={selectedTenant?.id}
      />

      {/* Create Tenant Modal */}
      <CreateTenantModal
        isOpen={showCreateTenantModal}
        onClose={() => setShowCreateTenantModal(false)}
        onCreate={(name, users) => {
          console.log('Create tenant:', name, 'with users:', users)
        }}
      />
    </div>
  )
}

function UserActionsMenu({ onAction }: { onAction: (action: string) => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const actions = [
    { id: 'edit', label: 'Edit User', icon: PencilSimple },
    { id: 'reset-password', label: 'Reset Password', icon: Key },
    { id: 'send-invite', label: 'Resend Invite', icon: EnvelopeSimple },
    { id: 'delete', label: 'Delete User', icon: Trash, danger: true },
  ]

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen(!isOpen)
        }}
        className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <DotsThree size={14} weight="bold" />
      </button>
      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-36 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
          {actions.map((action) => (
            <button
              key={action.id}
              onClick={(e) => {
                e.stopPropagation()
                onAction(action.id)
                setIsOpen(false)
              }}
              className={clsx(
                'w-full flex items-center gap-2 px-3 py-1.5 text-[10px] font-medium transition-colors',
                action.danger
                  ? 'text-red-600 hover:bg-red-50'
                  : 'text-gray-700 hover:bg-gray-50'
              )}
            >
              <action.icon size={12} />
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function TenantPanelContent({
  tenantId,
  tab,
  onAddUser
}: {
  tenantId: string
  tab: string
  onAddUser: () => void
}) {
  const users = getUsersByTenantId(tenantId)
  const keys = getApiKeysByTenantId(tenantId)
  const domains = getDomainsByTenantId(tenantId)

  const handleUserAction = (userId: string, action: string) => {
    console.log(`Action "${action}" on user ${userId}`)
  }

  if (tab === 'users') {
    const admins = users.filter((u) => u.role === 'admin')
    const viewers = users.filter((u) => u.role === 'viewer')

    const UserRow = ({ user }: { user: typeof users[0] }) => (
      <div className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 transition-colors group">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
            <span className="text-[8px] font-semibold text-gray-500">
              {user.username.slice(0, 2).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="text-[11px] font-medium text-gray-900">{user.username}</p>
            <p className="text-[9px] text-gray-400">
              {user.lastLogin ? `Last login: ${formatDate(user.lastLogin)}` : 'Never logged in'}
            </p>
          </div>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <UserActionsMenu onAction={(action) => handleUserAction(user.id, action)} />
        </div>
      </div>
    )

    return (
      <div className="space-y-6">
        {/* Users Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">{users.length} Users</p>
            <button
              onClick={onAddUser}
              className="inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium bg-gray-900 text-white hover:bg-gray-800 transition-colors"
            >
              <UserPlus size={10} weight="bold" />
              Add User
            </button>
          </div>
          <div className="space-y-3">
            {admins.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <StatusBadge status="admin" size="sm" />
                  <span className="text-[9px] text-gray-400">{admins.length}</span>
                </div>
                <div className="space-y-0.5">
                  {admins.map((user) => <UserRow key={user.id} user={user} />)}
                </div>
              </div>
            )}
            {viewers.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <StatusBadge status="viewer" size="sm" />
                  <span className="text-[9px] text-gray-400">{viewers.length}</span>
                </div>
                <div className="space-y-0.5">
                  {viewers.map((user) => <UserRow key={user.id} user={user} />)}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Domains Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Globe size={12} className="text-gray-400" />
            <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">{domains.length} Domains</p>
          </div>
          <div className="space-y-2">
            {domains.map((domain) => (
              <div key={domain.domain} className="p-2.5 rounded-md border border-gray-100 bg-gray-50/30">
                <p className="text-[11px] font-medium text-gray-900 mb-1.5">{domain.domain}</p>
                <div className="flex flex-wrap gap-1">
                  {domain.subdomains.map((sub) => (
                    <span key={sub} className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-white border border-gray-200 text-gray-600">{sub}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (tab === 'apikeys') {
    return (
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">{keys.length} API Keys</p>
        </div>
        <div className="space-y-1.5">
          {keys.map((key) => {
            const status = getApiKeyStatus(key)
            return (
              <div key={key.id} className="p-2 rounded-md border border-gray-100 hover:border-gray-200 transition-colors">
                <div className="flex items-center justify-between mb-0.5">
                  <p className="text-[11px] font-medium text-gray-900">{key.label}</p>
                  <StatusBadge status={status} size="sm" />
                </div>
                <p className="text-[9px] font-mono text-gray-400">{key.keyPrefix}...</p>
                <p className="text-[9px] text-gray-400 mt-0.5">
                  {key.subdomain} · {key.lastUsedAt ? `Last used ${formatDate(key.lastUsedAt)}` : 'Never used'}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return null
}
