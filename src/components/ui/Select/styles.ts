export const getBaseStyles = (error?: string, theme: 'light' | 'dark' = 'dark') => `
  w-full
  appearance-none
  ${theme === 'dark' 
    ? 'bg-[#004D40]/20 border-[#B8D8D0]/20 text-[#B8D8D0] focus:ring-[#B8D8D0]/30 focus:border-[#B8D8D0]/30' 
    : 'bg-white border-[#2A3B35]/20 text-[#2A3B35] focus:ring-[#2A3B35]/30 focus:border-[#2A3B35]/30'
  }
  border text-base font-light
  px-4 py-2.5 pr-10
  focus:outline-none focus:ring-2
  backdrop-blur-sm
  transition-colors
  ${error ? 'border-red-400 focus:ring-red-400/30' : ''}
`;