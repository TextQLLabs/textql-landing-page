import React, { useState, useEffect } from 'react';
import { Text } from './ui';
import { useComponentTheme } from '../hooks/useComponentTheme';
import { themeBackgroundSecondary, themeText, themeTextSecondary } from '../utils/theme-utils';

export interface ImageConfig {
  src: string;
  width: string;
  translateX: string;
  translateY: string;
  zIndex: number;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

export interface TabContentType {
  title: string;
  description: string;
  images: ImageConfig[];
  bgColor: string;
}

interface TabsDisplayProps<T extends string> {
  title: string;
  tabs: Record<T, TabContentType>;
  defaultActiveTab?: T;
}

export default function TabsDisplay<T extends string>({ 
  title, 
  tabs, 
  defaultActiveTab 
}: TabsDisplayProps<T>) {
  const theme = useComponentTheme();
  const tabOptions = Object.keys(tabs) as T[];
  const [activeTab, setActiveTab] = useState<T>(defaultActiveTab || tabOptions[0]);

  // Preload all images
  const preloadImages = () => {
    (Object.values(tabs) as TabContentType[]).forEach(tabContent => {
      tabContent.images.forEach(image => {
        const img = new Image();
        img.src = image.src;
      });
    });
  };

  // Call preload on component mount
  useEffect(() => {
    preloadImages();
  }, []);

  // Safely access the active tab's content
  const activeTabContent = tabs && activeTab ? tabs[activeTab] : null;

  return (
    <section className={`${themeBackgroundSecondary(theme)} lg:py-24`}>
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <h2 className={`text-3xl lg:text-5xl font-extralight ${theme === 'light' ? 'text-[#2A3B35]' : 'text-[#B8D8D0]'} tracking-tight leading-tight text-center mb-8 lg:mb-16`}>
          {title}
        </h2>

        <div className="relative min-h-[500px] rounded-2xl overflow-hidden">
          <div className={`absolute inset-0 transition-colors duration-500 ${activeTabContent?.bgColor || 'bg-gray-900'}`} />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 p-12">
            {/* Left column - Text content */}
            <div className="flex flex-col justify-center">
              <h3 className={`text-2xl lg:text-4xl font-light ${theme === 'light' ? 'text-gray-900' : 'text-white'} mb-3 lg:mb-6 transition-opacity duration-300`}>
                {activeTabContent?.title || ''}
              </h3>
              <Text className={`text-xs md:text-base lg:text-xl font-light leading-relaxed mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} transition-opacity duration-300`}>
                {activeTabContent?.description || ''}
              </Text>
            </div>

            {/* Right column - Staggered images */}
            <div className="relative w-full aspect-[4/3]">
              {/* Render all images from all tabs, but only show active tab's images */}
              {(Object.entries(tabs) as [T, TabContentType][]).map(([tabKey, tabContent]) => (
                <React.Fragment key={tabKey}>
                  {tabContent.images.map((image, index) => (
                    <div
                      key={`${tabKey}-${index}`}
                      className="absolute transition-all duration-500"
                      style={{
                        width: image.width,
                        top: image.top,
                        bottom: image.bottom,
                        left: image.left,
                        right: image.right,
                        zIndex: image.zIndex,
                        opacity: activeTab === tabKey ? 1 : 0,
                        pointerEvents: activeTab === tabKey ? 'auto' : 'none',
                      }}
                    >
                      <div 
                        className={`rounded-lg shadow-xl transition-transform hover:scale-105 transform ${image.translateX} ${image.translateY}`}
                      >
                        <img
                          src={image.src}
                          alt={`${tabContent.title} visualization ${index + 1}`}
                          className="w-full h-auto rounded-lg border border-[#B8D8D0]/10"
                        />
                      </div>
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8 px-12 gap-4">
          {tabOptions.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-2 md:px-6 py-3 rounded-full text-xs lg:text-sm font-medium transition-colors duration-200 ${
                activeTab === tab
                  ? (theme === 'light' ? 'bg-[#2A3B35] text-white' : 'bg-white text-black')
                  : (theme === 'light' ? 'bg-[#2A3B35]/20 text-[#2A3B35] hover:bg-[#2A3B35]/30' : 'bg-[#0A1F1C]/40 text-[#B8D8D0] hover:bg-[#0A1F1C]/60')
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
} 