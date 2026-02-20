'use client'

import { useState } from 'react'
import { X } from '@phosphor-icons/react'
import { tenants } from '@/lib/mockData'

interface CreateUserModalProps {
  isOpen: boolean
  onClose: () => void
  defaultTenantId?: string
}

export default function CreateUserModal({ isOpen, onClose, defaultTenantId }: CreateUserModalProps) {
  const [tenantId, setTenantId] = useState(defaultTenantId || '')
  const [username, setUsername] = useState('')
  const [role, setRole] = useState<'admin' | 'viewer'>('viewer')
  const [password, setPassword] = useState('')

  if (!isOpen) return null

  const handleSubmit = () => {
    // Mock create
    setUsername('')
    setPassword('')
    setRole('viewer')
    setTenantId(defaultTenantId || '')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/25 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-[520px] rounded-modal shadow-modal overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-text-main">Create User</h2>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-3">
          {!defaultTenantId && (
            <div>
              <label className="block text-[10px] font-semibold text-text-secondary uppercase tracking-wide mb-1">
                Tenant
              </label>
              <select
                value={tenantId}
                onChange={(e) => setTenantId(e.target.value)}
                className="select"
              >
                <option value="">Select tenant...</option>
                {tenants.filter((t) => t.status === 'active').map((t) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
          )}
          <div>
            <label className="block text-[10px] font-semibold text-text-secondary uppercase tracking-wide mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g., john.admin"
              className="input"
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-text-secondary uppercase tracking-wide mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 8 characters"
              className="input"
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-text-secondary uppercase tracking-wide mb-1">
              Role
            </label>
            <div className="flex items-center gap-2">
              {(['admin', 'viewer'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    role === r
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                  }`}
                >
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </button>
              ))}
            </div>
            <p className="text-2xs text-text-tertiary mt-1.5">
              {role === 'admin'
                ? 'Admins can manage users, API keys, and tenant settings.'
                : 'Viewers have read-only access to the dashboard.'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 p-4 border-t border-gray-100">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={!tenantId || !username || !password}
          >
            Create User
          </button>
        </div>
      </div>
    </div>
  )
}
