import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import Sidebar from '@/components/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kairal Admin Dashboard',
  description: 'Admin dashboard for Ianus anti-bot security platform — manage tenants, users, and API keys',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <div className="flex min-h-screen bg-gray-200">
          <Sidebar />
          <main className="flex-1 overflow-auto bg-gray-100 rounded-tl-2xl rounded-bl-2xl my-3 mr-3">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
