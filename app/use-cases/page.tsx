import { createClient } from '@/prismicio'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText } from '@prismicio/react'
import { isFilled } from '@prismicio/client'
import Link from 'next/link'
import Image from 'next/image'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'] })

export default async function UseCasesPage() {
    const client = createClient()
    const page = await client.getSingle('use_cases').catch(() => null)

    return (
        <div className="min-h-screen bg-white">
            <section className="bg-[#2b2b2b] py-16 lg:py-24">
                <div className="container mx-auto px-4 lg:px-8 text-center">
                    <div className="flex justify-center mb-8">
                        {page?.data.hero_logo && (
                            <PrismicNextImage
                                field={page.data.hero_logo}
                                className="h-[52px] w-[165px] object-contain"
                                width={165}
                                height={52}
                            />
                        )}
                    </div>

                    <div className={`text-white text-lg lg:text-[26px] tracking-wide mb-6 ${montserrat.className}`}>
                        <PrismicRichText field={page?.data.hero_subheading} />
                    </div>
                    <div className={`text-white text-lg lg:text-[28px] tracking-wide font-extrabold ${montserrat.className}`}>
                        <PrismicRichText field={page?.data.hero_heading} />
                    </div>

                </div>
            </section>
            <div className="container max-w-7xl mx-auto">
                <section className="py-10">
                    <div className="container mx-auto px-4 lg:px-8">
                        <div className="text-center text-lg leading-relaxed max-w-[930px] mx-auto">
                            <PrismicRichText field={page?.data.description_text} />
                        </div>
                    </div>
                </section>

                <section className="pt-12">
                    <div className="container mx-auto px-4 lg:px-8 text-center">
                        <h6 className="text-2xl lg:text-[35px] font-bold mb-4">{page?.data.goal_title}</h6>
                        <div className="text-lg text-[#504C4C]">
                            <PrismicRichText field={page?.data.goal_description} />
                        </div>
                    </div>
                </section>

                <section className="container mx-auto px-4 lg:px-8 py-8">
                    <div className="bg-gray-light rounded-[20px] p-14 lg:p-20">
                        <div className="flex flex-col lg:flex-row justify-between items-center gap-12">
                            <div className="w-full lg:w-[65%]">
                                <h2 className="text-2xl lg:text-3xl font-bold mb-6 text-[#333C58]">{page?.data.challenge_title}</h2>
                                <div className="text-lg text-black leading-relaxed">
                                    <PrismicRichText field={page?.data.challenge_description} />
                                </div>
                            </div>
                            <div className="w-full lg:w-[35%] flex items-center justify-center lg:justify-start">
                                {page?.data.challenge_image && (
                                    <PrismicNextImage
                                        field={page.data.challenge_image}
                                        className="w-40 h-40 lg:w-48 lg:h-48 object-contain"
                                        width={192}
                                        height={192}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="container mx-auto px-4 lg:px-8 py-16 lg:py-20">
                    <div className="flex flex-col lg:flex-row justify-center items-center gap-12 lg:gap-24">
                        <div className="flex-shrink-0">
                            {page?.data.results_image && (
                                <PrismicNextImage
                                    field={page.data.results_image}
                                    className="w-40 h-40 lg:w-48 lg:h-48 object-contain"
                                    width={192}
                                    height={192}
                                />
                            )}
                        </div>
                        <div className="max-w-lg">
                            <h2 className="text-2xl lg:text-3xl font-bold mb-6 text-blck">{page?.data.results_title}</h2>
                            <div className="space-y-4 text-lg text-[#312F2F] leading-relaxed">
                                <PrismicRichText field={page?.data.results_list} />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="container mx-auto px-4 lg:px-8 pb-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto">
                        {page?.data.solution_cards?.map((card: any, index: number) => (
                            <div
                                key={index}
                                className={`${card.background_color === 'primary' ? 'bg-primary' : card.background_color === 'gray' ? 'bg-gray-100' : 'bg-white'} rounded-[27px] px-8 py-4 flex items-center gap-6 border border-dark`}
                            >
                                <div className="w-full lg:w-[50%] flex items-center justify-center">
                                    <div className="w-[76px] h-[76px]">
                                        {card.icon && (
                                            <PrismicNextImage
                                                field={card.icon}
                                                className="w-full h-full object-contain"
                                                width={76}
                                                height={76}
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className="w-full lg:w-[50%]">
                                    <div className={`${card.background_color === 'gray' ? 'text-teal-600' : 'text-black'} text-[19px] leading-relaxed`}>
                                        <PrismicRichText field={card.description} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="container mx-auto px-4 lg:px-8 py-16">
                    <div className="bg-black text-white rounded-[30px] p-12 lg:px-[142px] lg:p-16">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="flex justify-center lg:justify-start">
                                {page?.data.solution_image && (
                                    <PrismicNextImage
                                        field={page.data.solution_image}
                                        className="w-48 h-48 lg:w-64 lg:h-64 object-contain"
                                        width={256}
                                        height={256}
                                    />
                                )}
                            </div>
                            <div>
                                <h2 className="text-2xl lg:text-[35px] font-bold mb-6">{page?.data.solution_title}</h2>
                                <div className="text-lg font-normal leading-relaxed">
                                    <PrismicRichText field={page?.data.solution_description} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-16 lg:py-20">
                    <div className="w-[70%] mx-auto">
                        <div className="bg-gray-light p-12 lg:p-16">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
                                <div>
                                    <h2 className="text-2xl lg:text-3xl font-bold mb-6 text-dark">{page?.data.impact_title}</h2>
                                    <div className="space-y-4 text-base text-[#333C58] leading-relaxed">
                                        <PrismicRichText field={page?.data.impact_description} />
                                    </div>
                                </div>
                                <div className="flex justify-center items-center h-full">
                                    {page?.data.impact_image && (
                                        <PrismicNextImage
                                            field={page.data.impact_image}
                                            className="w-64 h-64 object-contain"
                                            width={256}
                                            height={256}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="container mx-auto px-4 lg:px-8 py-20">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="text-3xl lg:text-4xl font-medium mb-6">
                            <PrismicRichText field={page?.data.cta_title} />
                        </div>
                        <div className="text-[20px] leading-relaxed mb-10">
                            <PrismicRichText field={page?.data.cta_description} />
                        </div>
                        <Link
                            href={(isFilled.link(page?.data.cta_button_link) ? page.data.cta_button_link.url : '/contact') ?? '/contact'}
                            className="inline-block bg-dark text-white text-[20px] px-10 py-4 rounded-2xl font-medium hover:bg-gray-800 transition-colors"
                        >
                            {page?.data.cta_button_text || 'Get in touch'}
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    )
}
