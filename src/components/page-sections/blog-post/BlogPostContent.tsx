import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Text } from '../../ui';
import type { BlogPost } from '../blog/types';

interface BlogPostContentProps {
  content: string;
  post: BlogPost;
}

export function BlogPostContent({ content, post }: BlogPostContentProps) {
  // Determine header image source based on useLocalImage flag
  const headerImageSource = post.useLocalImage 
    ? `/images/blog/${post.id}/header.png`
    : post.image;

  return (
    <div className="relative">
      {/* Cover Image Section - Positioned to overlap with header */}
      <div className="relative -mt-32 mb-12">
        <div className="mx-auto max-w-4xl px-6">
          <div className="aspect-[2/1] relative rounded-lg overflow-hidden shadow-xl">
            <img
              src={headerImageSource}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative bg-white">
        <div className="max-w-2xl mx-auto px-6 py-12">
          <article className="prose prose-sm max-w-none">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                p: ({node, children, ...props}) => {
                  // Check if the paragraph contains an iframe or div
                  const htmlContent = String(children);
                  if (htmlContent.includes('<iframe') || htmlContent.includes('<div')) {
                    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} className="my-8" />;
                  }
                  return <Text theme="light" className="text-base leading-relaxed mb-4" {...props}>{children}</Text>;
                },
                h1: ({node, ...props}) => <h1 className="text-3xl font-extralight text-[#2A3B35] mb-6" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-xl font-light text-[#2A3B35] mt-8 mb-4" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-lg font-medium text-[#2A3B35] mt-6 mb-3" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-4 mb-4 text-[#4A665C]" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal pl-4 mb-4 text-[#4A665C]" {...props} />,
                li: ({node, ...props}) => <li className="mb-2" {...props} />,
                hr: ({node, ...props}) => <hr className="my-8 border-[#2A3B35]/10" {...props} />,
                strong: ({node, ...props}) => <strong className="font-semibold text-[#2A3B35]" {...props} />,
                blockquote: ({node, ...props}) => (
                  <blockquote className="border-l-2 border-[#2A3B35]/20 pl-4 my-4 italic text-[#4A665C]" {...props} />
                ),
                code: ({node, inline, ...props}) => (
                  inline 
                    ? <code className="bg-[#F0F5F3] px-1 py-0.5 rounded text-[#2A3B35] text-sm" {...props} />
                    : <pre className="bg-[#F0F5F3] p-3 rounded-lg overflow-x-auto text-sm" {...props} />
                ),
                table: ({node, ...props}) => (
                  <div className="my-6 w-full overflow-x-auto">
                    <table className="w-full border-collapse" {...props} />
                  </div>
                ),
                thead: ({node, ...props}) => (
                  <thead className="bg-[#F0F5F3]" {...props} />
                ),
                th: ({node, ...props}) => (
                  <th className="border border-[#2A3B35]/10 px-4 py-2 text-left text-[#2A3B35] font-medium" {...props} />
                ),
                td: ({node, ...props}) => (
                  <td className="border border-[#2A3B35]/10 px-4 py-2 text-[#4A665C]" {...props} />
                ),
                img: ({src, alt, ...props}) => {
                  // Handle local blog post images
                  const imageSrc = src?.startsWith('/') 
                    ? src 
                    : `/images/blog/${post.id}/${src}`;
                  
                  return (
                    <img
                      src={imageSrc}
                      alt={alt}
                      className="w-full rounded-lg shadow-md my-8"
                      {...props}
                    />
                  );
                }
              }}
            >
              {content}
            </ReactMarkdown>
          </article>
        </div>
      </div>
    </div>
  );
}