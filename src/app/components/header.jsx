"use client";
import { Menu, X, User, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { logout } from "../../lib/auth"; // Adjust the import path to your auth file
import { useRouter } from "next/navigation";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Function to fetch current user
  const fetchCurrentUser = async () => {
    try {
      // You'll need to create an API route or expose getCurrentUser differently
      // since server actions can't be called directly from client components
      const response = await fetch("/api/user", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      router.refresh(); // Refresh the page to update the state
    } catch (error) {
      console.error("Logout error:", error);
      // Force redirect even if there's an error
      window.location.href = "/login";
    }
  };

  const handleSignIn = () => {
    router.push("/login");
  };

  const AuthButtons = () => {
    if (loading) {
      return (
        <div className="hidden md:flex items-center space-x-4">
          <div className="animate-pulse bg-gray-200 h-8 w-16 rounded"></div>
          <div className="animate-pulse bg-gray-200 h-8 w-20 rounded-lg"></div>
        </div>
      );
    }

    if (user) {
      return (
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-gray-700">
            <User className="h-5 w-5" />
            <span className="font-medium">
              {user.firstName} {user.lastName}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-gray-700 hover:text-red-600 px-4 py-2 font-medium transition-colors duration-200"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      );
    }

    return (
      <div className="hidden md:flex items-center space-x-4">
        <button
          onClick={handleSignIn}
          className="text-gray-700 hover:text-[#7ce3b1] px-4 py-2 font-medium transition-colors duration-200"
        >
          Sign In
        </button>
        <button className="bg-[#7ce3b1] hover:bg-[#6dd4a2] text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
          Book Now
        </button>
      </div>
    );
  };

  const MobileAuthButtons = () => {
    if (loading) {
      return (
        <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100">
          <div className="animate-pulse bg-gray-200 h-8 w-full rounded"></div>
          <div className="animate-pulse bg-gray-200 h-8 w-full rounded-lg"></div>
        </div>
      );
    }

    if (user) {
      return (
        <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2 text-gray-700 px-4 py-2">
            <User className="h-5 w-5" />
            <span className="font-medium">
              {user.firstName} {user.lastName}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-gray-700 hover:text-red-600 px-4 py-2 font-medium text-left transition-colors duration-200"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      );
    }

    return (
      <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100">
        <button
          onClick={handleSignIn}
          className="text-gray-700 hover:text-[#7ce3b1] px-4 py-2 font-medium text-left transition-colors duration-200"
        >
          Sign In
        </button>
        <button className="bg-[#7ce3b1] hover:bg-[#6dd4a2] text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
          Book Now
        </button>
      </div>
    );
  };

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

          {/* Desktop Auth Buttons */}
          <AuthButtons />

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

              {/* Mobile Auth Buttons */}
              <MobileAuthButtons />
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
