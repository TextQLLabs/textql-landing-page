import type { BlogPost } from '../../components/page-sections/blog/types';

export const post: BlogPost = {
  id: 'why-ontology',
  title: "Why We Use an Ontology for Text to SQL",
  description: 'Our journey from LLM-generated SQL to a structured ontology approach',
  image: '/images/blog/why-ontology/header.png',
  useLocalImage: true,
  author: {
    name: 'Ethan Ding',
    role: 'CEO',
    company: 'TextQL'
  },
  date: 'October 17, 2024',
  readTime: '5 min read',
  category: 'technical'
};