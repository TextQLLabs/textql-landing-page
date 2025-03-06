import { BlogHeader, BlogGrid } from '../../components/page-sections/blog';
import { blogPosts } from '../../data/blog';
import { SEO } from '../../components/SEO';

export default function Blog() {
  // Find featured post
  const featuredPost = blogPosts.find(post => post.featured);

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Blog | TextQL"
        description="Insights and updates from our team on AI, data analysis, and the future of enterprise intelligence"
        canonical="https://textql.com/blog/"
        ogImage="https://textql.com/social-preview.png"
      />
      
      {/* Hero Section */}
      <BlogHeader featuredPost={featuredPost} />

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <BlogGrid posts={blogPosts} />
      </div>
    </div>
  );
}