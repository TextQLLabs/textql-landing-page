import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Text, Badge, Heading } from '../../ui';
import type { BlogPost } from '../blog/types';

interface BlogPostHeaderProps {
  post: BlogPost;
}

export function BlogPostHeader({ post }: BlogPostHeaderProps) {
  return (
    <header className="relative bg-black">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-transparent" />
      
      <div className="relative z-20 pt-24 pb-48">
        <div className="mx-auto max-w-3xl px-6">
          {/* Back Link */}
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-[#B8D8D0] hover:text-[#729E8C] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          {/* Title */}
          <Heading level={1} className="text-4xl font-light mb-4">
            {post.title}
          </Heading>

          {/* Description */}
          <Text color="muted" className="text-lg mb-6">
            {post.description}
          </Text>

          {/* Author Info, Badge, and Date in a single line */}
          <div className="flex items-center gap-4 text-sm">
            <Text className="font-medium">
              {post.author.name}
            </Text>
            {post.category && (
              <>
                <div className="w-[1px] h-4 bg-[#B8D8D0]/20" />
                <Badge 
                  variant="outline" 
                  className="bg-[#B8D8D0]/10 backdrop-blur-sm"
                >
                  {post.category}
                </Badge>
              </>
            )}
            <div className="w-[1px] h-4 bg-[#B8D8D0]/20" />
            <Text color="muted">
              {post.date}
            </Text>
          </div>
        </div>
      </div>
    </header>
  );
}