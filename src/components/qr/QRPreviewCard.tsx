
import React from 'react';
import { QrCode } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { QRCodeSVG } from "qrcode.react";

interface QRPreviewCardProps {
  generated: boolean;
  qrValue: string;
  qrURL: string;
  subscription: string;
  dotColor: string;
  backgroundColor: string;
  logo: string | null;
  level: string;
  cornerRadius: number;
  dotSize: number;
}

/**
 * Card component for QR code preview
 */
const QRPreviewCard = ({
  generated,
  qrValue,
  qrURL,
  subscription,
  dotColor,
  backgroundColor,
  logo,
  level,
  cornerRadius,
  dotSize
}: QRPreviewCardProps) => {
  const shouldShowQR = generated && qrURL;
  
  // Calculate the size based on dot size percentage
  const calculatedSize = Math.max(200, Math.min(400, 200 + (dotSize * 2)));
  
  // Ensure error correction level is valid
  const validLevel = ['L', 'M', 'Q', 'H'].includes(level) ? level as "L" | "M" | "Q" | "H" : 'H';
  
  // QR code data limits based on error correction level
  const getMaxDataLength = (errorLevel: string) => {
    switch (errorLevel) {
      case 'L': return 2953; // Low error correction
      case 'M': return 2331; // Medium error correction  
      case 'Q': return 1663; // Quality error correction
      case 'H': return 1273; // High error correction
      default: return 1273;
    }
  };
  
  // Validate and truncate data if necessary
  const validateQRData = (data: string, errorLevel: string) => {
    const maxLength = getMaxDataLength(errorLevel);
    
    if (data.length <= maxLength) {
      return data;
    }
    
    // If data is too long, truncate and add indicator
    console.warn(`QR data too long (${data.length} chars), truncating to ${maxLength} chars`);
    return data.substring(0, maxLength - 3) + '...';
  };
  
  // Get safe QR data
  const safeQRData = shouldShowQR ? validateQRData(qrURL, validLevel) : '';
  
  return (
    <Card className="shadow-sm">
      <CardContent className="p-6 flex flex-col items-center">
        <h3 className="text-lg font-bold mb-4">QR Preview</h3>
        
        {shouldShowQR ? (
          <div className="flex justify-center items-center">
            {safeQRData.length > 0 ? (
              <QRCodeSVG
                id="qr-code-svg"
                value={safeQRData}
                size={calculatedSize}
                bgColor={backgroundColor}
                fgColor={dotColor}
                level={validLevel}
                includeMargin={true}
                style={{ borderRadius: `${cornerRadius}px` }}
                imageSettings={logo ? {
                  src: logo,
                  excavate: true,
                  height: Math.max(40, calculatedSize * 0.15),
                  width: Math.max(40, calculatedSize * 0.15),
                } : undefined}
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-8 bg-red-50 rounded-lg h-64 w-full border border-red-200">
                <QrCode size={64} className="text-red-300 mb-2" />
                <p className="text-red-500 text-sm text-center">Data too large for QR code</p>
                <p className="text-red-400 text-xs text-center mt-1">Please use shorter content</p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg h-64 w-full">
            <QrCode size={64} className="text-gray-300 mb-2" />
            <p className="text-gray-400">QR Preview</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QRPreviewCard;
