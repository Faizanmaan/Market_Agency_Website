'use client'
import { useState, useRef, useEffect } from 'react'

interface TestimonialItem {
    quote: any
    author: string
    position: string
}

interface TestimonialsSectionProps {
    items: TestimonialItem[]
}

export default function TestimonialsSection({ items }: TestimonialsSectionProps) {
    const [currentTestimonial, setCurrentTestimonial] = useState(0)
    const [direction, setDirection] = useState<'left' | 'right'>('right')
    const [isAnimating, setIsAnimating] = useState(false)
    const touchStartX = useRef<number>(0)
    const touchEndX = useRef<number>(0)
    const containerRef = useRef<HTMLDivElement>(null)

    const nextTestimonial = () => {
        if (isAnimating) return
        setDirection('right')
        setIsAnimating(true)
        setCurrentTestimonial((prev) => (prev + 1) % items.length)
        setTimeout(() => setIsAnimating(false), 500)
    }

    const prevTestimonial = () => {
        if (isAnimating) return
        setDirection('left')
        setIsAnimating(true)
        setCurrentTestimonial((prev) => (prev - 1 + items.length) % items.length)
        setTimeout(() => setIsAnimating(false), 500)
    }

    const goToTestimonial = (index: number) => {
        if (isAnimating || index === currentTestimonial) return
        setDirection(index > currentTestimonial ? 'right' : 'left')
        setIsAnimating(true)
        setCurrentTestimonial(index)
        setTimeout(() => setIsAnimating(false), 500)
    }

    // Handle touch gestures
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.touches[0].clientX
    }

    const handleTouchEnd = () => {
        if (!touchStartX.current || !touchEndX.current) return

        const distance = touchStartX.current - touchEndX.current
        const minSwipeDistance = 50 // minimum distance for a swipe

        if (Math.abs(distance) > minSwipeDistance) {
            if (distance > 0) {
                // Swiped left - go to next
                nextTestimonial()
            } else {
                // Swiped right - go to previous
                prevTestimonial()
            }
        }

        // Reset values
        touchStartX.current = 0
        touchEndX.current = 0
    }

    // Handle mouse drag gestures (for desktop)
    const handleMouseDown = (e: React.MouseEvent) => {
        touchStartX.current = e.clientX
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (touchStartX.current === 0) return
        touchEndX.current = e.clientX
    }

    const handleMouseUp = () => {
        if (!touchStartX.current || !touchEndX.current) {
            touchStartX.current = 0
            touchEndX.current = 0
            return
        }

        const distance = touchStartX.current - touchEndX.current
        const minSwipeDistance = 50

        if (Math.abs(distance) > minSwipeDistance) {
            if (distance > 0) {
                nextTestimonial()
            } else {
                prevTestimonial()
            }
        }

        touchStartX.current = 0
        touchEndX.current = 0
    }

    const handleMouseLeave = () => {
        touchStartX.current = 0
        touchEndX.current = 0
    }

    if (items.length === 0) return null

    const getAnimationClass = (offset: number) => {
        if (!isAnimating) {
            if (offset === 0) return 'opacity-100 scale-100 z-10'
            return 'opacity-40 scale-95 z-0'
        }

        if (offset === 0) {
            return direction === 'right'
                ? 'animate-slide-in-right opacity-100 scale-100 z-10'
                : 'animate-slide-in-left opacity-100 scale-100 z-10'
        }

        if (offset === -1) {
            return direction === 'right'
                ? 'animate-slide-out-left opacity-0 scale-90 z-0'
                : 'opacity-40 scale-95 z-0'
        }

        if (offset === 1) {
            return direction === 'left'
                ? 'animate-slide-out-right opacity-0 scale-90 z-0'
                : 'opacity-40 scale-95 z-0'
        }

        return 'opacity-40 scale-95 z-0'
    }

    return (
        <div className="bg-dark rounded-[45px] pt-12 pb-12 text-white overflow-hidden">
            {/* Testimonial Cards Carousel */}
            <div
                ref={containerRef}
                className="relative flex justify-center items-start gap-8 mb-12 min-h-[400px] cursor-grab active:cursor-grabbing select-none"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
            >
                {[-1, 0, 1].map((offset) => {
                    const index = (currentTestimonial + offset + items.length) % items.length;
                    const testimonial = items[index];
                    return (
                        <div
                            key={`${index}-${currentTestimonial}`}
                            className={`flex flex-col flex-shrink-0 w-[350px] lg:w-[600px] transition-all duration-500 ease-in-out ${getAnimationClass(offset)}`}
                        >
                            {/* Speech Bubble Card */}
                            <div className="bg-dark border border-primary rounded-[45px] p-12 relative mb-8 h-full pointer-events-none">
                                <div className="text-base leading-relaxed text-white">{testimonial.quote}</div>
                                {/* Speech bubble tail - seamless outline */}
                                <div className="absolute -bottom-[1px] left-10 w-8 h-8 bg-dark border-b border-r border-primary transform rotate-45 translate-y-1/2"></div>
                            </div>
                            {/* Author Info */}
                            <div className="pl-10 pointer-events-none">
                                <p className="font-semibold text-primary text-lg">{testimonial.author}</p>
                                <p className="text-sm text-white">{testimonial.position}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Navigation Controls - Centered at Bottom */}
            <div className="flex justify-between items-center mt-2 px-4">
                <div className="flex items-center gap-12 mx-auto">
                    {/* Previous Arrow */}
                    <button
                        onClick={prevTestimonial}
                        disabled={isAnimating}
                        className="text-white hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Previous testimonials"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9 19L2 12L9 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    {/* Navigation Dots - Stars */}
                    <div className="flex gap-4">
                        {items.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToTestimonial(index)}
                                disabled={isAnimating}
                                className={`transition-all duration-300 disabled:cursor-not-allowed ${currentTestimonial === index ? 'text-primary scale-125' : 'text-white scale-100'
                                    }`}
                                aria-label={`Go to testimonial ${index + 1}`}
                            >
                                {/* 5-pointed star SVG */}
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7 0L8.5716 4.83688H13.6574L9.5429 7.82624L11.1145 12.6631L7 9.67376L2.8855 12.6631L4.4571 7.82624L0.342604 4.83688H5.4284L7 0Z" />
                                </svg>
                            </button>
                        ))}
                    </div>

                    {/* Next Arrow */}
                    <button
                        onClick={nextTestimonial}
                        disabled={isAnimating}
                        className="text-white hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Next testimonials"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M15 5L22 12L15 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}