
import React from 'react';
import { QrCode } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import QRTypeSelector from './QRTypeSelector';
import QRContentInput from './QRContentInput';

interface QRContentCardProps {
  qrType: string;
  qrValue: string;
  subscription: string;
  handleContentChange: (value: string) => void;
  handleManualGenerate: () => void;
}

/**
 * Card component for QR content input
 */
const QRContentCard = ({
  qrType,
  qrValue,
  subscription,
  handleContentChange,
  handleManualGenerate
}: QRContentCardProps) => {
  return (
    <Card className="mb-6 shadow-sm">
      <CardContent className="p-6">
        <h3 className="text-lg font-bold mb-4">نوع رمز QR</h3>
        <QRTypeSelector qrType={qrType} />
        
        <QRContentInput 
          qrType={qrType}
          qrValue={qrValue}
          handleContentChange={handleContentChange}
        />
        
        {/* Show the manual generate button only for free plan users */}
        {subscription === 'free' && (
          <Button 
            onClick={handleManualGenerate} 
            className="w-full mt-6 bg-purple-600 hover:bg-purple-700 rounded-full py-6"
            size="lg"
          >
            <QrCode className="mr-2 h-5 w-5" /> 
            إنشاء رمز QR
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default QRContentCard;
