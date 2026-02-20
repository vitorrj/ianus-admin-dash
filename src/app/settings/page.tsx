'use client'

import { useState } from 'react'
import clsx from 'clsx'

interface SettingSection {
  title: string
  description: string
  children: React.ReactNode
}

function SettingSection({ title, description, children }: SettingSection) {
  return (
    <div className="card p-4 mb-4">
      <div className="mb-3">
        <h3 className="text-xs font-semibold text-text-main">{title}</h3>
        <p className="text-2xs text-text-secondary mt-0.5">{description}</p>
      </div>
      {children}
    </div>
  )
}

function ToggleSwitch({ enabled, onChange }: { enabled: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={clsx(
        'relative w-9 h-5 rounded-full transition-colors duration-200',
        enabled ? 'bg-gray-900' : 'bg-gray-300'
      )}
    >
      <span
        className={clsx(
          'absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200',
          enabled ? 'translate-x-4' : 'translate-x-0.5'
        )}
      />
    </button>
  )
}

export default function SettingsPage() {
  const [jwtExpiration, setJwtExpiration] = useState('12h')
  const [apiKeyDefaultExpiry, setApiKeyDefaultExpiry] = useState('90d')
  const [defaultRateLimit, setDefaultRateLimit] = useState('5000')
  const [enforceRateLimit, setEnforceRateLimit] = useState(true)
  const [requireMfa, setRequireMfa] = useState(false)
  const [auditRetention, setAuditRetention] = useState('90d')
  const [autoRevokeExpired, setAutoRevokeExpired] = useState(true)
  const [notifyOnKeyCreation, setNotifyOnKeyCreation] = useState(true)

  return (
    <div className="p-6 max-w-[800px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-base font-bold text-text-main">Settings</h1>
          <p className="text-xs text-text-secondary mt-0.5">
            Configure global platform settings
          </p>
        </div>
        <button className="btn btn-primary">Save Changes</button>
      </div>

      {/* Authentication */}
      <SettingSection
        title="Authentication"
        description="Configure JWT and authentication settings"
      >
        <div className="space-y-3">
          <div>
            <label className="block text-[10px] font-semibold text-text-secondary uppercase tracking-wide mb-1">
              JWT Token Expiration
            </label>
            <div className="flex items-center gap-2">
              {['1h', '6h', '12h', '24h', '48h', '7d'].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setJwtExpiration(opt)}
                  className={clsx(
                    'px-3 py-1 rounded-lg text-xs font-medium transition-all',
                    jwtExpiration === opt
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                  )}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-xs font-medium text-text-main">Require MFA</p>
              <p className="text-2xs text-text-secondary">Require multi-factor authentication for all admin users</p>
            </div>
            <ToggleSwitch enabled={requireMfa} onChange={setRequireMfa} />
          </div>
        </div>
      </SettingSection>

      {/* API Key Defaults */}
      <SettingSection
        title="API Key Defaults"
        description="Default settings for new API keys"
      >
        <div className="space-y-3">
          <div>
            <label className="block text-[10px] font-semibold text-text-secondary uppercase tracking-wide mb-1">
              Default Expiration
            </label>
            <div className="flex items-center gap-2">
              {['30d', '60d', '90d', '180d', '1y', 'Never'].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setApiKeyDefaultExpiry(opt)}
                  className={clsx(
                    'px-3 py-1 rounded-lg text-xs font-medium transition-all',
                    apiKeyDefaultExpiry === opt
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                  )}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-xs font-medium text-text-main">Auto-revoke Expired Keys</p>
              <p className="text-2xs text-text-secondary">Automatically revoke API keys when they expire</p>
            </div>
            <ToggleSwitch enabled={autoRevokeExpired} onChange={setAutoRevokeExpired} />
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-xs font-medium text-text-main">Notify on Key Creation</p>
              <p className="text-2xs text-text-secondary">Send notification when a new API key is created</p>
            </div>
            <ToggleSwitch enabled={notifyOnKeyCreation} onChange={setNotifyOnKeyCreation} />
          </div>
        </div>
      </SettingSection>

      {/* Rate Limiting */}
      <SettingSection
        title="Rate Limiting"
        description="Configure default rate limits for API requests"
      >
        <div className="space-y-3">
          <div>
            <label className="block text-[10px] font-semibold text-text-secondary uppercase tracking-wide mb-1">
              Default Rate Limit (requests/minute)
            </label>
            <input
              type="number"
              value={defaultRateLimit}
              onChange={(e) => setDefaultRateLimit(e.target.value)}
              className="input w-48"
            />
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-xs font-medium text-text-main">Enforce Rate Limiting</p>
              <p className="text-2xs text-text-secondary">Apply rate limits to all API key requests</p>
            </div>
            <ToggleSwitch enabled={enforceRateLimit} onChange={setEnforceRateLimit} />
          </div>
        </div>
      </SettingSection>

      {/* Audit Log */}
      <SettingSection
        title="Audit Log"
        description="Configure audit log retention and behavior"
      >
        <div>
          <label className="block text-[10px] font-semibold text-text-secondary uppercase tracking-wide mb-1">
            Log Retention Period
          </label>
          <div className="flex items-center gap-2">
            {['30d', '60d', '90d', '180d', '1y', 'Forever'].map((opt) => (
              <button
                key={opt}
                onClick={() => setAuditRetention(opt)}
                className={clsx(
                  'px-3 py-1 rounded-lg text-xs font-medium transition-all',
                  auditRetention === opt
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                )}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </SettingSection>

      {/* Danger Zone */}
      <div className="card p-4 border-red-200">
        <h3 className="text-xs font-semibold text-red-600 mb-1">Danger Zone</h3>
        <p className="text-2xs text-text-secondary mb-3">
          These actions are destructive and cannot be undone.
        </p>
        <div className="flex items-center gap-2">
          <button className="btn btn-danger">Purge Audit Logs</button>
          <button className="btn btn-danger">Reset All Settings</button>
        </div>
      </div>
    </div>
  )
}
