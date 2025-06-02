
import React from 'react';
import { Link, Type, Mail, Wifi, Phone, MapPin, CalendarDays, Image, AppWindow, MessageSquare } from 'lucide-react';
import { cn } from "@/lib/utils";

interface QRTypeSelectorProps {
  qrType: string;
  onSelectType?: (type: string) => void;
}

/**
 * QR Type selection component with grid layout and icons
 */
const QRTypeSelector = ({ qrType, onSelectType }: QRTypeSelectorProps) => {
  const handleSelectType = (type: string) => {
    if (onSelectType) {
      onSelectType(type);
    }
  };

  const qrTypes = [
    { id: 'url', label: 'URL', icon: Link },
    { id: 'text', label: 'Text', icon: Type },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'wifi', label: 'WiFi', icon: Wifi },
    { id: 'contact', label: 'Contact', icon: Phone },
    { id: 'location', label: 'Location', icon: MapPin },
    { id: 'event', label: 'Event', icon: CalendarDays },
    { id: 'image', label: 'Image', icon: Image },
    { id: 'app', label: 'App', icon: AppWindow },
    { id: 'sms', label: 'SMS', icon: MessageSquare },
  ];

  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Choose QR Code Type</h2>
      <div className="grid grid-cols-5 gap-4 mb-6">
        {qrTypes.map((type) => (
          <div
            key={type.id}
            onClick={() => handleSelectType(type.id)}
            className={cn(
              "flex flex-col items-center justify-center p-3 rounded-lg border cursor-pointer transition-all",
              qrType === type.id
                ? "bg-purple-50 border-purple-200"
                : "border-gray-200 hover:bg-gray-50"
            )}
          >
            <type.icon className={cn("mb-2 h-6 w-6", qrType === type.id ? "text-purple-600" : "text-gray-600")} />
            <span className="text-sm text-center">{type.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QRTypeSelector;
