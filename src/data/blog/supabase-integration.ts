import type { BlogPost } from '../../components/page-sections/blog/types';

export const post: BlogPost = {
  id: 'supabase-integration',
  title: "Supabase & TextQL: Instant Insights from Your Startup’s Data",
  description: 'Introducing our friction-free connector that lets Ana perform AI-powered analytics on your Supabase tables',
  image: '/images/blog/supabase-integration/header.png',
  useLocalImage: true,
  author: {
    name: 'Matt Abate',
    role: 'Applied Research',
    company: 'TextQL'
  },
  date: 'July 31, 2024',
  readTime: '5 min read',
  category: 'announcements',
  featured: true
};