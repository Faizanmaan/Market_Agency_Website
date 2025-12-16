import { createClient } from '@/prismicio'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText } from '@prismicio/react'
import Link from "next/link"
import AnimatedLogos from '@/components/AnimatedLogos'

export default async function AboutPage() {
    const client = createClient()
    const page = await client.getSingle('homepage').catch(() => null)
    const aboutPage = await client.getSingle('about').catch(() => null)

    const services = page?.data.services.map((item: any) => {
        const bgColor = item.background_color || 'bg-gray-light'
        const isDarkBg = bgColor.includes('bg-dark') || bgColor.includes('bg-black')

        return {
            title: item.name,
            subtitle: item.subtitle,
            icon: item.icon,
            image: item.image,
            bgColor: bgColor,
            titleBgColor: item.title_background_color || 'bg-primary',
            border: 'border-dark',
            buttonTextColor: isDarkBg ? 'text-white' : 'text-dark',
        }
    }) || []

    const team = page?.data.team_members.map((item: any) => ({
        name: item.name,
        role: item.role,
        experience: item.experience,
        avatar: item.avatar,
    })) || []

    return (
        <div className="container max-w-7xl mx-auto">
            <section className="container mx-auto px-4 lg:px-8 py-16 lg:pt-15 lg:pb-5 mb-10">
                <div className="mx-auto text-center">
                    <div className="max-w-3xl mx-auto text-center text-5xl lg:text-6xl font-medium mb-6" style={{ fontFamily: 'Space Grotesk' }}>
                        <PrismicRichText field={aboutPage?.data.hero_title} />
                    </div>
                    <div className="text-xl font-normal leading-relaxed mb-8" style={{ fontFamily: 'Space Grotesk' }}>
                        <PrismicRichText field={aboutPage?.data.hero_description} />
                    </div>
                    <button className="btn-primary border text-xl font-normal">
                        {aboutPage?.data.hero_button_text || 'Book a consultation'}
                    </button>
                </div>
            </section>

            {(page?.data as any).client_logos && (page?.data as any).client_logos.length > 0 && (
                <div className="container mx-auto px-4 lg:px-8">
                    <AnimatedLogos logos={(page?.data as any).client_logos} />
                </div>
            )}

            <section className="container mx-auto px-4 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
                    <div className="section-heading text-4xl md:text-5xl">
                        <PrismicRichText field={page?.data.team_title} />
                    </div>
                    <div className="lg:w-[50%] xl:w-[40%] my-auto">
                        <div className="text-lg text-center md:text-left leading-6">
                            <PrismicRichText field={page?.data.team_description} />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-8">
                    {team.map((member: any, index: number) => (
                        <div key={index} className="border-2 border-b-8 border-dark rounded-[45px] p-8 relative">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-20 h-20 flex items-center justify-center flex-shrink-0 overflow-hidden">
                                    <PrismicNextImage
                                        field={member.avatar}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                                    <p className="font-medium">{member.role}</p>
                                </div>
                                <button className="ml-auto w-8 h-8 bg-dark text-white rounded-full flex items-center justify-center">
                                    in
                                </button>
                            </div>
                            <div className="border-t-2 border-dark pt-6">
                                <p className="text-sm">{member.experience}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section id="services" className="container mx-auto px-4 lg:px-8 py-8 mb-12">
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 mb-12">
                    <div
                        className="section-heading flex items-center justify-center"
                        style={{ width: '178px', height: '51px', fontSize: '40px', fontFamily: 'Space Grotesk' }}
                    >
                        <PrismicRichText field={page?.data.services_title} />
                    </div>
                    <div className="lg:w-[65%] xl:w-[55%] my-auto">
                        <div className="text-lg leading-6 text-center md:text-left" style={{ fontFamily: 'Space Grotesk', fontSize: '18px' }}>
                            <PrismicRichText field={page?.data.services_description} />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {services.map((service: any, index: number) => (
                        <div
                            key={index}
                            className={`
                                ${service.bgColor} ${service.border} ${service.textColor || 'text-dark'} 
                                border-2 border-b-8 rounded-[45px] p-6 md:p-8 
                                flex flex-col md:flex-row
                                gap-6 md:gap-8
                                h-full w-full
                                hover:shadow-lg transition-all overflow-hidden
                            `}
                        >
                            <div className="flex-1 flex flex-col justify-between h-full">
                                <div className="flex flex-col items-center md:items-start lg:mb-20">
                                    <h3
                                        className={`text-2xl xl:text-3xl font-semibold inline-block ${service.titleBgColor} px-2 py-1 rounded-[7px]`}
                                    >
                                        {service.title}
                                    </h3>
                                    {service.subtitle && (
                                        <h3 className={`text-2xl xl:text-3xl font-semibold inline-block ${service.titleBgColor} px-2 py-1 rounded-[7px]`}>{service.subtitle}</h3>
                                    )}
                                </div>

                                <Link
                                    href="/services/social-media-marketing"
                                    className={`flex items-center gap-3 ${service.buttonTextColor} rounded-full py-2.5 mt-10 md:mt-auto justify-center md:justify-start`}
                                >
                                    <span className="flex items-center justify-center w-9 h-9 bg-black text-dark rounded-full">
                                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0.750244 13.6953C0.0328052 14.1096 -0.213008 15.0269 0.201206 15.7444C0.61542 16.4618 1.53281 16.7076 2.25024 16.2934L1.50024 14.9944L0.750244 13.6953ZM20.2696 5.38261C20.4841 4.58241 20.0092 3.75991 19.209 3.5455L6.16898 0.0514389C5.36878 -0.162974 4.54628 0.3119 4.33186 1.1121C4.11745 1.9123 4.59233 2.7348 5.39253 2.94922L16.9836 6.05505L13.8778 17.6462C13.6634 18.4464 14.1383 19.2689 14.9385 19.4833C15.7387 19.6977 16.5612 19.2228 16.7756 18.4226L20.2696 5.38261ZM1.50024 14.9944L2.25024 16.2934L19.5708 6.29342L18.8208 4.99438L18.0708 3.69535L0.750244 13.6953L1.50024 14.9944Z" fill="#B9FF66" />
                                        </svg>
                                    </span>
                                    <span className="font-medium text-[20px]">Service Info</span>
                                </Link>
                            </div>

                            {service.image && (
                                <div className="flex-1 flex items-center justify-center md:justify-end">
                                    <PrismicNextImage
                                        field={service.image}
                                        className="object-contain w-36 h-36 md:w-44 md:h-44"
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
