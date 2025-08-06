import { useState } from 'react';
import { Search } from 'lucide-react';
import { BlogCard } from './BlogCard';
import { Badge, Input } from '../../ui';
import type { BlogPost } from './types';

interface BlogGridProps {
  posts: BlogPost[];
}

const TAGS = ['announcements', 'technical', 'research'] as const;
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
      {/* Search and Filters - Single Row */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
        {/* Search Bar */}
        <div className="relative flex-shrink-0 w-full lg:w-80">
          <div className="relative">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border-2 border-[#2A3B35]/40 text-[#2A3B35] text-base font-light placeholder:text-[#2A3B35]/40 pl-10 pr-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B8D8D0]/20 focus:border-[#B8D8D0] backdrop-blur-md transition-all"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2A3B35]/50" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2A3B35]/50 hover:text-[#2A3B35] transition-colors"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="text-sm text-[#4A665C] flex-shrink-0 lg:min-w-[120px]">
          {searchQuery || selectedTag ? (
            <span>
              Showing {filteredPosts.length} of {posts.length} posts
              {selectedTag && <span> in <strong>{selectedTag}</strong></span>}
              {searchQuery && <span> matching "<strong>{searchQuery}</strong>"</span>}
            </span>
          ) : (
            <span>{posts.length} posts total</span>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 lg:justify-end flex-1">
          {TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all border-2 capitalize
                ${selectedTag === tag
                  ? 'bg-[#2A3B35] text-white border-[#2A3B35] shadow-md'
                  : 'bg-white text-[#2A3B35] border-[#2A3B35]/20 hover:border-[#2A3B35]/40 hover:bg-[#2A3B35]/5 hover:shadow-sm'
                }
              `}
            >
              {tag}
            </button>
          ))}
          {selectedTag && (
            <button
              onClick={() => setSelectedTag(null)}
              className="px-3 py-2 rounded-full text-sm text-[#2A3B35]/60 hover:text-[#2A3B35] transition-colors"
            >
              Clear filter
            </button>
          )}
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