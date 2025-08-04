import React, { useEffect, useState } from 'react';

export function CookiesPolicy() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only add the script if it isn't already present
    if (!document.getElementById('termly-jssdk')) {
      const script = document.createElement('script');
      script.id = 'termly-jssdk';
      script.src = 'https://app.termly.io/embed-policy.min.js';
      script.async = true;
      script.onload = () => setIsLoading(false);
      document.body.appendChild(script);
    } else {
      setIsLoading(false);
    }

    return () => {
      // Cleanup script on unmount
      const script = document.getElementById('termly-jssdk');
      if (script) {
        script.remove();
      }
    };
  }, []);

  return (
    <div className="w-full min-h-screen relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#F0F5F3]">
          <div className="text-[#2A3B35] text-lg">Loading cookie policy...</div>
        </div>
      )}
      <div 
        name="termly-embed" 
        data-id="c323bc6b-307c-4ab7-acee-31d0f2dc5f96"
        style={{ minHeight: '100vh' }}
      >
        <iframe
          title="Cookie Policy"
          id="c323bc6b-307c-4ab7-acee-31d0f2dc5f96"
          src="https://app.termly.io/document/cookie-policy/c323bc6b-307c-4ab7-acee-31d0f2dc5f96"
          frameBorder="0"
          allowTransparency={true}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            minHeight: '100vh'
          }}
        >
          <p>Your browser does not support iframes.</p>
        </iframe>
      </div>
    </div>
  );
}