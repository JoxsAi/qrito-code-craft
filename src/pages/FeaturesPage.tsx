
import React from "react";
import Header from "@/components/Header";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

const FeaturesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="py-12">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">QRito Features</h1>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Explore all the powerful features that make QRito the best QR code generator platform.
            Create, customize, and track your QR codes with ease.
          </p>
        </div>
      </div>
      <Features />
      <Footer />
    </div>
  );
};

export default FeaturesPage;
