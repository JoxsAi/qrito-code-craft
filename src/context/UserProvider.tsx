
import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';
import { UserContextType } from './UserTypes';
import { loadQRCount, loadSubscription, loadLanguage } from './userHelpers';

// Create the context with default values
const UserContext = createContext<UserContextType>({
  user: null,
  session: null,
  isLoggedIn: false,
  subscription: 'free',
  qrCodesGenerated: 0,
  incrementQRCount: () => false,
  setUserSubscription: () => {},
  subscriptionEndDate: null,
  language: 'en',
  switchLanguage: () => {},
  logout: async () => {},
  canAddLogo: () => false,
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [subscription, setSubscription] = useState('free');
  const [qrCodesGenerated, setQrCodesGenerated] = useState(0);
  const [subscriptionEndDate, setSubscriptionEndDate] = useState<Date | null>(null);
  const [language, setLanguage] = useState('en'); // Default to English
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoggedIn(!!session);

        // If user is logged in, get their data from localStorage
        if (session?.user) {
          // Load QR code count
          setQrCodesGenerated(loadQRCount(session.user));
          
          // Load subscription data
          const { subscription: userSubscription, subscriptionEndDate: endDate } = 
            loadSubscription(session.user);
          setSubscription(userSubscription);
          setSubscriptionEndDate(endDate);
          
          // Load language preference
          setLanguage(loadLanguage(session.user));
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoggedIn(!!session);
      
      // Get user data if logged in
      if (session?.user) {
        setQrCodesGenerated(loadQRCount(session.user));
        
        const { subscription: userSubscription, subscriptionEndDate: endDate } = 
          loadSubscription(session.user);
        setSubscription(userSubscription);
        setSubscriptionEndDate(endDate);
        
        setLanguage(loadLanguage(session.user));
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const incrementQRCount = () => {
    if (user) {
      // Check subscription limits
      if (subscription === 'free' && qrCodesGenerated >= 5) {
        toast({
          variant: "destructive",
          title: "QR Code Limit Reached",
          description: "You've reached the limit of 5 QR codes on the free plan. Upgrade to create more.",
        });
        return false;
      }
      
      const newCount = qrCodesGenerated + 1;
      setQrCodesGenerated(newCount);
      localStorage.setItem(`qrCount_${user.id}`, newCount.toString());
      return true;
    }
    return false;
  };

  const setUserSubscription = (plan: string) => {
    setSubscription(plan);
    if (user) {
      localStorage.setItem(`subscription_${user.id}`, plan);
      
      // Set subscription end date (30 days from now)
      if (plan !== 'free') {
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 30);
        setSubscriptionEndDate(endDate);
        // Store end date in ISO string format
        localStorage.setItem(`subscriptionEndDate_${user.id}`, endDate.toISOString());
        
        toast({
          title: "Subscription Updated",
          description: `You are now on the ${plan} plan until ${endDate.toLocaleDateString()}.`,
        });
      } else {
        setSubscriptionEndDate(null);
        localStorage.removeItem(`subscriptionEndDate_${user.id}`);
      }
    }
  };

  // Function to switch language
  const switchLanguage = (lang: string) => {
    setLanguage(lang);
    if (user) {
      localStorage.setItem(`language_${user.id}`, lang);
      
      toast({
        title: "Language Updated",
        description: lang === 'en' ? "Application language set to English" : "تم تعيين لغة التطبيق إلى العربية",
      });
    }
  };

  // Function to log out
  const logout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out",
      });
    } catch (error) {
      console.error("Error logging out:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to log out",
      });
    }
  };

  // Function to check if user can add logo to QR code
  const canAddLogo = () => {
    return subscription !== 'free';
  };

  return (
    <UserContext.Provider 
      value={{ 
        user, 
        session, 
        isLoggedIn, 
        subscription, 
        qrCodesGenerated, 
        incrementQRCount,
        setUserSubscription,
        subscriptionEndDate,
        language,
        switchLanguage,
        logout,
        canAddLogo
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
