'use client'

import clsx from 'clsx'

interface KPICardProps {
  label: string
  value: string | number
  unit?: string
  trend?: {
    value: string
    direction: 'up' | 'down' | 'neutral'
    label?: string
  }
  icon?: React.ReactNode
  iconBgColor?: string
  valueColor?: string
  hoverColor?: 'emerald' | 'amber' | 'red' | 'blue' | 'gray' | 'purple'
}

const hoverColorMap = {
  emerald: {
    border: 'hover:border-emerald-400/40',
    shadow: 'hover:shadow-[0_4px_12px_rgba(16,185,129,0.1)]',
    gradient: 'from-emerald-500 to-emerald-400',
  },
  amber: {
    border: 'hover:border-amber-400/40',
    shadow: 'hover:shadow-[0_4px_12px_rgba(245,158,11,0.1)]',
    gradient: 'from-amber-500 to-amber-400',
  },
  red: {
    border: 'hover:border-red-400/40',
    shadow: 'hover:shadow-[0_4px_12px_rgba(239,68,68,0.1)]',
    gradient: 'from-red-500 to-red-400',
  },
  blue: {
    border: 'hover:border-blue-400/40',
    shadow: 'hover:shadow-[0_4px_12px_rgba(59,130,246,0.1)]',
    gradient: 'from-blue-500 to-blue-400',
  },
  gray: {
    border: 'hover:border-gray-400/40',
    shadow: 'hover:shadow-[0_4px_12px_rgba(107,114,128,0.1)]',
    gradient: 'from-gray-500 to-gray-400',
  },
  purple: {
    border: 'hover:border-purple-400/40',
    shadow: 'hover:shadow-[0_4px_12px_rgba(139,92,246,0.1)]',
    gradient: 'from-purple-500 to-purple-400',
  },
}

export default function KPICard({
  label,
  value,
  unit,
  trend,
  icon,
  iconBgColor = 'bg-gray-100',
  valueColor = 'text-gray-900',
  hoverColor = 'gray',
}: KPICardProps) {
  const colors = hoverColorMap[hoverColor]

  return (
    <div
      className={clsx(
        'group relative bg-white rounded-xl border border-gray-200 p-3 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 overflow-hidden',
        colors.border,
        colors.shadow
      )}
    >
      <div
        className={clsx(
          'absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300',
          colors.gradient
        )}
      />
      <div className="relative">
        {/* Row 1: Icon + Label */}
        <div className="flex items-center gap-2 h-6 mb-1.5">
          <div
            className={clsx(
              'w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0',
              icon ? iconBgColor : 'bg-transparent'
            )}
          >
            {icon}
          </div>
          <span className="text-2xs font-medium text-gray-400 uppercase tracking-wide">
            {label}
          </span>
        </div>
        {/* Row 2: Value */}
        <p className={clsx('text-lg font-bold leading-none h-6 flex items-center', valueColor)}>
          {value}
          {unit && (
            <span className="text-xs font-medium text-gray-400 ml-0.5">{unit}</span>
          )}
        </p>
        {/* Row 3: Trend */}
        <p className="text-2xs text-gray-400 h-4 mt-1">
          {trend ? (
            <>
              <span
                className={clsx(
                  'font-semibold',
                  trend.direction === 'up' && 'text-emerald-500',
                  trend.direction === 'down' && 'text-red-500',
                  trend.direction === 'neutral' && 'text-gray-500'
                )}
              >
                {trend.value}
              </span>
              {trend.label && <span className="text-gray-400"> {trend.label}</span>}
            </>
          ) : (
            '\u00A0'
          )}
        </p>
      </div>
    </div>
  )
}
