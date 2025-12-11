import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeCustomizer } from "@/components/theme-customizer"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Diamond Visa - Global Vize ve Seyahat Cozumleri",
  description:
    "Diamond Visa ile dunyanin her yerine vize basvurusu, eSIM, arac kiralama ve tur paketleri. AI destekli akilli vize yonetim sistemi.",
  keywords: ["vize", "vize basvurusu", "esim", "tur", "seyahat", "arac kiralama", "tatil", "Diamond Visa"],
  authors: [{ name: "Diamond Visa" }],
  openGraph: {
    title: "Diamond Visa - Global Vize ve Seyahat Cozumleri",
    description: "AI destekli akilli vize yonetim sistemi ile dunyanin her yerine kolay vize basvurusu",
    type: "website",
    locale: "tr_TR",
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8F8F6" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1d23" },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          {children}
          <ThemeCustomizer />
        </ThemeProvider>
      </body>
    </html>
  )
}
