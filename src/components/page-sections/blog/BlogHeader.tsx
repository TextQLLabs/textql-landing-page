import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Text, Badge, Heading } from '../../ui';
import { WaveBackground } from '../../animations';
import type { BlogPost } from './types';

interface BlogHeaderProps {
  featuredPost?: BlogPost;
}

export function BlogHeader({ featuredPost }: BlogHeaderProps) {
  // Determine image source based on useLocalImage flag
  const imageSource = featuredPost?.useLocalImage 
    ? `/images/blog/${featuredPost.id}/header.png`
    : featuredPost?.image;

  return (
    <div className="relative min-h-[600px] pt-20 bg-black">
      {/* Background */}
      <div className="absolute inset-0">
        <WaveBackground />
      </div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-[1fr,1.5fr] gap-16 items-center justify-center">
          {/* Left Content */}
          <div>
            <Heading level={1} className="text-6xl mb-6">
              TextQL Blog
            </Heading>
            <Text color="muted" className="text-xl max-w-xl">
              Insights and updates from our team on AI, data analysis, and the future of enterprise intelligence
            </Text>
          </div>

          {/* Featured Post */}
          {featuredPost && imageSource && (
            <Link
              to={`/blog/${featuredPost.id}`}
              className="group relative aspect-[16/9] overflow-hidden rounded-lg"
            >
              {/* Animated Border Effect */}
              <div className="absolute inset-0 z-30 pointer-events-none">
                <div className="absolute top-0 left-1/2 w-0 h-[1px] bg-[#B8D8D0] group-hover:w-full group-hover:left-0 transition-all duration-300" />
                <div className="absolute top-0 right-0 w-[1px] h-0 bg-[#B8D8D0] group-hover:h-full transition-all duration-300 delay-300" />
                <div className="absolute bottom-0 right-1/2 w-0 h-[1px] bg-[#B8D8D0] group-hover:w-full group-hover:right-0 transition-all duration-300 delay-600" />
                <div className="absolute bottom-0 left-0 w-[1px] h-0 bg-[#B8D8D0] group-hover:h-full transition-all duration-300 delay-900" />
              </div>

              {/* Background Image with Overlay */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
                <img
                  src={imageSource}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                <Badge 
                  variant="outline" 
                  className="mb-4 w-fit bg-[#B8D8D0]/10 backdrop-blur-sm"
                >
                  Featured Post
                </Badge>

                <Heading level={2} className="text-3xl font-light text-white mb-4 group-hover:text-[#B8D8D0] transition-colors">
                  {featuredPost.title}
                </Heading>

                <p className="text-[#B8D8D0]/80 mb-6 line-clamp-2 group-hover:text-white/90 transition-colors">
                  {featuredPost.description}
                </p>

                <div className="flex items-center gap-4 text-[#B8D8D0]">
                  <span className="text-sm">Read More</span>
                  <ArrowRight className="w-4 h-4 transform transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}