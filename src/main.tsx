
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

// Function to load homepage ads immediately
const loadHomepageAd = () => {
  try {
    // Only load on homepage and not localhost
    if ((window.location.pathname === '/' || window.location.pathname === '/index.html') && 
        typeof window !== 'undefined' && 
        window.location.hostname !== 'localhost') {
      
      // Remove any existing ad scripts first
      const existingScript = document.querySelector('script[src*="profitableratecpm.com"]');
      if (existingScript) {
        existingScript.remove();
      }
      
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = '//pl26659143.profitableratecpm.com/60/df/38/60df386dd2cfa2ac4a8c1e4294a705c6.js';
      script.async = false; // Load synchronously for immediate display
      
      // Load immediately when site opens
      script.onload = () => {
        console.log('Homepage ad loaded successfully');
        // Try to find and position the ad
        setTimeout(() => {
          const adElements = document.querySelectorAll('[id*="profitablerate"], [class*="profitablerate"]');
          adElements.forEach(el => {
            if (el.parentElement) {
              el.parentElement.style.textAlign = 'center';
              el.parentElement.style.margin = '10px auto';
            }
          });
        }, 1000);
      };
      
      script.onerror = () => {
        console.log('Homepage ad failed to load');
      };
      
      // Append to body for immediate execution
      document.body.appendChild(script);
    }
  } catch (error) {
    console.log('Error loading homepage ad script:', error);
  }
};

// Make sure we have a valid DOM element to render into
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

// Load ads immediately when site opens
if (typeof window !== 'undefined') {
  // Load immediately if DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadHomepageAd);
  } else {
    loadHomepageAd();
  }
  
  // Also ensure it loads after React renders
  setTimeout(loadHomepageAd, 500);
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
