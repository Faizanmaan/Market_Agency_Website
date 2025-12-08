import BlogCard from '@/components/BlogCard'
import { createClient } from '@/prismicio'
import { PrismicDocument } from '@prismicio/client'

export default async function BlogsPage() {
    const client = createClient()

    // Fetch all blog posts from Prismic
    let blogPosts: PrismicDocument[] = []
    try {
        blogPosts = await client.getAllByType('blog_post', {
            orderings: [
                { field: 'my.blog_post.publish_date', direction: 'desc' }
            ]
        })
    } catch (error) {
        console.error('Error fetching blog posts:', error)
        // If blog_post type doesn't exist yet, blogPosts will remain empty array
    }

    // Format date helper
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
        <div className="container max-w-7xl mx-auto">
            {/* Hero Section */}
            <section className="container mx-auto px-4 lg:px-8 pb-8">
                <div className="max-w-3xl mx-auto text-center my-20">
                    <h1 className="text-3xl lg:text-4xl font-bold mb-6">Our Blog</h1>
                    <p className="text-base lg:text-xl text-gray-600 leading-relaxed">
                        We use an agile approach to test assumptions and connect with the needs of your audience early and often.
                    </p>
                </div>

                {/* Search Bar */}
                <form className="w-full">
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="Search articles..."
                            className="flex-1 px-6 py-3 border-2 border-dark rounded-lg outline-none text-sm bg-white"
                        />
                        <button
                            type="submit"
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
                </form>
            </section>

            {/* Blog Posts Grid */}
            <section className="container mx-auto px-4 lg:px-8 pb-4">
                {blogPosts.length === 0 ? (
                    <div className="text-center">
                        <p className="text-gray-600 text-lg">
                            No blog posts found. Please create blog posts in Prismic.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {blogPosts.map((post) => {
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
        </div>
    )
}
