export default function CaseStudyPage({ params }: { params: { uid: string } }) {
    return (
        <div className="min-h-screen bg-white">
            <section className="container mx-auto px-4 lg:px-8 py-16 lg:py-20">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-4xl lg:text-5xl font-bold mb-6 capitalize">
                        {params.uid.replace(/-/g, ' ')} Case Study
                    </h1>
                    <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
                        Detailed exploration of how we helped this client achieve their digital marketing goals.
                    </p>
                </div>
            </section>

            <section className="container mx-auto px-4 lg:px-8 pb-20">
                <div className="max-w-4xl mx-auto">
                    <div className="prose prose-lg max-w-none">
                        <p className="text-gray-700 leading-relaxed mb-6">
                            This is a placeholder for the case study content. It follows the same design system and alignment as the Services page, ensuring a consistent user experience across the website.
                        </p>
                        <div className="bg-gray-50 rounded-[45px] p-12 lg:p-16 my-12 border border-dark">
                            <h2 className="text-2xl lg:text-3xl font-bold mb-6">Key Results</h2>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3">
                                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                                    <span>Result 1: Significant improvement in metrics</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                                    <span>Result 2: Increased user engagement</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                                    <span>Result 3: Better conversion rates</span>
                                </li>
                            </ul>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                            More detailed content about the challenges, solutions, and impact would go here.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}
