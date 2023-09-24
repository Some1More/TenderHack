'use client'

import './globals.scss' 
import QueryClientApp from '@/components/providers/queryClient'
import { Open_Sans } from 'next/font/google'

const font = Open_Sans({ subsets: ['latin'] }) 

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return ( 
    <html lang="ru">
      <head>
        <title>TenderHack | ChatBot</title>
      </head>
      <body className={font.className}>
          <QueryClientApp>
            {children} 
          </QueryClientApp>
        </body>
    </html>
  )
}
