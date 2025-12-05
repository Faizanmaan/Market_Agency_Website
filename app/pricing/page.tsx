import { createClient } from '@/prismicio'
import { PrismicRichText } from '@prismicio/react'
import PricingCard from '@/components/PricingCard'

export default async function PricingPage() {
    const client = createClient()
    const page = await client.getSingle('pricing').catch(() => null)

    // Map Prismic data to pricing tiers format
    const pricingTiers = page?.data.pricing_tiers?.map((tier: any) => {
        // Extract features from Rich Text field
        const features: string[] = []

        // Debug: log the features data structure
        console.log('Tier features:', JSON.stringify(tier.features, null, 2))

        if (tier.features && Array.isArray(tier.features)) {
            // Parse Rich Text blocks to extract text from paragraphs or list items
            tier.features.forEach((block: any) => {
                console.log('Block type:', block.type, 'Block text:', block.text)
                // Accept paragraphs, list items, or ordered list items
                if (block.type === 'paragraph' || block.type === 'list-item' || block.type === 'o-list-item') {
                    // Only add non-empty text
                    if (block.text && block.text.trim().length > 0) {
                        features.push(block.text)
                    }
                }
            })
        }

        console.log('Extracted features:', features)

        return {
            tier: tier.tier_name || '',
            description: tier.tier_description || '',
            price: tier.price || 0,
            features: features,
            isPopular: tier.is_popular || false,
        }
    }) || []

    return (
        <div className="container max-w-7xl mx-auto">
            {/* Hero Section */}
            <section className="container mx-auto px-4 lg:px-8 py-16 lg:py-20">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <div className="text-2xl lg:text-4xl font-bold mb-6">
                        <PrismicRichText field={page?.data.hero_title} />
                    </div>
                    <div className="text-base lg:text-xl text-gray-600 leading-relaxed">
                        <PrismicRichText field={page?.data.hero_description} />
                    </div>
                </div>
            </section>

            {/* Pricing Tiers Grid */}
            <section className="container mx-auto px-4 lg:px-8 pb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {pricingTiers.map((tier, index) => (
                        <PricingCard
                            key={index}
                            tier={tier.tier}
                            description={tier.description}
                            price={tier.price}
                            features={tier.features}
                            isPopular={tier.isPopular}
                        />
                    ))}
                </div>
            </section>
        </div>
    )
}
