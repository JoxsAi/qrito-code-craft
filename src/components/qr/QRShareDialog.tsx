
import React, { useState } from 'react';
import { Share2, Copy, QrCode, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface QRShareDialogProps {
  isOpen: boolean;
  onClose: () => void;
  qrValue: string;
  qrURL: string;
}

const QRShareDialog = ({ isOpen, onClose, qrValue, qrURL }: QRShareDialogProps) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const shareTitle = "QR Code from QRito";
  const shareText = "Check out this QR code I created with QRito!";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(qrValue);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "QR code content copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = qrValue;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      setCopied(true);
      toast({
        title: "Copied!",
        description: "QR code content copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getQRPreviewDataUrl = (): string => {
    const svg = document.getElementById("qr-code-svg");
    if (!svg) return '';
    
    try {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      
      canvas.width = 200;
      canvas.height = 200;
      
      if (ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        const svgBlob = new Blob([svgData], { type: "image/svg+xml" });
        const url = URL.createObjectURL(svgBlob);
        
        img.onload = () => {
          ctx.drawImage(img, 0, 0, 200, 200);
          URL.revokeObjectURL(url);
        };
        
        img.src = url;
        return canvas.toDataURL('image/png');
      }
    } catch (error) {
      console.log('Error generating QR preview:', error);
    }
    
    return '';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 size={20} />
            Share QR Code
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* QR Preview */}
          <div className="flex justify-center">
            <div className="w-32 h-32 border border-gray-200 rounded-lg flex items-center justify-center bg-white">
              {document.getElementById("qr-code-svg") ? (
                <div className="w-28 h-28" dangerouslySetInnerHTML={{
                  __html: document.getElementById("qr-code-svg")?.outerHTML || ''
                }} />
              ) : (
                <QrCode size={48} className="text-gray-400" />
              )}
            </div>
          </div>

          {/* Content Preview */}
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-sm text-gray-600 font-medium mb-1">Content:</p>
            <p className="text-sm text-gray-800 break-all">
              {qrValue.length > 60 ? `${qrValue.substring(0, 60)}...` : qrValue}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <Button 
              onClick={copyToClipboard}
              variant="secondary" 
              className="w-full"
            >
              <Copy className="mr-2" size={16} />
              {copied ? 'Copied!' : 'Copy Content'}
            </Button>
            
            <div className="text-xs text-gray-500 text-center mt-4">
              Share this QR code content with others
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRShareDialog;
