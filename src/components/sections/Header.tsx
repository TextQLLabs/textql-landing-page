import { Text } from '../ui';

interface HeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  theme?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Header({
  title,
  subtitle,
  description,
  align = 'left',
  theme = 'dark',
  size = 'md',
  className = ''
}: HeaderProps) {
  const textColor = theme === 'dark' ? 'text-[#B8D8D0]' : 'text-[#2A3B35]';
  
  const alignments = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  const sizes = {
    sm: {
      title: 'text-3xl',
      subtitle: 'text-xl',
      description: 'text-base'
    },
    md: {
      title: 'text-4xl',
      subtitle: 'text-2xl',
      description: 'text-lg'
    },
    lg: {
      title: 'text-5xl',
      subtitle: 'text-3xl',
      description: 'text-xl'
    }
  };

  const containerWidths = {
    left: 'max-w-2xl',
    center: 'max-w-3xl mx-auto',
    right: 'max-w-2xl ml-auto'
  };

  return (
    <div className={`space-y-4 ${containerWidths[align]} ${className}`}>
      <div className={`space-y-2 ${alignments[align]}`}>
        <h2 className={`
          ${sizes[size].title}
          ${textColor}
          font-light
          tracking-tight
          leading-tight
        `}>
          {title}
        </h2>
        
        {subtitle && (
          <h3 className={`
            ${sizes[size].subtitle}
            ${textColor}
            font-extralight
          `}>
            {subtitle}
          </h3>
        )}
      </div>

      {description && (
        <Text 
          color="muted"
          theme={theme}
          className={`
            ${sizes[size].description}
            font-light
            ${align === 'center' ? 'mx-auto' : ''}
            max-w-prose
          `}
        >
          {description}
        </Text>
      )}
    </div>
  );
}