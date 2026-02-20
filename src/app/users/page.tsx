'use client'

import { useState, useMemo } from 'react'
import { MagnifyingGlass, Plus } from '@phosphor-icons/react'
import StatusBadge from '@/components/StatusBadge'
import MultiSelect from '@/components/MultiSelect'
import CreateUserModal from '@/components/modals/CreateUserModal'
import {
  users,
  tenants,
  getTenantName,
  formatDate,
} from '@/lib/mockData'

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTenants, setSelectedTenants] = useState<string[]>([])
  const [selectedRoles, setSelectedRoles] = useState<string[]>([])
  const [showCreateModal, setShowCreateModal] = useState(false)

  const tenantNames = tenants.map((t) => t.name)
  const roleOptions = ['admin', 'viewer']

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        !searchQuery ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesTenant =
        selectedTenants.length === 0 ||
        selectedTenants.includes(getTenantName(user.tenantId))

      const matchesRole =
        selectedRoles.length === 0 ||
        selectedRoles.includes(user.role)

      return matchesSearch && matchesTenant && matchesRole
    })
  }, [searchQuery, selectedTenants, selectedRoles])

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-base font-bold text-text-main">Users</h1>
          <p className="text-xs text-text-secondary mt-0.5">
            Manage users across all tenants
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn btn-primary"
        >
          <Plus size={14} weight="bold" />
          Create User
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
              placeholder="Search users by username..."
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
            label="Role"
            options={roleOptions}
            selected={selectedRoles}
            onChange={setSelectedRoles}
          />
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Tenant</th>
              <th>Role</th>
              <th>Last Login</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
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
                <td>
                  <span className="text-xs text-text-secondary">
                    {getTenantName(user.tenantId)}
                  </span>
                </td>
                <td>
                  <StatusBadge status={user.role} />
                </td>
                <td>
                  <span className="text-xs text-text-secondary">
                    {user.lastLogin ? formatDate(user.lastLogin) : 'Never'}
                  </span>
                </td>
                <td>
                  <span className="text-xs text-text-secondary">
                    {formatDate(user.createdAt)}
                  </span>
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
        <div className="flex items-center justify-between px-3 py-2 border-t border-gray-100">
          <p className="text-xs text-text-secondary">
            Showing <span className="font-medium">{filteredUsers.length}</span> of{' '}
            <span className="font-medium">{users.length}</span> users
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
      <CreateUserModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </div>
  )
}
