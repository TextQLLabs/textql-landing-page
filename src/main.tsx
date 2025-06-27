import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import { ScrollToTop } from './components/ScrollToTop';
import './index.css';

// Debug logging
console.log('TextQL App: Starting initialization');
console.log('Environment:', import.meta.env.MODE);
console.log('Base URL:', import.meta.env.BASE_URL);

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('TextQL App: Root element not found!');
} else {
  console.log('TextQL App: Root element found, rendering app');
  
  createRoot(rootElement).render(
    <StrictMode>
      <HelmetProvider>
        <BrowserRouter>
          <ScrollToTop />
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </StrictMode>
  );
  
  console.log('TextQL App: Render complete');
}