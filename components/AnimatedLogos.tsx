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

  const tripleLogos = [...logos, ...logos, ...logos]

  return (
    <div className="w-full overflow-hidden bg-transparent py-8">
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
      <div className="scroll-container items-center gap-6">
        {tripleLogos.map((client: Logo, index: number) =>
          client.logo?.url ? (
            <div
              key={`logo-${index}`}
              className="mx-6 flex-shrink-0 opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
            >
              <PrismicNextImage
                field={client.logo}
                className="h-[48px] w-full cursor-pointer object-contain"
              />
            </div>
          ) : null
        )}
      </div>
    </div>
  )
}
