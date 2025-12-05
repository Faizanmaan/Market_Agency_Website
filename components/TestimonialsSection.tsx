'use client'
import { useState } from 'react'

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

    const nextTestimonial = () => {
        setCurrentTestimonial((prev) => (prev + 1) % items.length)
    }

    const prevTestimonial = () => {
        setCurrentTestimonial((prev) => (prev - 1 + items.length) % items.length)
    }

    const goToTestimonial = (index: number) => {
        setCurrentTestimonial(index)
    }

    if (items.length === 0) return null

    return (
        <div className="bg-dark rounded-[45px] pt-12 pb-12 text-white overflow-hidden">
            {/* Testimonial Cards Carousel */}
            <div className="flex justify-center items-start gap-8 mb-12">
                {[-1, 0, 1].map((offset) => {
                    const index = (currentTestimonial + offset + items.length) % items.length;
                    const testimonial = items[index];
                    return (
                        <div key={index} className="flex flex-col flex-shrink-0 w-[350px] lg:w-[600px]">
                            {/* Speech Bubble Card */}
                            <div className="bg-dark border border-primary rounded-[45px] p-12 relative mb-8 h-full">
                                <div className="text-base leading-relaxed text-white">{testimonial.quote}</div>
                                {/* Speech bubble tail - seamless outline */}
                                <div className="absolute -bottom-[1px] left-10 w-8 h-8 bg-dark border-b border-r border-primary transform rotate-45 translate-y-1/2"></div>
                            </div>
                            {/* Author Info */}
                            <div className="pl-10">
                                <p className="font-semibold text-primary text-lg">{testimonial.author}</p>
                                <p className="text-sm text-white">{testimonial.position}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Navigation Controls - Centered at Bottom */}
            <div className="flex justify-between items-center mt-24 px-4">
                <div className="flex items-center gap-12 mx-auto">
                    {/* Previous Arrow */}
                    <button
                        onClick={prevTestimonial}
                        className="text-white hover:text-primary transition-colors"
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
                                className={`transition-colors ${currentTestimonial === index ? 'text-primary' : 'text-white'
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
                        className="text-white hover:text-primary transition-colors"
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