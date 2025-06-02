
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import AuthLayout from "@/components/auth/AuthLayout";
import FormField from "@/components/auth/FormField";

const formSchema = z.object({
  email: z.string().email({ message: "يرجى إدخال بريد إلكتروني صحيح" }),
  password: z.string().min(10, { message: "كلمة المرور يجب أن تكون 10 أحرف على الأقل" }),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "فشل تسجيل الدخول",
          description: error.message === "Invalid login credentials"
            ? "البريد الإلكتروني أو كلمة المرور غير صحيحة"
            : error.message,
        });
        return;
      }

      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحبًا بعودتك!",
      });
      
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "حدث خطأ أثناء تسجيل الدخول، يرجى المحاولة مرة أخرى",
      });
    } finally {
      setLoading(false);
    }
  };

  const passwordRightIcon = (
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="text-white/70 hover:text-white transition-colors focus:outline-none"
    >
      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-600 via-purple-500 to-indigo-500 relative overflow-hidden">
      {/* Animated background bubbles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 w-32 h-32 rounded-full bg-white opacity-10 animate-pulse"></div>
        <div className="absolute right-1/3 top-1/2 w-48 h-48 rounded-full bg-white opacity-10 animate-float"></div>
        <div className="absolute left-1/2 bottom-1/4 w-56 h-56 rounded-full bg-white opacity-5 animate-spin-slow"></div>
        <div className="absolute right-1/4 bottom-1/3 w-40 h-40 rounded-full bg-white opacity-10 animate-pulse"></div>
      </div>
      
      <div className="flex-1 flex items-center justify-center p-4 z-10">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-8 animate-fade-in">
            <Link to="/" className="flex items-center gap-3 transition-transform hover:scale-105">
              <div className="text-2xl font-bold text-white flex items-center">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                  <path d="M9 4H4V9H9V4Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 4H15V9H20V4Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 15H15V20H20V15Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 15H4V20H9V15Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-4xl">QRito</span>
              </div>
            </Link>
          </div>

          {/* Login card */}
          <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-xl overflow-hidden animate-scale-in border border-white/20">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-center text-white mb-2">أهلاً بك مجدداً</h2>
              <p className="text-center text-white/80 mb-6">أدخل بياناتك للوصول إلى حسابك</p>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      label="البريد الإلكتروني"
                      labelClassName="text-white"
                      placeholder="أدخل بريدك الإلكتروني"
                      icon={<Mail size={18} className="text-white/70" />}
                      inputClassName="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40 focus:ring-white/20"
                    />
                    
                    <FormField
                      control={form.control}
                      name="password"
                      label="كلمة المرور"
                      labelClassName="text-white"
                      placeholder="أدخل كلمة المرور"
                      type={showPassword ? "text" : "password"}
                      icon={<Lock size={18} className="text-white/70" />}
                      rightIcon={passwordRightIcon}
                      inputClassName="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40 focus:ring-white/20"
                    />
                  </div>
                  
                  <div className="pt-2">
                    <Button 
                      type="submit" 
                      className="w-full bg-white text-purple-700 hover:bg-white/90 transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg rounded-md h-11 text-base"
                      disabled={loading}
                    >
                      {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
                    </Button>
                  </div>
                  
                  <div className="text-center mt-6">
                    <p className="text-white/80">
                      ليس لديك حساب؟{" "}
                      <Link to="/signup" className="text-white hover:underline font-medium transition-colors">
                        إنشاء حساب جديد
                      </Link>
                    </p>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
