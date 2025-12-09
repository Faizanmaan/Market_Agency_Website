import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
    title: 'Positivus - Digital Marketing Agency',
    description: 'Navigating the digital landscape for success. Professional digital marketing services including SEO, PPC, Social Media, and more.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body suppressHydrationWarning={true}>
                <Header />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    )
}
