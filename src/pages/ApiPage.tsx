
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useUser } from "@/context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ApiPage = () => {
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
          {t("API Documentation", "وثائق API")}
        </h1>
        <p className="text-lg text-gray-700 mb-12">
          {t("Integrate QRito's powerful QR code generation capabilities into your own applications.", 
            "قم بدمج قدرات إنشاء رمز QR القوية من QRito في تطبيقاتك الخاصة.")}
        </p>
        
        <Tabs defaultValue="introduction">
          <TabsList className="mb-8">
            <TabsTrigger value="introduction">{t("Introduction", "مقدمة")}</TabsTrigger>
            <TabsTrigger value="authentication">{t("Authentication", "المصادقة")}</TabsTrigger>
            <TabsTrigger value="endpoints">{t("Endpoints", "نقاط النهاية")}</TabsTrigger>
            <TabsTrigger value="examples">{t("Examples", "أمثلة")}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="introduction" className="space-y-6">
            <div className="p-6 border rounded-md bg-white">
              <h2 className="text-2xl font-semibold mb-4">{t("Introduction", "مقدمة")}</h2>
              <p className="mb-4">
                {t("The QRito API allows you to generate and manage QR codes programmatically. This documentation provides instructions on how to use the API endpoints.", 
                  "تتيح لك واجهة برمجة تطبيقات QRito إنشاء وإدارة رموز QR برمجياً. توفر هذه الوثائق تعليمات حول كيفية استخدام نقاط نهاية API.")}
              </p>
              <h3 className="text-xl font-medium mb-2 mt-6">{t("Base URL", "عنوان URL الأساسي")}</h3>
              <div className="bg-gray-100 p-3 rounded-md font-mono mb-4">
                https://api.qrito.com/v1
              </div>
              <p>
                {t("All API endpoints are relative to this base URL.", "جميع نقاط نهاية API نسبية لعنوان URL الأساسي هذا.")}
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="authentication" className="space-y-6">
            <div className="p-6 border rounded-md bg-white">
              <h2 className="text-2xl font-semibold mb-4">{t("Authentication", "المصادقة")}</h2>
              <p className="mb-4">
                {t("Authentication is required for all API endpoints. You can obtain an API key from your account dashboard.", 
                  "المصادقة مطلوبة لجميع نقاط نهاية API. يمكنك الحصول على مفتاح API من لوحة تحكم حسابك.")}
              </p>
              <h3 className="text-xl font-medium mb-2 mt-6">{t("API Key Authentication", "مصادقة مفتاح API")}</h3>
              <p className="mb-4">
                {t("Include your API key in the header of each request:", "قم بتضمين مفتاح API في رأس كل طلب:")}
              </p>
              <div className="bg-gray-100 p-3 rounded-md font-mono">
                <pre>Authorization: Bearer YOUR_API_KEY</pre>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="endpoints" className="space-y-6">
            <div className="p-6 border rounded-md bg-white">
              <h2 className="text-2xl font-semibold mb-4">{t("API Endpoints", "نقاط نهاية API")}</h2>
              
              <div className="mb-8">
                <h3 className="text-xl font-medium mb-2">
                  {t("Generate QR Code", "إنشاء رمز QR")}
                </h3>
                <div className="bg-gray-100 p-3 rounded-md font-mono mb-4">
                  POST /qrcodes
                </div>
                <p className="mb-4">
                  {t("Create a new QR code with specified content and options.", "إنشاء رمز QR جديد بمحتوى وخيارات محددة.")}
                </p>
                <h4 className="font-medium mb-2">{t("Request Parameters", "معلمات الطلب")}</h4>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li><code>content</code> - {t("The data to encode in the QR code (required)", "البيانات المراد ترميزها في رمز QR (مطلوب)")}</li>
                  <li><code>type</code> - {t("The type of QR code (default: 'url')", "نوع رمز QR (الافتراضي: 'url')")}</li>
                  <li><code>size</code> - {t("Size of the QR code in pixels (default: 300)", "حجم رمز QR بالبكسل (الافتراضي: 300)")}</li>
                  <li><code>fgColor</code> - {t("Foreground color (default: '#000000')", "لون المقدمة (الافتراضي: '#000000')")}</li>
                  <li><code>bgColor</code> - {t("Background color (default: '#FFFFFF')", "لون الخلفية (الافتراضي: '#FFFFFF')")}</li>
                </ul>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-medium mb-2">
                  {t("Get QR Code", "الحصول على رمز QR")}
                </h3>
                <div className="bg-gray-100 p-3 rounded-md font-mono mb-4">
                  GET /qrcodes/:id
                </div>
                <p>
                  {t("Retrieve a previously generated QR code by its ID.", "استرداد رمز QR تم إنشاؤه مسبقًا بواسطة معرفه.")}
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="examples" className="space-y-6">
            <div className="p-6 border rounded-md bg-white">
              <h2 className="text-2xl font-semibold mb-4">{t("Code Examples", "أمثلة على الكود")}</h2>
              
              <div className="mb-8">
                <h3 className="text-xl font-medium mb-4">
                  {t("JavaScript Example", "مثال JavaScript")}
                </h3>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-md font-mono text-sm overflow-auto">
                  <pre>{`
const generateQRCode = async () => {
  const response = await fetch('https://api.qrito.com/v1/qrcodes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_KEY'
    },
    body: JSON.stringify({
      content: 'https://example.com',
      type: 'url',
      size: 300,
      fgColor: '#000000',
      bgColor: '#FFFFFF'
    })
  });
  
  const data = await response.json();
  console.log(data);
};

generateQRCode();
                  `}</pre>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-medium mb-4">
                  {t("Python Example", "مثال Python")}
                </h3>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-md font-mono text-sm overflow-auto">
                  <pre>{`
import requests
import json

def generate_qr_code():
    url = "https://api.qrito.com/v1/qrcodes"
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_API_KEY"
    }
    payload = {
        "content": "https://example.com",
        "type": "url",
        "size": 300,
        "fgColor": "#000000",
        "bgColor": "#FFFFFF"
    }
    
    response = requests.post(url, headers=headers, data=json.dumps(payload))
    print(response.json())

generate_qr_code()
                  `}</pre>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default ApiPage;
