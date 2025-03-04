import { useParams } from 'react-router-dom';
import { BlogPostHeader, BlogPostContent } from '../../components/page-sections/blog-post';
import { Text } from '../../components/ui';
import { blogPosts, getPostContent } from '../../data/blog';
import { SEO } from '../../components/SEO';

export default function BlogPost() {
  const { id } = useParams();
  
  // Find matching post
  const post = blogPosts.find(p => p.id === id);
  const content = id ? getPostContent(id) : null;

  if (!post || !content) {
    return (
      <div className="min-h-screen bg-black pt-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Text variant="header" className="text-4xl mb-6">
            Blog Post Not Found
          </Text>
        </div>
      </div>
    );
  }

  // Determine image source based on useLocalImage flag
  const imageSource = post.useLocalImage 
    ? `https://textql.com/images/blog/${post.id}/header.png`
    : post.image;

  return (
    <div className="min-h-screen">
      <SEO 
        title={`${post.title} | TextQL Blog`}
        description={post.description}
        canonical={`https://textql.com/blog/${post.id}`}
        ogImage={imageSource}
        ogType="article"
      />
      <BlogPostHeader post={post} />
      <BlogPostContent content={content} post={post} />
    </div>
  );
}