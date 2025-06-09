import React, { useState } from 'react';
import { Download, Copy, Share2, Facebook, Twitter, MessageCircle, Send, Instagram, Linkedin, FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import QRShareDialog from './QRShareDialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const shouldShow = (generated || (qrValue && subscription !== 'free')) && qrURL;
  
  // Trigger ad in controlled popup window - preserves user data
  const triggerAd = () => {
    try {
      // Open ad in popup window with controlled dimensions
      const adWindow = window.open(
        'https://www.profitableratecpm.com/i05a32zv3x?key=e8aa2d7d76baecb611b49ce0d5af754f',
        'adPopup',
        'width=800,height=600,scrollbars=yes,resizable=yes,toolbar=no,menubar=no,location=no,status=no'
      );
      
      if (adWindow) {
        adWindow.focus();
      } else {
        console.log('Ad popup blocked by browser');
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
    // Check subscription - only for Pro users
    if (subscription !== 'pro') {
      toast({
        variant: "destructive",
        title: "Pro Feature",
        description: "PDF download is only available for Pro plan users. Please upgrade to access this feature.",
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
          
          // Create PDF content using jsPDF-like approach
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

  const shareToSocialMedia = async (platform: string) => {
    triggerAd();
    
    const shareText = `Check out my QR code created with QRito!`;
    
    try {
      // For platforms that support image sharing via Web Share API
      if (navigator.share && (platform === 'whatsapp' || platform === 'telegram')) {
        const qrBlob = await getQRCodeAsBlob();
        const file = new File([qrBlob], 'qrcode.png', { type: 'image/png' });
        
        await navigator.share({
          title: 'QR Code from QRito',
          text: shareText,
          files: [file]
        });
        
        toast({
          title: "Shared Successfully",
          description: `Shared QR code via ${platform}`,
        });
        setIsShareMenuOpen(false);
        return;
      }
    } catch (error) {
      console.log('Native sharing failed, falling back to URL sharing:', error);
    }
    
    // Fallback to URL sharing for all platforms
    const shareUrl = encodeURIComponent(qrValue);
    const encodedText = encodeURIComponent(shareText);
    
    let url = '';
    
    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${encodedText}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodedText}&url=${shareUrl}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}&summary=${encodedText}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/?text=${encodedText}%20${shareUrl}`;
        break;
      case 'telegram':
        url = `https://t.me/share/url?url=${shareUrl}&text=${encodedText}`;
        break;
      case 'instagram':
        // Instagram doesn't support direct URL sharing
        try {
          const qrBlob = await getQRCodeAsBlob();
          const qrUrl = URL.createObjectURL(qrBlob);
          const link = document.createElement('a');
          link.href = qrUrl;
          link.download = 'qrcode.png';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(qrUrl);
          
          copyQRCodeToClipboard();
          toast({
            title: "QR Code Downloaded for Instagram",
            description: "QR image downloaded and content copied. Upload the image to Instagram with the copied text.",
          });
        } catch (error) {
          copyQRCodeToClipboard();
          toast({
            title: "Content Copied",
            description: "Content copied! Download the QR image and share on Instagram.",
          });
        }
        setIsShareMenuOpen(false);
        return;
      default:
        return;
    }
    
    if (url) {
      const shareWindow = window.open(url, '_blank', 'noopener,noreferrer');
      if (shareWindow) {
        shareWindow.focus();
      }
      toast({
        title: "Opened Sharing",
        description: `Opened ${platform} for sharing`,
      });
    }
    
    setIsShareMenuOpen(false);
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
          
          {/* PDF Download - Only for Pro users */}
          {subscription === 'pro' ? (
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
                <p>PDF download is available for Pro plan users only</p>
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
          
          {/* Modern Share Button - Replaced old dropdown with new implementation */}
          <Button 
            onClick={handleShare}
            variant="secondary" 
            className="w-full"
          >
            <Share2 className="mr-2" size={16} />
            Share QR Code
          </Button>
          
          {/* Social Media Sharing - Secondary option */}
          <DropdownMenu open={isShareMenuOpen} onOpenChange={setIsShareMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full text-sm">
                Share to Social Media
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuItem onClick={() => shareToSocialMedia('whatsapp')} className="cursor-pointer">
                <MessageCircle className="mr-2 text-green-600" size={16} />
                WhatsApp
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => shareToSocialMedia('facebook')} className="cursor-pointer">
                <Facebook className="mr-2 text-blue-600" size={16} />
                Facebook
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => shareToSocialMedia('telegram')} className="cursor-pointer">
                <Send className="mr-2 text-blue-500" size={16} />
                Telegram
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => shareToSocialMedia('twitter')} className="cursor-pointer">
                <Twitter className="mr-2 text-gray-800" size={16} />
                Twitter (X)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => shareToSocialMedia('linkedin')} className="cursor-pointer">
                <Linkedin className="mr-2 text-blue-700" size={16} />
                LinkedIn
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => shareToSocialMedia('instagram')} className="cursor-pointer">
                <Instagram className="mr-2 text-pink-600" size={16} />
                Instagram
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
