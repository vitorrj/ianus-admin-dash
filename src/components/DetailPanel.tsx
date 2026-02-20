'use client'

import { X, CaretLeft } from '@phosphor-icons/react'
import clsx from 'clsx'

interface TabConfig {
  id: string
  label: string
  onClick: () => void
}

interface DetailPanelProps {
  isOpen: boolean
  onClose: () => void
  title: string
  subtitle?: string
  children: React.ReactNode
  width?: 'md' | 'lg' | 'xl'
  tabs?: TabConfig[]
  activeTab?: string
  onBack?: () => void
  backLabel?: string
}

export default function DetailPanel({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  width = 'lg',
  tabs,
  activeTab,
  onBack,
  backLabel,
}: DetailPanelProps) {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={clsx(
          'fixed top-0 right-0 h-full bg-white shadow-modal z-50 flex flex-col',
          'transform transition-transform duration-300',
          {
            'w-[480px]': width === 'md',
            'w-[600px]': width === 'lg',
            'w-[800px]': width === 'xl',
          }
        )}
      >
        {/* Tabs */}
        {tabs && tabs.length > 0 && (
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={tab.onClick}
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
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-gray-100 text-text-secondary hover:text-text-main transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <div className="flex items-center gap-2">
              {onBack && (
                <button
                  onClick={onBack}
                  className="p-1.5 -ml-1.5 rounded-lg hover:bg-gray-100 text-text-secondary hover:text-text-main transition-colors"
                  title="Go back"
                >
                  <CaretLeft size={16} weight="bold" />
                </button>
              )}
              <div>
                {backLabel && (
                  <p className="text-2xs text-text-secondary mb-0.5">{backLabel}</p>
                )}
                <h2 className="text-sm font-bold text-text-main">{title}</h2>
                {subtitle && (
                  <p className="text-2xs text-text-secondary mt-0.5">{subtitle}</p>
                )}
              </div>
            </div>
            {!(tabs && tabs.length > 0) && (
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-text-secondary hover:text-text-main transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {children}
        </div>
      </div>
    </>
  )
}
