
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ProtectedQR = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [content, setContent] = useState('');
  const [protectedData, setProtectedData] = useState<any>(null);
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const data = searchParams.get('data');
    
    if (data) {
      try {
        const decoded = JSON.parse(atob(data));
        setProtectedData(decoded);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Invalid QR Code",
          description: "This QR code data is corrupted or invalid."
        });
      }
    }
  }, [location, toast]);

  const handleUnlock = () => {
    if (!protectedData) {
      toast({
        variant: "destructive",
        title: "No Data",
        description: "No protected data found."
      });
      return;
    }

    if (password === protectedData.password) {
      setIsUnlocked(true);
      setContent(protectedData.content);
      toast({
        title: "Access Granted",
        description: "QR code content unlocked successfully."
      });
    } else {
      toast({
        variant: "destructive",
        title: "Incorrect Password",
        description: "The password you entered is incorrect."
      });
    }
  };

  const renderContent = () => {
    if (content.startsWith('http')) {
      return (
        <a 
          href={content} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-600 hover:underline break-all"
        >
          {content}
        </a>
      );
    }
    
    // Handle email content
    if (content.includes('@') && content.includes('.')) {
      return (
        <a 
          href={`mailto:${content}`} 
          className="text-blue-600 hover:underline break-all"
        >
          {content}
        </a>
      );
    }
    
    // Handle phone numbers
    if (content.match(/^\+?[\d\s\-\(\)]+$/)) {
      return (
        <a 
          href={`tel:${content}`} 
          className="text-blue-600 hover:underline"
        >
          {content}
        </a>
      );
    }
    
    // For other content types (text, contact info, etc.)
    return <p className="whitespace-pre-wrap break-all">{content}</p>;
  };

  if (isUnlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Content Unlocked</h2>
              <div className="bg-gray-100 p-4 rounded-lg text-left">
                {renderContent()}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Protected QR Code</h2>
            <p className="text-gray-600 mb-6">This QR code is password protected. Enter the password to view the content.</p>
            
            <div className="space-y-4">
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleUnlock()}
                  className="pr-10"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              
              <Button 
                onClick={handleUnlock}
                className="w-full bg-purple-600 hover:bg-purple-700"
                disabled={!password}
              >
                Unlock Content
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProtectedQR;
