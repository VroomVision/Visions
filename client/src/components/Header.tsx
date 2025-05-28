import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import Logo from "./Logo";
import { ShoppingCart, Instagram } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Header: React.FC = () => {
  const [, navigate] = useLocation();
  const { cart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Change background on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: "Features", path: "/#features" },
    { label: "Products", path: "/#luts-section" },
    { label: "Reviews", path: "/#testimonials" }
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-purple-900/20 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div onClick={() => navigate("/")} className="cursor-pointer">
          <Logo />
        </div>
        
        <div className="hidden md:flex space-x-1">
          <div className="bg-purple-900/20 backdrop-blur-lg px-4 py-1 rounded-full flex space-x-1 border border-white/10 shadow-glow">
            {navItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className="text-white hover:bg-purple-500/20 px-3 py-1 rounded-full text-sm transition-all duration-300"
                onClick={() => {
                  if (item.path.startsWith('/#')) {
                    // Use standard anchor link behavior for scrolling
                    window.location.href = item.path;
                  } else {
                    // Use wouter navigate for other routes
                    navigate(item.path);
                  }
                }}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <a 
            href="https://www.instagram.com/vroom_visionsx?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-white hover:text-purple-300 flex items-center rounded-full bg-purple-900/30 p-1.5 border border-white/10 shadow-glow transition-colors"
          >
            <Instagram size={16} />
          </a>
          <div 
            onClick={() => navigate("/checkout")}
            className="text-white hover:text-purple-300 flex items-center rounded-full bg-purple-900/30 p-1.5 border border-white/10 shadow-glow transition-colors"
          >
            <ShoppingCart size={16} />
            {itemCount > 0 && (
              <Badge variant="destructive" className="absolute -top-2 -right-2 bg-purple-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs p-0 border border-white/20 shadow-glow">
                {itemCount}
              </Badge>
            )}
          </div>
        </div>
      </div>
      
      <div className="md:hidden">
        <div className="container mx-auto px-4 py-2 flex justify-center">
          <div className="bg-purple-900/20 backdrop-blur-lg px-3 py-1 rounded-full flex space-x-1 border border-white/10 shadow-glow">
            {navItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className="text-white hover:bg-purple-500/20 px-2 py-1 rounded-full text-sm transition-all duration-300"
                onClick={() => {
                  if (item.path.startsWith('/#')) {
                    // Use standard anchor link behavior for scrolling
                    window.location.href = item.path;
                  } else {
                    // Use wouter navigate for other routes
                    navigate(item.path);
                  }
                }}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
