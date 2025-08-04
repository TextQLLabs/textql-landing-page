import { useEffect, useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const SCRIPT_SRC_BASE = 'https://app.termly.io';

interface TermlyCMPProps {
  websiteUUID: string;
  autoBlock?: boolean;
  masterConsentsOrigin?: string;
}

declare global {
  interface Window {
    Termly?: {
      initialize: () => void;
    };
  }
}

export default function TermlyCMP({ 
  websiteUUID, 
  autoBlock, 
  masterConsentsOrigin 
}: TermlyCMPProps) {
  const scriptSrc = useMemo(() => {
    const src = new URL(SCRIPT_SRC_BASE);
    src.pathname = `/resource-blocker/${websiteUUID}`;
    if (autoBlock) {
      src.searchParams.set('autoBlock', 'on');
    }
    if (masterConsentsOrigin) {
      src.searchParams.set('masterConsentsOrigin', masterConsentsOrigin);
    }
    return src.toString();
  }, [autoBlock, masterConsentsOrigin, websiteUUID]);

  const isScriptAdded = useRef(false);
  const location = useLocation();

  useEffect(() => {
    if (isScriptAdded.current) return;
    
    const script = document.createElement('script');
    script.src = scriptSrc;
    script.async = true;
    document.head.appendChild(script);
    isScriptAdded.current = true;

    return () => {
      // Cleanup function - remove script if component unmounts
      const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [scriptSrc]);

  // Re-initialize Termly when route changes (similar to Next.js pathname/searchParams)
  useEffect(() => {
    if (window.Termly?.initialize) {
      window.Termly.initialize();
    }
  }, [location.pathname, location.search]);

  return null;
}