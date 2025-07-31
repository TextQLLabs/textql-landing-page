import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
}

export function VideoModal({ isOpen, onClose, videoSrc }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-[10000]"
        aria-label="Close video"
      >
        <X className="w-6 h-6 text-gray-700" />
      </button>
      
      <div 
        className="relative w-full max-w-6xl mx-8"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          ref={videoRef}
          src={videoSrc}
          controls
          autoPlay
          className="w-full h-auto rounded-lg shadow-2xl"
        />
      </div>
    </div>
  );
}