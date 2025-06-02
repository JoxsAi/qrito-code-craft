
import { useState, useEffect } from 'react';

export interface QRHistoryItem {
  id: string;
  type: string;
  content: string;
  url: string;
  createdAt: string;
  dotColor: string;
  backgroundColor: string;
  hasLogo: boolean;
}

export const useQRHistory = () => {
  const [qrHistory, setQrHistory] = useState<QRHistoryItem[]>([]);

  useEffect(() => {
    // Load QR history from localStorage on component mount
    const savedHistory = localStorage.getItem('qr_history');
    if (savedHistory) {
      try {
        setQrHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Failed to parse QR history:', error);
      }
    }
  }, []);

  const saveQRToHistory = (qrData: Omit<QRHistoryItem, 'id' | 'createdAt'>) => {
    const newQRItem: QRHistoryItem = {
      ...qrData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    const updatedHistory = [newQRItem, ...qrHistory].slice(0, 50); // Keep only last 50 QR codes
    setQrHistory(updatedHistory);
    
    // Save to localStorage
    localStorage.setItem('qr_history', JSON.stringify(updatedHistory));
  };

  const deleteQRFromHistory = (id: string) => {
    const updatedHistory = qrHistory.filter(qr => qr.id !== id);
    setQrHistory(updatedHistory);
    
    // Update localStorage
    localStorage.setItem('qr_history', JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    setQrHistory([]);
    localStorage.removeItem('qr_history');
  };

  return {
    qrHistory,
    saveQRToHistory,
    deleteQRFromHistory,
    clearHistory,
  };
};
