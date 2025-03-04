import type { BlogPost } from '../../components/page-sections/blog/types';

export const post: BlogPost = {
  id: 'fundraising',
  title: "Announcing our $4.1M fundraise from DCM & Neo to make data driven operations instantaneous",
  description: 'TextQL raises seed funding to transform how enterprises interact with their data',
  image: '/images/blog/fundraising/header.png',
  useLocalImage: true,
  author: {
    name: 'Ethan Ding',
    role: 'CEO',
    company: 'TextQL'
  },
  date: 'January 24, 2024',
  readTime: '5 min read',
  category: 'announcements',
  featured: true
};