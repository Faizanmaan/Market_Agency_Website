import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/prismicio'
import { PrismicRichText } from '@prismicio/react'
import type { Metadata } from 'next'

interface BlogPostPageProps {
    params: {
        uid: string
    }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const client = createClient()

    try {
        const page = await client.getByUID('blog_post', params.uid)
        const data = page.data as any

        return {
            title: data.title?.[0]?.text || 'Blog Post',
            description: data.excerpt?.[0]?.text || '',
            openGraph: {
                images: data.featured_image?.url ? [data.featured_image.url] : [],
            },
        }
    } catch (error) {
        return {
            title: 'Blog Post Not Found',
        }
    }
}

// Generate static params for all blog posts
export async function generateStaticParams() {
    const client = createClient()

    try {
        const posts = await client.getAllByType('blog_post')
        return posts.map((post) => ({
            uid: post.uid,
        }))
    } catch (error) {
        return []
    }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const client = createClient()

    // Fetch the blog post by UID
    let page
    try {
        page = await client.getByUID('blog_post', params.uid)
    } catch (error) {
        notFound()
    }

    const data = page.data as any

    // Format date
    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'No date'
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    return (
        <div className="min-h-screen bg-white mt-20">
            {/* Back Navigation & Article Header */}
            <section className="container mx-auto px-4 lg:px-8 pt-12 pb-8">
                <div className="max-w-6xl mx-auto">
                    <Link
                        href="/blogs"
                        className="inline-flex items-center gap-2 text-dark hover:text-primary transition-colors font-medium mb-6"
                    >
                        <span className="text-base font-bold">←</span>
                        <span className="text-base font-bold">All Articles</span>
                    </Link>

                    <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                        {data.title?.[0]?.text || 'Untitled'}
                    </h1>

                    <p className="text-gray-600 mb-4">
                        Written by {data.author_name || 'Anonymous'} on {formatDate(data.publish_date)}
                    </p>

                    {data.tags && data.tags.length > 0 && (
                        <div className="flex gap-2 flex-wrap">
                            {data.tags.map((tagItem: any, index: number) => (
                                tagItem.tag && (
                                    <span
                                        key={index}
                                        className="text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
                                    >
                                        #{tagItem.tag}
                                    </span>
                                )
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Hero Image */}
            {data.featured_image?.url && (
                <section className="container mx-auto px-4 lg:px-8 pb-12">
                    <div className="max-w-6xl mx-auto">
                        <div className="rounded-2xl overflow-hidden">
                            <Image
                                src={data.featured_image.url}
                                alt={data.featured_image.alt || data.title?.[0]?.text || 'Blog post image'}
                                width={data.featured_image.dimensions?.width || 1200}
                                height={data.featured_image.dimensions?.height || 700}
                                className="w-full h-auto object-cover"
                                priority
                            />
                        </div>
                    </div>
                </section>
            )}

            {/* Article Content */}
            <article className="container mx-auto px-4 lg:px-8 pb-16">
                <div className="max-w-6xl mx-auto prose prose-lg">
                    <div className="blog-content">
                        <PrismicRichText field={data.content} />
                    </div>
                </div>
            </article>
        </div>
    )
}
