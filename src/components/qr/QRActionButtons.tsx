
import React, { useState } from 'react';
import { Download, Copy, Share2, FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import QRShareDialog from './QRShareDialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface QRActionButtonsProps {
  generated: boolean;
  qrValue: string;
  qrURL: string;
  subscription: string;
  imageFormat?: string;
}

const QRActionButtons = ({
  generated,
  qrValue,
  qrURL,
  subscription,
  imageFormat = 'svg'
}: QRActionButtonsProps) => {
  const { toast } = useToast();
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const shouldShow = (generated || (qrValue && subscription !== 'free')) && qrURL;
  
  // Trigger ad in new tab - preserves user data
  const triggerAd = () => {
    try {
      // Open ad in new tab
      const adWindow = window.open(
        'https://www.profitableratecpm.com/i05a32zv3x?key=e8aa2d7d76baecb611b49ce0d5af754f',
        '_blank',
        'noopener,noreferrer'
      );
      
      if (adWindow) {
        adWindow.focus();
      } else {
        console.log('Ad tab blocked by browser');
      }
    } catch (error) {
      console.log('Ad trigger failed:', error);
    }
  };

  // Convert QR code to blob for sharing
  const getQRCodeAsBlob = (): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const svg = document.getElementById("qr-code-svg");
      if (!svg) {
        reject(new Error("QR code not found"));
        return;
      }

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      const svgData = new XMLSerializer().serializeToString(svg);
      const svgBlob = new Blob([svgData], { type: "image/svg+xml" });
      const url = URL.createObjectURL(svgBlob);
      
      img.onload = () => {
        canvas.width = 512;
        canvas.height = 512;
        if (ctx) {
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          canvas.toBlob((blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("Failed to create blob"));
            }
          }, 'image/png', 0.9);
        } else {
          reject(new Error("Canvas context not available"));
        }
        URL.revokeObjectURL(url);
      };
      
      img.onerror = () => {
        reject(new Error("Failed to load QR code image"));
        URL.revokeObjectURL(url);
      };
      
      img.src = url;
    });
  };

  // Modern share handler with fallbacks
  const handleShare = async () => {
    triggerAd();
    
    const shareData = {
      title: 'QR Code from QRito',
      text: 'Check out this QR code I created with QRito!',
      url: qrValue,
    };

    // Check if native sharing is supported (mobile devices)
    if (navigator.share) {
      try {
        // Try to share with image if possible
        const qrBlob = await getQRCodeAsBlob();
        const file = new File([qrBlob], 'qrcode.png', { type: 'image/png' });
        
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            ...shareData,
            files: [file]
          });
        } else {
          // Fallback to text sharing
          await navigator.share(shareData);
        }
        
        toast({
          title: "Shared Successfully",
          description: "QR code shared via system share menu",
        });
        return;
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.log('Native sharing failed:', error);
        } else {
          // User cancelled the share
          return;
        }
      }
    }
    
    // Fallback: Open custom share dialog for desktop
    setIsShareDialogOpen(true);
  };
  
  const downloadQRCode = () => {
    triggerAd();
    
    const svg = document.getElementById("qr-code-svg");
    if (!svg) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate image",
      });
      return;
    }

    const format = subscription === 'free' ? 'png' : imageFormat;
    
    if (format === 'svg') {
      const svgData = new XMLSerializer().serializeToString(svg);
      const svgBlob = new Blob([svgData], { type: "image/svg+xml" });
      const url = URL.createObjectURL(svgBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "qrcode.svg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      const svgData = new XMLSerializer().serializeToString(svg);
      const svgBlob = new Blob([svgData], { type: "image/svg+xml" });
      const url = URL.createObjectURL(svgBlob);
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const downloadUrl = canvas.toDataURL(`image/${format === 'jpeg' ? 'jpeg' : 'png'}`);
          const link = document.createElement("a");
          link.href = downloadUrl;
          link.download = `qrcode.${format}`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
        URL.revokeObjectURL(url);
      };
      
      img.src = url;
    }
    
    toast({
      title: "Download started",
      description: `QR code downloaded as ${format.toUpperCase()}`,
    });
  };

  const downloadQRCodeAsPDF = async () => {
    // Check subscription - Pro or Business users
    if (subscription !== 'pro' && subscription !== 'business') {
      toast({
        variant: "destructive",
        title: "Pro Feature",
        description: "PDF download is only available for Pro and Business plan users. Please upgrade to access this feature.",
      });
      return;
    }

    triggerAd();
    
    try {
      const svg = document.getElementById("qr-code-svg");
      if (!svg) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to generate PDF - QR code not found",
        });
        return;
      }

      // Get QR code as high-quality image data
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      const svgData = new XMLSerializer().serializeToString(svg);
      const svgBlob = new Blob([svgData], { type: "image/svg+xml" });
      const url = URL.createObjectURL(svgBlob);
      
      img.onload = async () => {
        // Set high resolution for PDF quality
        const size = 400;
        canvas.width = size;
        canvas.height = size;
        
        if (ctx) {
          // Fill white background
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          // Draw QR code
          ctx.drawImage(img, 0, 0, size, size);
          
          // Convert to image data URL
          const imageDataUrl = canvas.toDataURL('image/png');
          
          // Create PDF content using jsPDF
          const { jsPDF } = await import('jspdf');
          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
          });
          
          // Calculate center position
          const pageWidth = pdf.internal.pageSize.getWidth();
          const pageHeight = pdf.internal.pageSize.getHeight();
          const imgWidth = 100; // 100mm width
          const imgHeight = 100; // 100mm height
          const x = (pageWidth - imgWidth) / 2;
          const y = (pageHeight - imgHeight) / 2;
          
          // Add QR code image to PDF
          pdf.addImage(imageDataUrl, 'PNG', x, y, imgWidth, imgHeight);
          
          // Add title
          pdf.setFontSize(16);
          pdf.text('QR Code', pageWidth / 2, y - 20, { align: 'center' });
          
          // Add content info
          pdf.setFontSize(10);
          pdf.text(`Content: ${qrValue.substring(0, 50)}${qrValue.length > 50 ? '...' : ''}`, pageWidth / 2, y + imgHeight + 15, { align: 'center' });
          
          // Save the PDF
          pdf.save('qrcode.pdf');
          
          toast({
            title: "PDF Download Started",
            description: "QR code downloaded as PDF successfully",
          });
        }
        URL.revokeObjectURL(url);
      };
      
      img.onerror = () => {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to process QR code for PDF generation",
        });
        URL.revokeObjectURL(url);
      };
      
      img.src = url;
    } catch (error) {
      console.error('PDF generation error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
      });
    }
  };
  
  const copyQRCodeToClipboard = () => {
    triggerAd();
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(qrValue).then(() => {
        toast({
          title: "Copied",
          description: "QR code content copied to clipboard",
        });
      }).catch(() => {
        // Fallback
        const textArea = document.createElement("textarea");
        textArea.value = qrValue;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        toast({
          title: "Copied",
          description: "QR code content copied to clipboard",
        });
      });
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = qrValue;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      toast({
        title: "Copied",
        description: "QR code content copied to clipboard",
      });
    }
  };
  
  if (!shouldShow) return null;
  
  return (
    <TooltipProvider>
      <div className="mt-6">
        <div className="flex flex-col space-y-2">
          <Button 
            onClick={downloadQRCode} 
            variant="secondary" 
            className="w-full"
          >
            <Download className="mr-2" size={16} />
            Download QR Code
          </Button>
          
          {/* PDF Download - Pro and Business users */}
          {(subscription === 'pro' || subscription === 'business') ? (
            <Button 
              onClick={downloadQRCodeAsPDF} 
              variant="secondary" 
              className="w-full"
            >
              <FileText className="mr-2" size={16} />
              Download as PDF
            </Button>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="secondary" 
                  className="w-full opacity-50 cursor-not-allowed"
                  disabled
                >
                  <FileText className="mr-2" size={16} />
                  Download as PDF (Pro only)
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>PDF download is available for Pro and Business plan users only</p>
              </TooltipContent>
            </Tooltip>
          )}
          
          <Button 
            onClick={copyQRCodeToClipboard} 
            variant="secondary" 
            className="w-full"
          >
            <Copy className="mr-2" size={16} />
            Copy Content
          </Button>
          
          {/* Updated Share Button */}
          <Button 
            onClick={handleShare}
            variant="secondary" 
            className="w-full"
          >
            <Share2 className="mr-2" size={16} />
            Share QR Code
          </Button>
        </div>
        
        {/* Share Dialog for desktop fallback */}
        <QRShareDialog
          isOpen={isShareDialogOpen}
          onClose={() => setIsShareDialogOpen(false)}
          qrValue={qrValue}
          qrURL={qrURL}
        />
      </div>
    </TooltipProvider>
  );
};

export default QRActionButtons;
