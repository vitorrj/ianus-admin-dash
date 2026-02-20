'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import clsx from 'clsx'

// Custom SVG icons matching reference project (15x15, strokeWidth 2.2)
const icons = {
  home: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  tenants: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 21V9h6v12" />
      <path d="M3 9h18" />
    </svg>
  ),
  keys: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.78 7.78 5.5 5.5 0 017.78-7.78zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
  ),
  users: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  audit: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  settings: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  ),
  caret: () => (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  search: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
}

interface NavItem {
  label: string
  href: string
  icon: keyof typeof icons
  children?: { label: string; href: string }[]
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/', icon: 'home' },
  { label: 'Tenants', href: '/tenants', icon: 'tenants' },
  { label: 'API Keys', href: '/api-keys', icon: 'keys' },
  { label: 'Users', href: '/users', icon: 'users' },
  { label: 'Audit Log', href: '/audit-log', icon: 'audit' },
  { label: 'Settings', href: '/settings', icon: 'settings' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>(['Tenants'])

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    )
  }

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  const Icon = ({ name }: { name: keyof typeof icons }) => {
    const IconComponent = icons[name]
    return <IconComponent />
  }

  return (
    <aside
      className="w-[235px] h-screen sticky top-0 p-2.5"
      style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
    >
      <div className="h-full bg-white rounded-2xl shadow-lg flex flex-col px-3 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-2 mb-5">
          <div className="w-7 h-7 bg-gray-900 rounded-lg flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#7ce4ed" />
              <path d="M2 17l10 5 10-5" stroke="#7ce4ed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 12l10 5 10-5" stroke="#7ce4ed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span style={{ fontSize: 14, fontWeight: 700 }} className="text-gray-900">Kairal</span>
          <span className="text-2xs text-text-tertiary font-medium ml-auto">Admin</span>
        </div>

        {/* Search */}
        <div className="relative px-1 mb-4">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon name="search" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-8 pr-10 py-1.5 rounded-lg bg-gray-50 border border-gray-100 text-xs text-text-main placeholder:text-gray-400 outline-none hover:bg-gray-100 hover:border-gray-200 focus:bg-white focus:border-gray-300 transition-all"
            style={{ fontSize: 11 }}
          />
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
            <span className="text-2xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded font-mono">⌘K</span>
          </div>
        </div>

        {/* Menu Label */}
        <div className="px-2 mb-2">
          <span
            className="text-gray-400 uppercase"
            style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.1em' }}
          >
            Menu
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-0.5 px-1">
          {navItems.map((item) => {
            const hasChildren = item.children && item.children.length > 0
            const isExpanded = expandedItems.includes(item.label)
            const active = isActive(item.href)

            return (
              <div key={item.label}>
                {hasChildren ? (
                  <button
                    onClick={() => toggleExpand(item.label)}
                    className={clsx(
                      'w-full flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all duration-150',
                      active
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                    )}
                    style={{ fontSize: 11, fontWeight: active ? 700 : 500 }}
                  >
                    <span className="flex-shrink-0">
                      <Icon name={item.icon} />
                    </span>
                    <span className="flex-1 text-left">{item.label}</span>
                    <span
                      className={clsx(
                        'transition-transform duration-200',
                        isExpanded && 'rotate-90'
                      )}
                    >
                      <Icon name="caret" />
                    </span>
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={clsx(
                      'flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all duration-150',
                      active
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                    )}
                    style={{ fontSize: 11, fontWeight: active ? 700 : 500 }}
                  >
                    <span className="flex-shrink-0">
                      <Icon name={item.icon} />
                    </span>
                    <span>{item.label}</span>
                  </Link>
                )}

                {/* Children */}
                {hasChildren && isExpanded && (
                  <div className="ml-6 mt-0.5 space-y-0.5">
                    {item.children!.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={clsx(
                          'block px-2 py-1 rounded-md transition-all duration-150',
                          pathname === child.href
                            ? 'text-gray-900 bg-gray-50'
                            : 'text-gray-400 hover:text-gray-700 hover:bg-gray-50'
                        )}
                        style={{ fontSize: 11, fontWeight: pathname === child.href ? 600 : 400 }}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        {/* User Profile */}
        <div className="px-2 pt-3 border-t border-gray-100 mt-auto">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white text-2xs font-bold">
              SA
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-text-main truncate">Super Admin</p>
              <p className="text-2xs text-text-tertiary truncate">Platform Admin</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
