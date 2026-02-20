'use client'

import { useState } from 'react'
import { X } from '@phosphor-icons/react'

interface CreateTenantModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (name: string) => void
}

export default function CreateTenantModal({ isOpen, onClose, onCreate }: CreateTenantModalProps) {
  const [name, setName] = useState('')

  if (!isOpen) return null

  const handleSubmit = () => {
    if (name.trim()) {
      onCreate(name.trim())
      setName('')
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/25 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-[520px] rounded-modal shadow-modal overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-text-main">Create Tenant</h2>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-3">
          <div>
            <label className="block text-[10px] font-semibold text-text-secondary uppercase tracking-wide mb-1">
              Tenant Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Acme Corp"
              className="input"
              autoFocus
            />
          </div>
          <p className="text-2xs text-text-tertiary">
            A new tenant will be created with an empty user and API key configuration. You can add users, API keys, and domains after creation.
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 p-4 border-t border-gray-100">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
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
