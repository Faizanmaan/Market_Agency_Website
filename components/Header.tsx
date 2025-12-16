'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const navLinks = [
        { href: '/about', label: 'About us' },
        { href: '/services', label: 'Services' },
        { href: '/use-cases', label: 'Use Cases' },
        { href: '/pricing', label: 'Pricing' },
        { href: '/blogs', label: 'Blog' },
    ]

    return (
        <header className="bg-white sticky top-0 z-50">
            <div className="container max-w-7xl mx-auto px-4 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/positivus-logo.png"
                            alt="Positivus Logo"
                            width={229}
                            height={36}
                            className="h-9 w-auto"
                        />
                    </Link>

                    <nav className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-dark hover:text-gray-600 transition-colors"
                                style={{ fontFamily: 'Space Grotesk', fontSize: '20px' }}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="#contact"
                            className="border border-dark px-6 py-3 rounded-lg inline-block hover:bg-black hover:text-white transition-color"
                            style={{ fontFamily: 'Space Grotesk', fontSize: '20px' }}
                        >
                            Request a quote
                        </Link>
                    </nav>

                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden flex flex-col gap-1.5"
                        aria-label="Toggle menu"
                    >
                        <span className="w-6 h-0.5 bg-dark transition-all"></span>
                        <span className="w-6 h-0.5 bg-dark transition-all"></span>
                        <span className="w-6 h-0.5 bg-dark transition-all"></span>
                    </button>
                </div>

                {mobileMenuOpen && (
                    <div className="lg:hidden py-4 border-t border-gray-200">
                        <nav className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-dark hover:text-gray-600 transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <Link
                                href="#contact"
                                className="btn-secondary text-center"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Request a quote
                            </Link>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    )
}

