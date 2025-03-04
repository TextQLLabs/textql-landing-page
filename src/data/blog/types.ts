import type { LucideIcon } from 'lucide-react';

export interface BlogAuthor {
  name: string;
  role: string;
  company: string;
  avatar?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  author: BlogAuthor;
  publishedAt: string;
  readingTime: string;
  image: string;
  category: string;
  tags: string[];
}

export interface BlogCategory {
  id: string;
  name: string;
  description: string;
  icon?: LucideIcon;
}