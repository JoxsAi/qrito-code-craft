import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useUser } from "@/context";

const TermsPage = () => {
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
            {t("Terms of Service", "شروط الخدمة")}
          </h1>
          <p className="text-gray-600 mb-8">
            {t("Last updated:", "آخر تحديث:")} {lastUpdated}
          </p>

          <div className="prose max-w-none">
            <p>
              {t("Please read these Terms of Service carefully before using the QRito website and service.", 
                "يرجى قراءة شروط الخدمة هذه بعناية قبل استخدام موقع وخدمة QRito.")}
            </p>
            
            <h2>
              {t("1. Acceptance of Terms", "1. قبول الشروط")}
            </h2>
            <p>
              {t("By accessing or using the QRito service, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions, then you may not access or use our services.", 
                "من خلال الوصول إلى خدمة QRito أو استخدامها، فإنك توافق على الالتزام بشروط الخدمة هذه. إذا كنت لا توافق على جميع الشروط والأحكام، فلا يجوز لك الوصول إلى خدماتنا أو استخدامها.")}
            </p>

            <h2>
              {t("2. Description of Service", "2. وصف الخدمة")}
            </h2>
            <p>
              {t("QRito provides tools for creating, customizing, and managing QR codes. The service may include free and paid features, with limitations based on the user's subscription plan.", 
                "توفر QRito أدوات لإنشاء وتخصيص وإدارة رموز QR. قد تتضمن الخدمة ميزات مجانية ومدفوعة، مع قيود بناءً على خطة اشتراك المستخدم.")}
            </p>

            <h2>
              {t("3. User Accounts", "3. حسابات المستخدمين")}
            </h2>
            <p>
              {t("To access certain features of the Service, you may be required to register for an account. You must provide accurate and complete information and keep your account information updated.", 
                "للوصول إلى ميزات معينة من الخدمة، قد يُطلب منك التسجيل للحصول على حساب. يجب عليك تقديم معلومات دقيقة وكاملة والحفاظ على تحديث معلومات حسابك.")}
            </p>
            
            <h2>
              {t("4. Subscription and Payments", "4. الاشتراك والمدفوعات")}
            </h2>
            <p>
              {t("Some features of QRito require payment of fees. By selecting a paid subscription, you agree to pay the fees in accordance with the pricing and payment terms presented to you for that subscription.", 
                "تتطلب بعض ميزات QRito دفع رسوم. باختيار اشتراك مدفوع، فإنك توافق على دفع الرسوم وفقًا لشروط التسعير والدفع المقدمة لك لهذا الاشتراك.")}
            </p>

            <h2>
              {t("5. User Content", "5. محتوى المستخدم")}
            </h2>
            <p>
              {t("Users are solely responsible for the content they create, upload, or share through the Service. You retain all rights to your content, but grant QRito a license to use, store, and share your content as necessary to provide the Service.", 
                "المستخدمون مسؤولون وحدهم عن المحتوى الذي ينشئونه أو يحملونه أو يشاركونه من خلال الخدمة. تحتفظ بجميع الحقوق الخاصة بمحتواك، ولكنك تمنح QRito ترخيصًا لاستخدام وتخزين ومشاركة محتواك حسب الضرورة لتقديم الخدمة.")}
            </p>

            <h2>
              {t("6. Prohibited Uses", "6. الاستخدامات المحظورة")}
            </h2>
            <p>
              {t("You may not use QRito for any illegal purpose or to violate any laws. You may not use the service to create QR codes that link to harmful, deceptive, or inappropriate content.", 
                "لا يجوز لك استخدام QRito لأي غرض غير قانوني أو لانتهاك أي قوانين. لا يجوز لك استخدام الخدمة لإنشاء رموز QR ترتبط بمحتوى ضار أو مخادع أو غير مناسب.")}
            </p>

            <h2>
              {t("7. Termination", "7. الإنهاء")}
            </h2>
            <p>
              {t("We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason, including if you breach these Terms.", 
                "يجوز لنا إنهاء أو تعليق حسابك والوصول إلى الخدمة على الفور، دون إشعار مسبق أو مسؤولية، لأي سبب، بما في ذلك إذا انتهكت هذه الشروط.")}
            </p>

            <h2>
              {t("8. Changes to Terms", "8. التغييرات على الشروط")}
            </h2>
            <p>
              {t("We reserve the right to modify these Terms at any time. We will provide notice of significant changes as required by law. Your continued use of the Service after such modifications constitutes your acceptance of the revised Terms.", 
                "نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سنقدم إشعارًا بالتغييرات المهمة على النحو الذي يتطلبه القانون. استمرار استخدامك للخدمة بعد هذه التعديلات يشكل قبولك للشروط المعدلة.")}
            </p>

            <h2>
              {t("9. Disclaimer of Warranties", "9. إخلاء المسؤولية عن الضمانات")}
            </h2>
            <p>
              {t("The Service is provided on an \"as is\" and \"as available\" basis. QRito makes no warranties, express or implied, regarding the operation or availability of the Service.", 
                "يتم تقديم الخدمة على أساس \"كما هي\" و \"كما هي متاحة\". لا تقدم QRito أي ضمانات، صريحة أو ضمنية، فيما يتعلق بتشغيل الخدمة أو توافرها.")}
            </p>

            <h2>
              {t("10. Limitation of Liability", "10. تحديد المسؤولية")}
            </h2>
            <p>
              {t("To the maximum extent permitted by law, QRito shall not be liable for any indirect, incidental, special, consequential or punitive damages, arising out of or relating to your use of the Service.", 
                "إلى أقصى حد يسمح به القانون، لن تكون QRito مسؤولة عن أي أضرار غير مباشرة أو عرضية أو خاصة أو تبعية أو عقابية، تنشأ عن استخدامك للخدمة أو تتعلق به.")}
            </p>

            <h2>
              {t("11. Governing Law", "11. القانون الحاكم")}
            </h2>
            <p>
              {t("These Terms shall be governed by the laws of the jurisdiction in which QRito is registered, without regard to its conflict of law provisions.", 
                "تخضع هذه الشروط لقوانين الولاية القضائية التي تم تسجيل QRito فيها، بغض النظر عن أحكام تعارض القوانين.")}
            </p>

            <h2>
              {t("12. Contact Information", "12. معلومات الاتصال")}
            </h2>
            <p>
              {t("For questions about these Terms, please contact us at:", "للأسئلة حول هذه الشروط، يرجى الاتصال بنا على:")} <a href="mailto:legal@qrito.com" className="text-purple-600 hover:underline">legal@qrito.com</a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsPage;
