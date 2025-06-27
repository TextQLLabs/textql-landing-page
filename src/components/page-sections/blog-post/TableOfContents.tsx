import { useEffect, useState } from 'react';
import { Button } from '../../ui';
import { useNavigate } from 'react-router-dom';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    // Extract headings from the blog content
    const article = document.querySelector('article');
    if (!article) return;

    const headingElements = article.querySelectorAll('h1, h2, h3');
    const items: TOCItem[] = [];

    headingElements.forEach((heading) => {
      const id = heading.textContent?.toLowerCase().replace(/\s+/g, '-') || '';
      heading.id = id;
      
      items.push({
        id,
        text: heading.textContent || '',
        level: parseInt(heading.tagName[1])
      });
    });

    setHeadings(items);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -70% 0px' }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const y = element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const onDemoRequest = () => {
    navigate('/demo');
  };

  return (
    <div className="sticky top-24">
      {/* Table of Contents */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-[#2A3B35] mb-4 uppercase tracking-wider">
          Table of Contents
        </h3>
        <nav className="space-y-2">
          {headings.map((heading) => (
            <button
              key={heading.id}
              onClick={() => scrollToHeading(heading.id)}
              className={`
                block text-left w-full transition-all duration-200
                ${heading.level === 1 ? 'pl-0' : heading.level === 2 ? 'pl-4' : 'pl-8'}
                ${activeId === heading.id 
                  ? 'text-[#729E8C] font-medium' 
                  : 'text-[#4A665C] hover:text-[#729E8C]'
                }
              `}
            >
              <span className="text-sm leading-relaxed">
                {heading.text}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Demo Button */}
      <div className="border-t border-[#2A3B35]/10 pt-8">
        <Button 
          variant="primary"
          size="md"
          className="w-full"
          onClick={onDemoRequest}
        >
          Book a Demo
        </Button>
        <p className="text-xs text-[#4A665C] text-center mt-3">
          See TextQL in action
        </p>
      </div>
    </div>
  );
}