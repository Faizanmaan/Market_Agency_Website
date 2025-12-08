'use client'

import { PrismicNextImage } from '@prismicio/next'
import { ImageField } from '@prismicio/client'

interface Logo {
    logo: ImageField
    client_name?: string
}

interface AnimatedLogosProps {
    logos: Logo[]
}

export default function AnimatedLogos({ logos }: AnimatedLogosProps) {
    if (logos.length === 0) return null

    // Triple the logos for smooth infinite scroll
    const tripleLogos = [...logos, ...logos, ...logos]

    return (
        <div className="w-full overflow-hidden py-8 bg-transparent">
            <style jsx>{`
                @keyframes scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-33.333%);
                    }
                }
                
                .scroll-container {
                    animation: scroll 30s linear infinite;
                    display: flex;
                    width: max-content;
                }
                
                .scroll-container:hover {
                    animation-play-state: paused;
                }
            `}</style>
            <div className="scroll-container gap-12 items-center">
                {tripleLogos.map((client: Logo, index: number) =>
                    client.logo?.url ? (
                        <div
                            key={`logo-${index}`}
                            className="flex-shrink-0 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 mx-6"
                        >
                            <PrismicNextImage
                                field={client.logo}
                                className="object-contain max-h-[40px] cursor-pointer"
                            />
                        </div>
                    ) : null
                )}
            </div>
        </div>
    )
}
