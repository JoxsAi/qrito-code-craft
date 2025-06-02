
import React from "react";
import Header from "@/components/Header";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import { useUser } from "@/context";

const PricingPage = () => {
  const { language } = useUser();
  
  // Translation function
  const t = (en: string, ar: string) => {
    return language === "ar" ? ar : en;
  };

  return (
    <div className="min-h-screen flex flex-col" dir={language === "ar" ? "rtl" : "ltr"}>
      <Header />
      <div className="py-12">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-4 text-center">
            {t("Simple and Transparent Pricing", "أسعار بسيطة وشفافة")}
          </h1>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            {t("Choose the right plan for your QR code needs. Select the appropriate plan for your business or personal use.", 
               "اختر الخطة المناسبة لاحتياجات رمز QR الخاص بك. اختر الخطة المناسبة لعملك أو استخدامك الشخصي.")}
          </p>
        </div>
      </div>
      <Pricing />
      <Footer />
    </div>
  );
};

export default PricingPage;
