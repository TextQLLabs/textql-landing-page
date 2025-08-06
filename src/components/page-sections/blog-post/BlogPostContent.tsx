import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { useEffect } from 'react';
import { Text } from '../../ui';
import type { BlogPost } from '../blog/types';
import { BlogChartLoader } from '../../blog/BlogChartLoader';

interface BlogPostContentProps {
  content: string;
  post: BlogPost;
}

export function BlogPostContent({ content, post }: BlogPostContentProps) {
  return (
    <div className="relative">
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
                  return <Text theme="light" className="text-base leading-relaxed mb-4 text-black" {...props}>{children}</Text>;
                },
                h1: ({node, ...props}) => <h1 className="text-5xl font-light tracking-tight text-black mb-6 mt-8" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-4xl font-light tracking-tight text-black mt-8 mb-4" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-3xl font-light tracking-tight text-black mt-6 mb-3" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4 text-black leading-relaxed" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-4 text-black leading-relaxed" {...props} />,
                li: ({node, ...props}) => <li className="mb-2 text-black" {...props} />,
                hr: ({node, ...props}) => <hr className="my-8 border-[#B8D8D0]/30" {...props} />,
                strong: ({node, ...props}) => <strong className="font-bold text-black" {...props} />,
                blockquote: ({node, ...props}) => (
                  <blockquote className="border-l-4 border-gray-300 pl-6 my-6 italic text-gray-700" {...props} />
                ),
                code: ({node, inline, ...props}) => (
                  inline 
                    ? <code className="bg-gray-100 px-1.5 py-0.5 rounded text-black text-sm font-mono" {...props} />
                    : <code className="bg-gray-100 px-1.5 py-0.5 rounded text-black text-sm font-mono" {...props} />
                ),
                pre: ({node, ...props}) => (
                  <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto text-sm font-mono my-6" {...props} />
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
                  <td className="border border-[#2A3B35]/10 px-4 py-2 text-[#4A665C] text-sm" {...props} />
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
                },
                a: ({node, ...props}) => (
                  <a className="text-[#729E8C] hover:text-[#2A3B35] underline underline-offset-2 transition-colors" {...props} />
                )
              }}
            >
              {content}
            </ReactMarkdown>
      </article>
      <BlogChartLoader />
    </div>
  );
}