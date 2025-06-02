
/**
 * Utility functions for QR code operations
 */

/**
 * Handles downloading the QR code as an SVG
 */
export const downloadQRCode = (toast: any) => {
  const svg = document.getElementById("qr-code-svg")?.outerHTML;
  if (!svg) {
    toast({
      variant: "destructive",
      title: "خطأ",
      description: "فشل إنشاء SVG",
    });
    return;
  }

  const svgBlob = new Blob([svg], { type: "image/svg+xml" });
  const url = URL.createObjectURL(svgBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "qr-code.svg";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Copies the QR code SVG to clipboard
 */
export const copyQRCodeToClipboard = (toast: any) => {
  const svg = document.getElementById("qr-code-svg")?.outerHTML;
  if (!svg) {
    toast({
      variant: "destructive",
      title: "خطأ",
      description: "فشل إنشاء SVG",
    });
    return;
  }
  navigator.clipboard.writeText(svg);
  toast({
    title: "تم النسخ",
    description: "تم نسخ SVG إلى الحافظة",
  });
};

/**
 * Shares the QR code using the Web Share API
 */
export const shareQRCode = async (toast: any) => {
  const svg = document.getElementById("qr-code-svg")?.outerHTML;
  if (!svg) {
    toast({
      variant: "destructive",
      title: "خطأ",
      description: "فشل إنشاء SVG",
    });
    return;
  }

  const svgBlob = new Blob([svg], { type: "image/svg+xml" });
  const filesArray = [
    new File([svgBlob], "qr-code.svg", {
      type: "image/svg+xml",
      lastModified: new Date().getTime(),
    }),
  ];
  const shareData = {
    files: filesArray,
    title: "QR Code SVG",
    text: "Check out this QR code!",
  };
  try {
    if (navigator.canShare && navigator.canShare(shareData)) {
      await navigator.share(shareData);
      toast({
        title: "تمت المشاركة",
        description: "تمت مشاركة SVG بنجاح",
      });
    } else {
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "المشاركة غير مدعومة على هذا المتصفح",
      });
    }
  } catch (err: any) {
    toast({
      variant: "destructive",
      title: "خطأ",
      description: `فشلت المشاركة: ${err.message}`,
    });
  }
};
