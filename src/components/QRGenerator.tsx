
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useUser } from '@/context';
import { useToast } from '@/hooks/use-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQRHistory } from '@/hooks/useQRHistory';

// Import smaller components
import QRContentCard from './qr/QRContentCard';
import QRTypeSelector from './qr/QRTypeSelector';
import QRContentInput from './qr/QRContentInput';
import QRPasswordProtection from './qr/QRPasswordProtection';

// Lazy load non-critical components
const QRStyleCard = lazy(() => import('./qr/QRStyleCard'));
const QRLogoCard = lazy(() => import('./qr/QRLogoCard'));
const QRPreviewCard = lazy(() => import('./qr/QRPreviewCard'));
const QRActionButtons = lazy(() => import('./qr/QRActionButtons'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
    <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
    <div className="h-24 bg-gray-100 rounded mb-4"></div>
  </div>
);

const QRGenerator = ({ type = 'url' }) => {
  const [qrType, setQrType] = useState(type);
  const [qrValue, setQrValue] = useState('');
  const [qrURL, setQrURL] = useState('');
  const [generated, setGenerated] = useState(false);
  const [dotColor, setDotColor] = useState('#8A3FFC');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [logo, setLogo] = useState<string | null>(null);
  const [dotSize, setDotSize] = useState(70);
  const [cornerRadius, setCornerRadius] = useState(0);
  const [level, setLevel] = useState('H');
  const [imageFormat, setImageFormat] = useState('svg');
  const [isPasswordProtected, setIsPasswordProtected] = useState(false);
  const [qrPassword, setQrPassword] = useState('');
  
  const location = useLocation();
  const navigate = useNavigate();
  const { saveQRToHistory } = useQRHistory();

  // Get the QR type from URL if available
  const searchParams = new URLSearchParams(location.search);
  const urlType = searchParams.get('type');
  
  useEffect(() => {
    if (urlType) {
      setQrType(urlType);
    }
  }, [urlType]);

  const { isLoggedIn, incrementQRCount, subscription, canAddLogo } = useUser();
  const { toast } = useToast();

  // Trigger ad on button clicks - open in new tab, not separate window
  const triggerAd = () => {
    try {
      const adWindow = window.open('https://www.profitableratecpm.com/i05a32zv3x?key=e8aa2d7d76baecb611b49ce0d5af754f', '_blank', 'noopener,noreferrer');
      if (adWindow) {
        adWindow.focus();
      }
    } catch (error) {
      console.log('Ad trigger failed:', error);
    }
  };

  // Validate QR data length
  const validateQRDataLength = (data: string, errorLevel: string) => {
    const maxLengths = {
      'L': 2953,
      'M': 2331,
      'Q': 1663,
      'H': 1273
    };
    
    const maxLength = maxLengths[errorLevel] || 1273;
    return data.length <= maxLength;
  };

  const generateQRCode = () => {
    // Check if user is logged in first
    if (!isLoggedIn) {
      toast({
        variant: "destructive",
        title: "Login Required",
        description: "Please log in to generate QR codes",
      });
      navigate('/login');
      return false;
    }

    if (qrValue === '') {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a value to generate a QR code",
      });
      return false;
    }

    // Validate image URLs properly
    if (qrType === 'image') {
      // Check if it's a valid URL or a data URL from file upload
      const isValidURL = qrValue.startsWith('http') || qrValue.startsWith('https');
      const isDataURL = qrValue.startsWith('data:image/');
      
      if (!isValidURL && !isDataURL) {
        toast({
          variant: "destructive",
          title: "Invalid Image",
          description: "Please provide a valid image URL or upload an image file",
        });
        return false;
      }
    }

    // Handle password protection
    let finalURL = qrValue;
    if (isPasswordProtected && qrPassword) {
      // Create a password-protected URL (in a real app, this would be a secure backend URL)
      const encodedData = btoa(JSON.stringify({ content: qrValue, password: qrPassword }));
      finalURL = `${window.location.origin}/protected?data=${encodedData}`;
    }

    // Validate QR data length before generating
    if (!validateQRDataLength(finalURL, level)) {
      toast({
        variant: "destructive",
        title: "Data Too Large",
        description: "The content is too large for a QR code. Please use shorter content or lower error correction level.",
      });
      return false;
    }

    // If user is logged in, increment QR count
    const success = incrementQRCount();
    if (!success) {
      return false;
    }

    // Trigger ad on generate
    triggerAd();
    
    setGenerated(true);
    setQrURL(finalURL);

    // Save to QR history
    saveQRToHistory({
      type: qrType,
      content: qrValue,
      url: finalURL,
      dotColor,
      backgroundColor,
      hasLogo: !!logo,
    });
    
    return true;
  };

  const handleManualGenerate = () => {
    generateQRCode();
  };

  const handleContentChange = (value: string) => {
    setQrValue(value);
    // Reset generated state for all plans (no auto-generation)
    setGenerated(false);
    setQrURL('');
  };

  const handleTypeChange = (type: string) => {
    setQrType(type);
    // Reset generated state and value when changing type
    setGenerated(false);
    setQrValue('');
    setQrURL('');
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <QRTypeSelector 
              qrType={qrType} 
              onSelectType={handleTypeChange}
            />

            <QRContentInput
              qrType={qrType}
              qrValue={qrValue}
              handleContentChange={handleContentChange}
            />
            
            {/* Generate button for all plans */}
            <button 
              onClick={handleManualGenerate}
              className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white rounded-full py-3 px-4 flex items-center justify-center font-medium"
            >
              Generate QR Code
            </button>
          </div>
          
          <QRPasswordProtection
            isPasswordProtected={isPasswordProtected}
            password={qrPassword}
            onPasswordToggle={setIsPasswordProtected}
            onPasswordChange={setQrPassword}
            subscription={subscription}
          />
          
          <Suspense fallback={<LoadingFallback />}>
            <QRStyleCard
              dotColor={dotColor}
              backgroundColor={backgroundColor}
              dotSize={dotSize}
              cornerRadius={cornerRadius}
              level={level}
              imageFormat={imageFormat}
              setDotColor={setDotColor}
              setBackgroundColor={setBackgroundColor}
              setDotSize={setDotSize}
              setCornerRadius={setCornerRadius}
              setLevel={setLevel}
              setImageFormat={setImageFormat}
              subscription={subscription}
            />
          </Suspense>
          
          {/* Logo options */}
          <Suspense fallback={<LoadingFallback />}>
            <QRLogoCard 
              logo={logo}
              setLogo={setLogo}
              subscription={subscription}
            />
          </Suspense>
        </div>

        <div>
          <Suspense fallback={<LoadingFallback />}>
            <QRPreviewCard
              generated={generated}
              qrValue={qrValue}
              qrURL={qrURL}
              subscription={subscription}
              dotColor={dotColor}
              backgroundColor={backgroundColor}
              logo={logo}
              level={level}
              cornerRadius={cornerRadius}
              dotSize={dotSize}
            />
          </Suspense>
          
          <Suspense fallback={<LoadingFallback />}>
            <QRActionButtons
              generated={generated}
              qrValue={qrValue}
              qrURL={qrURL}
              subscription={subscription}
              imageFormat={imageFormat}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default QRGenerator;
