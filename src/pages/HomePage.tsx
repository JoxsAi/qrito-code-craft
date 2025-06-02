import React, { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import QRGenerator from "@/components/QRGenerator";
import Features from "@/components/Features";
import Examples from "@/components/Examples";
import Pricing from "@/components/Pricing";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context";
import { Helmet } from "react-helmet-async";

const HomePage = () => {
  const navigate = useNavigate();
  const { isLoggedIn, language } = useUser();
  
  // Load homepage ad script
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//pl26659143.profitableratecpm.com/60/df/38/60df386dd2cfa2ac4a8c1e4294a705c6.js';
    script.async = true;
    
    document.head.appendChild(script);
    
    return () => {
      // Cleanup script on unmount
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);
  
  // Redirect to QR type selector if user is logged in
  const handleCreateQRCode = () => {
    if (isLoggedIn) {
      navigate("/choose-qr-type");
    } else {
      navigate("/signup");
    }
  };

  // SEO schema for structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "QRito - صانع QR مجاني",
    "applicationCategory": "WebApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "إنشاء أكواد QR مخصصة مجاناً لعملك واحتياجاتك الشخصية. أضف شعارك وألوانك المخصصة. دعم كامل للغة العربية.",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1024"
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col" dir={language === "ar" ? "rtl" : "ltr"}>
      <Helmet>
        <title>{language === "ar" ? "QRito - إنشاء وتخصيص أكواد QR مجاناً | صانع QR احترافي" : "QRito - Create & Customize QR Codes for Free"}</title>
        <meta 
          name="description" 
          content={language === "ar" ? "إنشاء أكواد QR مخصصة مجاناً لعملك واحتياجاتك الشخصية. صانع QR مجاني مع خيارات تخصيص متقدمة. دعم كامل للغة العربية." : "Generate custom QR codes for your business and personal needs with QRito. Free QR code generator with advanced customization options."} 
        />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>
      <Header />
      <main>
        <Hero />
        <div id="generator" className="py-16 scroll-mt-16">
          <div className="container mx-auto px-4 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
              {language === "ar" ? "أنشئ كود QR الخاص بك" : "Create Your QR Code"}
            </h2>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
              {language === "ar" ? "خصص محتواك واختر نوع كود QR" : "Customize your content and choose QR code type"}
            </p>
          </div>
          <QRGenerator />
        </div>
        <section aria-labelledby="features-heading">
          <Features />
        </section>
        <section aria-labelledby="examples-heading">
          <Examples />
        </section>
        <section aria-labelledby="pricing-heading">
          <Pricing />
        </section>
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
