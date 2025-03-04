import type { BlogPost } from '../../components/page-sections/blog/types';

export const post: BlogPost = {
  id: 'sql-process',
  title: "Our Ontology-Based Text to SQL Generation Process",
  description: 'A detailed walkthrough of how TextQL transforms natural language into SQL using ontologies',
  image: '/images/blog/sql-process/header.png',
  useLocalImage: true,
  author: {
    name: 'Ethan Ding',
    role: 'CEO',
    company: 'TextQL'
  },
  date: 'October 18, 2024',
  readTime: '7 min read',
  category: 'technical'
};