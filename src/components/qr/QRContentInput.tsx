import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Eye, EyeOff, Upload } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';

interface QRContentInputProps {
  qrType: string;
  qrValue: string;
  handleContentChange: (value: string) => void;
}

/**
 * QR Content Input component for different QR types
 */
const QRContentInput = ({ qrType, qrValue, handleContentChange }: QRContentInputProps) => {
  // WiFi specific states
  const [wifiNetwork, setWifiNetwork] = useState('');
  const [wifiEncryption, setWifiEncryption] = useState('nopass');
  const [wifiPassword, setWifiPassword] = useState('');
  const [wifiHidden, setWifiHidden] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Image upload state
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { toast } = useToast();
  
  // Handle WiFi data changes and format the QR content
  const handleWifiChange = (network: string, encryption: string, password: string, hidden: boolean) => {
    setWifiNetwork(network);
    setWifiEncryption(encryption);
    setWifiPassword(password);
    setWifiHidden(hidden);
    
    // Format the WiFi string according to the standard format: WIFI:T:WPA;S:network_name;P:password;H:true/false;;
    const wifiString = `WIFI:T:${encryption};S:${network};${encryption !== 'nopass' ? `P:${password};` : ''}H:${hidden ? 'true' : 'false'};;`;
    handleContentChange(wifiString);
  };
  
  // Handle image file upload with validation
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          variant: "destructive",
          title: "Invalid File",
          description: "Please select a valid image file.",
        });
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "File Too Large",
          description: "Please select an image smaller than 5MB.",
        });
        return;
      }
      
      setImageFile(file);
      
      // Create a data URL for the image with compression
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          const img = new Image();
          img.onload = () => {
            // Create canvas for compression
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Calculate new dimensions (max 800x800)
            let { width, height } = img;
            const maxDimension = 800;
            
            if (width > maxDimension || height > maxDimension) {
              if (width > height) {
                height = (height * maxDimension) / width;
                width = maxDimension;
              } else {
                width = (width * maxDimension) / height;
                height = maxDimension;
              }
            }
            
            canvas.width = width;
            canvas.height = height;
            
            if (ctx) {
              ctx.drawImage(img, 0, 0, width, height);
              const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8);
              handleContentChange(compressedDataUrl);
            }
          };
          img.src = event.target.result as string;
        }
      };
      reader.onerror = () => {
        toast({
          variant: "destructive",
          title: "Upload Failed",
          description: "Failed to read the image file.",
        });
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Different input components based on qrType
  const renderInputByType = () => {
    switch (qrType) {
      case 'url':
        return (
          <div className="mt-4">
            <Label htmlFor="url">Website URL</Label>
            <Input
              id="url"
              placeholder="Enter website URL"
              value={qrValue}
              onChange={(e) => handleContentChange(e.target.value)}
              className="mt-1"
            />
          </div>
        );
      case 'text':
        return (
          <div className="mt-4">
            <Label htmlFor="text">Text</Label>
            <Input
              id="text"
              placeholder="Enter text"
              value={qrValue}
              onChange={(e) => handleContentChange(e.target.value)}
              className="mt-1"
            />
          </div>
        );
      case 'email':
        return (
          <div className="mt-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="Enter email address"
              value={qrValue}
              onChange={(e) => handleContentChange(e.target.value)}
              className="mt-1"
            />
          </div>
        );
      case 'phone':
        return (
          <div className="mt-4">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              placeholder="Enter phone number"
              value={qrValue}
              onChange={(e) => handleContentChange(e.target.value)}
              className="mt-1"
            />
          </div>
        );
      case 'sms':
        return (
          <div className="mt-4">
            <Label htmlFor="sms">SMS Message</Label>
            <Input
              id="sms"
              placeholder="Enter SMS message"
              value={qrValue}
              onChange={(e) => handleContentChange(e.target.value)}
              className="mt-1"
            />
          </div>
        );
      case 'wifi':
        return (
          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="wifi-network">WiFi Network Name</Label>
              <Input
                id="wifi-network"
                placeholder="Enter WiFi network name"
                value={wifiNetwork}
                onChange={(e) => handleWifiChange(e.target.value, wifiEncryption, wifiPassword, wifiHidden)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="wifi-encryption">Security Type</Label>
              <Select 
                value={wifiEncryption} 
                onValueChange={(value) => handleWifiChange(wifiNetwork, value, wifiPassword, wifiHidden)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select security type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nopass">No Security</SelectItem>
                  <SelectItem value="WEP">WEP</SelectItem>
                  <SelectItem value="WPA">WPA/WPA2-Personal</SelectItem>
                  <SelectItem value="WPA3">WPA3-Personal</SelectItem>
                  <SelectItem value="WPA2-EAP">WPA/WPA2-Enterprise</SelectItem>
                  <SelectItem value="WPA3-EAP">WPA3-Enterprise</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {wifiEncryption !== 'nopass' && (
              <div>
                <Label htmlFor="wifi-password">Password</Label>
                <div className="relative mt-1">
                  <Input
                    id="wifi-password"
                    placeholder="Enter WiFi password"
                    type={showPassword ? 'text' : 'password'}
                    value={wifiPassword}
                    onChange={(e) => handleWifiChange(wifiNetwork, wifiEncryption, e.target.value, wifiHidden)}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            )}
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="wifi-hidden"
                checked={wifiHidden} 
                onCheckedChange={(checked) => handleWifiChange(wifiNetwork, wifiEncryption, wifiPassword, checked)}
              />
              <Label htmlFor="wifi-hidden">Hidden Network</Label>
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="mt-4">
            <Label htmlFor="contact">Contact Information</Label>
            <Input
              id="contact"
              placeholder="Enter contact information"
              value={qrValue}
              onChange={(e) => handleContentChange(e.target.value)}
              className="mt-1"
            />
          </div>
        );
      case 'location':
        return (
          <div className="mt-4">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="Enter location information"
              value={qrValue}
              onChange={(e) => handleContentChange(e.target.value)}
              className="mt-1"
            />
          </div>
        );
      case 'event':
        return (
          <div className="mt-4">
            <Label htmlFor="event">Event</Label>
            <Input
              id="event"
              placeholder="Enter event details"
              value={qrValue}
              onChange={(e) => handleContentChange(e.target.value)}
              className="mt-1"
            />
          </div>
        );
      case 'app':
        return (
          <div className="mt-4">
            <Label htmlFor="app">App</Label>
            <Input
              id="app"
              placeholder="Enter app link"
              value={qrValue}
              onChange={(e) => handleContentChange(e.target.value)}
              className="mt-1"
            />
          </div>
        );
      case 'image':
        return (
          <div className="mt-4">
            <Label htmlFor="image">Image</Label>
            <div className="space-y-4">
              <Input
                id="image"
                placeholder="Enter image URL"
                value={qrValue}
                onChange={(e) => handleContentChange(e.target.value)}
                className="mt-1"
              />
              <div className="text-center text-gray-500">or</div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center justify-center"
                >
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">Click to upload image (max 5MB)</span>
                  {imageFile && (
                    <span className="text-xs text-green-600 mt-1">
                      {imageFile.name} - Processed
                    </span>
                  )}
                </label>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return <>{renderInputByType()}</>;
};

export default QRContentInput;
