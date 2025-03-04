import type { BlogPost } from '../../components/page-sections/blog/types';

export const post: BlogPost = {
  id: 'sql-model',
  title: "What If The Model Isn't Good Enough?",
  description: 'A deep dive into improving AI SQL generation through iterative context enhancement',
  image: '/images/blog/sql-model/header.png',
  useLocalImage: true,
  author: {
    name: 'Ethan Ding',
    role: 'CEO',
    company: 'TextQL'
  },
  date: 'September 30, 2023',
  readTime: '7 min read',
  category: 'technical'
};