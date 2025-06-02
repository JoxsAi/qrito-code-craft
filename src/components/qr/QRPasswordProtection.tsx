
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Lock } from 'lucide-react';

interface QRPasswordProtectionProps {
  isPasswordProtected: boolean;
  password: string;
  onPasswordToggle: (enabled: boolean) => void;
  onPasswordChange: (password: string) => void;
  subscription: string;
}

const QRPasswordProtection = ({
  isPasswordProtected,
  password,
  onPasswordToggle,
  onPasswordChange,
  subscription
}: QRPasswordProtectionProps) => {
  const isPremium = subscription !== 'free';

  if (!isPremium) {
    return (
      <Card className="mb-6 shadow-sm">
        <CardContent className="p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <Lock className="mr-2 h-5 w-5" />
            Password Protection
          </h3>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <div className="text-center">
              <Lock size={36} className="mx-auto text-gray-300 mb-2" />
              <p className="text-gray-400">Upgrade to Premium to password protect your QR codes</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6 shadow-sm">
      <CardContent className="p-6">
        <h3 className="text-lg font-bold mb-4 flex items-center">
          <Lock className="mr-2 h-5 w-5" />
          Password Protection
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="password-protection"
              checked={isPasswordProtected}
              onCheckedChange={onPasswordToggle}
            />
            <Label htmlFor="password-protection">Enable password protection</Label>
          </div>
          
          {isPasswordProtected && (
            <div>
              <Label htmlFor="qr-password">Password</Label>
              <Input
                id="qr-password"
                type="password"
                placeholder="Enter password for QR code access"
                value={password}
                onChange={(e) => onPasswordChange(e.target.value)}
                className="mt-1"
                autoComplete="new-password"
              />
              <p className="text-xs text-gray-500 mt-1">
                Users will need this password to access the QR code content. Works with all QR code types.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QRPasswordProtection;
