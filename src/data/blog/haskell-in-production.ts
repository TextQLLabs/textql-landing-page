import type { BlogPost } from '../../components/page-sections/blog/types';

export const post: BlogPost = {
  id: 'haskell-in-production',
  title: "Haskell in Production: TextQL's Ontology Service",
  description: 'How we use Haskell to build a reliable and maintainable ontology service for enterprise data',
  image: '/images/blog/haskell-in-production/header.png',
  useLocalImage: true,
  author: {
    name: 'Mark Hay',
    role: 'Engineering Lead',
    company: 'TextQL'
  },
  date: 'February 7, 2024',
  readTime: '8 min read',
  category: 'technical'
};