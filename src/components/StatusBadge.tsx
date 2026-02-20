import clsx from 'clsx'

type Status = 'active' | 'revoked' | 'expired' | 'suspended' | 'pending' | 'admin' | 'viewer'

interface StatusBadgeProps {
  status: Status
  size?: 'sm' | 'md'
  className?: string
}

const statusStyles: Record<Status, string> = {
  active: 'bg-emerald-50 text-emerald-600',
  revoked: 'bg-red-50 text-red-600',
  expired: 'bg-amber-50 text-amber-600',
  suspended: 'bg-red-50 text-red-600',
  pending: 'bg-gray-100 text-gray-500',
  admin: 'bg-violet-50 text-violet-600',
  viewer: 'bg-sky-50 text-sky-600',
}

const sizeStyles = {
  sm: 'px-1.5 py-0.5 text-[9px] rounded',
  md: 'px-2 py-0.5 text-[10px] rounded-md',
}

export default function StatusBadge({ status, size = 'md', className }: StatusBadgeProps) {
  return (
    <span className={clsx(
      'font-medium uppercase tracking-wide',
      statusStyles[status],
      sizeStyles[size],
      className
    )}>
      {status}
    </span>
  )
}
