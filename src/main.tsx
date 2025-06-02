
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

// Function to load ads on homepage with better error handling for deployment
const loadAds = () => {
  try {
    // Only load on homepage and in production
    if ((window.location.pathname === '/' || window.location.pathname === '/index.html') && 
        typeof window !== 'undefined' && 
        window.location.hostname !== 'localhost') {
      
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = '//pl26659143.profitableratecpm.com/60/df/38/60df386dd2cfa2ac4a8c1e4294a705c6.js';
      script.async = true;
      script.defer = true;
      
      // Add error handling
      script.onerror = () => {
        console.log('Ad script failed to load');
      };
      
      document.body.appendChild(script);
    }
  } catch (error) {
    console.log('Error loading ad script:', error);
  }
};

// Make sure we have a valid DOM element to render into
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

// Load ads after DOM is ready
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', loadAds);
  // Fallback if DOMContentLoaded already fired
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAds);
  } else {
    loadAds();
  }
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
