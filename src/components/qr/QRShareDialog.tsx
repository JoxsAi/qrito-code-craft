
import React, { useState } from 'react';
import { Share2, Copy, QrCode, X, MessageCircle, Send, Mail, Phone, Twitter } from 'lucide-react';
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
  const [contentCopied, setContentCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const copyContent = async () => {
    try {
      await navigator.clipboard.writeText(qrValue);
      setContentCopied(true);
      toast({
        title: "Copied!",
        description: "QR code content copied to clipboard",
      });
      setTimeout(() => setContentCopied(false), 2000);
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = qrValue;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      setContentCopied(true);
      toast({
        title: "Copied!",
        description: "QR code content copied to clipboard",
      });
      setTimeout(() => setContentCopied(false), 2000);
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(qrURL);
      setLinkCopied(true);
      toast({
        title: "Copied!",
        description: "QR code link copied to clipboard",
      });
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = qrURL;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      setLinkCopied(true);
      toast({
        title: "Copied!",
        description: "QR code link copied to clipboard",
      });
      setTimeout(() => setLinkCopied(false), 2000);
    }
  };

  const shareToSocial = (platform: string) => {
    const shareText = `Check out this QR code I created with QRito!`;
    const shareUrl = encodeURIComponent(qrValue);
    const encodedText = encodeURIComponent(shareText);
    
    let url = '';
    
    switch (platform) {
      case 'whatsapp':
        url = `https://wa.me/?text=${encodedText}%20${shareUrl}`;
        break;
      case 'telegram':
        url = `https://t.me/share/url?url=${shareUrl}&text=${encodedText}`;
        break;
      case 'messenger':
        url = `https://www.messenger.com/t/?link=${shareUrl}`;
        break;
      case 'gmail':
        url = `https://mail.google.com/mail/?view=cm&su=${encodedText}&body=${shareUrl}`;
        break;
      case 'sms':
        url = `sms:?body=${encodedText}%20${shareUrl}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodedText}&url=${shareUrl}`;
        break;
      default:
        return;
    }
    
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
      toast({
        title: "Opened Sharing",
        description: `Opened ${platform} for sharing`,
      });
    }
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

          {/* Copy Buttons */}
          <div className="space-y-2">
            <Button 
              onClick={copyContent}
              variant="secondary" 
              className="w-full"
            >
              <Copy className="mr-2" size={16} />
              {contentCopied ? 'Content Copied!' : 'Copy Content'}
            </Button>
            
            <Button 
              onClick={copyLink}
              variant="secondary" 
              className="w-full"
            >
              <Copy className="mr-2" size={16} />
              {linkCopied ? 'Link Copied!' : 'Copy Link'}
            </Button>
          </div>

          {/* Quick Social Share */}
          <div className="border-t pt-4">
            <p className="text-sm text-gray-600 font-medium mb-3">Quick Share:</p>
            <div className="grid grid-cols-3 gap-2">
              <Button 
                onClick={() => shareToSocial('whatsapp')}
                variant="outline" 
                size="sm"
                className="flex items-center gap-1"
              >
                <MessageCircle size={14} className="text-green-600" />
                <span className="text-xs">WhatsApp</span>
              </Button>
              
              <Button 
                onClick={() => shareToSocial('telegram')}
                variant="outline" 
                size="sm"
                className="flex items-center gap-1"
              >
                <Send size={14} className="text-blue-500" />
                <span className="text-xs">Telegram</span>
              </Button>
              
              <Button 
                onClick={() => shareToSocial('twitter')}
                variant="outline" 
                size="sm"
                className="flex items-center gap-1"
              >
                <Twitter size={14} className="text-gray-800" />
                <span className="text-xs">Twitter</span>
              </Button>
              
              <Button 
                onClick={() => shareToSocial('gmail')}
                variant="outline" 
                size="sm"
                className="flex items-center gap-1"
              >
                <Mail size={14} className="text-red-600" />
                <span className="text-xs">Gmail</span>
              </Button>
              
              <Button 
                onClick={() => shareToSocial('sms')}
                variant="outline" 
                size="sm"
                className="flex items-center gap-1"
              >
                <Phone size={14} className="text-blue-600" />
                <span className="text-xs">SMS</span>
              </Button>
              
              <Button 
                onClick={() => shareToSocial('messenger')}
                variant="outline" 
                size="sm"
                className="flex items-center gap-1"
              >
                <MessageCircle size={14} className="text-blue-700" />
                <span className="text-xs">Messenger</span>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRShareDialog;
