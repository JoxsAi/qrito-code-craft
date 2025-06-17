import React from "react";
import Header from "@/components/Header";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import { useUser } from "@/context";
const PricingPage = () => {
  const {
    language
  } = useUser();

  // Translation function
  const t = (en: string, ar: string) => {
    return language === "ar" ? ar : en;
  };
  return <div className="min-h-screen flex flex-col" dir={language === "ar" ? "rtl" : "ltr"}>
      <Header />
      
      <Pricing />
      <Footer />
    </div>;
};
export default PricingPage;