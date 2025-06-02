
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/context";

const Header = () => {
  // Extended user type with optional properties that might not be in the base User type
  const { user, logout, language } = useUser();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Function to get user initial from name or email
  const getUserInitial = () => {
    if (!user) return "U";
    
    // Try to get initial from user name first
    if ((user as any).name) {
      return (user as any).name.charAt(0).toUpperCase();
    }
    
    // Fallback to email first character
    if (user.email) {
      return user.email.charAt(0).toUpperCase();
    }
    
    // Final fallback
    return "U";
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Icons.logo className="h-8 w-8 text-qrito-purple" />
            <span className="ml-2 text-xl font-bold text-qrito-purple">QRito</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-qrito-purple text-sm font-medium">
              Home
            </Link>
            <Link to="/features" className="text-gray-700 hover:text-qrito-purple text-sm font-medium">
              Features
            </Link>
            <Link to="/examples" className="text-gray-700 hover:text-qrito-purple text-sm font-medium">
              Examples
            </Link>
            <Link to="/pricing" className="text-gray-700 hover:text-qrito-purple text-sm font-medium">
              Pricing
            </Link>
          </nav>

          {/* User Menu / Login Button */}
          <div className="flex items-center">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={(user as any).avatarUrl || ''} />
                      <AvatarFallback className="bg-qrito-purple text-white">
                        {getUserInitial()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/settings")}>
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex space-x-2">
                <Button variant="ghost" onClick={() => navigate("/login")}>
                  Login
                </Button>
                <Button onClick={() => navigate("/signup")} className="bg-qrito-purple hover:bg-qrito-purple-dark">
                  Sign Up
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="ml-4 md:hidden focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="px-2 py-1 text-gray-700 hover:text-qrito-purple"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/features"
                className="px-2 py-1 text-gray-700 hover:text-qrito-purple"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                to="/examples"
                className="px-2 py-1 text-gray-700 hover:text-qrito-purple"
                onClick={() => setIsMenuOpen(false)}
              >
                Examples
              </Link>
              <Link
                to="/pricing"
                className="px-2 py-1 text-gray-700 hover:text-qrito-purple"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
