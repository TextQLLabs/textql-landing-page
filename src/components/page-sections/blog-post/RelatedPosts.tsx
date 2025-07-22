import { Link } from 'react-router-dom';
import { Text, Heading, Section } from '../../ui';
import type { BlogPost } from '../blog/types';
import { blogPosts } from '../../../data/blog';

interface RelatedPostsProps {
  currentPostId: string;
  currentCategory?: string;
}

export function RelatedPosts({ currentPostId, currentCategory }: RelatedPostsProps) {
  // Get 3 related posts - prioritize same category, exclude current post
  const relatedPosts = blogPosts
    .filter(post => post.id !== currentPostId)
    .sort((a, b) => {
      // Prioritize same category
      if (currentCategory) {
        if (a.category === currentCategory && b.category !== currentCategory) return -1;
        if (b.category === currentCategory && a.category !== currentCategory) return 1;
      }
      // Then sort by date
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, 3);

  return (
    <Section
      variant="wide"
      padding="lg"
      background="white"
      as="section"
    >
        <Heading level={2} className="text-3xl font-light text-[#2A3B35] mb-12 text-center" theme="light">
          Related Articles
        </Heading>
        
        <div className="grid md:grid-cols-3 gap-8">
          {relatedPosts.map((post) => {
            const imageSource = post.useLocalImage 
              ? `/images/blog/${post.id}/header.png`
              : post.image;

            return (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="group block"
              >
                <div className="aspect-[16/9] overflow-hidden rounded-lg mb-4">
                  <img
                    src={imageSource}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                
                <Heading 
                  level={3} 
                  className="text-xl font-normal text-[#2A3B35] mb-2 group-hover:text-[#729E8C] transition-colors line-clamp-2"
                  theme="light"
                >
                  {post.title}
                </Heading>
                
                <Text className="text-sm text-[#4A665C] line-clamp-2 mb-3" theme="light">
                  {post.description}
                </Text>
                
                <div className="flex items-center gap-3 text-xs text-[#4A665C]">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
              </Link>
            );
          })}
        </div>
    </Section>
  );
}