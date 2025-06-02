
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
          <h1 className="text-3xl font-bold mb-8 text-center">ميزات QRito</h1>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            استكشف جميع الميزات القوية التي تجعل QRito أفضل منصة لإنشاء رموز QR.
            قم بإنشاء رموز QR وتخصيصها وتتبعها بسهولة.
          </p>
        </div>
      </div>
      <Features />
      <Footer />
    </div>
  );
};

export default FeaturesPage;
