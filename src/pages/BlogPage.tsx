import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useUser } from "@/context";

const BlogPage = () => {
  const { language } = useUser();
  
  // Translation function
  const t = (en: string, ar: string) => {
    return language === "ar" ? ar : en;
  };

  return (
    <div className="min-h-screen flex flex-col" dir={language === "ar" ? "rtl" : "ltr"}>
      <Header />
      <div className="flex-1 container mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold mb-6">
          {t("Blog", "المدونة")}
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          {t("Our latest articles, news and updates.", "أحدث مقالاتنا وأخبارنا وتحديثاتنا.")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Placeholder blog posts */}
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-video bg-gray-200"></div>
              <div className="p-4">
                <h3 className="font-bold text-xl mb-2">
                  {t(`How to use QR codes for ${item}`, `كيفية استخدام رموز QR لـ ${item}`)}
                </h3>
                <p className="text-gray-600">
                  {t("Learn about the best practices for creating and using QR codes in your business.", 
                    "تعرف على أفضل الممارسات لإنشاء واستخدام رموز QR في عملك.")}
                </p>
                <div className="mt-4">
                  <span className="text-sm text-gray-500">
                    {t("May 10, 2025", "١٠ مايو ٢٠٢٥")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPage;
