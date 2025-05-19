import type { BlogPost } from '../../components/page-sections/blog/types';

export const post: BlogPost = {
  id: 'ten-year-thesis',
  title: "TextQL's Ten Year Thesis",
  description: 'Our vision for the future of enterprise data and AI',
  image: '/images/blog/ten-year-thesis/header.png',
  useLocalImage: true,
  author: {
    name: 'James Smith',
    role: 'CEO',
    company: 'TextQL',
  },
  date: 'September 28, 2023',
  readTime: '10 min read',
  category: 'announcements',
};
