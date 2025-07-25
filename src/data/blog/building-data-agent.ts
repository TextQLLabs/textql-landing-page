import type { BlogPost } from '../../components/page-sections/blog/types';

export const post: BlogPost = {
  id: 'building-data-agent',
  title: 'Building the Most Advanced Data Agent',
  description: 'How we developed Ana to understand and connect enterprise data at scale',
  image: '/images/blog/building-data-agent/header.png',
  useLocalImage: true,
  author: {
    name: 'Ethan Ding',
    role: 'CEO',
    company: 'TextQL'
  },
  date: 'October 15, 2023',
  readTime: '8 min read',
  category: 'technical',
  featured: true
};
