
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useUser } from "@/context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, CreditCard, ChevronRight, QrCode, History, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import QRHistoryCard from "@/components/QRHistoryCard";

const ProfilePage = () => {
  const { isLoggedIn, user, subscription, qrCodesGenerated, subscriptionEndDate } = useUser();
  const navigate = useNavigate();
  const [timeRemaining, setTimeRemaining] = useState<{days: number, hours: number, minutes: number, seconds: number} | null>(null);
  
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (!subscriptionEndDate) return;
    
    // Update time remaining every second
    const calculateTimeRemaining = () => {
      try {
        const end = new Date(subscriptionEndDate);
        const now = new Date();
        const diff = end.getTime() - now.getTime();
        
        if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        return { days, hours, minutes, seconds };
      } catch (error) {
        console.error('Error calculating time remaining:', error);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
    };
    
    setTimeRemaining(calculateTimeRemaining());
    
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);
    
    return () => clearInterval(timer);
  }, [subscriptionEndDate]);

  // Calculate days remaining if on a paid plan
  const daysRemaining = timeRemaining?.days || 0;
  const percentageRemaining = subscriptionEndDate ? 
    Math.max(0, Math.min(100, Math.floor((daysRemaining / 30) * 100))) : 0;

  const getSubscriptionBadgeColor = () => {
    switch(subscription) {
      case 'pro':
        return "bg-qrito-purple text-white";
      case 'business':
        return "bg-blue-600 text-white";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const formatSubscriptionName = () => {
    if (subscription === 'free') return 'Free Plan';
    if (subscription === 'pro') return 'Pro Plan';
    if (subscription === 'business') return 'Business Plan';
    return 'No Subscription';
  };
  
  // Format time with leading zeros
  const formatTimeUnit = (unit: number) => {
    return unit < 10 ? `0${unit}` : `${unit}`;
  };

  // Show loading state while checking authentication
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow py-12 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Your Profile</h1>
            <Button 
              variant="outline"
              onClick={() => navigate('/settings')}
            >
              Settings
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* User Info Card */}
            <Card className="col-span-1">
              <CardHeader className="pb-3">
                <div className="flex flex-col items-center mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={(user as any)?.avatarUrl || ''} />
                    <AvatarFallback className="bg-qrito-purple text-white text-2xl">
                      {((user as any)?.name || user?.email?.charAt(0) || "U")?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-center">Account Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-2">
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{user?.email || 'No email available'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Member since</p>
                  <p className="font-medium">
                    {user?.user_metadata?.created_at ? 
                      new Date(user.user_metadata.created_at).toLocaleDateString('en-US') : 
                      new Date().toLocaleDateString('en-US')}
                  </p>
                </div>
                <div className="pt-4">
                  <Button 
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate("/settings")}
                  >
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Subscription Card */}
            <Card className="col-span-1 lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div>
                  <CardTitle>Current Subscription</CardTitle>
                  <CardDescription>Manage your subscription</CardDescription>
                </div>
                <Badge className={getSubscriptionBadgeColor()}>
                  {formatSubscriptionName()}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {subscription !== 'free' && subscriptionEndDate && timeRemaining && (
                    <>
                      <div className="bg-gradient-to-r from-purple-100 to-indigo-100 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                          <Clock className="mr-2 h-5 w-5 text-qrito-purple" />
                          Subscription Time Remaining
                        </h3>
                        
                        <div className="grid grid-cols-4 gap-3 mb-4">
                          <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                            <div className="text-3xl font-bold text-qrito-purple">{formatTimeUnit(timeRemaining.days)}</div>
                            <div className="text-xs uppercase text-gray-500 mt-1">Days</div>
                          </div>
                          <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                            <div className="text-3xl font-bold text-qrito-purple">{formatTimeUnit(timeRemaining.hours)}</div>
                            <div className="text-xs uppercase text-gray-500 mt-1">Hours</div>
                          </div>
                          <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                            <div className="text-3xl font-bold text-qrito-purple">{formatTimeUnit(timeRemaining.minutes)}</div>
                            <div className="text-xs uppercase text-gray-500 mt-1">Minutes</div>
                          </div>
                          <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                            <div className="text-3xl font-bold text-qrito-purple">{formatTimeUnit(timeRemaining.seconds)}</div>
                            <div className="text-xs uppercase text-gray-500 mt-1">Seconds</div>
                          </div>
                        </div>
                        
                        <Progress value={percentageRemaining} className="h-2" />
                        
                        <div className="flex flex-col space-y-2 text-sm mt-4">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Start Date</span>
                            <span className="font-medium">
                              {new Date(new Date(subscriptionEndDate).getTime() - 30 * 24 * 60 * 60 * 1000)
                                .toLocaleDateString('en-US', { 
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">End Date</span>
                            <span className="font-medium">
                              {new Date(subscriptionEndDate).toLocaleDateString('en-US', { 
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <QrCode className="mr-2 h-4 w-4 text-qrito-purple" />
                        <span>Unlimited QR codes</span>
                      </div>

                      <div className="mt-2 p-4 bg-purple-50 border border-purple-200 rounded-md">
                        <h4 className="font-medium text-purple-800 mb-3">Your Premium Benefits</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-purple-500 mr-2"></div>
                            <span>Unlimited QR codes</span>
                          </li>
                          <li className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-purple-500 mr-2"></div>
                            <span>Advanced design options</span>
                          </li>
                          <li className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-purple-500 mr-2"></div>
                            <span>Logo embedding in QR codes</span>
                          </li>
                          <li className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-purple-500 mr-2"></div>
                            <span>PNG, JPG, and SVG downloads</span>
                          </li>
                          {subscription === 'business' && (
                            <>
                              <li className="flex items-center">
                                <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                                <span>QR code analytics</span>
                              </li>
                              <li className="flex items-center">
                                <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                                <span>Multiple team members</span>
                              </li>
                            </>
                          )}
                        </ul>
                      </div>
                    </>
                  )}

                  {subscription === 'free' && (
                    <>
                      <div className="flex items-center">
                        <QrCode className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{qrCodesGenerated || 0}/5 QR codes created</span>
                      </div>
                      {(qrCodesGenerated || 0) >= 5 && (
                        <div className="p-4 bg-amber-50 border border-amber-200 rounded-md text-amber-800">
                          You've reached your limit of 5 QR codes. Upgrade your plan to create more.
                        </div>
                      )}
                      <div className="p-5 border rounded-lg mt-4">
                        <h4 className="font-medium mb-3">Upgrade to unlock premium features</h4>
                        <ul className="space-y-2 mb-4">
                          <li className="flex items-center text-gray-600">
                            <div className="h-1.5 w-1.5 rounded-full bg-gray-400 mr-2"></div>
                            <span>Limited to 5 QR codes</span>
                          </li>
                          <li className="flex items-center text-gray-600">
                            <div className="h-1.5 w-1.5 rounded-full bg-gray-400 mr-2"></div>
                            <span>Basic customization only</span>
                          </li>
                          <li className="flex items-center text-gray-600">
                            <div className="h-1.5 w-1.5 rounded-full bg-gray-400 mr-2"></div>
                            <span>PNG download format only</span>
                          </li>
                        </ul>
                        <Button 
                          className="w-full bg-qrito-purple hover:bg-qrito-purple-dark"
                          onClick={() => navigate('/pricing')}
                        >
                          Upgrade Now
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  variant={subscription === 'free' ? "default" : "outline"}
                  onClick={() => navigate('/pricing')}
                >
                  {subscription === 'free' ? 'Upgrade Plan' : 'Manage Subscription'}
                </Button>
              </CardFooter>
            </Card>

            {/* QR Code History */}
            <div className="col-span-1 md:col-span-3">
              <QRHistoryCard />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
