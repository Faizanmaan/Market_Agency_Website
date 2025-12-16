import { createClient } from '@/prismicio'
import { PrismicRichText, PrismicImage, PrismicLink } from '@prismicio/react'
import Image from 'next/image'

export default async function SocialMediaMarketingPage() {
    const client = createClient()
    const page = await client.getSingle('social_media_marketing').catch(() => null)

    if (!page) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <p className="text-xl text-gray-600">Content not available. Please add content in Prismic.</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="container max-w-7xl mx-auto">
                <section className="container max-w-7xl mx-auto px-4 lg:px-8 py-16 lg:py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="text-3xl lg:text-[35px] font-bold mb-6 leading-tight">
                                <PrismicRichText field={page.data.hero_title} />
                            </div>
                            <div className="text-xl font-light text-[#191A23] mb-8 max-w-lg">
                                <PrismicRichText field={page.data.hero_description} />
                            </div>
                            {page.data.hero_button_text && (
                                <PrismicLink
                                    field={page.data.hero_button_link}
                                    className="border border-dark px-8 py-3 rounded-[5.25px] text-sm font-semibold hover:bg-dark hover:text-white transition-colors inline-block"
                                >
                                    {page.data.hero_button_text}
                                </PrismicLink>
                            )}
                        </div>
                        <div className="flex justify-center lg:justify-end">
                            {page.data.hero_image?.url && (
                                <PrismicImage
                                    field={page.data.hero_image}
                                    className="w-full max-w-lg object-contain"
                                />
                            )}
                        </div>
                    </div>
                </section>

                <section className="container max-w-7xl mx-auto px-4 lg:px-8 py-12">
                    <div className="overflow-hidden">
                        <div className="w-full bg-primary py-3 rounded-lg">
                            <div className="flex gap-4 items-center whitespace-nowrap text-dark font-bold text-xs tracking-widest px-8 lg:ml-[250px]">
                                <span>SERVICES</span>
                                <Image src="/separator-icon.png" alt="" width={12} height={12} className="inline-block" />
                                <span>CASE STUDIES</span>
                                <Image src="/separator-icon.png" alt="" width={12} height={12} className="inline-block" />
                                <span>CLIENTS</span>
                                <Image src="/separator-icon.png" alt="" width={12} height={12} className="inline-block" />
                            </div>
                        </div>

                        <div className="bg-black rounded-lg p-6 lg:p-6 relative">
                            <div className="relative z-10 flex flex-col items-center text-center max-w-[860px] mx-auto">
                                <div className="text-xl lg:text-[44px] font-bold mb-4 text-white leading-tight">
                                    {(() => {
                                        const philosophyTitle = page.data.philosophy_title as any;
                                        const titleText = philosophyTitle?.[0]?.text || '';

                                        const parts = titleText.split(/([+=])/);

                                        return (
                                            <h2 className="text-white">
                                                {parts.map((part: string, index: number) => {
                                                    if (part === '+' || part === '=') {
                                                        return (
                                                            <span key={index} className="text-primary">
                                                                {part}
                                                            </span>
                                                        );
                                                    }
                                                    return <span key={index}>{part}</span>;
                                                })}
                                            </h2>
                                        );
                                    })()}
                                </div>
                                <div className="text-white text-sm lg:text-base leading-relaxed mb-5">
                                    <PrismicRichText field={page.data.philosophy_description} />
                                </div>
                            </div>

                            <div className="absolute right-4 top-16 -translate-y-1/2 grid grid-cols-6 gap-3 opacity-40">
                                {[...Array(42)].map((_, i) => (
                                    <div key={i} className="w-2 h-2 bg-white rounded-full"></div>
                                ))}
                            </div>

                            <div className="absolute left-2 -bottom-10 grid grid-cols-6 gap-4 opacity-40">
                                {[...Array(30)].map((_, i) => (
                                    <div key={i} className="w-2 h-2 bg-white rounded-full"></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="container lg:max-w-[80%] mx-auto px-4 lg:px-8 py-16">
                    <h2 className="text-[26px] font-bold inline-block relative z-10 mb-16">
                        <span className="relative inline-block">
                            <PrismicRichText field={page.data.services_title} />
                            <span className="absolute bottom-2 left-0 w-full lg:w-[112%] h-3 bg-primary -z-10"></span>
                        </span>
                    </h2>

                    {page.data.service_icons && page.data.service_icons.length > 0 && (
                        <div className="flex justify-between max-w-3xl mx-auto text-center">
                            {page.data.service_icons.map((icon: any, index: number) => (
                                <div key={index} className="flex flex-col items-center gap-3">
                                    {icon.icon_image?.url && (
                                        <PrismicImage field={icon.icon_image} className="w-14 h-14" />
                                    )}
                                    <span className="font-semibold text-xl">{icon.icon_label}</span>
                                    <div className="w-7 h-7 rounded-full border-dark bg-gray-200 hover:bg-primary hover:border transition-colors flex items-center justify-center cursor-pointer">
                                        <svg width="14" height="7" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-[2px]">
                                            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {page.data.service_sections && page.data.service_sections.slice(0, 2).map((section: any, index: number) => (
                    <section key={index} className="container lg:max-w-[80%] mx-auto px-4 lg:px-8 py-12">
                        <div className="bg-primary px-6 w-full mb-8">
                            <h3 className="text-[23px] font-semibold text-black">{section.section_title}</h3>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start text-xs">
                            <div>
                                <div className="mb-8 text-[#1D2327] leading-relaxed">
                                    <PrismicRichText field={section.section_description} />
                                </div>
                                <PrismicRichText
                                    field={section.section_features}
                                    components={{
                                        list: ({ children }) => (
                                            <ul className="columns-2 gap-x-12 space-y-2">{children}</ul>
                                        ),
                                        oList: ({ children }) => (
                                            <ul className="columns-2 gap-x-12 space-y-2">{children}</ul>
                                        ),
                                        listItem: ({ children }) => <li className="text-xs break-inside-avoid">• {children}</li>,
                                        oListItem: ({ children }) => <li className="text-xs break-inside-avoid">• {children}</li>,
                                    }}
                                />
                            </div>
                            <div className="rounded-xl overflow-hidden">
                                {section.section_image?.url && (
                                    <PrismicImage
                                        field={section.section_image}
                                        className="w-full h-auto object-cover"
                                    />
                                )}
                            </div>
                        </div>
                    </section>
                ))}

                {(page.data as any).partner_logo?.url && (
                    <section className="container lg:max-w-[80%] mx-auto px-4 lg:px-8 py-12">
                        <div className="bg-dark rounded-[30px] p-8 lg:p-12 flex flex-col lg:flex-row justify-between items-center gap-8 relative overflow-hidden">
                            <div className="absolute left-0 top-0 bottom-0 w-24 grid grid-cols-6 gap-2 opacity-30 z-0">
                                {[...Array(60)].map((_: any, i: number) => (
                                    <div key={i} className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                ))}
                            </div>

                            <div className="relative z-10 flex-1 px-8 lg:px-16">
                                <p className="text-2xl lg:text-3xl text-white italic leading-relaxed" style={{ fontFamily: 'cursive' }}>
                                    {(() => {
                                        const text = `${page.data.partner_text_line1} ${page.data.partner_text_line2}`;
                                        const parts = text.split(/(social media marketing)/gi);

                                        return parts.map((part: string, index: number) => {
                                            if (part.toLowerCase() === 'social media marketing') {
                                                return <span key={index} className="text-primary">{part}</span>;
                                            }
                                            return <span key={index}>{part}</span>;
                                        });
                                    })()}
                                </p>
                            </div>

                            <div className="relative z-10 flex items-center gap-6 pr-8 lg:pr-16">
                                <PrismicLink field={page.data.partner_link} className="flex items-center gap-6">
                                    {(page.data as any).partner_logo?.url && (
                                        <PrismicImage
                                            field={(page.data as any).partner_logo}
                                            className="w-[101px] h-[72px] object-contain px-4"
                                        />
                                    )}
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 20H32M32 20L24 12M32 20L24 28" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </PrismicLink>
                            </div>

                            <div className="absolute right-0 top-0 bottom-0 w-24 grid grid-cols-6 gap-2 opacity-30 z-0">
                                {[...Array(60)].map((_: any, i: number) => (
                                    <div key={i} className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {page.data.service_sections && page.data.service_sections.slice(2).map((section: any, index: number) => (
                    <section key={index + 2} className="container lg:max-w-[80%] mx-auto px-4 lg:px-8 py-12">
                        <div className="bg-primary px-6 w-full mb-8">
                            <h3 className="text-[24px] font-bold text-black">{section.section_title}</h3>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start text-xs">
                            <div>
                                <div className="mb-8 text-[#1D2327] leading-relaxed">
                                    <PrismicRichText field={section.section_description} />
                                </div>
                                <PrismicRichText
                                    field={section.section_features}
                                    components={{
                                        list: ({ children }) => (
                                            <ul className="columns-2 gap-x-12 space-y-2">{children}</ul>
                                        ),
                                        oList: ({ children }) => (
                                            <ul className="columns-2 gap-x-12 space-y-2">{children}</ul>
                                        ),
                                        listItem: ({ children }) => <li className="text-xs break-inside-avoid">• {children}</li>,
                                        oListItem: ({ children }) => <li className="text-xs break-inside-avoid">• {children}</li>,
                                    }}
                                />
                            </div>
                            <div className="rounded-xl overflow-hidden">
                                {section.section_image?.url && (
                                    <PrismicImage
                                        field={section.section_image}
                                        className="w-full h-auto object-cover"
                                    />
                                )}
                            </div>
                        </div>
                    </section>
                ))}
            </div>

            {page.data.case_studies && page.data.case_studies.length > 0 && (
                <section className="bg-gray-100 py-16">
                    <div className="container max-w-5xl mx-auto px-4 lg:px-8">
                        <h2 className="text-[27px] font-bold inline-block relative z-10 mb-16">
                            <span className="relative inline-block">
                                <PrismicRichText field={page.data.case_studies_title} />
                                <span className="absolute bottom-2 left-0 h-3 bg-primary -z-10"></span>
                            </span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                            {page.data.case_studies.slice(0, 3).map((study: any, index: number) => (
                                <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm">
                                    <div className="h-[184px] w-full relative overflow-hidden">
                                        {study.case_study_image?.url ? (
                                            <PrismicImage
                                                field={study.case_study_image}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : null}
                                    </div>
                                    <div className="py-2 px-4">
                                        <span className="text-xs text-[#171616] uppercase tracking-wider underline underline-offset-4 decoration-gray-500">
                                            {study.case_study_category}
                                        </span>
                                        <h3 className="font-bold mb-2 text-[15px]">{study.case_study_name}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center gap-2">
                            {[...Array(8)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-dark' : 'bg-gray-300'}`}
                                ></div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <section className="container max-w-7xl mx-auto px-4 lg:px-8 py-16">
                <div className="bg-black text-white rounded-[45px] p-12 lg:p-16 text-center">
                    <div className="text-3xl lg:text-4xl font-bold mb-6">
                        {(() => {
                            const ctaTitle = page.data.cta_title as any;
                            const titleText = ctaTitle?.[0]?.text || '';
                            const words = titleText.split(' ');

                            return (
                                <h2>
                                    {words.map((word: string, index: number) => (
                                        <span
                                            key={index}
                                            className={index % 2 === 0 ? 'text-white' : 'text-primary'}
                                        >
                                            {word}{index < words.length - 1 ? ' ' : ''}
                                        </span>
                                    ))}
                                </h2>
                            );
                        })()}
                    </div>
                    <div className="text-gray-300 text-sm font-normal mb-8 max-w-2xl mx-auto leading-relaxed">
                        <PrismicRichText field={page.data.cta_description} />
                    </div>
                    {page.data.cta_button_text && (
                        <PrismicLink
                            field={page.data.cta_button_link}
                            className="border border-white px-8 py-3 rounded-md text-[13px] font-semibold hover:bg-white hover:text-dark transition-colors inline-block"
                        >
                            {page.data.cta_button_text}
                        </PrismicLink>
                    )}
                </div>
            </section>

            {page.data.client_logos && page.data.client_logos.length > 0 && (
                <section className="container lg:max-w-[70%] mx-auto px-4 lg:px-8">
                    <div className="mb-4 lg:ml-[10%]">
                        <h2 className="text-[27px] mb-8 font-bold inline-block relative z-10">
                            <span className="relative inline-block">
                                <PrismicRichText field={page.data.clients_title} />
                                <span className="absolute bottom-2 left-0 w-full lg:w-[112%] h-3 bg-primary -z-10"></span>
                            </span>
                        </h2>
                    </div>
                    <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-28 max-w-6xl mx-auto">
                        {page.data.client_logos.map((client: any, index: number) => (
                            client.client_logo?.url && (
                                <PrismicImage
                                    key={index}
                                    field={client.client_logo}
                                    className="object-contain max-w-[150px] max-h-[60px]"
                                />
                            )
                        ))}
                    </div>
                </section>
            )}
        </div>
    )
}
