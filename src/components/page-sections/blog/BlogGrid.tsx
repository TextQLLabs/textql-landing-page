import { useState } from 'react';
import { Search } from 'lucide-react';
import { BlogCard } from './BlogCard';
import { Badge, Input } from '../../ui';
import type { BlogPost } from './types';

interface BlogGridProps {
  posts: BlogPost[];
}

const TAGS = ['announcements', 'technical'] as const;
type Tag = typeof TAGS[number];

export function BlogGrid({ posts }: BlogGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTag = !selectedTag || post.category?.toLowerCase() === selectedTag;
    
    return matchesSearch && matchesTag;
  });

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            theme="light"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2A3B35]/40" />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={`
                px-4 py-2 rounded-full transition-all
                ${selectedTag === tag
                  ? 'bg-[#2A3B35] text-white'
                  : 'bg-white text-[#2A3B35] hover:bg-[#2A3B35]/5'
                }
              `}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      {/* No Results */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[#4A665C]">No posts found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}