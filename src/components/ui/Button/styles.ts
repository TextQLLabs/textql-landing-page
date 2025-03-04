export const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 relative group';

export const variants = {
  primary: {
    dark: `
      text-[#B8D8D0] border border-[#B8D8D0]/40
      bg-[#B8D8D0]/5 backdrop-blur-sm
      hover:bg-[#B8D8D0]/10 hover:border-[#B8D8D0]/60
      relative
      before:absolute before:inset-0
      before:border before:border-[#B8D8D0]/40
      before:transition-all before:duration-300
      after:absolute after:inset-0
      after:bg-[#B8D8D0]/5 after:backdrop-blur-sm
      after:transition-opacity after:duration-300
      hover:before:scale-[1.035]
      hover:after:bg-[#B8D8D0]/10
    `,
    light: `
      text-white border border-[#2A3B35]
      bg-[#2A3B35] backdrop-blur-sm
      hover:bg-[#4A665C] hover:border-[#4A665C]
      relative
      before:absolute before:inset-0
      before:border before:border-[#2A3B35]
      before:transition-all before:duration-300
      after:absolute after:inset-0
      after:bg-[#2A3B35] after:backdrop-blur-sm
      after:transition-opacity after:duration-300
      hover:before:scale-[1.035]
      hover:after:bg-[#4A665C]
    `
  },
  secondary: {
    dark: `
      text-[#0A1F1C] bg-[#B8D8D0] backdrop-blur-sm
      hover:bg-[#729E8C]
      relative
      before:absolute before:inset-0
      before:border before:border-[#B8D8D0]/40
      before:transition-all before:duration-300
      hover:before:scale-[1.035]
    `,
    light: `
      text-white bg-[#2A3B35] backdrop-blur-sm
      hover:bg-[#4A665C]
      relative
      before:absolute before:inset-0
      before:border before:border-[#2A3B35]
      before:transition-all before:duration-300
      hover:before:scale-[1.035]
    `
  },
  ghost: {
    dark: `
      text-[#B8D8D0] 
      bg-[#B8D8D0]/5 backdrop-blur-sm
      hover:bg-[#B8D8D0]/10
      transition-colors
    `,
    light: `
      text-[#2A3B35] 
      bg-[#2A3B35]/10 backdrop-blur-sm
      hover:bg-[#2A3B35]/20
      transition-colors
    `
  }
};

export const sizes = {
  sm: 'text-sm px-3 py-1.5 gap-1.5',
  md: 'text-base px-4 py-2 gap-2',
  lg: 'text-lg px-6 py-3 gap-2.5'
};