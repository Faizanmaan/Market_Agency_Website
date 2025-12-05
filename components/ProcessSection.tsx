'use client'
import { useState } from 'react'

export default function ProcessSection({ items }: { items: any[] }) {
    const [activeAccordion, setActiveAccordion] = useState<number | null>(0)
    
    return (
        <div className="space-y-6">
            {items.map((item, index) => (
                <div
                    key={index}
                    className={`border-2 border-b-8 border-dark rounded-[45px] overflow-hidden transition-all ${
                        activeAccordion === index ? 'bg-primary' : 'bg-gray-light'
                    }`}
                >
                    <button
                        onClick={() => setActiveAccordion(activeAccordion === index ? null : index)}
                        className="w-full flex items-center justify-between p-8 text-left"
                    >
                        <div className="flex items-center gap-6">
                            <span className="text-5xl font-bold">{item.number}</span>
                            <h3 className="text-2xl font-semibold">{item.title}</h3>
                        </div>
                        <div
                            className={`w-12 h-12 rounded-full border-2 border-dark flex items-center justify-center text-2xl ${
                                activeAccordion === index ? 'bg-gray-light' : 'bg-gray-light'
                            }`}
                        >
                            {activeAccordion === index ? '−' : '+'}
                        </div>
                    </button>
                    {activeAccordion === index && (
                        <div className="px-8 pb-8">
                            <div className="border-t-2 border-dark pt-6">
                                <div className="text-lg">{item.description}</div>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}