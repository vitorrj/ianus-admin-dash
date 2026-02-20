import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#111bd9',
          dark: '#0d15a8',
          light: '#e8e9fc',
        },
        kairal: {
          blue: '#111bd9',
          cyan: '#7ce4ed',
        },
        bg: {
          body: '#f3f4f6',
          card: '#ffffff',
          input: '#f3f4f6',
          'input-hover': '#e5e7eb',
        },
        text: {
          main: '#111111',
          secondary: '#555555',
          tertiary: '#aaaaaa',
        },
        border: {
          DEFAULT: '#e5e7eb',
          light: '#f3f4f6',
        },
        severity: {
          critical: {
            bg: '#fae8ff',
            text: '#a855f7',
          },
          high: {
            bg: '#fee2e2',
            text: '#f87171',
          },
          medium: {
            bg: '#fef9c3',
            text: '#eab308',
          },
          low: {
            bg: '#dcfce7',
            text: '#22c55e',
          },
        },
        action: {
          block: '#ef4444',
          challenge: '#f59e0b',
          'rate-limit': '#3b82f6',
          allow: '#10b981',
        },
        chart: {
          blue: '#5e72e4',
          red: '#f5365c',
          orange: '#fb6340',
          green: '#2dce89',
          purple: '#8965e0',
          teal: '#11cdef',
          yellow: '#ffd600',
          gray: '#e9ecef',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Roboto Mono', 'monospace'],
      },
      fontSize: {
        '3xs': ['0.5rem', { lineHeight: '0.625rem' }],
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
      },
      boxShadow: {
        card: '0 1px 2px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
        modal: '0 20px 40px rgba(0, 0, 0, 0.1)',
        button: '0 2px 4px rgba(0, 0, 0, 0.06)',
      },
      borderRadius: {
        card: '10px',
        modal: '16px',
        input: '8px',
        pill: '100px',
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-slow': 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
    },
  },
  plugins: [],
}

export default config
