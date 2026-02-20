'use client'

import { useState } from 'react'
import { X, Plus, Trash } from '@phosphor-icons/react'
import clsx from 'clsx'

interface User {
  email: string
  role: 'admin' | 'viewer'
}

interface CreateTenantModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (name: string, users: User[]) => void
}

export default function CreateTenantModal({ isOpen, onClose, onCreate }: CreateTenantModalProps) {
  const [name, setName] = useState('')
  const [users, setUsers] = useState<User[]>([{ email: '', role: 'admin' }])

  if (!isOpen) return null

  const handleSubmit = () => {
    if (name.trim()) {
      const validUsers = users.filter((u) => u.email.trim())
      onCreate(name.trim(), validUsers)
      setName('')
      setUsers([{ email: '', role: 'admin' }])
      onClose()
    }
  }

  const addUser = () => {
    setUsers([...users, { email: '', role: 'viewer' }])
  }

  const removeUser = (index: number) => {
    if (users.length > 1) {
      setUsers(users.filter((_, i) => i !== index))
    }
  }

  const updateUser = (index: number, field: keyof User, value: string) => {
    const updated = [...users]
    updated[index] = { ...updated[index], [field]: value }
    setUsers(updated)
  }

  const handleClose = () => {
    setName('')
    setUsers([{ email: '', role: 'admin' }])
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/25 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative bg-white w-[480px] rounded-xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <h2 className="text-[13px] font-semibold text-gray-900">Create Tenant</h2>
          <button onClick={handleClose} className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
            <X size={14} />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-4 overflow-y-auto flex-1">
          {/* Tenant Name */}
          <div>
            <label className="block text-[9px] font-semibold text-gray-400 uppercase tracking-wide mb-1">
              Tenant Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Acme Corp"
              className="w-full px-2.5 py-1.5 rounded-md border border-gray-200 bg-white text-[11px] text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-200 transition-all"
              autoFocus
            />
          </div>

          {/* Users Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[9px] font-semibold text-gray-400 uppercase tracking-wide">
                Users
              </label>
              <button
                type="button"
                onClick={addUser}
                className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <Plus size={10} weight="bold" />
                Add User
              </button>
            </div>

            <div className="space-y-2">
              {users.map((user, index) => (
                <div key={index} className="flex items-center gap-2">
                  {/* Email */}
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) => updateUser(index, 'email', e.target.value)}
                    placeholder="email@example.com"
                    className="flex-1 px-2 py-1.5 rounded border border-gray-200 bg-white text-[10px] text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-300 transition-all"
                  />

                  {/* Role Selection */}
                  <div className="flex items-center gap-0.5 p-0.5 bg-gray-100 rounded">
                    {(['admin', 'viewer'] as const).map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => updateUser(index, 'role', role)}
                        className={clsx(
                          'px-2 py-1 rounded text-[9px] font-medium transition-all',
                          user.role === role
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-400 hover:text-gray-600'
                        )}
                      >
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </button>
                    ))}
                  </div>

                  {/* Remove Button */}
                  {users.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeUser(index)}
                      className="p-1 text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <Trash size={12} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <p className="text-[9px] text-gray-400 mt-2">
              Users will receive an email invite to set their password.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-gray-100 bg-gray-50/50">
          <button
            className="px-2.5 py-1.5 rounded-md text-[11px] font-medium text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="px-2.5 py-1.5 rounded-md text-[11px] font-medium bg-gray-900 text-white hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            onClick={handleSubmit}
            disabled={!name.trim()}
          >
            Create Tenant
          </button>
        </div>
      </div>
    </div>
  )
}
