
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface AuthCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  animationClass?: string;
}

const AuthCard: React.FC<AuthCardProps> = ({ 
  title, 
  description, 
  children, 
  footer,
  animationClass = "animate-scale-in" 
}) => {
  return (
    <Card className={`shadow-lg border-0 ${animationClass} bg-white/95 backdrop-blur-sm`}>
      <CardHeader className="space-y-2 pb-2">
        <CardTitle className="text-2xl font-bold text-center">{title}</CardTitle>
        <CardDescription className="text-center text-gray-600">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        {children}
      </CardContent>
      {footer && (
        <CardFooter className="flex flex-col space-y-4 pt-2 pb-6">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
};

export default AuthCard;
