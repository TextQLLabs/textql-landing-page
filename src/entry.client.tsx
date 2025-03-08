import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';
import App from './App';
import './index.css';
import { ScrollToTop } from './components/ScrollToTop';

ReactGA.initialize('GTM-NVJBC6P4');

function RouteTracker() {
  const location = useLocation();
  
  React.useEffect(() => {
    ReactGA.send({ 
      hitType: "pageview", 
      page: location.pathname + location.search 
    });
  }, [location]);
  
  return null;
}

const root = document.getElementById("root");
if (!root) throw new Error("#root element not found");

createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <>
        <RouteTracker />
        <ScrollToTop />
        <App />
      </>
    </BrowserRouter>
  </React.StrictMode>
); 
