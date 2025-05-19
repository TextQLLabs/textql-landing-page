import type { BlogPost } from '../../components/page-sections/blog/types';

export const post: BlogPost = {
  id: 'vision-benchmark',
  title: 'Bechmarking AI Vision with Puzzles',
  description:
    'How we assess frontier vision models with images of challending math and logic puzzles.',
  image: '/images/blog/vision-benchmark/header.png',
  useLocalImage: true,
  author: {
    name: 'Matt Abate',
    role: 'Applied Research',
    company: 'TextQL',
  },
  date: 'May 13, 2025',
  readTime: '3 min read',
  category: 'technical',
};
