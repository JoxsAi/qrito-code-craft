
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useUser } from "@/context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, Phone } from "lucide-react";

const ContactPage = () => {
  const { language } = useUser();
  const { toast } = useToast();
  
  // Translation function
  const t = (en: string, ar: string) => {
    return language === "ar" ? ar : en;
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: t("Message Sent", "تم إرسال الرسالة"),
        description: t("We'll get back to you as soon as possible.", "سنرد عليك في أقرب وقت ممكن."),
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col" dir={language === "ar" ? "rtl" : "ltr"}>
      <Header />
      <div className="flex-1 py-16 container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">
          {t("Contact Us", "اتصل بنا")}
        </h1>
        <p className="text-center text-lg text-gray-700 mb-12 max-w-2xl mx-auto">
          {t("Have questions or feedback? We'd love to hear from you. Get in touch with our team.", 
            "هل لديك أسئلة أو ملاحظات؟ نود أن نسمع منك. تواصل مع فريقنا.")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium">
                    {t("Your Name", "الاسم")}
                  </label>
                  <Input
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t("John Doe", "محمد أحمد")}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium">
                    {t("Email Address", "البريد الإلكتروني")}
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block mb-2 text-sm font-medium">
                  {t("Subject", "الموضوع")}
                </label>
                <Input
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder={t("How can we help?", "كيف يمكننا المساعدة؟")}
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-2 text-sm font-medium">
                  {t("Message", "الرسالة")}
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t("Type your message here...", "اكتب رسالتك هنا...")}
                  className="resize-none"
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-qrito-purple hover:bg-qrito-purple-dark w-full"
              >
                {isSubmitting 
                  ? t("Sending...", "جاري الإرسال...") 
                  : t("Send Message", "إرسال الرسالة")}
              </Button>
            </form>
          </div>
          
          <div className="space-y-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-medium text-lg mb-4">
                {t("Contact Information", "معلومات الاتصال")}
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="mr-3 h-5 w-5 text-purple-600 mt-0.5" />
                  <div>
                    <p className="font-medium">{t("Email", "البريد الإلكتروني")}</p>
                    <a href="mailto:info@qrito.com" className="text-purple-600 hover:underline">
                      info@qrito.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="mr-3 h-5 w-5 text-purple-600 mt-0.5" />
                  <div>
                    <p className="font-medium">{t("Phone", "الهاتف")}</p>
                    <a href="tel:+1234567890" className="text-purple-600 hover:underline">
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="mr-3 h-5 w-5 text-purple-600 mt-0.5" />
                  <div>
                    <p className="font-medium">{t("Office", "المكتب")}</p>
                    <address className="not-italic">
                      123 QR Street<br />
                      Tech City, TC 12345<br />
                      United States
                    </address>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="font-medium text-lg mb-2">
                {t("Business Hours", "ساعات العمل")}
              </h3>
              <p className="text-sm text-gray-700">
                {t("Monday - Friday: 9AM - 5PM", "الاثنين - الجمعة: 9 صباحًا - 5 مساءً")}<br />
                {t("Saturday & Sunday: Closed", "السبت والأحد: مغلق")}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
