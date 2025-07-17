"use client";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Phone,
  Mail,
  MapPin,
  Shield,
  Award,
  Users,
  Clock,
  Globe,
  Heart,
  Star,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-800 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-24 h-24 rounded-lg flex items-center justify-center overflow-hidden">
                <img
                  src="/logo.png"
                  alt="UNIPHY Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed max-w-md">
              Connecting patients with qualified physiotherapists for better
              health outcomes and faster recovery. Trusted by over 50,000
              patients nationwide.
            </p>

            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="h-4 w-4" />
                <span>1-800-UNIPHY (864-7479)</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="h-4 w-4" />
                <span>support@uniphy.com</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>New York, NY | Available Nationwide</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4 pt-2">
              <Facebook className="h-5 w-5 text-gray-500 cursor-pointer hover:text-green-500 transition-colors duration-200" />
              <Twitter className="h-5 w-5 text-gray-500 cursor-pointer hover:text-green-500 transition-colors duration-200" />
              <Instagram className="h-5 w-5 text-gray-500 cursor-pointer hover:text-green-500 transition-colors duration-200" />
              <Linkedin className="h-5 w-5 text-gray-500 cursor-pointer hover:text-green-500 transition-colors duration-200" />
            </div>
          </div>

          {/* For Patients */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              For Patients
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a
                  href="#"
                  className="hover:text-green-500 transition-colors duration-200"
                >
                  Find Therapists
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-green-500 transition-colors duration-200"
                >
                  Book Appointment
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-green-500 transition-colors duration-200"
                >
                  Treatment Areas
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-green-500 transition-colors duration-200"
                >
                  Insurance Coverage
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-green-500 transition-colors duration-200"
                >
                  Patient Portal
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-green-500 transition-colors duration-200"
                >
                  Health Resources
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-green-500 transition-colors duration-200"
                >
                  Patient Reviews
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-green-500 transition-colors duration-200"
                >
                  Mobile App
                </a>
              </li>
            </ul>
          </div>

          {/* For Therapists */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              For Therapists
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a
                  href="#"
                  className="hover:text-green-500 transition-colors duration-200"
                >
                  Join Our Network
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-green-500 transition-colors duration-200"
                >
                  Therapist Portal
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-green-500 transition-colors duration-200"
                >
                  Professional Resources
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-green-500 transition-colors duration-200"
                >
                  Continuing Education
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-green-500 transition-colors duration-200"
                >
                  Practice Management
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-green-500 transition-colors duration-200"
                >
                  Payment & Billing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-green-500 transition-colors duration-200"
                >
                  Support Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-green-500 transition-colors duration-200"
                >
                  Referral Program
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              Company
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a
                  href="#"
                  className="hover:text-green-500 transition-colors duration-200"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-green-500 transition-colors duration-200"
                >
                  Our Mission
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-green-500 transition-colors duration-200"
                >
                  Leadership Team
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-green-500 transition-colors duration-200"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-green-500 transition-colors duration-200"
                >
                  Press & Media
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-green-500 transition-colors duration-200"
                >
                  Investor Relations
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-green-500 transition-colors duration-200"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-green-500 transition-colors duration-200"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold mb-3 text-gray-900">Resources</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>
                  <a
                    href="#"
                    className="hover:text-green-500 transition-colors duration-200"
                  >
                    Exercise Library
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-green-500 transition-colors duration-200"
                  >
                    Recovery Guides
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-green-500 transition-colors duration-200"
                  >
                    Wellness Tips
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-green-500 transition-colors duration-200"
                  >
                    Research & Studies
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-gray-900">Specialties</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>
                  <a
                    href="#"
                    className="hover:text-green-500 transition-colors duration-200"
                  >
                    Sports Medicine
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-green-500 transition-colors duration-200"
                  >
                    Orthopedic Care
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-green-500 transition-colors duration-200"
                  >
                    Neurological Rehab
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-green-500 transition-colors duration-200"
                  >
                    Pediatric Therapy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-gray-900">Legal</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>
                  <a
                    href="#"
                    className="hover:text-green-500 transition-colors duration-200"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-green-500 transition-colors duration-200"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-green-500 transition-colors duration-200"
                  >
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-green-500 transition-colors duration-200"
                  >
                    Accessibility
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>&copy; 2024 UNIPHY. All rights reserved.</span>
              <div className="flex items-center space-x-1">
                <Globe className="h-4 w-4" />
                <span>English (US)</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <Star className="h-4 w-4 text-yellow-400" />
                <span>4.9/5 Patient Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
