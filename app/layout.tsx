import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Arnav Joshi',
  description: 'Arnav Joshi Portfolio Website',
  generator: 'arnavj.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
