import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kraken Labs — Technical Visualization & 3D Rendering",
  description:
    "Kraken Labs is the studio of Genesis Laboy: high-fidelity technical visualization, product rendering, and immersive experiences for aerospace, industrial, and medical clients.",
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "Kraken Labs — Technical Visualization & 3D Rendering",
    description:
      "High-fidelity technical visualization, product rendering, and immersive experiences for aerospace, industrial, and medical clients.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
