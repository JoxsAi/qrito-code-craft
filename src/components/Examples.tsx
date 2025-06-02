
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, Link, Mail, Wifi, Phone, MapPin, Calendar, FileText, CreditCard, MessageSquare } from "lucide-react";

const Examples = () => {
  const exampleCards = [
    {
      title: "Website URL",
      description: "Direct visitors to your website with a simple scan",
      icon: <Link className="w-10 h-10 text-qrito-purple" />,
      category: "popular"
    },
    {
      title: "Email",
      description: "Create QR codes that compose emails automatically",
      icon: <Mail className="w-10 h-10 text-qrito-purple" />,
      category: "popular"
    },
    {
      title: "WiFi Network",
      description: "Help guests connect to your WiFi without typing passwords",
      icon: <Wifi className="w-10 h-10 text-qrito-purple" />,
      category: "popular"
    },
    {
      title: "Phone Number",
      description: "Make it easy for customers to call your business",
      icon: <Phone className="w-10 h-10 text-qrito-purple" />,
      category: "popular"
    },
    {
      title: "Location",
      description: "Share your business location or meeting point",
      icon: <MapPin className="w-10 h-10 text-qrito-purple" />,
      category: "popular"
    },
    {
      title: "Calendar Event",
      description: "Help users add events to their calendar",
      icon: <Calendar className="w-10 h-10 text-qrito-purple" />,
      category: "business"
    },
    {
      title: "Text Message",
      description: "Create QR codes that compose SMS messages",
      icon: <MessageSquare className="w-10 h-10 text-qrito-purple" />,
      category: "business"
    },
    {
      title: "vCard",
      description: "Share contact information easily",
      icon: <CreditCard className="w-10 h-10 text-qrito-purple" />,
      category: "business"
    },
    {
      title: "Plain Text",
      description: "Share messages, quotes, or instructions",
      icon: <FileText className="w-10 h-10 text-qrito-purple" />,
      category: "business"
    },
    {
      title: "Custom QR",
      description: "Create unique QR codes with your branding",
      icon: <QrCode className="w-10 h-10 text-qrito-purple" />,
      category: "business"
    },
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exampleCards.map((card, index) => (
          <Card key={index} className="border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center space-y-0 gap-4 pb-2">
              {card.icon}
              <div>
                <CardTitle className="text-xl">{card.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 mt-2">
                {card.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Examples;
