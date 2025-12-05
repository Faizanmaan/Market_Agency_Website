import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
    return (
        <footer className="pt-12 pb-0">
            <div className="container max-w-7xl mx-auto px-4 lg:px-8">
                <div className="bg-dark text-white rounded-t-[45px] p-8 lg:p-12">
                    {/* Top Row - Logo, Nav Links, and Social Icons */}
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-6">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2">
                            <Image
                                src="/footer-logo.png"
                                alt="Positivus Logo"
                                width={180}
                                height={29}
                                className="h-7 max-w-[180px]"
                            />
                        </Link>

                        {/* Navigation Links */}
                        <nav className="flex flex-wrap gap-6 lg:gap-8">
                            <Link href="/about" className="hover:text-primary transition-colors underline">
                                About us
                            </Link>
                            <Link href="/services" className="hover:text-primary transition-colors underline">
                                Services
                            </Link>
                            <Link href="/use-cases" className="hover:text-primary transition-colors underline">
                                Use Cases
                            </Link>
                            <Link href="/pricing" className="hover:text-primary transition-colors underline">
                                Pricing
                            </Link>
                            <Link href="/blogs" className="hover:text-primary transition-colors underline">
                                Blog
                            </Link>
                        </nav>

                        {/* Social Icons */}
                        <div className="flex gap-4">
                            <Link href="#" className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-primary transition-colors" aria-label="LinkedIn">
                                <svg className="w-4 h-4 text-dark" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                                </svg>
                            </Link>
                            <Link href="#" className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-primary transition-colors" aria-label="Facebook">
                                <svg className="w-4 h-4 text-dark" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
                                </svg>
                            </Link>
                            <Link href="#" className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-primary transition-colors" aria-label="Twitter">
                                <svg className="w-4 h-4 text-dark" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22.46 6c-.85.38-1.78.64-2.75.76 1-.6 1.76-1.55 2.12-2.68-.93.55-1.96.96-3.06 1.18C17.9 4.36 16.76 3.8 15.5 3.8c-2.45 0-4.44 1.99-4.44 4.44 0 .35.04.69.11 1.02-3.69-.18-6.96-1.95-9.15-4.63-.38.65-.6 1.41-.6 2.22 0 1.54.78 2.9 1.97 3.69-.72-.02-1.4-.22-2-.55v.06c0 2.15 1.53 3.95 3.56 4.36-.37.1-.76.15-1.16.15-.28 0-.56-.03-.83-.07.56 1.75 2.19 3.02 4.12 3.06-1.51 1.18-3.42 1.89-5.49 1.89-.36 0-.71-.02-1.06-.06 1.97 1.26 4.3 2 6.81 2 8.18 0 12.65-6.77 12.65-12.65 0-.19 0-.38-.01-.57.87-.63 1.62-1.41 2.22-2.3z" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    {/* Middle Row - Contact Info and Newsletter */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                        {/* Contact Information */}
                        <div className="space-y-3">
                            <div>
                                <span className="bg-primary text-dark px-3 py-1 rounded font-medium text-sm">Contact us:</span>
                            </div>
                            <p className="text-sm">Email: info@positivus.com</p>
                            <p className="text-sm">Phone: 555-567-8901</p>
                            <p className="text-sm">
                                Address: 1234 Main St<br />
                                Moonstone City, Stardust State 12345
                            </p>
                        </div>

                        {/* Newsletter Subscription */}
                        <div className="bg-[#292A32] rounded-xl p-6 lg:p-8 flex justify-center">
                            <div className="flex flex-col sm:flex-row gap-4 m-auto">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="flex-1 px-6 py-3 rounded-lg bg-dark border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-primary"
                                />
                                <button className="bg-primary text-dark px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors whitespace-nowrap">
                                    Subscribe to news
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Row - Copyright and Privacy Policy */}
                    <div className="pt-8 border-t border-white/20">
                        <div className="flex flex-col sm:flex-row justify-start items-start sm:items-center gap-4">
                            <p className="text-sm">© 2023 Positivus. All Rights Reserved.</p>
                            <Link href="/privacy" className="text-sm hover:text-primary transition-colors underline">
                                Privacy Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
