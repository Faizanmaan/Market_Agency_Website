import { createClient } from '@/prismicio'
import { PrismicDocument } from '@prismicio/client'
import BlogList from '@/components/BlogList'

export default async function BlogsPage() {
    const client = createClient()
    let blogPosts: PrismicDocument[] = []
    try {
        blogPosts = await client.getAllByType('blog_post', {
            orderings: [
                { field: 'my.blog_post.publish_date', direction: 'desc' }
            ]
        })
    } catch (error) {
        console.error('Error fetching blog posts:', error)
    }

    return (
        <div className="container max-w-7xl mx-auto">
            <section className="container mx-auto px-4 lg:px-8 pb-8">
                <div className="max-w-3xl mx-auto text-center my-20">
                    <h1 className="text-3xl lg:text-4xl font-bold mb-6">Our Blog</h1>
                    <p className="max-w-[82%] mx-auto text-lg font-light lg:text-xl leading-relaxed">
                        We use an agile approach to test assumptions and connect with the needs of your audience early and often.
                    </p>
                </div>
            </section>
            <BlogList posts={blogPosts} />
        </div>
    )
}