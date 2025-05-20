import React, { useState, useEffect } from 'react';

interface ImageProxyProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc?: string;
}

/**
 * ImageProxy component that handles external images safely to avoid CORS issues
 * For external URLs, it can optionally apply a proxy or fallback to a local image
 */
const ImageProxy: React.FC<ImageProxyProps> = ({ 
  src, 
  fallbackSrc = '/images/placeholder.png',
  alt,
  className,
  ...props 
}) => {
  const [imageSrc, setImageSrc] = useState<string>(src);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    // Reset state when src changes
    setImageSrc(src);
    setError(false);
  }, [src]);

  // Check if the URL is external
  const isExternalUrl = (url: string): boolean => {
    try {
      const urlObj = new URL(url);
      return urlObj.origin !== window.location.origin;
    } catch {
      return false;
    }
  };

  // Handle image load error
  const handleError = () => {
    if (!error) {
      setError(true);
      setImageSrc(fallbackSrc);
    }
  };

  return (
    <img 
      src={imageSrc} 
      alt={alt || ''}
      onError={handleError}
      className={className}
      {...props}
    />
  );
};

export default ImageProxy; 