
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface QRAdvancedOptionsProps {
  cornerRadius: number;
  setCornerRadius: (value: number) => void;
  level: string;
  setLevel: (level: string) => void;
  imageFormat: string;
  setImageFormat: (format: string) => void;
  subscription: string;
}

const QRAdvancedOptions = ({
  cornerRadius,
  setCornerRadius,
  level,
  setLevel,
  imageFormat,
  setImageFormat,
  subscription
}: QRAdvancedOptionsProps) => {
  const isPremium = subscription !== 'free';
  
  const errorLevels = [
    { value: 'L', label: 'L - Low (7%)' },
    { value: 'M', label: 'M - Medium (15%)' },
    { value: 'Q', label: 'Q - Quality (25%)' },
    { value: 'H', label: 'H - High (30%)' }
  ];

  const imageFormats = [
    { value: 'svg', label: 'SVG' },
    { value: 'png', label: 'PNG' },
    { value: 'jpeg', label: 'JPEG' }
  ];

  return (
    <Card className="shadow-sm">
      <CardContent className="p-6">
        <h3 className="text-lg font-bold mb-4">Advanced Options</h3>
        
        <Tabs defaultValue="design" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="design" className="text-center">Design</TabsTrigger>
            <TabsTrigger value="export" className="text-center">Export</TabsTrigger>
          </TabsList>
          
          <TabsContent value="design">
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
            </div>
          </TabsContent>
          
          <TabsContent value="export">
            <div className="space-y-4">
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

export default QRAdvancedOptions;
