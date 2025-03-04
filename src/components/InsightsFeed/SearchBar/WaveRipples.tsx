import React from 'react';

interface WaveRipplesProps {
  count?: number;
}

export const WaveRipples: React.FC<WaveRipplesProps> = ({ count = 5 }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="absolute inset-0 border-2 border-[#B8D8D0]/20 rounded-lg"
        style={{
          animation: `wave 1.5s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.15}s forwards`,
        }}
      />
    ))}
  </>
);