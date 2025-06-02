
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ColorPicker } from "@/components/ui/color-picker";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface QRStyleCardProps {
  dotColor: string;
  backgroundColor: string;
  dotSize: number;
  cornerRadius: number;
  level: string;
  imageFormat: string;
  setDotColor: (color: string) => void;
  setBackgroundColor: (color: string) => void;
  setDotSize: (size: number) => void;
  setCornerRadius: (radius: number) => void;
  setLevel: (level: string) => void;
  setImageFormat: (format: string) => void;
  subscription: string;
}

/**
 * Card component for QR code styling options
 */
const QRStyleCard = ({
  dotColor,
  backgroundColor,
  dotSize,
  cornerRadius,
  level,
  imageFormat,
  setDotColor,
  setBackgroundColor,
  setDotSize,
  setCornerRadius,
  setLevel,
  setImageFormat,
  subscription
}: QRStyleCardProps) => {
  const [activeTab, setActiveTab] = useState('design');
  const isPremium = subscription !== 'free';
  
  // Error correction levels
  const errorLevels = [
    { value: 'L', label: 'L - Low (7%)' },
    { value: 'M', label: 'M - Medium (15%)' },
    { value: 'Q', label: 'Q - Quality (25%)' },
    { value: 'H', label: 'H - High (30%)' }
  ];

  // Image formats
  const imageFormats = [
    { value: 'svg', label: 'SVG' },
    { value: 'png', label: 'PNG' },
    { value: 'jpeg', label: 'JPEG' }
  ];

  return (
    <Card className="mb-6 shadow-sm">
      <CardContent className="p-6">
        <h3 className="text-lg font-bold mb-4">Customize Style</h3>
        
        <Tabs defaultValue="design" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="design" className="text-center">Design</TabsTrigger>
            <TabsTrigger value="advanced" className="text-center">Advanced Options</TabsTrigger>
          </TabsList>
          
          <TabsContent value="design">
            <div className="space-y-6">
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <Label className="text-sm font-medium">QR Code Size</Label>
                  <span className="text-sm text-gray-500">{dotSize}%</span>
                </div>
                <Slider
                  value={[dotSize]}
                  min={10}
                  max={65}
                  step={1}
                  onValueChange={(value) => setDotSize(value[0])}
                  className="w-full"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">QR Code Color</h3>
                  <ColorPicker color={dotColor} onChange={setDotColor} />
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Background Color</h3>
                  <ColorPicker color={backgroundColor} onChange={setBackgroundColor} />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="advanced">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <Label className="text-sm font-medium">Corner Radius</Label>
                  <span className="text-sm text-gray-500">{cornerRadius}%</span>
                </div>
                <Slider
                  value={[cornerRadius]}
                  min={0}
                  max={50}
                  step={1}
                  onValueChange={(value) => setCornerRadius(value[0])}
                  className="w-full"
                />
              </div>
              
              <div>
                <Label className="text-sm font-medium mb-2 block">Error Correction</Label>
                <RadioGroup
                  value={level}
                  onValueChange={setLevel}
                  className="grid grid-cols-4 gap-2"
                >
                  {errorLevels.map((errorLevel) => (
                    <div key={errorLevel.value} className="flex items-center space-x-1">
                      <RadioGroupItem value={errorLevel.value} id={`error-${errorLevel.value}`} />
                      <Label htmlFor={`error-${errorLevel.value}`} className="text-sm">
                        {errorLevel.value}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                <p className="text-xs text-gray-500 mt-1">Higher levels enable better error correction but create denser codes</p>
              </div>
              
              <div>
                <Label className="text-sm font-medium mb-2 block">Image Format</Label>
                {isPremium ? (
                  <Select value={imageFormat} onValueChange={setImageFormat}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      {imageFormats.map((format) => (
                        <SelectItem key={format.value} value={format.value}>
                          {format.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="bg-gray-50 p-3 rounded border border-gray-200">
                    <p className="text-sm text-gray-500">Free plan exports as PNG only</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default QRStyleCard;
