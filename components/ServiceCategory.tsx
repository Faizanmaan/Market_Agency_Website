import Image from 'next/image'

interface ServiceCategoryProps {
    title: string
    description: string
    services: string[]
    imageUrl?: string
    imageEmoji?: string
    isReversed?: boolean
}

export default function ServiceCategory({
    title,
    description,
    services,
    imageUrl,
    imageEmoji,
    isReversed = false,
}: ServiceCategoryProps) {
    const midPoint = Math.ceil(services.length / 2)
    const leftColumn = services.slice(0, midPoint)
    const rightColumn = services.slice(midPoint)

    return (
        <div className="mb-16">
            <div className="bg-primary px-6 py-3 mb-8 w-full">
                <h3 className="text-2xl font-bold">{title}</h3>
            </div>
            <div className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 items-start`}>
                <div className="flex-1 w-full">
                    <p className="text-gray-text mb-8 leading-relaxed">
                        {description}
                    </p>
                    <div className="grid grid-cols-2 gap-x-12 gap-y-2">
                        <div className="space-y-2">
                            {leftColumn.map((service, index) => (
                                <div key={index} className="flex items-start gap-2">
                                    <span className="text-primary text-xl leading-none mt-1">•</span>
                                    <span className="text-dark font-medium text-sm">{service}</span>
                                </div>
                            ))}
                        </div>
                        <div className="space-y-2">
                            {rightColumn.map((service, index) => (
                                <div key={index} className="flex items-start gap-2">
                                    <span className="text-primary text-xl leading-none mt-1">•</span>
                                    <span className="text-dark font-medium text-sm">{service}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex-1 w-full flex justify-center lg:justify-end">
                    <div className="w-full max-w-md aspect-[4/3] bg-gray-100 rounded-2xl flex items-center justify-center border-2 border-dark relative overflow-hidden">
                        {imageUrl ? (
                            <Image
                                src={imageUrl}
                                alt={title}
                                fill
                                className="object-cover"
                            />
                        ) : imageEmoji ? (
                            <span role="img" aria-label={title} className="text-9xl">{imageEmoji}</span>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    )
}
