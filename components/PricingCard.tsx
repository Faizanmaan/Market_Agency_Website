import Link from 'next/link'

interface PricingCardProps {
    tier: string
    description: string
    price: number
    features: string[]
    isPopular?: boolean
}

export default function PricingCard({
    tier,
    description,
    price,
    features,
    isPopular = false,
}: PricingCardProps) {
    return (
        <div
            className="bg-white border border-black rounded-[45px] p-6 transition-all flex flex-col"
            style={{ boxShadow: '0px 8px 0px 0px rgba(0, 0, 0, 1)' }}
        >
            <div className="flex justify-center">
                <h3 className="text-2xl font-bold mb-3">{tier}</h3>
            </div>
            <div className="flex items-center mx-auto">
                <p className="text-lg font-light mb-6 min-h-[3rem] text-center">{description}</p>
            </div>
            <div className="flex justify-center">
                <div className="mb-8">
                    <div className="flex items-baseline gap-1">
                        <span className="text-5xl font-bold">${price}</span>
                        <span className="text-base">/month</span>
                    </div>
                </div>
            </div>
            <ul className="space-y-3 mb-8 flex-grow">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                        <svg
                            className="w-5 h-5 text-black flex-shrink-0 mt-0.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span className="text-base">{feature}</span>
                    </li>
                ))}
            </ul>
            <button className="w-full bg-primary text-dark text-sm font-medium py-3 px-4 rounded-lg hover:bg-dark hover:text-white transition-all">
                Get Started
            </button>
        </div>
    )
}
