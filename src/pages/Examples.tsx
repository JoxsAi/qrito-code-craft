
import React from "react";
import Header from "@/components/Header";
import Examples from "@/components/Examples";
import Footer from "@/components/Footer";

const ExamplesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="py-12">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">أمثلة رمز QR</h1>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            استكشف طرقًا مختلفة لاستخدام رموز QR لأعمالك واحتياجاتك الشخصية. احصل على الإلهام من هذه الأمثلة وأنشئ رمز QR الخاص بك.
          </p>
        </div>
      </div>
      <Examples />
      <Footer />
    </div>
  );
};

export default ExamplesPage;
