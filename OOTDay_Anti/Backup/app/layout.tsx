import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'OOTDay - AI Fashion Assistant',
  description: 'Discover personalized outfits with AI-powered fashion recommendations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  )
}
