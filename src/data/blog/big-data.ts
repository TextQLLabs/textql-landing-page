import type { BlogPost } from '../../components/page-sections/blog/types';

export const post: BlogPost = {
  id: 'big-data',
  title: "Making AI That Can Process 1,000,000x More Data",
  description: 'Your AI can analyze 1GB of data. Your enterprise has 1,000,000 times that.',
  image: '/images/blog/big-data/header.png',
  useLocalImage: true,
  author: {
    name: 'Ethan Ding',
    role: 'CEO',
    company: 'TextQL'
  },
  date: 'August 6, 2025',
  readTime: '5-10 min read',
  category: 'announcements',
  featured: true
};