export const getBaseStyles = (error?: string, theme: 'dark' | 'light' = 'dark') => {
  const colors = {
    dark: {
      bg: 'bg-[#1A1A1A]/80',
      border: 'border-[#B8D8D0]/20',
      text: 'text-[#B8D8D0]',
      placeholder: 'placeholder:text-[#B8D8D0]/40',
      focus: 'focus:ring-[#B8D8D0]/30 focus:border-[#B8D8D0]/30',
      error: 'border-red-400 focus:ring-red-400/30'
    },
    light: {
      bg: 'bg-[#2A3B35]/10',
      border: 'border-[#2A3B35]/20',
      text: 'text-[#2A3B35]',
      placeholder: 'placeholder:text-[#2A3B35]/40',
      focus: 'focus:ring-[#2A3B35]/30 focus:border-[#2A3B35]/30',
      error: 'border-red-400 focus:ring-red-400/30'
    }
  };

  return `
    w-full
    ${colors[theme].bg}
    border ${colors[theme].border}
    ${colors[theme].text} text-base font-light
    ${colors[theme].placeholder}
    px-4 py-2.5
    focus:outline-none focus:ring-2 ${colors[theme].focus}
    backdrop-blur-md
    transition-colors
    ${error ? colors[theme].error : ''}
  `;
};