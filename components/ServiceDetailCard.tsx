'use client'

import Link from 'next/link'

interface ServiceDetailCardProps {
    badge: {
        title: string
        icon: string
        description: string
    }
    title: string
    description: string
    benefits: string[]
    ctaText: string
    ctaLink: string
    colorScheme: 'light' | 'primary' | 'dark'
    illustrationEmoji?: string
    isReversed?: boolean
}

export default function ServiceDetailCard({
    badge,
    title,
    description,
    benefits,
    ctaText,
    ctaLink,
    colorScheme,
    illustrationEmoji = '🎨',
    isReversed = false,
}: ServiceDetailCardProps) {
    // Color scheme classes
    const colorClasses = {
        light: {
            bg: 'bg-gray-light',
            text: 'text-dark',
            badgeBg: 'bg-primary',
            badgeText: 'text-dark',
            benefitCheck: 'text-primary',
        },
        primary: {
            bg: 'bg-primary',
            text: 'text-dark',
            badgeBg: 'bg-white',
            badgeText: 'text-dark',
            benefitCheck: 'text-dark',
        },
        dark: {
            bg: 'bg-dark',
            text: 'text-white',
            badgeBg: 'bg-primary',
            badgeText: 'text-dark',
            benefitCheck: 'text-primary',
        },
    }

    const colors = colorClasses[colorScheme]

    return (
        <div className={`${colors.bg} ${colors.text} rounded-3xl overflow-hidden border-2 border-dark`}>
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 lg:p-12 ${isReversed ? 'lg:grid-flow-dense' : ''}`}>
                {/* Illustration Section */}
                <div className={`flex items-center justify-center ${isReversed ? 'lg:col-start-2' : ''}`}>
                    <div className="w-full aspect-video bg-white/10 rounded-2xl flex items-center justify-center border-2 border-dark/10">
                        <div className="text-8xl">{illustrationEmoji}</div>
                    </div>
                </div>

                {/* Content Section */}
                <div className={`flex flex-col justify-between ${isReversed ? 'lg:col-start-1' : ''}`}>
                    {/* Badge */}
                    <div className="mb-8">
                        <div className={`${colors.badgeBg} ${colors.badgeText} inline-flex items-center gap-3 px-4 py-2 rounded-lg border-2 border-dark`}>
                            <span className="text-2xl">{badge.icon}</span>
                            <div>
                                <h3 className="font-semibold text-sm">{badge.title}</h3>
                                {badge.description && (
                                    <p className="text-xs opacity-80">{badge.description}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* What we offer section */}
                        <div>
                            <h4 className="font-bold text-lg mb-3">{title}</h4>
                            <p className="text-sm leading-relaxed opacity-90">{description}</p>
                        </div>

                        {/* CTA Button */}
                        <div>
                            <Link
                                href={ctaLink}
                                className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${colorScheme === 'dark'
                                        ? 'bg-primary text-dark hover:bg-primary/90'
                                        : 'bg-dark text-white hover:bg-dark/90'
                                    }`}
                            >
                                <span>{ctaText}</span>
                                <span className="text-lg">→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Benefits Section - Full Width */}
            <div className="px-8 lg:px-12 pb-8 lg:pb-12">
                <div className={`pt-6 border-t-2 ${colorScheme === 'dark' ? 'border-white/20' : 'border-dark/20'}`}>
                    <h4 className="font-bold text-lg mb-4">Benefits</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <span className={`${colors.benefitCheck} text-xl flex-shrink-0`}>✓</span>
                                <span className="text-sm">{benefit}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
