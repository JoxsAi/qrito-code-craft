
import React, { useState } from 'react';
import { Download, Copy, Share2, Facebook, Twitter, MessageCircle, Send, Instagram, Linkedin, FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const shouldShow = (generated || (qrValue && subscription !== 'free')) && qrURL;
  
  // Trigger ad in NEW TAB - preserves user data and QR codes
  const triggerAd = () => {
    try {
      const adWindow = window.open(
        'https://www.profitableratecpm.com/i05a32zv3x?key=e8aa2d7d76baecb611b49ce0d5af754f',
        '_blank',
        'noopener,noreferrer,width=1200,height=800'
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
    // Check subscription - only for Pro and Business users
    if (subscription === 'free') {
      toast({
        variant: "destructive",
        title: "Premium Feature",
        description: "PDF download is only available for Pro and Business plans. Please upgrade to access this feature.",
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

      // Create high-quality canvas from SVG
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      const svgData = new XMLSerializer().serializeToString(svg);
      const svgBlob = new Blob([svgData], { type: "image/svg+xml" });
      const url = URL.createObjectURL(svgBlob);
      
      img.onload = async () => {
        // Set high resolution for PDF (300 DPI equivalent)
        const size = 600; // Good quality for PDF
        canvas.width = size;
        canvas.height = size;
        
        if (ctx) {
          // Fill white background
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          // Draw QR code with proper scaling
          ctx.drawImage(img, 0, 0, size, size);
          
          // Convert to base64 for PDF
          const imageDataUrl = canvas.toDataURL('image/png', 1.0);
          const base64Data = imageDataUrl.split(',')[1];
          
          // Create proper PDF with embedded QR code
          const pdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
/Resources <<
  /XObject <<
    /QRCode 5 0 R
  >>
>>
>>
endobj

4 0 obj
<<
/Length 64
>>
stream
q
300 0 0 300 156 246 cm
/QRCode Do
Q
endstream
endobj

5 0 obj
<<
/Type /XObject
/Subtype /Image
/Width ${size}
/Height ${size}
/ColorSpace /DeviceRGB
/BitsPerComponent 8
/Filter /DCTDecode
/Length ${base64Data.length}
>>
stream
${base64Data}
endstream
endobj

xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000289 00000 n 
0000000403 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
${650 + base64Data.length}
%%EOF`;
          
          // Create and download PDF
          const pdfBlob = new Blob([pdfContent], { type: 'application/pdf' });
          const pdfUrl = URL.createObjectURL(pdfBlob);
          const link = document.createElement("a");
          link.href = pdfUrl;
          link.download = "qrcode.pdf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(pdfUrl);
          
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
        description: "Failed to generate PDF",
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
        
        {/* PDF Download - Only for Pro/Business users */}
        <Button 
          onClick={downloadQRCodeAsPDF} 
          variant="secondary" 
          className="w-full"
          disabled={subscription === 'free'}
        >
          <FileText className="mr-2" size={16} />
          Download as PDF {subscription === 'free' && '(Pro/Business only)'}
        </Button>
        
        <Button 
          onClick={copyQRCodeToClipboard} 
          variant="secondary" 
          className="w-full"
        >
          <Copy className="mr-2" size={16} />
          Copy Content
        </Button>
        
        <DropdownMenu open={isShareMenuOpen} onOpenChange={setIsShareMenuOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="w-full">
              <Share2 className="mr-2" size={16} />
              Share QR Code
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
    </div>
  );
};

export default QRActionButtons;
