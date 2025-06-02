import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useUser } from "@/context";
import { useNavigate } from "react-router-dom";

const CTA = () => {
  const { isLoggedIn } = useUser();
  const navigate = useNavigate();
  
  const handleCreateQRClick = () => {
    if (isLoggedIn) {
      // If logged in, scroll to QR generator
      const generatorElement = document.getElementById("generator");
      if (generatorElement) {
        generatorElement.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/#generator");
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-qrito-purple-light to-qrito-purple-dark py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">
          Ready to Create Your QR Code?
        </h2>
        <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
          Start creating professional QR codes today with our easy-to-use platform.
          No credit card required to get started.
        </p>
        {isLoggedIn ? (
          <Button 
            size="lg" 
            className="bg-white text-qrito-purple hover:bg-gray-100 px-8 py-6 text-lg"
            onClick={handleCreateQRClick}
          >
            Create QR Code for Free
          </Button>
        ) : (
          <Button 
            size="lg" 
            className="bg-white text-qrito-purple hover:bg-gray-100 px-8 py-6 text-lg"
            asChild
          >
            <Link to="/signup">
              Create QR Code for Free
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default CTA;
