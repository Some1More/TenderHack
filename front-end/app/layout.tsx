'use client'

import QueryClientApp from '@/components/providers/queryClient'
import './globals.scss'
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'

const font = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chat Bot | TenderHack',
  description: 'Chat Bot :)',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={font.className}>
          <QueryClientApp>
            {children} 
          </QueryClientApp>
        </body>
    </html>
  )
}
