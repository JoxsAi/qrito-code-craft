
import React from 'react';
import { createRoot } from 'react-dom/client';
import { UserProvider } from './context';

// Import styles
import './index.css';

// Use dynamic import for better initial loading
const App = React.lazy(() => import('./App.tsx'));

// Loading state while app is loading
const LoadingState = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600">جاري التحميل...</p>
    </div>
  </div>
);

// Function to load homepage ads - improved reliability
const loadHomepageAd = () => {
  try {
    // Only load on homepage
    const isHomepage = window.location.pathname === '/' || 
                      window.location.pathname === '/index.html' ||
                      window.location.pathname === '/index';
    
    // Don't load on localhost for development
    const isProduction = window.location.hostname !== 'localhost' && 
                        window.location.hostname !== '127.0.0.1';
    
    if (isHomepage && isProduction && typeof window !== 'undefined') {
      
      // Remove any existing ad scripts to prevent duplicates
      const existingScripts = document.querySelectorAll('script[src*="profitableratecpm.com"]');
      existingScripts.forEach(script => script.remove());
      
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = '//pl26659143.profitableratecpm.com/60/df/38/60df386dd2cfa2ac4a8c1e4294a705c6.js';
      script.async = false; // Load synchronously for immediate display
      script.defer = false;
      
      script.onload = () => {
        console.log('Homepage ad script loaded successfully');
        // Try to position ad content after load
        setTimeout(() => {
          const adContainer = document.getElementById('homepage-ad-container');
          if (adContainer) {
            // Ensure ad container is visible and styled properly
            adContainer.style.display = 'block';
            adContainer.style.textAlign = 'center';
            adContainer.style.minHeight = '90px';
          }
        }, 1000);
      };
      
      script.onerror = () => {
        console.log('Homepage ad script failed to load - retrying...');
        // Single retry after delay
        setTimeout(() => {
          const retryScript = document.createElement('script');
          retryScript.type = 'text/javascript';
          retryScript.src = '//pl26659143.profitableratecpm.com/60/df/38/60df386dd2cfa2ac4a8c1e4294a705c6.js';
          retryScript.async = false;
          retryScript.onload = () => console.log('Homepage ad loaded on retry');
          retryScript.onerror = () => console.log('Homepage ad retry failed');
          document.head.appendChild(retryScript);
        }, 3000);
      };
      
      // Append to head for immediate execution
      document.head.appendChild(script);
    }
  } catch (error) {
    console.log('Error loading homepage ad script:', error);
  }
};

// Make sure we have a valid DOM element to render into
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

// Load ads with multiple triggers for reliability
if (typeof window !== 'undefined') {
  // Immediate load if DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadHomepageAd);
  } else {
    loadHomepageAd();
  }
  
  // Additional triggers
  window.addEventListener('load', loadHomepageAd);
  
  // Final attempt after app renders
  setTimeout(loadHomepageAd, 1000);
}

// Render with Suspense for better UX during loading
createRoot(rootElement).render(
  <React.StrictMode>
    <UserProvider>
      <React.Suspense fallback={<LoadingState />}>
        <App />
      </React.Suspense>
    </UserProvider>
  </React.StrictMode>
);
