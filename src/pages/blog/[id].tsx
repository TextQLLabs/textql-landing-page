import { useParams } from 'react-router-dom';
import { 
  BlogPostHeader, 
  BlogPostContent, 
  TableOfContents,
  RelatedPosts
} from '../../components/page-sections/blog-post';
import { Text } from '../../components/ui';
import { blogPosts, getPostContent } from '../../data/blog';
import { SEO } from '../../components/SEO';
import { CTA } from '../../components/sections';

export default function BlogPost() {
  const { id } = useParams();
  
  // Find matching post
  const post = blogPosts.find(p => p.id === id);
  const content = id ? getPostContent(id) : null;

  if (!post || !content) {
    return (
      <div className="min-h-screen bg-[#F0F5F3] pt-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Text variant="header" className="text-4xl mb-6 text-[#2A3B35]">
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
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title={`${post.title} | TextQL Blog`}
        description={post.description}
        canonical={`https://textql.com/blog/${post.id}/`}
        ogImage={imageSource}
        ogType="article"
      />
      
      {/* Header - simplified without large image */}
      <BlogPostHeader post={post} />
      
      {/* Main Content with Sidebar */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
          {/* Main Article */}
          <div className="min-w-0">
            <BlogPostContent content={content} post={post} />
          </div>
          
          {/* Sticky Sidebar */}
          <aside className="hidden lg:block">
            <TableOfContents />
          </aside>
        </div>
      </div>
      
      {/* Related Posts */}
      <RelatedPosts currentPostId={post.id} currentCategory={post.category} />
      
      {/* CTA Section */}
      <CTA 
        theme="dark"
        showWave={true}
        heading="Ready to Transform Your Data Analysis?"
        subheader="Join leading enterprises using TextQL to unlock insights from their data"
      />
    </div>
  );
}