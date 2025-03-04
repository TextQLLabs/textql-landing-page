export interface Author {
  name: string;
  role: string;
  company: string;
}

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  image: string;
  useLocalImage?: boolean;
  author: Author;
  date: string;
  readTime: string;
  category?: string;
  featured?: boolean;
}