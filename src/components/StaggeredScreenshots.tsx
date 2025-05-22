import React from 'react';

interface Screenshot {
  src: string;
  alt: string;
}

interface StaggeredScreenshotsProps {
  screenshots: Screenshot[];
}

export default function StaggeredScreenshots({ screenshots }: StaggeredScreenshotsProps) {
  if (screenshots.length < 3) {
    return null;
  }

  const [mainImage, bottomLeftImage, rightImage] = screenshots;

  return (
    <div className="relative w-full aspect-[4/3] translate-x-[10%]">
      {/* Main large centered image */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="w-[140%] rounded-lg shadow-xl">
          <img
            src={mainImage.src}
            alt={mainImage.alt}
            className="w-full h-auto rounded-lg border border-[#B8D8D0]/10"
          />
        </div>
      </div>

      {/* Bottom left smaller image */}
      <div className="absolute bottom-0 left-0 w-[50%] z-20 transform translate-y-[-20%] -translate-x-[20%]">
        <div className="shadow-xl transition-transform hover:scale-105">
          <img
            src={bottomLeftImage.src}
            alt={bottomLeftImage.alt}
            className="w-full h-auto border border-[#B8D8D0]/10"
          />
        </div>
      </div>

      {/* Right side smaller image */}
      <div className="absolute top-1/2 right-0 w-[25%] z-20 transform translate-y-[-150%] translate-x-[20%]">
        <div className="rounded-lg shadow-xl transition-transform hover:scale-105">
          {/* <img
            src={rightImage.src}
            alt={rightImage.alt}
            className="w-full h-auto rounded-lg border border-[#B8D8D0]/10"
          /> */}
        </div>
      </div>
    </div>
  );
} 