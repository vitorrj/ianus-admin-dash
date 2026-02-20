'use client'

import { useState } from 'react'
import { X, Copy, Check } from '@phosphor-icons/react'
import { tenants } from '@/lib/mockData'

interface CreateApiKeyModalProps {
  isOpen: boolean
  onClose: () => void
  defaultTenantId?: string
}

export default function CreateApiKeyModal({ isOpen, onClose, defaultTenantId }: CreateApiKeyModalProps) {
  const [tenantId, setTenantId] = useState(defaultTenantId || '')
  const [domain, setDomain] = useState('')
  const [subdomain, setSubdomain] = useState('')
  const [label, setLabel] = useState('')
  const [expiresIn, setExpiresIn] = useState('90d')
  const [createdKey, setCreatedKey] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const handleCreate = () => {
    // Simulate API key creation
    const fakeKey = `kai_${Array.from({ length: 32 }, () => '0123456789abcdef'[Math.floor(Math.random() * 16)]).join('')}`
    setCreatedKey(fakeKey)
  }

  const handleCopy = () => {
    if (createdKey) {
      navigator.clipboard.writeText(createdKey)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleClose = () => {
    setCreatedKey(null)
    setTenantId(defaultTenantId || '')
    setDomain('')
    setSubdomain('')
    setLabel('')
    setExpiresIn('90d')
    setCopied(false)
    onClose()
  }

  // Success state: show the key once
  if (createdKey) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/25 backdrop-blur-sm" onClick={handleClose} />
        <div className="relative bg-white w-[520px] rounded-modal shadow-modal overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-text-main">API Key Created</h2>
            <button onClick={handleClose} className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
              <X size={16} />
            </button>
          </div>
          <div className="p-4 space-y-3">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-xs font-semibold text-yellow-800 mb-1">Save this key now</p>
              <p className="text-2xs text-yellow-700">
                This is the only time you will see the full API key. Copy it and store it securely.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <code className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs font-mono text-text-main break-all">
                {createdKey}
              </code>
              <button
                onClick={handleCopy}
                className="btn btn-secondary flex-shrink-0"
              >
                {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 p-4 border-t border-gray-100">
            <button className="btn btn-primary" onClick={handleClose}>
              Done
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/25 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative bg-white w-[520px] rounded-modal shadow-modal overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-text-main">Create API Key</h2>
          <button onClick={handleClose} className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
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
              Label
            </label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="e.g., Production API"
              className="input"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-semibold text-text-secondary uppercase tracking-wide mb-1">
                Domain
              </label>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="e.g., acme.com"
                className="input"
              />
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-text-secondary uppercase tracking-wide mb-1">
                Subdomain
              </label>
              <input
                type="text"
                value={subdomain}
                onChange={(e) => setSubdomain(e.target.value)}
                placeholder="e.g., api.acme.com"
                className="input"
              />
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-text-secondary uppercase tracking-wide mb-1">
              Expiration
            </label>
            <div className="flex items-center gap-2">
              {['30d', '90d', '180d', '1y', 'Never'].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setExpiresIn(opt)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    expiresIn === opt
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 p-4 border-t border-gray-100">
          <button className="btn btn-secondary" onClick={handleClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleCreate}
            disabled={!tenantId || !domain || !subdomain || !label}
          >
            Create API Key
          </button>
        </div>
      </div>
    </div>
  )
}
