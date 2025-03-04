import type { BlogPost } from '../../components/page-sections/blog/types';

export const post: BlogPost = {
  id: 'soc2-report',
  title: "Announcing TextQL's SOC II Report",
  description: 'TextQL achieves SOC 2 Type I compliance, demonstrating our commitment to security and data protection',
  image: '/images/blog/soc2-report/header.png',
  useLocalImage: true,
  author: {
    name: 'Gabriel Tomitsuka',
    role: 'Head of Growth',
    company: 'TextQL'
  },
  date: 'January 29, 2024',
  readTime: '4 min read',
  category: 'announcements'
};