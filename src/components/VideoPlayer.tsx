import React from 'react';

interface VideoPlayerProps {
  videoUrl: string;
}

export default function VideoPlayer({ videoUrl }: VideoPlayerProps) {
  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-[#0A1F1C]/40 border border-[#B8D8D0]/10">
      <video
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
} 