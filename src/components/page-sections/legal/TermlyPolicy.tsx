import React, { useEffect, useState } from 'react';

export function TermlyPolicy() {
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
          <div className="text-[#2A3B35] text-lg">Loading privacy policy...</div>
        </div>
      )}
      <div 
        name="termly-embed" 
        data-id="74062df1-7a70-4ccd-be57-a6e01ee31c3f"
        style={{ minHeight: '100vh' }}
      >
        <iframe
          title="Privacy Policy"
          id="74062df1-7a70-4ccd-be57-a6e01ee31c3f"
          src="https://app.termly.io/document/privacy-policy/74062df1-7a70-4ccd-be57-a6e01ee31c3f"
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