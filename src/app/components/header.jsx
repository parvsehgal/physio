"use client";
import { Menu, X, User, LogOut, Calendar } from "lucide-react";
import { useState } from "react";
import { logout } from "../../lib/auth"; // Adjust the import path as needed

const Header = ({ user = null }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
      // The logout function already handles redirect, but we can add error handling here if needed
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 mt-2">
  <a href="/" className="cursor-pointer block">
    <img
      src="/logo.png"
      alt="Abaile Logo"
      className="h-10 sm:h-12 md:h-16 lg:h-20 w-auto max-w-[160px] transition-opacity duration-200 hover:opacity-80"
    />
  </a>
</div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="/find-therapist"
              className="text-gray-700 hover:text-[#7ce3b1] font-medium transition-colors duration-200"
            >
              Find Therapists
            </a>
            <a
              href="/services"
              className="text-gray-700 hover:text-[#7ce3b1] font-medium transition-colors duration-200"
            >
              Services
            </a>
            <a
              href="/about"
              className="text-gray-700 hover:text-[#7ce3b1] font-medium transition-colors duration-200"
            >
              About
            </a>
            <a
              href="/contact"
              className="text-gray-700 hover:text-[#7ce3b1] font-medium transition-colors duration-200"
            >
              Contact
            </a>
          </nav>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-3 text-gray-700 hover:text-[#7ce3b1] px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="w-10 h-10 bg-[#7ce3b1] rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {user.firstName?.charAt(0)?.toUpperCase()}
                      {user.lastName?.charAt(0)?.toUpperCase()}
                    </span>
                  </div>
                  <span className="font-medium">{`${user.firstName} ${user.lastName}`}</span>
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{`${user.firstName} ${user.lastName}`}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                      {user.role && (
                        <p className="text-xs text-gray-400 capitalize">
                          {user.role.name}
                        </p>
                      )}
                    </div>
                    {user.role?.name !== "Admin" && (
                      <a
                        href={
                          user.role?.name === "physiotherapist"
                            ? "/therapist-bookings"
                            : "/bookings"
                        }
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2"
                      >
                        <Calendar className="h-4 w-4" />
                        <span>
                          {user.role?.name === "physiotherapist"
                            ? "My Appointments"
                            : "My Bookings"}
                        </span>
                      </a>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 flex items-center space-x-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <a
                  href="/login"
                  className="text-gray-700 hover:text-[#7ce3b1] px-4 py-2 font-medium transition-colors duration-200"
                >
                  Sign In
                </a>
                <a
                  href="/signup"
                  className="bg-[#7ce3b1] hover:bg-[#6dd4a2] text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  Book Now
                </a>
              </>
            )}
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
                href="/find-therapis"
                className="text-gray-700 hover:text-[#7ce3b1] font-medium py-2 transition-colors duration-200"
              >
                Find Therapists
              </a>
              <a
                href="/services"
                className="text-gray-700 hover:text-[#7ce3b1] font-medium py-2 transition-colors duration-200"
              >
                Services
              </a>
              <a
                href="/about"
                className="text-gray-700 hover:text-[#7ce3b1] font-medium py-2 transition-colors duration-200"
              >
                About
              </a>
              <a
                href="/contact"
                className="text-gray-700 hover:text-[#7ce3b1] font-medium py-2 transition-colors duration-200"
              >
                Contact
              </a>

              {/* Mobile Auth Section */}
              <div className="pt-4 border-t border-gray-100">
                {user ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 px-2 py-2">
                      <div className="w-12 h-12 bg-[#7ce3b1] rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">
                          {user.firstName?.charAt(0)?.toUpperCase()}
                          {user.lastName?.charAt(0)?.toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{`${user.firstName} ${user.lastName}`}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                        {user.role && (
                          <p className="text-xs text-gray-400 capitalize">
                            {user.role.name}
                          </p>
                        )}
                      </div>
                    </div>
                    {user.role?.name !== "Admin" && (
                      <a
                        href={
                          user.role?.name === "physiotherapist"
                            ? "/therapist-bookings"
                            : "/bookings"
                        }
                        className="w-full text-left text-gray-700 hover:text-gray-900 font-medium py-2 px-2 transition-colors duration-200 flex items-center space-x-2"
                      >
                        <Calendar className="h-4 w-4" />
                        <span>
                          {user.role?.name === "physiotherapist"
                            ? "My Appointments"
                            : "My Bookings"}
                        </span>
                      </a>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left text-red-600 hover:text-red-700 font-medium py-2 px-2 transition-colors duration-200 flex items-center space-x-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <a
                      href="/login"
                      className="text-gray-700 hover:text-[#7ce3b1] px-4 py-2 font-medium text-left transition-colors duration-200"
                    >
                      Sign In
                    </a>
                    <a
                      href="/signup"
                      className="bg-[#7ce3b1] hover:bg-[#6dd4a2] text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 text-center"
                    >
                      Book Now
                    </a>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
