import type { BlogPost } from '../../components/page-sections/blog/types';

export const post: BlogPost = {
  id: 'embedding-models',
  title: "Embedding Models and When to Use Them",
  description: 'A deep dive into the underrated capabilities of embedding models and their role in AI reasoning',
  image: '/images/blog/embedding-models/header.png',
  useLocalImage: true,
  author: {
    name: 'Ethan Ding',
    role: 'CEO',
    company: 'TextQL'
  },
  date: 'October 16, 2024',
  readTime: '6 min read',
  category: 'technical'
};