import { createClient } from '@/prismicio'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText } from '@prismicio/react'
import Image from 'next/image'
import Link from 'next/link'
import ProcessSection from '@/components/ProcessSection'
import TestimonialsSection from '@/components/TestimonialsSection'

export default async function HomePage() {
  const client = createClient()
  const page = await client.getSingle('homepage').catch(() => null)

  const services = page?.data.services.map((item: any) => {
    const bgColor = item.background_color || 'bg-gray-light'
    // Determine if background is dark (bg-dark or bg-black)
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

  const workingProcess = page?.data.process_steps.map((item: any) => ({
    number: item.number,
    title: item.title,
    description: <PrismicRichText field={item.description} />,
  })) || []

  const team = page?.data.team_members.map((item: any) => ({
    name: item.name,
    role: item.role,
    experience: item.experience,
    avatar: item.avatar,
  })) || []

  const testimonials = page?.data.testimonials.map((item: any) => ({
    quote: <PrismicRichText field={item.quote} />,
    author: item.author,
    position: item.position,
  })) || []

  return (
    <div className='container max-w-7xl mx-auto'>
      {/* Hero Section */}
      <section className="container mx-auto px-4 lg:px-8 py-4 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="font-bold mb-6 leading-tight max-w-[1440px]" style={{ fontFamily: 'Space Grotesk', fontSize: '60px' }}>
              <PrismicRichText field={page?.data.hero_title} />
            </div>
            <div className="text-lg mb-8 text-gray-text" style={{ fontFamily: 'Space Grotesk', fontSize: '20px' }}>
              <PrismicRichText field={page?.data.hero_description} />
            </div>
            <button className="btn-primary h-[68px] w-[264px]">
              <p style={{ fontFamily: 'Space Grotesk', fontSize: '20px' }}>{page?.data.hero_button_text}</p>
            </button>
          </div>
          <div className="relative">
            {page?.data.hero_image && (
              <PrismicNextImage
                field={page.data.hero_image}
                className="w-full h-full object-contain"
                priority
              />
            )}
          </div>
        </div>

        {/* Client Logos */}
        {(page?.data as any).client_logos && (page?.data as any).client_logos.length > 0 && (
          <div className="mt-16 pb-6">
            <div className="flex flex-wrap justify-between items-center gap-8 grayscale opacity-60">
              {(page?.data as any).client_logos.map((client: any, index: number) => (
                client.logo?.url && (
                  <PrismicNextImage
                    key={index}
                    field={client.logo}
                    className="object-contain max-h-10"
                    alt={client.client_name || 'Client logo'}
                  />
                )
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Services Section */}
      <section id="services" className="container mx-auto px-4 lg:px-8 py-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 mb-12">
          <div
            className="section-heading flex items-center justify-center"
            style={{ width: '178px', height: '51px', fontSize: '40px', fontFamily: 'Space Grotesk' }}
          >
            <PrismicRichText field={page?.data.services_title} />
          </div>
          <div className="text-lg" style={{ fontFamily: 'Space Grotesk', fontSize: '18px' }}>
            <PrismicRichText field={page?.data.services_description} />
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service: any, index: number) => (
            <div
              key={index}
              className={`
          ${service.bgColor} ${service.border} ${service.textColor || 'text-dark'} 
          border-2 border-b-8 rounded-[45px] p-6 md:p-8 
          flex flex-col md:flex-row
          gap-6 md:gap-8
          h-[310px] w-full md:w-[600px]
          hover:shadow-lg transition-all overflow-hidden
        `}
            >
              {/* Left side: title + subtitle + button */}
              <div className="flex-1 flex flex-col justify-between h-full">
                <div>
                  <h3
                    className={`text-2xl lg:text-3xl font-semibold inline-block ${service.titleBgColor} px-2 py-1 rounded-lg`}
                  >
                    {service.title}
                  </h3>
                  {service.subtitle && (
                    <h3 className={`text-2xl lg:text-3xl font-semibold inline-block ${service.titleBgColor} px-2 py-1 rounded-lg`}>{service.subtitle}</h3>
                  )}
                </div>

                {/* Learn more button */}
                <Link
                  href="/services/social-media-marketing"
                  className={`flex items-center gap-3 ${service.buttonTextColor} rounded-full px-5 py-2.5 mt-auto`}
                >
                  <span className="flex items-center justify-center w-9 h-9 bg-black text-dark rounded-full">
                    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.750244 13.6953C0.0328052 14.1096 -0.213008 15.0269 0.201206 15.7444C0.61542 16.4618 1.53281 16.7076 2.25024 16.2934L1.50024 14.9944L0.750244 13.6953ZM20.2696 5.38261C20.4841 4.58241 20.0092 3.75991 19.209 3.5455L6.16898 0.0514389C5.36878 -0.162974 4.54628 0.3119 4.33186 1.1121C4.11745 1.9123 4.59233 2.7348 5.39253 2.94922L16.9836 6.05505L13.8778 17.6462C13.6634 18.4464 14.1383 19.2689 14.9385 19.4833C15.7387 19.6977 16.5612 19.2228 16.7756 18.4226L20.2696 5.38261ZM1.50024 14.9944L2.25024 16.2934L19.5708 6.29342L18.8208 4.99438L18.0708 3.69535L0.750244 13.6953L1.50024 14.9944Z" fill="#B9FF66" />
                    </svg>
                  </span>
                  <span className="font-medium text-[20px]">Learn more</span>
                </Link>
              </div>

              {/* Right side: image - centered vertically */}
              {service.image && (
                <div className="flex-1 flex items-center justify-end">
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

      <section className="container mx-auto px-4 lg:px-8 ">
        <div className="bg-gray-light rounded-[45px] px-5 sm:px-8 lg:px-14 py-10 lg:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">

            {/* Left Content */}
            <div className="text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-snug">
                Let's make things happen
              </h2>

              <p className="text-sm sm:text-base mb-6 sm:mb-8">
                Contact us today to learn more about how our digital marketing services
                can help your business grow and succeed online.
              </p>

              <div className="flex justify-center lg:justify-start">
                <button className="btn-primary">
                  Get your free proposal
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex justify-center lg:justify-end">
              <Image
                src="/cta-illustration.png"
                alt="Let's make things happen"
                width={359}
                height={394}
                className="object-contain 
                    w-52 sm:w-64 md:w-72 lg:w-[359px]"
              />
            </div>

          </div>
        </div>
      </section>


      {/* Case Studies Section */}
      <section id="cases" className="container mx-auto px-4 lg:px-8 py-16">
        <div className="flex items-center gap-8 mb-12">
          <div className="section-heading text-4xl lg:text-5xl" style={{ fontFamily: 'Space Grotesk', fontSize: '40px' }}>
            <PrismicRichText field={page?.data.case_studies_title} />
          </div>
          <div className="text-lg" style={{ fontFamily: 'Space Grotesk', fontSize: '18px' }}>
            <PrismicRichText field={page?.data.case_studies_description} />
          </div>
        </div>

        <div className="bg-dark rounded-[45px] p-12 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {page?.data.case_studies.map((item: any, index: number) => (
              <div key={index} className={`border-b md:border-b-0 md:border-r border-primary pb-8 md:pb-0 md:pr-8 ${index === 2 ? 'border-none' : ''}`}>
                <div className="mb-4">
                  <PrismicRichText field={item.description} />
                </div>
                <button className="text-primary hover:underline">Learn more →</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Working Process Section */}
      <section className="container mx-auto px-4 lg:px-8 py-16">
        <div className="flex items-center gap-8 mb-12">
          <div className="section-heading text-4xl lg:text-5xl" style={{ fontFamily: 'Space Grotesk', fontSize: '40px' }}>
            <PrismicRichText field={page?.data.process_title} />
          </div>
          <div className="text-lg" style={{ fontFamily: 'Space Grotesk', fontSize: '18px' }}>
            <PrismicRichText field={page?.data.process_description} />
          </div>
        </div>

        <ProcessSection items={workingProcess} />
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4 lg:px-8 py-16">
        <div className="flex items-center gap-8 mb-12">
          <div className="section-heading text-4xl lg:text-5xl">
            <PrismicRichText field={page?.data.team_title} />
          </div>
          <div className="text-lg">
            <PrismicRichText field={page?.data.team_description} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
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

        <div className="flex justify-end">
          <button className="bg-dark text-white px-8 py-4 rounded-xl font-medium hover:bg-opacity-90 transition-all">See all team</button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 lg:px-8 py-16">
        <div className="flex items-center gap-8 mb-12">
          <div className="section-heading text-4xl lg:text-5xl">
            <PrismicRichText field={page?.data.testimonials_title} />
          </div>
          <div className="text-lg">
            <PrismicRichText field={page?.data.testimonials_description} />
          </div>
        </div>

        <TestimonialsSection items={testimonials} />
      </section>


      {/* Contact Section */}
      <section id="contact" className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-8 mb-12">
          <h2 className="section-heading text-3xl sm:text-4xl lg:text-5xl mb-4 lg:mb-0">
            Contact Us
          </h2>
          <p className="text-base sm:text-lg">
            Connect with Us: Let's Discuss Your Digital Marketing Needs
          </p>
        </div>

        <div className="bg-gray-light rounded-[45px] p-6 sm:p-8 lg:p-12 overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Form */}
            <form className="space-y-5 relative z-10">
              {/* Radio Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <div className="relative flex items-center">
                    <input
                      type="radio"
                      name="contactType"
                      value="hi"
                      defaultChecked
                      className="peer h-5 w-5 appearance-none rounded-full border border-dark bg-white transition-all cursor-pointer"
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary scale-0 peer-checked:scale-100 transition-transform"></div>
                    </div>
                  </div>
                  <span className="text-base">Say Hi</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <div className="relative flex items-center">
                    <input
                      type="radio"
                      name="contactType"
                      value="quote"
                      className="peer h-5 w-5 appearance-none rounded-full border border-dark bg-white transition-all cursor-pointer"
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary scale-0 peer-checked:scale-100 transition-transform"></div>
                    </div>
                  </div>
                  <span className="text-base">Get a Quote</span>
                </label>
              </div>

              {/* Name */}
              <div>
                <label className="block mb-1.5 text-sm font-medium">Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full px-5 py-3.5 rounded-2xl border border-dark bg-white focus:outline-none focus:ring-2 focus:ring-dark"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block mb-1.5 text-sm font-medium">Email*</label>
                <input
                  type="email"
                  placeholder="Email"
                  required
                  className="w-full px-5 py-3.5 rounded-2xl border border-dark bg-white focus:outline-none focus:ring-2 focus:ring-dark"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block mb-1.5 text-sm font-medium">Message*</label>
                <textarea
                  placeholder="Message"
                  required
                  rows={5}
                  className="w-full px-5 py-3.5 rounded-2xl border border-dark bg-white focus:outline-none focus:ring-2 focus:ring-dark resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-dark text-white py-4 rounded-2xl font-medium hover:bg-opacity-90 transition-all mt-6"
              >
                Send Message
              </button>
            </form>

            {/* Right Decorative Illustration */}
            <div className="relative hidden lg:flex items-center justify-end w-full">
              <Image
                src="/contact-illustration.png"
                alt="Contact illustration"
                width={400}
                height={600}
                className="object-contain max-h-[600px] absolute right-0"
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
