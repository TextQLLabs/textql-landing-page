import type { BlogPost } from '../../components/page-sections/blog/types';

export const post: BlogPost = {
  id: 'introducing-ana',
  title: "Introducing Ana: TextQL's Agentic Data Scientist",
  description: 'The best kept secret in enterprise AI',
  image: '/images/blog/introducing-ana/header.png',
  useLocalImage: true,
  author: {
    name: 'Ivy Teng',
    role: 'Growth',
    company: 'TextQL'
  },
  date: 'August 26, 2025',
  readTime: '2-3 min read',
  category: 'announcements',
  featured: true
};