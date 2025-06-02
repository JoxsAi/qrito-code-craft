
import { User } from '@supabase/supabase-js';

/**
 * Load QR count from localStorage
 */
export const loadQRCount = (user: User): number => {
  const count = localStorage.getItem(`qrCount_${user.id}`);
  return count ? parseInt(count) : 0;
};

/**
 * Load subscription data from localStorage
 */
export const loadSubscription = (user: User): { subscription: string, subscriptionEndDate: Date | null } => {
  const subscription = localStorage.getItem(`subscription_${user.id}`) || 'free';
  
  let subscriptionEndDate = null;
  const endDateString = localStorage.getItem(`subscriptionEndDate_${user.id}`);
  if (endDateString) {
    subscriptionEndDate = new Date(endDateString);
  }
  
  return { subscription, subscriptionEndDate };
};

/**
 * Load language preference
 */
export const loadLanguage = (user: User): string => {
  return localStorage.getItem(`language_${user.id}`) || 'en';
};

/**
 * Check if a user can add a logo based on their subscription
 */
export const canAddLogo = (subscription: string): boolean => {
  return subscription !== 'free';
};

/**
 * Format WiFi network data for QR code
 */
export const formatWifiData = (ssid: string, password: string, encryption: string, hidden: boolean): string => {
  let wifiString = `WIFI:S:${ssid};`;
  
  if (encryption && encryption !== 'nopass') {
    wifiString += `T:${encryption};`;
  } else {
    wifiString += 'T:nopass;';
  }
  
  if (password) {
    wifiString += `P:${password};`;
  }
  
  if (hidden) {
    wifiString += 'H:true;';
  }
  
  wifiString += ';';
  
  return wifiString;
};

/**
 * Format contact data for QR code (vCard format)
 */
export const formatContactData = (name: string, phone: string, email: string, address: string): string => {
  let vcard = 'BEGIN:VCARD\n';
  vcard += 'VERSION:3.0\n';
  
  if (name) {
    vcard += `FN:${name}\n`;
    // Split name into first and last name
    const nameParts = name.split(' ');
    if (nameParts.length > 1) {
      vcard += `N:${nameParts[nameParts.length - 1]};${nameParts[0]};;;\n`;
    } else {
      vcard += `N:;${name};;;\n`;
    }
  }
  
  if (phone) {
    vcard += `TEL;TYPE=CELL:${phone}\n`;
  }
  
  if (email) {
    vcard += `EMAIL:${email}\n`;
  }
  
  if (address) {
    vcard += `ADR:;;${address};;;;\n`;
  }
  
  vcard += 'END:VCARD';
  
  return vcard;
};

/**
 * Format calendar event data for QR code (iCalendar format)
 */
export const formatEventData = (title: string, start: string, end: string, location: string, description: string): string => {
  let ical = 'BEGIN:VCALENDAR\n';
  ical += 'VERSION:2.0\n';
  ical += 'BEGIN:VEVENT\n';
  
  // Generate a unique identifier
  const uid = `event-${Date.now()}@qrcoder.app`;
  ical += `UID:${uid}\n`;
  
  if (title) {
    ical += `SUMMARY:${title}\n`;
  }
  
  if (start) {
    // Convert to UTC format: 20230101T130000Z
    const startDate = new Date(start);
    const startStr = startDate.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/g, '');
    ical += `DTSTART:${startStr}\n`;
  }
  
  if (end) {
    const endDate = new Date(end);
    const endStr = endDate.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/g, '');
    ical += `DTEND:${endStr}\n`;
  }
  
  if (location) {
    ical += `LOCATION:${location}\n`;
  }
  
  if (description) {
    ical += `DESCRIPTION:${description}\n`;
  }
  
  ical += 'END:VEVENT\n';
  ical += 'END:VCALENDAR';
  
  return ical;
};
