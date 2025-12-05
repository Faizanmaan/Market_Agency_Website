import Link from 'next/link'

interface TeamMemberCardProps {
    name: string
    role: string
    bio: string
    avatar: string
    linkedInUrl?: string
}

export default function TeamMemberCard({
    name,
    role,
    bio,
    avatar,
    linkedInUrl = '#',
}: TeamMemberCardProps) {
    return (
        <div className="bg-white border-2 border-dark rounded-[45px] p-8 relative hover:shadow-lg transition-all">
            {/* Avatar and Info Header */}
            <div className="flex items-start gap-4 mb-6">
                {/* Circular Avatar */}
                <div className="w-20 h-20 bg-primary flex items-center justify-center text-4xl flex-shrink-0 border-2 border-dark">
                    {avatar}
                </div>

                {/* Name and Role */}
                <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-1">{name}</h3>
                    <p className="font-medium text-dark/80">{role}</p>
                </div>

                {/* LinkedIn Icon */}
                <Link
                    href={linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-dark text-white rounded-full flex items-center justify-center hover:bg-primary hover:text-dark transition-all flex-shrink-0"
                    aria-label={`${name}'s LinkedIn profile`}
                >
                    <span className="text-xs font-bold">in</span>
                </Link>
            </div>

            {/* Bio */}
            <div className="border-t-2 border-dark pt-6">
                <p className="text-sm leading-relaxed text-dark/90">{bio}</p>
            </div>
        </div>
    )
}
