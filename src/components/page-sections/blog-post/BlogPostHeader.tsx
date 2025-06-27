import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Text, Badge, Heading } from '../../ui';
import type { BlogPost } from '../blog/types';

interface BlogPostHeaderProps {
  post: BlogPost;
}

export function BlogPostHeader({ post }: BlogPostHeaderProps) {
  // Determine header image source based on useLocalImage flag
  const headerImageSource = post.useLocalImage 
    ? `/images/blog/${post.id}/header.png`
    : post.image;

  return (
    <header className="border-b border-white/10" style={{ backgroundColor: '#000000' }}>
      <div className="pt-32 pb-12">
        <div className="mx-auto max-w-7xl px-6">
          {/* Back Link */}
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-[#B8D8D0] hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          {/* Title and Image Row */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 items-center">
            {/* Left Column - Title and Meta */}
            <div className="py-4">
              {/* Title */}
              <Heading level={1} className="text-4xl font-light mb-4 text-white" theme="dark">
                {post.title}
              </Heading>

              {/* Description */}
              <Text color="muted" className="text-lg mb-6 text-[#B8D8D0]" theme="dark">
                {post.description}
              </Text>

              {/* Author Info, Badge, and Date in a single line */}
              <div className="flex items-center gap-4 text-sm">
                <Text className="font-medium text-white" theme="dark">
                  {post.author.name}
                </Text>
                {post.category && (
                  <>
                    <div className="w-[1px] h-4 bg-white/20" />
                    <Badge 
                      variant="outline" 
                      theme="dark"
                      className="bg-white/10 backdrop-blur-sm border-[#B8D8D0] text-[#B8D8D0]"
                    >
                      {post.category}
                    </Badge>
                  </>
                )}
                <div className="w-[1px] h-4 bg-white/20" />
                <Text color="muted" className="text-[#B8D8D0]" theme="dark">
                  {post.date}
                </Text>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="rounded-lg overflow-hidden">
              <img
                src={headerImageSource}
                alt={post.title}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}