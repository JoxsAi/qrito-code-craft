
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useUser } from "@/context";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";

const HelpPage = () => {
  const { language } = useUser();
  
  // Translation function
  const t = (en: string, ar: string) => {
    return language === "ar" ? ar : en;
  };

  const faqs = [
    {
      question: t("How do I create a QR code?", "كيف أنشئ رمز QR؟"),
      answer: t(
        "Go to the homepage, select the type of QR code you want to create, fill in the required information, customize your QR code design, and then click on the 'Generate QR Code' button.",
        "انتقل إلى الصفحة الرئيسية، واختر نوع رمز QR الذي تريد إنشاءه، وأدخل المعلومات المطلوبة، وقم بتخصيص تصميم رمز QR، ثم انقر على زر 'إنشاء رمز QR'."
      )
    },
    {
      question: t("What types of QR codes can I create?", "ما هي أنواع رموز QR التي يمكنني إنشاؤها؟"),
      answer: t(
        "You can create QR codes for URLs, text, email, WiFi, phone numbers, locations, SMS, calendar events, and vCards. Advanced features like app downloads and image QR codes are available in our Pro and Business plans.",
        "يمكنك إنشاء رموز QR للروابط والنصوص والبريد الإلكتروني وشبكة WiFi وأرقام الهواتف والمواقع والرسائل القصيرة وأحداث التقويم وبطاقات vCard. الميزات المتقدمة مثل تنزيلات التطبيقات ورموز QR للصور متاحة في خططنا المهنية والتجارية."
      )
    },
    {
      question: t("How do I track QR code scans?", "كيف أتتبع مسح رموز QR؟"),
      answer: t(
        "QR code scan tracking is available in our Pro and Business plans. Once you've created a QR code, you can view scan statistics in your dashboard, including the number of scans, location data, and device information.",
        "تتبع مسح رمز QR متاح في خططنا المهنية والتجارية. بمجرد إنشاء رمز QR، يمكنك عرض إحصائيات المسح في لوحة التحكم الخاصة بك، بما في ذلك عدد عمليات المسح وبيانات الموقع ومعلومات الجهاز."
      )
    },
    {
      question: t("Can I customize the design of my QR code?", "هل يمكنني تخصيص تصميم رمز QR الخاص بي؟"),
      answer: t(
        "Yes, you can customize the colors, size, and corner radius of your QR code. Pro and Business plan subscribers can also add logos, change the QR code style, and adjust the error correction level.",
        "نعم، يمكنك تخصيص ألوان وحجم ونصف قطر زوايا رمز QR الخاص بك. يمكن للمشتركين في الخطة المهنية وخطة الأعمال أيضًا إضافة شعارات وتغيير نمط رمز QR وضبط مستوى تصحيح الأخطاء."
      )
    },
    {
      question: t("How many QR codes can I create?", "كم عدد رموز QR التي يمكنني إنشاؤها؟"),
      answer: t(
        "Free users can create up to 5 QR codes. Pro plan subscribers get unlimited QR codes, while Business plan subscribers get unlimited QR codes plus team access and more advanced features.",
        "يمكن للمستخدمين المجانيين إنشاء ما يصل إلى 5 رموز QR. يحصل مشتركو الخطة المهنية على رموز QR غير محدودة، بينما يحصل مشتركو خطة الأعمال على رموز QR غير محدودة بالإضافة إلى وصول الفريق وميزات متقدمة أكثر."
      )
    }
  ];

  return (
    <div className="min-h-screen flex flex-col" dir={language === "ar" ? "rtl" : "ltr"}>
      <Header />
      <div className="flex-1 container mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold mb-6">
          {t("Help Center", "مركز المساعدة")}
        </h1>
        <p className="text-lg text-gray-700 mb-12">
          {t("Find answers to frequently asked questions about our QR code service.", 
            "ابحث عن إجابات للأسئلة الشائعة حول خدمة رمز QR لدينا.")}
        </p>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="mt-12 p-6 bg-purple-50 rounded-lg border border-purple-100">
            <h2 className="text-xl font-semibold mb-4">
              {t("Still have questions?", "هل لديك المزيد من الأسئلة؟")}
            </h2>
            <p className="mb-6">
              {t("Our support team is here to help. Contact us and we'll get back to you as soon as possible.", 
                "فريق الدعم لدينا هنا للمساعدة. اتصل بنا وسنرد عليك في أقرب وقت ممكن.")}
            </p>
            <Link to="/contact" className="bg-qrito-purple hover:bg-qrito-purple-dark text-white px-6 py-3 rounded-md transition-colors">
              {t("Contact Support", "اتصل بالدعم")}
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HelpPage;
