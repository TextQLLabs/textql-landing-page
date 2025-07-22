import { Link } from 'react-router-dom';
import { Text, Badge, Heading } from '../../ui';
import type { BlogPost } from './types';
import { useComponentTheme } from '../../../hooks/useComponentTheme';
import { themeConditional } from '../../../utils/theme-utils';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const theme = useComponentTheme();
  // Determine image source based on useLocalImage flag
  const imageSource = post.useLocalImage 
    ? `/images/blog/${post.id}/header.png`
    : post.image;

  return (
    <Link
      to={`/blog/${post.id}`}
      className="group relative aspect-square overflow-hidden block"
    >
      {/* Animated Border Effect */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        <div className="absolute top-0 left-1/2 w-0 h-[1px] bg-[#2A3B35] group-hover:w-full group-hover:left-0 transition-all duration-300" />
        <div className="absolute top-0 right-0 w-[1px] h-0 bg-[#2A3B35] group-hover:h-full transition-all duration-300 delay-300" />
        <div className="absolute bottom-0 right-1/2 w-0 h-[1px] bg-[#2A3B35] group-hover:w-full group-hover:right-0 transition-all duration-300 delay-600" />
        <div className="absolute bottom-0 left-0 w-[1px] h-0 bg-[#2A3B35] group-hover:h-full transition-all duration-300 delay-900" />
      </div>

      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 bg-gradient-to-t ${themeConditional(theme, 'from-[#2A3B35]/80 via-[#2A3B35]/60', 'from-black/80 via-black/60')} to-transparent z-10`} />
        <img
          src={imageSource}
          alt={post.title}
          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-20 p-8 flex flex-col">
        <div className="flex-1" />

        {/* Bottom Content Stack */}
        <div className="space-y-4">
          {/* Title */}
          <Heading 
            level={4} 
            theme="light" 
            className="text-2xl font-light text-white group-hover:text-[#F0F5F3] transition-colors line-clamp-3"
          >
            {post.title}
          </Heading>

          {/* Description */}
          <p className="text-white/80 line-clamp-2 text-base group-hover:text-white/90 transition-colors">
            {post.description}
          </p>

          {/* Bottom Row */}
          <div className="flex items-center justify-between">
            {post.category && (
              <Badge 
                variant="outline" 
                theme="dark"
                className="bg-[#B8D8D0]/10 backdrop-blur-sm border-[#B8D8D0] text-[#B8D8D0] hover:bg-[#B8D8D0]/20"
              >
                {post.category}
              </Badge>
            )}
            
            <Text theme="light" className="text-white/80 text-sm">
              {post.date}
            </Text>
          </div>
        </div>
      </div>
    </Link>
  );
}