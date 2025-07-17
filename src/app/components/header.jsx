"use client";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 mt-2">
            <img
              src="/logo.png"
              alt="UNIPHY Logo"
              className="h-20 w-20 translate-y--9 translate-x-6"
            />
          </div>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-gray-700 hover:text-[#7ce3b1] font-medium transition-colors duration-200"
            >
              Find Therapists
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-[#7ce3b1] font-medium transition-colors duration-200"
            >
              Services
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-[#7ce3b1] font-medium transition-colors duration-200"
            >
              About
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-[#7ce3b1] font-medium transition-colors duration-200"
            >
              Contact
            </a>
          </nav>
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-700 hover:text-[#7ce3b1] px-4 py-2 font-medium transition-colors duration-200">
              Sign In
            </button>
            <button className="bg-[#7ce3b1] hover:bg-[#6dd4a2] text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
              Book Now
            </button>
          </div>
          {/* Mobile Menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-4">
              <a
                href="#"
                className="text-gray-700 hover:text-[#7ce3b1] font-medium py-2 transition-colors duration-200"
              >
                Find Therapists
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-[#7ce3b1] font-medium py-2 transition-colors duration-200"
              >
                Services
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-[#7ce3b1] font-medium py-2 transition-colors duration-200"
              >
                About
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-[#7ce3b1] font-medium py-2 transition-colors duration-200"
              >
                Contact
              </a>
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100">
                <button className="text-gray-700 hover:text-[#7ce3b1] px-4 py-2 font-medium text-left transition-colors duration-200">
                  Sign In
                </button>
                <button className="bg-[#7ce3b1] hover:bg-[#6dd4a2] text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
                  Book Now
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
