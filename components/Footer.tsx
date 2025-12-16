import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
    return (
        <footer className="pt-12 pb-0">
            <div className="container max-w-7xl mx-auto px-4 lg:px-8">
                <div className="bg-dark text-white rounded-t-[45px] p-8 lg:p-12">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 gap-6">
                        <Link href="/" className="flex items-center gap-2">
                            <Image
                                src="/footer-logo.png"
                                alt="Positivus Logo"
                                width={180}
                                height={29}
                                className="h-7 max-w-[180px]"
                            />
                        </Link>

                        <nav className="flex flex-wrap gap-6 lg:gap-8 text-lg [&>a]:underline-offset-2 [&>a]:underline [&>a]:transition-colors">
                            <Link href="/about" className="hover:text-primary">
                                About us
                            </Link>
                            <Link href="/services" className="hover:text-primary">
                                Services
                            </Link>
                            <Link href="/use-cases" className="hover:text-primary">
                                Use Cases
                            </Link>
                            <Link href="/pricing" className="hover:text-primary">
                                Pricing
                            </Link>
                            <Link href="/blogs" className="hover:text-primary">
                                Blog
                            </Link>
                        </nav>

                        <div className="flex gap-4 [&>a]:rounded-full [&>a]:flex [&>a]:items-center [&>a]:justify-center [&>a]:w-8 [&>a]:h-8">
                            <Link href="#" aria-label="LinkedIn">
                                <Image src="/socials/linkedin.png" alt="LinkedIn" width={30} height={30} />
                            </Link>
                            <Link href="#" aria-label="Facebook">
                                <Image src="/socials/facebook.png" alt="Facebook" width={30} height={30} />
                            </Link>
                            <Link href="#" aria-label="Twitter">
                                <Image src="/socials/twitter.png" alt="Twitter" width={30} height={30} />
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                        <div className="space-y-3">
                            <div>
                                <span className="bg-primary text-dark px-2 rounded-[7px] font-medium text-xl">Contact us:</span>
                            </div>
                            <p className="text-lg font-normal">Email: info@positivus.com</p>
                            <p className="text-lg font-normal">Phone: 555-567-8901</p>
                            <p className="text-lg font-normal">
                                Address: 1234 Main St<br />
                                Moonstone City, Stardust State 12345
                            </p>
                        </div>

                        <div className="bg-[#292A32] rounded-xl p-6 lg:p-8 flex justify-center">
                            <div className="flex flex-col sm:flex-row gap-4 m-auto">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="flex-1 px-6 py-4 rounded-[14px] bg-transparent border border-white text-white placeholder-white focus:outline-none focus:border-primary focus:bg-transparent"
                                />
                                <button className="bg-primary text-dark px-6 py-4 rounded-[14px] font-normal text-xl hover:bg-primary/90 transition-colors whitespace-nowrap">
                                    Subscribe to news
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-white">
                        <div className="flex flex-col sm:flex-row justify-start items-start sm:items-center gap-4">
                            <p className="text-lg font-normal">© 2023 Positivus. All Rights Reserved.</p>
                            <Link href="/privacy" className="text-lg font-normal hover:text-primary transition-colors underline">
                                Privacy Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
