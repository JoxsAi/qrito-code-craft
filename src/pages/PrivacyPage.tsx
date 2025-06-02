import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useUser } from "@/context";

const PrivacyPage = () => {
  const { language } = useUser();
  
  // Translation function
  const t = (en: string, ar: string) => {
    return language === "ar" ? ar : en;
  };

  const lastUpdated = t("May 10, 2025", "١٠ مايو ٢٠٢٥");

  return (
    <div className="min-h-screen flex flex-col" dir={language === "ar" ? "rtl" : "ltr"}>
      <Header />
      <div className="flex-1 container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">
            {t("Privacy Policy", "سياسة الخصوصية")}
          </h1>
          <p className="text-gray-600 mb-8">
            {t("Last updated:", "آخر تحديث:")} {lastUpdated}
          </p>

          <div className="prose max-w-none">
            <p>
              {t("This Privacy Policy describes how QRito collects, uses, and discloses your information when you use our service.", 
                "تصف سياسة الخصوصية هذه كيفية جمع QRito واستخدام والكشف عن معلوماتك عند استخدام خدمتنا.")}
            </p>
            
            <h2>
              {t("1. Information We Collect", "1. المعلومات التي نجمعها")}
            </h2>
            <p>
              {t("We collect information you provide when you create an account, use our service, or communicate with us. This may include:", 
                "نجمع المعلومات التي تقدمها عند إنشاء حساب، أو استخدام خدمتنا، أو التواصل معنا. قد يشمل ذلك:")}
            </p>
            <ul>
              <li>{t("Account information (name, email address, password)", "معلومات الحساب (الاسم، عنوان البريد الإلكتروني، كلمة المرور)")}</li>
              <li>{t("QR code content and design preferences", "محتوى رمز QR وتفضيلات التصميم")}</li>
              <li>{t("Usage data and analytics", "بيانات الاستخدام والتحليلات")}</li>
              <li>{t("Payment information, when you purchase a subscription", "معلومات الدفع، عند شراء اشتراك")}</li>
              <li>{t("Communications with us", "الاتصالات معنا")}</li>
            </ul>

            <h2>
              {t("2. How We Use Your Information", "2. كيفية استخدام معلوماتك")}
            </h2>
            <p>
              {t("We use your information for the following purposes:", "نستخدم معلوماتك للأغراض التالية:")}
            </p>
            <ul>
              <li>{t("Provide, maintain, and improve our service", "تقديم وصيانة وتحسين خدمتنا")}</li>
              <li>{t("Process transactions and manage your account", "معالجة المعاملات وإدارة حسابك")}</li>
              <li>{t("Send you technical notices, updates, and support messages", "إرسال إشعارات تقنية وتحديثات ورسائل دعم إليك")}</li>
              <li>{t("Respond to your comments and questions", "الرد على تعليقاتك وأسئلتك")}</li>
              <li>{t("Monitor and analyze trends and usage", "مراقبة وتحليل الاتجاهات والاستخدام")}</li>
              <li>{t("Detect, prevent, and address fraud and abuse", "اكتشاف ومنع ومعالجة الاحتيال وإساءة الاستخدام")}</li>
            </ul>

            <h2>
              {t("3. Sharing Your Information", "3. مشاركة معلوماتك")}
            </h2>
            <p>
              {t("We may share your information in the following cases:", "قد نشارك معلوماتك في الحالات التالية:")}
            </p>
            <ul>
              <li>{t("With service providers who perform services on our behalf", "مع مقدمي الخدمات الذين يؤدون الخدمات نيابة عنا")}</li>
              <li>{t("To comply with legal obligations", "لامتثال للالتزامات القانونية")}</li>
              <li>{t("To protect our rights, privacy, safety or property", "لحماية حقوقنا أو خصوصيتنا أو سلامتنا أو ممتلكاتنا")}</li>
              <li>{t("In connection with a business transfer or transaction", "فيما يتعلق بنقل أو معاملة تجارية")}</li>
              <li>{t("With your consent", "بموافقتك")}</li>
            </ul>

            <h2>
              {t("4. Data Retention", "4. الاحتفاظ بالبيانات")}
            </h2>
            <p>
              {t("We retain your information for as long as your account is active or as needed to provide you services. We may also retain and use your information as necessary to comply with our legal obligations, resolve disputes, and enforce our agreements.", 
                "نحتفظ بمعلوماتك طالما أن حسابك نشط أو حسب الحاجة لتزويدك بالخدمات. قد نحتفظ أيضًا بمعلوماتك ونستخدمها حسب الضرورة للامتثال لالتزاماتنا القانونية وحل النزاعات وإنفاذ اتفاقياتنا.")}
            </p>

            <h2>
              {t("5. Your Rights", "5. حقوقك")}
            </h2>
            <p>
              {t("Depending on your location, you may have rights regarding your personal information, including:", 
                "اعتمادًا على موقعك، قد يكون لديك حقوق تتعلق بمعلوماتك الشخصية، بما في ذلك:")}
            </p>
            <ul>
              <li>{t("Access and update your information", "الوصول إلى معلوماتك وتحديثها")}</li>
              <li>{t("Request deletion of your information", "طلب حذف معلوماتك")}</li>
              <li>{t("Object to or restrict processing of your information", "الاعتراض على معالجة معلوماتك أو تقييدها")}</li>
              <li>{t("Request portability of your information", "طلب نقل معلوماتك")}</li>
            </ul>
            <p>
              {t("To exercise these rights, please contact us using the information provided below.", 
                "لممارسة هذه الحقوق، يرجى الاتصال بنا باستخدام المعلومات المقدمة أدناه.")}
            </p>

            <h2>
              {t("6. Security", "6. الأمان")}
            </h2>
            <p>
              {t("We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission or storage is 100% secure, and we cannot guarantee absolute security.", 
                "نحن ننفذ تدابير تقنية وتنظيمية مناسبة لحماية معلوماتك الشخصية. ومع ذلك، لا توجد طريقة نقل أو تخزين آمنة بنسبة 100٪، ولا يمكننا ضمان الأمان المطلق.")}
            </p>

            <h2>
              {t("7. International Transfers", "7. النقل الدولي")}
            </h2>
            <p>
              {t("Your information may be transferred to, and processed in, countries other than the country in which you reside. These countries may have data protection laws that are different from the laws of your country.", 
                "قد يتم نقل معلوماتك ومعالجتها في بلدان أخرى غير البلد الذي تقيم فيه. قد يكون لهذه البلدان قوانين حماية البيانات التي تختلف عن قوانين بلدك.")}
            </p>

            <h2>
              {t("8. Children's Privacy", "8. خصوصية الأطفال")}
            </h2>
            <p>
              {t("Our service is not intended for individuals under the age of 16. We do not knowingly collect personal information from children under 16. If you become aware that a child has provided us with personal information, please contact us.", 
                "خدمتنا ليست مخصصة للأفراد الذين تقل أعمارهم عن 16 عامًا. نحن لا نجمع عن علم معلومات شخصية من الأطفال دون سن 16 عامًا. إذا علمت أن طفلاً قد زودنا بمعلومات شخصية، فالرجاء الاتصال بنا.")}
            </p>

            <h2>
              {t("9. Changes to This Privacy Policy", "9. التغييرات على سياسة الخصوصية هذه")}
            </h2>
            <p>
              {t("We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the \"Last updated\" date.", 
                "قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سنخطرك بأي تغييرات من خلال نشر سياسة الخصوصية الجديدة على هذه الصفحة وتحديث تاريخ \"آخر تحديث\".")}
            </p>

            <h2>
              {t("10. Contact Us", "10. اتصل بنا")}
            </h2>
            <p>
              {t("If you have any questions about this Privacy Policy, please contact us at:", 
                "إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، فيرجى الاتصال بنا على:")} <a href="mailto:privacy@qrito.com" className="text-purple-600 hover:underline">privacy@qrito.com</a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPage;
