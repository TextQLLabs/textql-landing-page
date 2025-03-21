import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Text } from '../../ui';
import { OQLTransformation, SchemaDynamicsVisual, ExecutionGraph } from './visualizations';
import { getWhitepaperContent, whitepaperMetadata } from '../../../data/whitepaper';
import { Components } from 'react-markdown';
import { ReactNode, useMemo, ElementType, FC } from 'react';

// Typography style constants for consistency
const styles = {
  // Section headers
  sectionHeader: "text-3xl md:text-4xl mb-6 text-black",
  subsectionHeader: "text-2xl mb-4 mt-8 text-black",

  // Paragraph styles
  paragraphText: "mb-4 text-black",
  emphasizedText: "font-italic",
  boldText: "font-bold",

  // List styles
  listContainer: "list-disc pl-8 mb-6",
  listItem: "mb-2 text-black",

  // Layout styles
  contentWrapper: "w-full max-w-[950px] mx-auto px-6",
  innerContent: "max-w-[1200px] mx-auto",
  spacer: "mb-8",
  largerSpacer: "mb-8 mt-12",
};

type ContentSection =
  | { type: 'markdown'; content: string }
  | { type: 'visualization'; component: FC };

export function WhitepaperContent() {
  const rawContent = getWhitepaperContent();

  // Split content into sections with visualizations
  const contentSections = useMemo(() => {
    // Split points
    const schemaSplitText = "<!-- SchemaDynamicsVisual -->";
    const oqlSplitText = "<!-- OQLTransformation -->";
    const executionSplitText = "<!-- ExecutionGraph -->";

    // Find positions of each visualization
    const schemaIndex = rawContent.indexOf(schemaSplitText);
    const oqlIndex = rawContent.indexOf(oqlSplitText);
    const executionIndex = rawContent.indexOf(executionSplitText);

    if (schemaIndex === -1 || oqlIndex === -1 || executionIndex === -1) {
      console.warn("Could not find one or more visualization markers");
    }

    // Split content
    const sections: ContentSection[] = [];

    // First section (before execution graph)
    sections.push({
      type: 'markdown',
      content: rawContent.substring(0, executionIndex)
    });

    // Execution graph visualization
    sections.push({
      type: 'visualization',
      component: ExecutionGraph
    });

    // Between execution graph and schema
    sections.push({
      type: 'markdown',
      content: rawContent.substring(executionIndex + executionSplitText.length, schemaIndex)
    });

    // Schema visualization
    sections.push({
      type: 'visualization',
      component: SchemaDynamicsVisual
    });

    // Between schema and OQL
    sections.push({
      type: 'markdown',
      content: rawContent.substring(schemaIndex + schemaSplitText.length, oqlIndex)
    });

    // OQL visualization
    sections.push({
      type: 'visualization',
      component: OQLTransformation
    });

    // Final section
    sections.push({
      type: 'markdown',
      content: rawContent.substring(oqlIndex + oqlSplitText.length)
    });

    return sections;
  }, [rawContent]);

  // Custom component to handle HTML blocks
  const customComponents: Components = {
    p: ({ children, ...props }: { children?: ReactNode }) => {
      const htmlContent = String(children || '');

      if (htmlContent.includes('<iframe') || htmlContent.includes('<div')) {
        return <div dangerouslySetInnerHTML={{ __html: htmlContent }} className="my-8" />;
      }

      return <p className="text-black text-base leading-relaxed mb-4" {...props}>{children}</p>;
    },
    h1: ({ children }: { children?: ReactNode }) => (
      <h1 className="text-3xl md:text-4xl mb-6 text-black font-bold">{children}</h1>
    ),
    h2: ({ children }: { children?: ReactNode }) => (
      <h2 className="text-2xl mb-4 mt-8 text-black font-semibold">{children}</h2>
    ),
    h3: ({ children }: { children?: ReactNode }) => (
      <h3 className="text-xl mb-3 mt-6 text-black font-medium">{children}</h3>
    ),
    ul: ({ children, ...props }) => <ul className={styles.listContainer} {...props}>{children}</ul>,
    ol: ({ children, ...props }) => <ol className="list-decimal pl-8 mb-4 text-black" {...props}>{children}</ol>,
    li: ({ children, ...props }) => <li className="mb-2 text-black" {...props}>{children}</li>,
    hr: () => <hr className="border-t border-gray-200 my-8" />,
    strong: ({ children, ...props }) => <strong className="font-semibold text-black" {...props}>{children}</strong>,
    em: ({ children, ...props }) => <em className="italic text-black" {...props}>{children}</em>,
    a: ({ href, children, ...props }: { href?: string, children?: ReactNode }) => (
      <a href={href} className="text-[#0D4A42] underline hover:text-[#0f8a7a]" {...props}>{children}</a>
    ),
    img: ({ src, alt, ...props }: { src?: string, alt?: string }) => (
      <img
        src={src}
        alt={alt || ""}
        className="max-w-full h-auto mx-auto my-8 rounded-lg"
        {...props}
      />
    ),
    code: ({ inline, children, ...props }: { inline?: boolean, className?: string, children?: ReactNode }) => {
      if (inline) {
        return <code className="bg-[#F0F5F3] px-1 py-0.5 rounded text-[#2A3B35] text-sm" {...props}>{children}</code>;
      }

      return (
        <pre className="bg-white border border-[#E5E5E5] rounded-md p-4 mb-6 text-sm font-mono overflow-x-auto">
          <code {...props}>{children}</code>
        </pre>
      );
    }
  };

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.innerContent}>
        <article className="prose prose-sm max-w-none text-black">
          {contentSections.map((section, index) => {
            if (section.type === 'markdown') {
              return (
                <ReactMarkdown
                  key={index}
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={customComponents}
                >
                  {section.content}
                </ReactMarkdown>
              );
            } else if (section.type === 'visualization') {
              const VisComponent = section.component;
              return <VisComponent key={index} />;
            }
            return null;
          })}
        </article>
      </div>
    </div>
  );
} 