import { useParams } from 'react-router-dom';
import { 
  BlogPostHeader, 
  BlogPostContent, 
  TableOfContents,
  RelatedPosts
} from '../../components/page-sections/blog-post';
import { Text, Section } from '../../components/ui';
import { blogPosts, getPostContent } from '../../data/blog';
import { SEO } from '../../components/SEO';
import { CTA } from '../../components/sections';
import { useComponentTheme } from '../../hooks/useComponentTheme';

export default function BlogPost() {
  const { id } = useParams();
  const theme = useComponentTheme();
  
  // Find matching post
  const post = blogPosts.find(p => p.id === id);
  const content = id ? getPostContent(id) : null;

  if (!post || !content) {
    return (
      <Section
        variant="narrow"
        padding="md"
        height="min-screen"
        hasNavbarOffset={true}
        background="secondary"
        className="flex items-center"
      >
        <div className="text-center">
          <Text variant="header" className="text-4xl mb-6 text-[#2A3B35]">
            Blog Post Not Found
          </Text>
        </div>
      </Section>
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
      <Section
        variant="wide"
        padding="sm"
        background="transparent"
      >
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
      </Section>
      
      {/* Related Posts */}
      <RelatedPosts currentPostId={post.id} currentCategory={post.category} />
      
      {/* CTA Section */}
      <CTA 
        theme={theme}
        showWave={true}
        heading="Ready to Transform Your Data Analysis?"
        subheader="Join leading enterprises using TextQL to unlock insights from their data"
      />
    </div>
  );
}