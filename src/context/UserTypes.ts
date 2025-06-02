
import { Session, User } from '@supabase/supabase-js';

export type UserContextType = {
  user: User | null;
  session: Session | null;
  isLoggedIn: boolean;
  subscription: string;
  qrCodesGenerated: number;
  incrementQRCount: () => boolean; // Return boolean to indicate if successful
  setUserSubscription: (plan: string) => void;
  subscriptionEndDate: Date | null;
  language: string;
  switchLanguage: (lang: string) => void;
  logout: () => Promise<void>;
  canAddLogo: () => boolean;
};
