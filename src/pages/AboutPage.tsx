
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useUser } from "@/context";

const AboutPage = () => {
  const { language } = useUser();
  
  // Translation function
  const t = (en: string, ar: string) => {
    return language === "ar" ? ar : en;
  };

  // Team members
  const team = [
    {
      name: t("Alex Johnson", "أليكس جونسون"),
      role: t("Founder & CEO", "المؤسس والرئيس التنفيذي"),
      bio: t("Alex has 15+ years of experience in software development and product management.", "لدى أليكس أكثر من 15 عامًا من الخبرة في تطوير البرمجيات وإدارة المنتجات."),
      image: "https://i.pravatar.cc/300?img=1"
    },
    {
      name: t("Sarah Chen", "سارة تشن"),
      role: t("CTO", "المدير التقني"),
      bio: t("Sarah is an expert in web technologies and leads our engineering team.", "سارة خبيرة في تقنيات الويب وتقود فريق الهندسة لدينا."),
      image: "https://i.pravatar.cc/300?img=5"
    },
    {
      name: t("Michael Reed", "مايكل ريد"),
      role: t("Head of Design", "رئيس التصميم"),
      bio: t("Michael brings creative vision to our products with his background in UX/UI design.", "يجلب مايكل رؤية إبداعية لمنتجاتنا مع خلفيته في تصميم UX/UI."),
      image: "https://i.pravatar.cc/300?img=3"
    },
    {
      name: t("Priya Sharma", "بريا شارما"),
      role: t("Marketing Director", "مدير التسويق"),
      bio: t("Priya has helped scale multiple tech startups with her innovative marketing strategies.", "ساعدت بريا في توسيع نطاق العديد من الشركات الناشئة التكنولوجية باستراتيجيات التسويق المبتكرة."),
      image: "https://i.pravatar.cc/300?img=4"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col" dir={language === "ar" ? "rtl" : "ltr"}>
      <Header />
      <div className="flex-1">
        {/* Hero section */}
        <div className="bg-purple-50 py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
              {t("About QRito", "نبذة عن QRito")}
            </h1>
            <p className="text-lg text-center max-w-3xl mx-auto">
              {t("We're on a mission to make QR codes accessible, customizable, and valuable for businesses and individuals around the world.", 
                "نحن في مهمة لجعل رموز QR في متناول الجميع وقابلة للتخصيص وقيمة للشركات والأفراد حول العالم.")}
            </p>
          </div>
        </div>
        
        {/* Our story */}
        <div className="py-16 container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              {t("Our Story", "قصتنا")}
            </h2>
            <p className="mb-6 text-lg">
              {t("QRito was founded in 2022 with a simple goal: to make QR code generation and management simple and accessible to everyone.", 
                "تم تأسيس QRito في عام 2022 بهدف بسيط: جعل إنشاء وإدارة رموز QR بسيطة ومتاحة للجميع.")}
            </p>
            <p className="mb-6 text-lg">
              {t("What started as a small project quickly grew into a comprehensive platform serving thousands of users worldwide. We've helped businesses of all sizes leverage the power of QR codes to connect their physical and digital experiences.", 
                "ما بدأ كمشروع صغير سرعان ما تحول إلى منصة شاملة تخدم آلاف المستخدمين في جميع أنحاء العالم. لقد ساعدنا الشركات من جميع الأحجام على الاستفادة من قوة رموز QR لربط تجاربهم المادية والرقمية.")}
            </p>
            <p className="text-lg">
              {t("Today, QRito continues to innovate with advanced customization options, analytics, and integration capabilities, making QR codes more powerful and useful than ever before.", 
                "اليوم، تواصل QRito الابتكار مع خيارات التخصيص المتقدمة والتحليلات وإمكانيات التكامل، مما يجعل رموز QR أكثر قوة وفائدة من أي وقت مضى.")}
            </p>
          </div>
        </div>
        
        {/* Values */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">
              {t("Our Values", "قيمنا")}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {t("Innovation", "الابتكار")}
                </h3>
                <p className="text-gray-700">
                  {t("We continuously push the boundaries of what's possible with QR code technology.", 
                    "نحن نواصل دفع حدود ما هو ممكن مع تكنولوجيا رمز QR.")}
                </p>
              </div>
              
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {t("Accessibility", "سهولة الوصول")}
                </h3>
                <p className="text-gray-700">
                  {t("We believe everyone should be able to create and use QR codes, regardless of technical expertise.", 
                    "نحن نؤمن بأنه يجب أن يكون الجميع قادرين على إنشاء واستخدام رموز QR، بغض النظر عن الخبرة التقنية.")}
                </p>
              </div>
              
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {t("Security", "الأمان")}
                </h3>
                <p className="text-gray-700">
                  {t("We prioritize the security and privacy of our users and their data at all times.", 
                    "نحن نعطي الأولوية لأمان وخصوصية مستخدمينا وبياناتهم في جميع الأوقات.")}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Team */}
        <div className="py-16 container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            {t("Our Team", "فريقنا")}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-bold text-lg">{member.name}</h3>
                <p className="text-purple-600 mb-2">{member.role}</p>
                <p className="text-sm text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
