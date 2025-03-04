import React from 'react';
import { cva } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  theme?: 'dark' | 'light';
  fullWidth?: boolean;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
}

//
// 1) cva config for base button + variants
//
const buttonVariants = cva(
  // Base classes (including `rounded-none` for sharp corners)
  'relative inline-flex items-center justify-center rounded-none text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'text-black hover:text-black/90',
        secondary: 'text-[#B8D8D0] hover:text-[#B8D8D0]/90',
        ghost: 'text-[#B8D8D0] hover:text-[#B8D8D0]/90'
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-6 text-base',
        lg: 'h-12 px-8 text-lg'
      },
      theme: {
        dark: '',
        light: `
          [&.primary]:text-[#2A3B35] [&.primary]:hover:text-[#2A3B35]/90
          [&.secondary]:text-[#2A3B35] [&.secondary]:hover:text-[#2A3B35]/90
          [&.ghost]:text-[#2A3B35] [&.ghost]:hover:text-[#2A3B35]/90
        `
      },
      fullWidth: {
        true: 'w-full',
        false: ''
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      theme: 'dark',
      fullWidth: false
    }
  }
);

//
// 2) The Button component
//
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { 
      children, 
      variant = 'primary', 
      size = 'md', 
      theme = 'dark',
      fullWidth = false,
      icon: Icon,
      iconPosition = 'left',
      loading = false,
      className = '',
      ...props 
    },
    ref
  ) => {
    //
    // Dynamically set the corner/border color based on variant + theme
    //
    const getCornerColor = () => {
      if (theme === 'light') {
        return '#2A3B35'; // lighter theme corners
      }
      // dark theme corners
      return variant === 'primary' ? '#000000' : '#B8D8D0';
    };

    //
    // Optional icon element
    //
    const IconComponent = Icon ? <Icon className="w-5 h-5" /> : null;

    return (
      <button
        ref={ref}
        className={`
          group
          ${buttonVariants({ variant, size, theme, fullWidth, className })}
          before:absolute before:inset-0 before:transition-colors before:duration-200
          ${variant === 'primary' ? 'before:bg-[#B8D8D0] hover:before:bg-[#729E8C]' : ''}
          ${variant === 'secondary' ? 'before:bg-[#0A1F1C] hover:before:bg-[#041810]' : ''}
          ${variant === 'ghost' ? 'before:bg-transparent hover:before:bg-[#B8D8D0]/10' : ''}
        `}
        data-icon-position={iconPosition}
        disabled={loading}
        {...props}
      >
        {/* 
          Corner Animations: 8 <span>s total, 2 per corner.
          - Each starts at w-0/h-0.
          - On hover, transitions to w-[2px]/h-full or h-[2px]/w-full.
        */}
        <span className="absolute inset-0 pointer-events-none">
          {/* Top Left Corner */}
          <span 
            className="absolute top-0 left-0 w-0 h-0 transition-all duration-300 ease-out group-hover:w-[2px] group-hover:h-full origin-top-left"
            style={{ background: getCornerColor() }}
          />
          <span 
            className="absolute top-0 left-0 w-0 h-0 transition-all duration-300 ease-out group-hover:h-[2px] group-hover:w-full origin-top-left"
            style={{ background: getCornerColor() }}
          />
          {/* Top Right Corner */}
          <span 
            className="absolute top-0 right-0 w-0 h-0 transition-all duration-300 ease-out group-hover:w-[2px] group-hover:h-full origin-top-right"
            style={{ background: getCornerColor() }}
          />
          <span 
            className="absolute top-0 right-0 w-0 h-0 transition-all duration-300 ease-out group-hover:h-[2px] group-hover:w-full origin-top-right"
            style={{ background: getCornerColor() }}
          />
          {/* Bottom Left Corner */}
          <span 
            className="absolute bottom-0 left-0 w-0 h-0 transition-all duration-300 ease-out group-hover:w-[2px] group-hover:h-full origin-bottom-left"
            style={{ background: getCornerColor() }}
          />
          <span 
            className="absolute bottom-0 left-0 w-0 h-0 transition-all duration-300 ease-out group-hover:h-[2px] group-hover:w-full origin-bottom-left"
            style={{ background: getCornerColor() }}
          />
          {/* Bottom Right Corner */}
          <span 
            className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-300 ease-out group-hover:w-[2px] group-hover:h-full origin-bottom-right"
            style={{ background: getCornerColor() }}
          />
          <span 
            className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-300 ease-out group-hover:h-[2px] group-hover:w-full origin-bottom-right"
            style={{ background: getCornerColor() }}
          />
        </span>

        {/* 
          Actual Button Content 
          (icon + text, plus a loading spinner if `loading=true`)
        */}
        <span className="relative flex items-center gap-2">
          {iconPosition === 'left' && IconComponent}
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              <span>Loading...</span>
            </div>
          ) : (
            children
          )}
          {iconPosition === 'right' && IconComponent}
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;