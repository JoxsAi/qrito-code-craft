
import React from "react";
import { Link } from "react-router-dom";
import { QrCode } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  backgroundAnimationClass?: string;
}

// This component is now only used for other auth-related pages
// Login and Signup now have their custom implementations
const AuthLayout: React.FC<AuthLayoutProps> = ({ 
  children, 
  backgroundAnimationClass = "animate-pulse"
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-4 bg-gradient-to-r from-qrito-purple-light to-qrito-purple-dark relative overflow-hidden">
        {/* Enhanced animated background elements */}
        <div className="absolute inset-0">
          <div className={`absolute left-1/4 top-1/4 w-32 h-32 rounded-full bg-white opacity-10 ${backgroundAnimationClass}`}></div>
          <div className="absolute right-1/3 top-1/2 w-48 h-48 rounded-full bg-white opacity-10 animate-float"></div>
          <div className="absolute left-1/2 bottom-1/4 w-56 h-56 rounded-full bg-white opacity-5 animate-spin-slow"></div>
          <div className="absolute right-1/4 bottom-1/3 w-40 h-40 rounded-full bg-white opacity-10 animate-pulse"></div>
        </div>

        <div className="w-full max-w-md z-10">
          <div className="flex justify-center mb-8 animate-fade-in">
            <Link to="/" className="flex items-center gap-3 transition-transform hover:scale-105">
              <QrCode className="h-12 w-12 text-white" />
              <span className="font-bold text-4xl text-white">QRito</span>
            </Link>
          </div>
          
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
