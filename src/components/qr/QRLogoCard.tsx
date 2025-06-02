
import React, { useRef } from 'react';
import { PlusCircle, X, Upload } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/context';

interface QRLogoCardProps {
  logo: string | null;
  setLogo: (logo: string | null) => void;
  subscription: string;
}

/**
 * Card component for QR logo upload functionality
 */
const QRLogoCard = ({ logo, setLogo, subscription }: QRLogoCardProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { canAddLogo } = useUser();
  const isPremium = subscription !== 'free';
  
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please upload an image smaller than 2MB"
        });
        return;
      }
      
      // Check file type
      if (!file.type.startsWith('image/')) {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload an image file"
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          setLogo(event.target.result as string);
          toast({
            title: "Logo uploaded",
            description: "Your logo has been added to the QR code"
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleClickUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Card className="mb-6 shadow-sm">
      <CardContent className="p-6">
        <h3 className="text-lg font-bold mb-4">Add Logo (Optional)</h3>
        
        {isPremium ? (
          <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-8 bg-gray-50">
            {logo ? (
              <div className="relative">
                <img src={logo} alt="Logo" className="h-24 w-auto" />
                <button 
                  onClick={() => setLogo(null)} 
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="text-center">
                <Upload size={36} className="mx-auto text-gray-400" />
                <p className="text-gray-500 mt-2">Click to upload your logo</p>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  id="logo-upload" 
                  ref={fileInputRef}
                  onChange={handleLogoUpload} 
                />
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={handleClickUpload}
                >
                  Choose File
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <div className="text-center">
              <PlusCircle size={36} className="mx-auto text-gray-300" />
              <p className="text-gray-400 mt-2">Upgrade to Premium to add a logo</p>
              <Button variant="outline" size="sm" className="mt-2" disabled>
                Premium Feature
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QRLogoCard;
