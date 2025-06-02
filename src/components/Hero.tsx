
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context";

const Hero = () => {
  const { isLoggedIn, language } = useUser();
  const navigate = useNavigate();
  
  const handleGetStartedClick = () => {
    if (isLoggedIn) {
      // If logged in, scroll to QR generator section
      const generatorElement = document.getElementById("generator");
      if (generatorElement) {
        generatorElement.scrollIntoView({ behavior: "smooth" });
      } else {
        // If element not found, navigate to home with generator anchor
        navigate("/#generator");
      }
    } else {
      // If not logged in, navigate to login page
      navigate("/login");
    }
  };

  return (
    <div className="bg-gradient-to-r from-qrito-purple-light to-qrito-purple-dark py-16 px-4 md:py-24">
      <div className="container mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
          {language === "ar" 
            ? "إنشاء وتخصيص أكواد QR مجاناً - صانع QR بالعربي"
            : "Create & Customize QR Codes for Free"}
        </h1>
        <p className="text-white/90 text-lg md:text-xl max-w-3xl mx-auto mb-8">
          {language === "ar"
            ? "إنشاء أكواد QR ديناميكية للواي فاي والروابط والرسائل النصية وبطاقات العمل والمزيد. خصص باستخدام الألوان والشعارات وتتبع عمليات المسح باستخدام تحليلاتنا المتقدمة."
            : "Generate dynamic QR codes for WiFi, links, SMS, business cards, and more. Customize with colors, logos, and track scans with our advanced analytics."}
        </p>
        <Button 
          size="lg" 
          className="bg-white text-qrito-purple hover:bg-gray-100 px-8 py-6 text-lg font-semibold"
          onClick={handleGetStartedClick}
        >
          {language === "ar" ? "ابدأ مجاناً" : "Get Started for Free"}
        </Button>
      </div>
    </div>
  );
};

export default Hero;
