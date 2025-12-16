'use client'

import { useState } from 'react'
import BlogCard from '@/components/BlogCard'
import { PrismicDocument } from '@prismicio/client'

interface BlogListProps {
    posts: PrismicDocument[]
}

export default function BlogList({ posts }: BlogListProps) {
    const [searchQuery, setSearchQuery] = useState('')

    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'No date'
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    const filteredPosts = posts.filter((post) => {
        const data = post.data as any
        const title = data.title?.[0]?.text || ''
        const excerpt = data.excerpt?.[0]?.text || ''
        const query = searchQuery.toLowerCase()

        return title.toLowerCase().includes(query) || excerpt.toLowerCase().includes(query)
    })

    return (
        <>
            <section className="container mx-auto px-4 lg:px-8 pb-8">
                <div className="w-full">
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex-1 px-6 py-3 border-2 border-dark rounded-lg outline-none text-sm bg-white"
                        />
                        <button
                            className="bg-dark text-white p-3 rounded-lg hover:bg-primary hover:text-dark transition-colors flex items-center justify-center border-2 border-dark"
                            aria-label="Search"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-4 lg:px-8 pb-4">
                {filteredPosts.length === 0 ? (
                    <div className="text-center">
                        <p className="text-gray-600 text-lg">
                            {posts.length === 0
                                ? "No blog posts found. Please create blog posts in Prismic."
                                : "No articles found matching your search."}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {filteredPosts.map((post) => {
                            const data = post.data as any
                            return (
                                <BlogCard
                                    key={post.id}
                                    title={data.title?.[0]?.text || 'Untitled'}
                                    excerpt={data.excerpt?.[0]?.text || ''}
                                    author={data.author_name || 'Anonymous'}
                                    authorAvatar={data.author_avatar?.url || null}
                                    date={formatDate(data.publish_date)}
                                    badgeType={data.badge_type || 'Article'}
                                    slug={post.uid || ''}
                                />
                            )
                        })}
                    </div>
                )}
            </section>
        </>
    )
}
