import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/lib/cart-context"
import { ThemeProvider } from "@/components/theme-provider"
import SessionWrapper from "@/components/SessionWrapper"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Zeus Street Greek - Authentic Greek Street Food",
  description: "Experience the vibrant flavors of Greece with our modern twist on traditional street food classics",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionWrapper session={session}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
            <CartProvider>{children}</CartProvider>
          </ThemeProvider>
        </SessionWrapper>
      </body>
    </html>
  )
}
