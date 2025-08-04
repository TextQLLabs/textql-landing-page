import { useEffect, useMemo, useRef } from 'react';
// import { useLocation } from 'react-router-dom'; // Removed since we're not re-initializing on route changes

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
  // const location = useLocation(); // Removed since we're not re-initializing on route changes

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

  // Only initialize once when component mounts, not on route changes
  // Re-initializing on route changes resets consent preferences
  // useEffect(() => {
  //   if (window.Termly?.initialize) {
  //     window.Termly.initialize();
  //   }
  // }, [location.pathname, location.search]);

  return null;
}