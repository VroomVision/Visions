import React from "react";
import { Link } from "wouter";
import Logo from "./Logo";
import { Instagram, Facebook, Youtube } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-transparent backdrop-blur-md py-10 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 bg-purple-900/10 backdrop-blur-lg rounded-xl border border-white/10 shadow-glow p-6">
          <div>
            <Link href="/">
              <a className="cursor-pointer mb-4 inline-block">
                <Logo />
              </a>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              Professional car editing and color grading solutions that transform ordinary photos into extraordinary visuals.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/vroom_visionsx?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-purple-400 hover:text-white transition-colors flex items-center rounded-full bg-purple-900/30 p-2 border border-white/10 shadow-glow">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center rounded-full bg-purple-900/30 p-2 border border-white/10 shadow-glow">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center justify-center rounded-full bg-purple-900/30 p-2 border border-white/10 shadow-glow">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 3C7.0275 3 3 7.0275 3 12C3 16.9725 7.0275 21 12 21C16.9725 21 21 16.9725 21 12C21 7.0275 16.9725 3 12 3ZM18 13.2C18 15.0 16.5 16.5 14.7 16.5H11.4C9.6 16.5 8.1 15.0 8.1 13.2V10.8C8.1 9 9.6 7.5 11.4 7.5H14.7C16.5 7.5 18 9 18 10.8V13.2Z" 
                    fill="currentColor"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center rounded-full bg-purple-900/30 p-2 border border-white/10 shadow-glow">
                <Youtube size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#luts-section">
                  <a className="text-gray-400 hover:text-white">Color Grading LUTs</a>
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Cinematic Presets</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Video Editing Packs</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Professional Editing</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Tutorials</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Blog</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">FAQ</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Support</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">About Us</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Contact</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 text-center bg-purple-900/5 backdrop-blur-lg rounded-xl border border-white/5 p-4 shadow-glow">
          <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} VroomVisionX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
