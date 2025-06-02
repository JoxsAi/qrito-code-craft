
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Settings from "@/components/Settings";

const SettingsPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="flex-grow">
        <Settings />
      </div>
      <Footer />
    </div>
  );
};

export default SettingsPage;
