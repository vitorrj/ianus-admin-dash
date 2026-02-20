'use client'

import { Buildings, Key, Users as UsersIcon, ChartLineUp, Lightning } from '@phosphor-icons/react'
import KPICard from '@/components/KPICard'
import StatusBadge from '@/components/StatusBadge'
import {
  getDashboardStats,
  tenants,
  auditLog,
  apiRequestsByTenant,
  chartLabels,
  chartColors,
  getUsersByTenantId,
  getApiKeysByTenantId,
  formatDate,
  formatDateTime,
  timeAgo,
  getTenantName,
} from '@/lib/mockData'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        usePointStyle: true,
        pointStyle: 'circle',
        padding: 16,
        font: { size: 10 },
        color: '#555555',
      },
    },
    tooltip: {
      backgroundColor: '#1f2937',
      padding: 12,
      titleFont: { size: 12, weight: 'normal' as const },
      bodyFont: { size: 11 },
      cornerRadius: 6,
      borderColor: '#374151',
      borderWidth: 1,
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: '#9ca3af', font: { size: 10 } },
      border: { display: false },
    },
    y: {
      border: { display: false },
      grid: { color: '#f3f4f6', drawTicks: false },
      ticks: { color: '#9ca3af', font: { size: 10 }, padding: 8 },
    },
  },
  elements: {
    point: { radius: 0, hoverRadius: 3 },
    line: { tension: 0.3 },
  },
}

const actionLabels: Record<string, string> = {
  'tenant.created': 'Created tenant',
  'tenant.updated': 'Updated tenant',
  'tenant.suspended': 'Suspended tenant',
  'user.created': 'Created user',
  'user.updated': 'Updated user',
  'user.deleted': 'Deleted user',
  'apikey.created': 'Created API key',
  'apikey.revoked': 'Revoked API key',
  'apikey.regenerated': 'Regenerated API key',
  'domain.added': 'Added domain',
  'domain.removed': 'Removed domain',
  'settings.updated': 'Updated settings',
  'user.login': 'User login',
}

export default function DashboardHome() {
  const stats = getDashboardStats()

  const chartData = {
    labels: chartLabels,
    datasets: apiRequestsByTenant.map((tenant, i) => ({
      label: tenant.tenantName,
      data: tenant.data,
      borderColor: chartColors[i % chartColors.length],
      backgroundColor: `${chartColors[i % chartColors.length]}15`,
      borderWidth: 1.5,
      fill: true,
    })),
  }

  const recentActivity = auditLog.slice(0, 10)

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-base font-bold text-text-main">Dashboard</h1>
          <p className="text-xs text-text-secondary mt-0.5">Platform overview and recent activity</p>
        </div>
        <div className="live-indicator">
          <span className="live-dot" />
          Live
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <KPICard
          label="Total Tenants"
          value={stats.totalTenants}
          icon={<Buildings size={14} className="text-blue-600" weight="bold" />}
          iconBgColor="bg-blue-100"
          hoverColor="blue"
          trend={{ value: '+1', direction: 'up', label: 'this month' }}
        />
        <KPICard
          label="Active API Keys"
          value={stats.activeApiKeys}
          icon={<Key size={14} className="text-emerald-600" weight="bold" />}
          iconBgColor="bg-emerald-100"
          hoverColor="emerald"
          trend={{ value: `${stats.totalApiKeys} total`, direction: 'neutral' }}
        />
        <KPICard
          label="Total Users"
          value={stats.totalUsers}
          icon={<UsersIcon size={14} className="text-purple-600" weight="bold" />}
          iconBgColor="bg-purple-100"
          hoverColor="purple"
          trend={{ value: '+3', direction: 'up', label: 'this month' }}
        />
        <KPICard
          label="API Requests Today"
          value={stats.apiRequestsToday.toLocaleString()}
          icon={<ChartLineUp size={14} className="text-amber-600" weight="bold" />}
          iconBgColor="bg-amber-100"
          hoverColor="amber"
          trend={{ value: stats.apiRequestsTrend, direction: 'up', label: 'vs yesterday' }}
        />
      </div>

      {/* Chart + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* API Request Volume Chart */}
        <div className="lg:col-span-2 card p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-sm font-semibold text-text-main">API Request Volume</h2>
              <p className="text-2xs text-text-secondary mt-0.5">Requests by tenant over the last 24 hours</p>
            </div>
          </div>
          <div className="h-64">
            <Line options={chartOptions} data={chartData} />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-text-main">Recent Activity</h2>
            <Lightning size={14} className="text-text-tertiary" />
          </div>
          <div className="space-y-3">
            {recentActivity.map((entry) => (
              <div key={entry.id} className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-2xs font-bold text-text-secondary">
                    {entry.username.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-2xs text-text-main">
                    <span className="font-semibold">{entry.username}</span>{' '}
                    <span className="text-text-secondary">
                      {actionLabels[entry.action] || entry.action}
                    </span>
                  </p>
                  <p className="text-2xs text-text-tertiary truncate">
                    {entry.resourceName}
                    {entry.tenantName && ` · ${entry.tenantName}`}
                  </p>
                  <p className="text-2xs text-text-tertiary">{timeAgo(entry.timestamp)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tenants Overview Table */}
      <div className="mt-6">
        <h2 className="text-sm font-semibold text-text-main mb-3">Tenants Overview</h2>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Tenant</th>
                <th>Status</th>
                <th>Users</th>
                <th>API Keys</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {tenants.map((tenant) => {
                const userCount = getUsersByTenantId(tenant.id).length
                const keyCount = getApiKeysByTenantId(tenant.id).length
                return (
                  <tr key={tenant.id}>
                    <td>
                      <p className="text-xs font-semibold text-text-main">{tenant.name}</p>
                    </td>
                    <td>
                      <StatusBadge status={tenant.status} />
                    </td>
                    <td>
                      <span className="text-xs font-medium text-text-main">{userCount}</span>
                    </td>
                    <td>
                      <span className="text-xs font-medium text-text-main">{keyCount}</span>
                    </td>
                    <td>
                      <span className="text-xs text-text-secondary">{formatDate(tenant.createdAt)}</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
