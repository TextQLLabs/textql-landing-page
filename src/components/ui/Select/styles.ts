export const getBaseStyles = (error?: string) => `
  w-full
  appearance-none
  bg-[#004D40]/20
  border border-[#B8D8D0]/20
  text-[#B8D8D0] text-base font-light
  px-4 py-2.5 pr-10
  focus:outline-none focus:ring-2 focus:ring-[#B8D8D0]/30
  focus:border-[#B8D8D0]/30
  backdrop-blur-sm
  transition-colors
  ${error ? 'border-red-400 focus:ring-red-400/30' : ''}
`;