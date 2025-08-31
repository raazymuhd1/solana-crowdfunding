import type { Metadata } from 'next'
import './globals.css'
import { AppProviders } from '@/components/app-providers'
import { AppLayout } from '@/components/app-layout'
import React from 'react'

export const metadata: Metadata = {
  title: 'CrowdFunds',
  description: 'Developing a crowdfunding dapps on solana chain',
}

const links: { label: string; path: string }[] = [
  { label: 'Create Campaign', path: '/campaign' },
  { label: 'Withdrawal', path: '/withdrawal' },
]

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
       <body className={`antialiased`}>
        <AppProviders>
          <AppLayout links={links}>
              {children}
          </AppLayout>
        </AppProviders>
        </body>
    </html>
  )
}
// Patch BigInt so we can log it using JSON.stringify without any errors
declare global {
  interface BigInt {
    toJSON(): string
  }
}

BigInt.prototype.toJSON = function () {
  return this.toString()
}
