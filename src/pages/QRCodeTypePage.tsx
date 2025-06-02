
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useUser } from "@/context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { QrCode } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Helmet } from "react-helmet-async";
import { ColorPicker } from "@/components/ui/color-picker";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

// Import the QRTypeSelector component
import QRTypeSelector from "@/components/qr/QRTypeSelector";

const QRCodeTypePage = () => {
  const navigate = useNavigate();
  const { isLoggedIn, language } = useUser();
  const [selectedType, setSelectedType] = useState("url");
  const [url, setUrl] = useState("");
  const [dotColor, setDotColor] = useState("#8A3FFC");
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [dotSize, setDotSize] = useState(70);
  const [cornerRadius, setCornerRadius] = useState(0);
  const [errorLevel, setErrorLevel] = useState("H");
  
  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
  };
  
  const handleGenerate = () => {
    if (!isLoggedIn) {
      navigate("/signup");
      return;
    }
    navigate(`/?type=${selectedType}`);
  };

  // SEO schema for structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": language === "ar" ? "إنشاء كود QR - QRito" : "Create QR Code - QRito",
    "description": language === "ar" ? "اختر نوع كود QR وقم بتخصيصه حسب احتياجاتك" : "Choose your QR code type and customize it to your needs",
    "publisher": {
      "@type": "Organization",
      "name": "QRito"
    },
    "inLanguage": language === "ar" ? "ar" : "en"
  };
  
  // Error correction levels
  const errorLevels = [
    { value: 'L', label: 'L - Low (7%)' },
    { value: 'M', label: 'M - Medium (15%)' },
    { value: 'Q', label: 'Q - Quality (25%)' },
    { value: 'H', label: 'H - High (30%)' }
  ];
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50" dir={language === "ar" ? "rtl" : "ltr"}>
      <Helmet>
        <title>{language === "ar" ? "إنشاء كود QR - أنواع مختلفة من رموز QR | QRito" : "Create QR Code - Various QR Code Types | QRito"}</title>
        <meta 
          name="description" 
          content={language === "ar" ? "أنشئ أنواع مختلفة من رموز QR: URL، نص، بريد إلكتروني، WiFi، جهات اتصال، موقع، أحداث، وأكثر. خصص الألوان والتصميم مجاناً." : "Create various types of QR codes: URL, text, email, WiFi, contact info, location, events, and more. Customize colors and design for free."} 
        />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>
      <Header />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-3xl font-bold text-center mb-3">
            {language === "ar" ? "إنشاء كود QR الخاص بك" : "Create Your QR Code"}
          </h1>
          <p className="text-center text-gray-600 mb-8">
            {language === "ar" ? "خصص محتواك واختر نوع كود QR" : "Customize your content and choose QR code type"}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-white shadow-sm rounded-lg p-6">
                <QRTypeSelector 
                  qrType={selectedType}
                  onSelectType={handleTypeSelect}
                />
                
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-2">
                    {selectedType === 'url' ? language === "ar" ? "رابط الموقع" : 'Website URL' : 
                     selectedType === 'text' ? language === "ar" ? "نص" : 'Text' :
                     selectedType === 'email' ? language === "ar" ? "البريد الإلكتروني" : 'Email' :
                     selectedType === 'wifi' ? language === "ar" ? "شبكة WiFi" : 'WiFi Network' :
                     selectedType === 'contact' ? language === "ar" ? "معلومات الاتصال" : 'Contact Info' :
                     selectedType === 'location' ? language === "ar" ? "الموقع" : 'Location' :
                     selectedType === 'event' ? language === "ar" ? "تفاصيل الحدث" : 'Event Details' :
                     selectedType === 'image' ? language === "ar" ? "رابط الصورة" : 'Image URL' :
                     selectedType === 'app' ? language === "ar" ? "رابط التطبيق" : 'App URL' : language === "ar" ? "رقم SMS" : 'SMS Number'}
                  </h3>
                  <Input 
                    placeholder={selectedType === 'url' ? "https://example.com" : language === "ar" ? "أدخل المحتوى" : "Enter content"} 
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full" 
                    aria-label={language === "ar" ? "محتوى كود QR" : "QR code content"}
                  />
                </div>
                
                <Tabs defaultValue="design" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="design" className="text-center">
                      {language === "ar" ? "التصميم" : "Design"}
                    </TabsTrigger>
                    <TabsTrigger value="advanced" className="text-center">
                      {language === "ar" ? "خيارات متقدمة" : "Advanced Options"}
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="design">
                    <div className="space-y-6">
                      <div className="mb-8">
                        <div className="flex justify-between mb-2">
                          <h3 className="text-sm font-medium">
                            {language === "ar" ? "حجم كود QR" : "QR Code Size"}
                          </h3>
                          <span className="text-sm text-gray-500">{dotSize}%</span>
                        </div>
                        <Slider
                          value={[dotSize]}
                          min={10}
                          max={65}
                          step={1}
                          onValueChange={(value) => setDotSize(value[0])}
                          className="w-full"
                          aria-label={language === "ar" ? "حجم كود QR" : "QR Code size"}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h3 className="text-sm font-medium mb-2">
                            {language === "ar" ? "لون كود QR" : "QR Code Color"}
                          </h3>
                          <ColorPicker color={dotColor} onChange={setDotColor} />
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium mb-2">
                            {language === "ar" ? "لون الخلفية" : "Background Color"}
                          </h3>
                          <ColorPicker color={backgroundColor} onChange={setBackgroundColor} />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="advanced">
                    <div className="space-y-6">
                      <div className="mb-6">
                        <div className="flex justify-between mb-2">
                          <h3 className="text-sm font-medium">
                            {language === "ar" ? "استدارة الزوايا" : "Corner Radius"}
                          </h3>
                          <span className="text-sm text-gray-500">{cornerRadius}%</span>
                        </div>
                        <Slider
                          value={[cornerRadius]}
                          min={0}
                          max={50}
                          step={1}
                          onValueChange={(value) => setCornerRadius(value[0])}
                          className="w-full"
                          aria-label={language === "ar" ? "استدارة الزوايا" : "Corner radius"}
                        />
                      </div>

                      <div>
                        <h3 className="text-sm font-medium mb-2">
                          {language === "ar" ? "تصحيح الخطأ" : "Error Correction"}
                        </h3>
                        <RadioGroup
                          value={errorLevel}
                          onValueChange={setErrorLevel}
                          className="grid grid-cols-4 gap-2"
                        >
                          {errorLevels.map((level) => (
                            <div key={level.value} className="flex items-center space-x-1">
                              <RadioGroupItem value={level.value} id={`error-level-${level.value}`} />
                              <Label htmlFor={`error-level-${level.value}`} className="text-sm ml-1">{level.value}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                        <p className="text-xs text-gray-500 mt-1">
                          {language === "ar" ? "المستويات العالية تمكن من تصحيح الخطأ بشكل أفضل ولكنها تنشئ رموزًا أكثر كثافة" : "Higher levels enable better error correction but create denser codes"}
                        </p>
                      </div>

                      <div className="mt-6">
                        <h3 className="text-sm font-medium mb-2">
                          {language === "ar" ? "تنسيق الصورة" : "Image Format"}
                        </h3>
                        <select className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm">
                          <option value="svg">SVG</option>
                          <option value="png">PNG</option>
                          <option value="jpeg">JPEG</option>
                        </select>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
                
                <Button 
                  onClick={handleGenerate}
                  size="lg" 
                  className="w-full bg-purple-600 hover:bg-purple-700 rounded-full py-6 mt-4"
                >
                  <QrCode className="mr-2 h-5 w-5" /> 
                  {language === "ar" ? "إنشاء كود QR" : "Generate QR Code"}
                </Button>
              </div>
            </div>
            
            <div>
              <div className="bg-white shadow-sm rounded-lg p-6">
                <h2 className="text-lg font-medium mb-4">
                  {language === "ar" ? "معاينة كود QR" : "QR Preview"}
                </h2>
                <div className="flex justify-center items-center p-8 bg-gray-50 rounded-lg h-64">
                  {url ? (
                    <div id="qr-code-svg" className="flex justify-center items-center">
                      {/* QR code would be rendered here by the actual implementation */}
                      <QrCode size={Math.max(128, 128 + dotSize)} className="text-purple-600" />
                    </div>
                  ) : (
                    <div className="text-center text-gray-400">
                      <QrCode size={64} className="mx-auto mb-2 text-gray-300" aria-hidden="true" />
                      <p>{language === "ar" ? "معاينة كود QR" : "QR Preview"}</p>
                    </div>
                  )}
                </div>
                
                {url && (
                  <div className="mt-6 grid grid-cols-3 gap-2">
                    <Button variant="secondary" className="text-xs">
                      {language === "ar" ? "تنزيل" : "Download"}
                    </Button>
                    <Button variant="secondary" className="text-xs">
                      {language === "ar" ? "نسخ" : "Copy"}
                    </Button>
                    <Button variant="secondary" className="text-xs">
                      {language === "ar" ? "مشاركة" : "Share"}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default QRCodeTypePage;
