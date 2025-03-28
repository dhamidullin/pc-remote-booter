'use client'

import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { StyledBodyWrapper } from './components/styled-body'
import { AuthProvider } from '@/context/AuthContext'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en'>
      <StyledBodyWrapper className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </StyledBodyWrapper>
    </html>
  )
}
