'use client'

import { useState, useRef, useEffect } from 'react'
import { X, CaretDown } from '@phosphor-icons/react'
import clsx from 'clsx'

interface MultiSelectProps {
  label: string
  options: string[]
  selected: string[]
  onChange: (selected: string[]) => void
  icon?: React.ReactNode
}

export default function MultiSelect({
  label,
  options,
  selected,
  onChange,
  icon,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((s) => s !== option))
    } else {
      onChange([...selected, option])
    }
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'flex items-center gap-1.5 px-2.5 py-1 rounded-full text-2xs font-medium border transition-all',
          selected.length > 0
            ? 'bg-gray-900 text-white border-gray-900'
            : 'bg-white text-text-secondary border-gray-200 hover:border-gray-300'
        )}
      >
        {icon && <span className="opacity-70">{icon}</span>}
        <span>{label}</span>
        {selected.length > 0 && (
          <span className="bg-white/20 px-1 rounded text-2xs">{selected.length}</span>
        )}
        <CaretDown size={10} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-card-hover z-50 min-w-[160px] py-1">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => toggleOption(option)}
              className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-text-main hover:bg-gray-50 transition-colors"
            >
              <span
                className={clsx(
                  'w-3.5 h-3.5 rounded border flex items-center justify-center flex-shrink-0',
                  selected.includes(option)
                    ? 'bg-gray-900 border-gray-900'
                    : 'border-gray-300'
                )}
              >
                {selected.includes(option) && (
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </span>
              <span>{option}</span>
            </button>
          ))}
          {selected.length > 0 && (
            <div className="border-t border-gray-100 mt-1 pt-1">
              <button
                onClick={() => onChange([])}
                className="w-full px-3 py-1.5 text-xs text-text-secondary hover:text-text-main text-left"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// FilterChips component
interface FilterChipsProps {
  filters: { key: string; values: string[] }[]
  onRemove: (key: string, value: string) => void
  onClearAll: () => void
}

export function FilterChips({ filters, onRemove, onClearAll }: FilterChipsProps) {
  const activeFilters = filters.flatMap((f) =>
    f.values.map((v) => ({ key: f.key, value: v }))
  )

  if (activeFilters.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-gray-100">
      {activeFilters.map((filter) => (
        <span key={`${filter.key}-${filter.value}`} className="chip">
          {filter.key}: <strong>{filter.value}</strong>
          <button
            onClick={() => onRemove(filter.key, filter.value)}
            className="hover:opacity-70"
          >
            <X size={10} />
          </button>
        </span>
      ))}
      <button
        onClick={onClearAll}
        className="text-2xs text-text-secondary hover:text-text-main underline ml-auto"
      >
        Clear All
      </button>
    </div>
  )
}
