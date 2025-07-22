import React from 'react';
import { cn } from '../../utils/cn';
import { useComponentTheme } from '../../hooks/useComponentTheme';
import { themeBackground, themeBackgroundSecondary } from '../../utils/theme-utils';

export interface SectionProps {
  // Width variants
  variant?: 'full' | 'content' | 'wide' | 'wider' | 'narrow' | 'narrower' | 'narrowest';
  
  // Padding options
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  paddingTop?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'navbar';
  paddingBottom?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  paddingX?: 'none' | 'xs' | 'sm' | 'md' | 'lg';
  
  // Layout options
  height?: 'auto' | 'screen' | 'min-screen' | 'hero';
  layout?: 'default' | 'flex' | 'grid';
  flexDirection?: 'row' | 'col';
  alignItems?: 'start' | 'center' | 'end' | 'stretch';
  justifyContent?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  
  // Background options
  background?: 'primary' | 'secondary' | 'transparent' | 'accent' | 'black' | 'white' | 'gradient' | 'custom';
  backgroundGradient?: {
    from: string;
    to: string;
    via?: string;
    direction?: 'to-b' | 'to-t' | 'to-r' | 'to-l' | 'to-br' | 'to-bl' | 'to-tr' | 'to-tl';
  };
  backgroundClass?: string;
  
  // Visual effects
  overflow?: 'visible' | 'hidden' | 'clip' | 'auto';
  animate?: boolean;
  hasNavbarOffset?: boolean;
  
  // HTML options
  id?: string;
  dataTestId?: string;
  as?: 'section' | 'div' | 'article' | 'header' | 'footer' | 'main';
  className?: string;
  children: React.ReactNode;
}

export function Section({
  // Width
  variant = 'content',
  
  // Padding
  padding = 'md',
  paddingTop,
  paddingBottom,
  paddingX,
  
  // Layout
  height = 'auto',
  layout = 'default',
  flexDirection = 'col',
  alignItems = 'stretch',
  justifyContent = 'start',
  
  // Background
  background = 'transparent',
  backgroundGradient,
  backgroundClass,
  
  // Visual
  overflow = 'visible',
  animate = false,
  hasNavbarOffset = false,
  
  // HTML
  id,
  dataTestId,
  as: Component = 'section',
  className,
  children,
}: SectionProps) {
  const theme = useComponentTheme();

  // Width variants mapping
  const widthClasses = {
    full: '',
    content: 'max-w-site',      // 80rem / 1280px
    wide: 'max-w-7xl',          // 80rem / 1280px
    wider: 'max-w-6xl',         // 72rem / 1152px
    narrow: 'max-w-4xl',        // 56rem / 896px
    narrower: 'max-w-3xl',      // 48rem / 768px
    narrowest: 'max-w-2xl',     // 42rem / 672px
  };

  // Vertical padding classes
  const paddingYClasses = {
    none: '',
    xs: 'py-8 md:py-12',
    sm: 'py-12 md:py-16',
    md: 'py-16 md:py-24',
    lg: 'py-24 md:py-32',
    xl: 'py-32 md:py-40',
    hero: 'py-20 md:py-32 lg:py-40',
    navbar: 'pt-20 md:pt-24', // Special case for navbar offset
  };

  // Horizontal padding classes
  const paddingXClasses = {
    none: '',
    xs: 'px-4',
    sm: 'px-4 md:px-6',
    md: 'px-6 md:px-8',
    lg: 'px-8 md:px-12',
  };

  // Combined padding classes (when using general padding prop)
  const paddingClasses = {
    none: '',
    xs: 'py-8 md:py-12 px-4',
    sm: 'py-12 md:py-16 px-4 md:px-6',
    md: 'py-16 md:py-24 px-4 md:px-6',
    lg: 'py-24 md:py-32 px-4 md:px-6',
    xl: 'py-32 md:py-40 px-6 md:px-8',
    hero: 'py-20 md:py-32 lg:py-40 px-4 md:px-6',
  };

  // Height classes
  const heightClasses = {
    auto: '',
    screen: 'h-screen',
    'min-screen': 'min-h-screen',
    hero: 'min-h-screen flex',
  };

  // Layout classes
  const layoutClasses = {
    default: '',
    flex: 'flex',
    grid: 'grid',
  };

  const flexDirectionClasses = {
    row: 'flex-row',
    col: 'flex-col',
  };

  const alignItemsClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  };

  const justifyContentClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  };

  // Background classes
  const backgroundClasses = {
    primary: themeBackground(theme),
    secondary: themeBackgroundSecondary(theme),
    transparent: '',
    accent: theme === 'dark' ? 'bg-green-900/10' : 'bg-green-50',
    black: 'bg-black',
    white: 'bg-white',
    gradient: '', // Handled separately
    custom: backgroundClass || '',
  };

  // Overflow classes
  const overflowClasses = {
    visible: '',
    hidden: 'overflow-hidden',
    clip: 'overflow-clip',
    auto: 'overflow-auto',
  };

  // Build gradient classes if needed
  let gradientClasses = '';
  if (background === 'gradient' && backgroundGradient) {
    const { from, to, via, direction = 'to-b' } = backgroundGradient;
    gradientClasses = cn(
      'bg-gradient-to-b',
      direction && `bg-gradient-${direction}`,
      from && `from-${from}`,
      via && `via-${via}`,
      to && `to-${to}`
    );
  }

  // Container classes for centering when not full width
  const containerClasses = variant !== 'full' ? 'mx-auto' : '';

  // Determine padding to use (specific overrides general)
  const finalPaddingTop = paddingTop ? paddingYClasses[paddingTop] : '';
  const finalPaddingBottom = paddingBottom ? paddingYClasses[paddingBottom] : '';
  const finalPaddingX = paddingX ? paddingXClasses[paddingX] : '';
  
  // Use specific padding if any are provided, otherwise use general padding
  const paddingToUse = (paddingTop || paddingBottom || paddingX) 
    ? cn(finalPaddingTop, finalPaddingBottom, finalPaddingX)
    : paddingClasses[padding];

  // Build layout classes
  const layoutClassNames = layout !== 'default' 
    ? cn(
        layoutClasses[layout],
        layout === 'flex' && flexDirectionClasses[flexDirection],
        layout === 'flex' && alignItemsClasses[alignItems],
        layout === 'flex' && justifyContentClasses[justifyContent]
      )
    : '';

  return (
    <Component
      id={id}
      data-testid={dataTestId}
      className={cn(
        // Height
        heightClasses[height],
        // Layout
        layoutClassNames,
        // Background
        background === 'gradient' ? gradientClasses : backgroundClasses[background],
        // Overflow
        overflowClasses[overflow],
        // Animation readiness
        animate && 'relative',
        // Navbar offset
        hasNavbarOffset && 'navbar-offset',
        // Custom classes
        className
      )}
    >
      <div
        className={cn(
          // Width constraint
          widthClasses[variant],
          // Padding
          paddingToUse,
          // Centering
          containerClasses,
          // Flex item behavior when parent is flex
          height === 'hero' && 'flex-1 flex flex-col'
        )}
      >
        {children}
      </div>
    </Component>
  );
}

// Export helper functions for common patterns
export const sectionPresets = {
  hero: {
    height: 'hero' as const,
    padding: 'hero' as const,
    hasNavbarOffset: true,
    layout: 'flex' as const,
    alignItems: 'center' as const,
  },
  content: {
    variant: 'content' as const,
    padding: 'md' as const,
  },
  narrow: {
    variant: 'narrow' as const,
    padding: 'md' as const,
  },
  feature: {
    variant: 'content' as const,
    padding: 'lg' as const,
    background: 'secondary' as const,
  },
  cta: {
    variant: 'narrow' as const,
    padding: 'xl' as const,
    background: 'primary' as const,
  },
};