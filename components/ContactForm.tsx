'use client'
import { useState } from 'react'
import Image from 'next/image'

export default function ContactForm() {
    const [contactType, setContactType] = useState('hi')

    return (
        <div className="bg-gray-light rounded-[45px] p-6 sm:p-8 lg:p-14 overflow-hidden relative">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                <form className="space-y-5 relative z-10 w-full lg:w-[55%]">
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <div className="relative flex items-center">
                                <input
                                    type="radio"
                                    name="contactType"
                                    value="hi"
                                    checked={contactType === 'hi'}
                                    onChange={(e) => setContactType(e.target.value)}
                                    className="peer h-5 w-5 appearance-none rounded-full border-2 border-dark bg-white checked:border-black transition-all cursor-pointer"
                                />
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className={'w-2.5 h-2.5 rounded-full bg-primary transition-transform ' + (contactType === 'hi' ? 'scale-100' : 'scale-0')}></div>
                                </div>
                            </div>
                            <span className="text-base">Say Hi</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <div className="relative flex items-center">
                                <input
                                    type="radio"
                                    name="contactType"
                                    value="quote"
                                    checked={contactType === 'quote'}
                                    onChange={(e) => setContactType(e.target.value)}
                                    className="peer h-5 w-5 appearance-none rounded-full border-2 border-dark bg-white checked:border-black transition-all cursor-pointer"
                                />
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className={`w-2.5 h-2.5 rounded-full bg-primary transition-transform ${contactType === 'quote' ? 'scale-100' : 'scale-0'}`}></div>
                                </div>
                            </div>
                            <span className="text-base">Get a Quote</span>
                        </label>
                    </div>

                    <div>
                        <label className="block mb-1.5 text-sm font-medium">Name</label>
                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full px-5 py-3.5 rounded-2xl border border-dark bg-white focus:outline-none focus:ring-2 focus:ring-dark"
                        />
                    </div>

                    <div>
                        <label className="block mb-1.5 text-sm font-medium">Email*</label>
                        <input
                            type="email"
                            placeholder="Email"
                            required
                            className="w-full px-5 py-3.5 rounded-2xl border border-dark bg-white focus:outline-none focus:ring-2 focus:ring-dark"
                        />
                    </div>

                    <div>
                        <label className="block mb-1.5 text-sm font-medium">Message*</label>
                        <textarea
                            placeholder="Message"
                            required
                            rows={5}
                            className="w-full px-5 py-3.5 rounded-2xl border border-dark bg-white focus:outline-none focus:ring-2 focus:ring-dark resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-dark text-white py-4 rounded-2xl font-medium hover:bg-opacity-90 transition-all mt-6"
                    >
                        Send Message
                    </button>
                </form>

                <div className="relative hidden lg:flex items-center justify-end w-full lg:w-[45%]">
                    <Image
                        src="/contact-illustration.png"
                        alt="Contact illustration"
                        width={400}
                        height={600}
                        className="object-contain max-h-[510px] absolute lg:right-[-113px]"
                    />
                </div>
            </div>
        </div>
    )
}
