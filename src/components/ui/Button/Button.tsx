import React from 'react';
import { cva } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react';
import { useComponentTheme } from '../../../hooks/useComponentTheme';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md';
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
        secondary: 'text-[#2A3B35] hover:text-[#2A3B35] border-2 border-[#2A3B35] hover:border-[#2A3B35]/90',
        ghost: 'text-[#2A3B35] hover:text-[#2A3B35]/90 border border-[#2A3B35]/30 hover:border-[#2A3B35]/50'
      },
      size: {
        sm: 'h-11 px-8 text-sm',
        md: 'h-14 px-12 text-base'
      },
      theme: {
        dark: '',
        light: ''
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
    },
    compoundVariants: [
      {
        variant: 'ghost',
        theme: 'light',
        className: '!text-[#2A3B35] !hover:text-[#2A3B35]/90 !border-[#2A3B35]/30 !hover:border-[#2A3B35]/50'
      },
      {
        variant: 'primary',
        theme: 'light',
        className: '!text-[#2A3B35] !hover:text-[#2A3B35]/90'
      },
      {
        variant: 'primary',
        theme: 'dark',
        className: '!text-black !hover:text-black/90'
      },
      {
        variant: 'secondary',
        theme: 'light',
        className: '!text-[#2A3B35] !hover:text-[#2A3B35] !border-2 !border-[#2A3B35] !hover:border-[#2A3B35]/90'
      }
    ]
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
      theme,
      fullWidth = false,
      icon: Icon,
      iconPosition = 'left',
      loading = false,
      className = '',
      ...props 
    },
    ref
  ) => {
    const globalTheme = useComponentTheme();
    const effectiveTheme = theme || globalTheme;
    //
    // Determine corner color class based on variant + theme
    //
    const getCornerColorClass = () => {
      if (effectiveTheme === 'light') {
        return styles.cornerLight;
      }
      // dark theme corners
      return variant === 'primary' ? styles.cornerDark : styles.cornerDarkSecondary;
    };

    //
    // Optional icon element
    //
    const IconComponent = Icon ? <Icon className="w-5 h-5" /> : null;

    return (
      <button
        ref={ref}
        className={`
          group ${styles.button}
          ${buttonVariants({ variant, size, theme: effectiveTheme, fullWidth, className })}
          before:absolute before:inset-0 before:transition-colors before:duration-200
          ${variant === 'primary' ? 'before:bg-primary-300 hover:before:bg-primary-500' : ''}
          ${variant === 'secondary' ? 'before:bg-transparent hover:before:bg-light-50/5' : ''}
          ${variant === 'ghost' ? 'before:bg-transparent hover:before:bg-light-50/10' : ''}
        `}
        data-icon-position={iconPosition}
        data-variant={variant}
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
          <span className={`${styles.cornerAnimation} ${styles.cornerTopLeftVertical} ${styles.vertical} ${getCornerColorClass()}`} />
          <span className={`${styles.cornerAnimation} ${styles.cornerTopLeftHorizontal} ${styles.horizontal} ${getCornerColorClass()}`} />
          {/* Top Right Corner */}
          <span className={`${styles.cornerAnimation} ${styles.cornerTopRightVertical} ${styles.vertical} ${getCornerColorClass()}`} />
          <span className={`${styles.cornerAnimation} ${styles.cornerTopRightHorizontal} ${styles.horizontal} ${getCornerColorClass()}`} />
          {/* Bottom Left Corner */}
          <span className={`${styles.cornerAnimation} ${styles.cornerBottomLeftVertical} ${styles.vertical} ${getCornerColorClass()}`} />
          <span className={`${styles.cornerAnimation} ${styles.cornerBottomLeftHorizontal} ${styles.horizontal} ${getCornerColorClass()}`} />
          {/* Bottom Right Corner */}
          <span className={`${styles.cornerAnimation} ${styles.cornerBottomRightVertical} ${styles.vertical} ${getCornerColorClass()}`} />
          <span className={`${styles.cornerAnimation} ${styles.cornerBottomRightHorizontal} ${styles.horizontal} ${getCornerColorClass()}`} />
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