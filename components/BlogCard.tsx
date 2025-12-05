import Link from 'next/link'
import Image from 'next/image'

interface BlogCardProps {
    title: string
    excerpt: string
    author: string
    authorAvatar: string | null
    date: string
    badgeType?: 'Tutorial' | 'Article'
    slug: string
}

export default function BlogCard({
    title,
    excerpt,
    author,
    authorAvatar,
    date,
    badgeType,
    slug,
}: BlogCardProps) {
    return (
        <div
            className="bg-white border-2 border-dark rounded-[45px] p-6 transition-all flex flex-col h-full"
            style={{ boxShadow: '0px 8px 0px 0px rgba(0, 0, 0, 1)' }}
        >
            {/* Header: Badge and Date */}
            <div className="flex items-center justify-between mb-4">
                {badgeType && (
                    <span className="inline-flex items-center gap-1 bg-primary text-dark px-2 py-1 rounded text-xs font-semibold">
                        {badgeType === 'Tutorial' && (
                            <svg className="w-3 h-3" viewBox="0 0 16 16" fill="currentColor">
                                <rect x="2" y="4" width="10" height="8" rx="1" />
                                <path d="M12 6l2.5-1.5v7L12 10V6z" />
                            </svg>
                        )}
                        {badgeType === 'Article' && (
                            <svg className="w-3 h-3" viewBox="0 0 16 16" fill="currentColor">
                                <rect x="3" y="2" width="10" height="12" rx="1" fill="none" stroke="currentColor" strokeWidth="1" />
                                <line x1="5" y1="5" x2="11" y2="5" stroke="currentColor" strokeWidth="1" />
                                <line x1="5" y1="7" x2="11" y2="7" stroke="currentColor" strokeWidth="1" />
                                <line x1="5" y1="9" x2="9" y2="9" stroke="currentColor" strokeWidth="1" />
                            </svg>
                        )}
                        {badgeType}
                    </span>
                )}
                <span className="text-sm text-gray-text ml-auto">{date}</span>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold mb-3 line-clamp-2">{title}</h3>

            {/* Excerpt */}
            <p className="text-base text-gray-text mb-6 line-clamp-3 flex-grow">{excerpt}</p>

            {/* Footer: Author and Read More */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                        {authorAvatar ? (
                            <Image
                                src={authorAvatar}
                                alt={author}
                                width={32}
                                height={32}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-primary flex items-center justify-center text-dark text-xs font-bold">
                                {author.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>
                    <span className="text-sm font-medium">{author}</span>
                </div>
                <Link
                    href={`/blogs/${slug}`}
                    className="text-base font-medium text-dark hover:text-primary transition-colors inline-flex items-center gap-1"
                >
                    Read more
                    <svg width="24" height="13" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
                        <path d="M1 8H22M22 8L15 1M22 8L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Link>
            </div>
        </div>
    )
}
