"use client"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-800 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/lovable-uploads/46507607-97de-4421-a4dd-bc355f184566.png" 
                alt="UNIPHY Logo" 
                className="h-10 w-10"
              />
              <span className="text-2xl font-bold text-gray-900">UNIPHY</span>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Connecting patients with qualified physiotherapists for better health outcomes and faster recovery.
            </p>
            <div className="flex space-x-4">
              <Facebook 
                className="h-5 w-5 text-gray-500 cursor-pointer transition-colors duration-200"
                onMouseEnter={(e) => e.target.style.color = '#7ce3b1'}
                onMouseLeave={(e) => e.target.style.color = ''}
              />
              <Twitter 
                className="h-5 w-5 text-gray-500 cursor-pointer transition-colors duration-200"
                onMouseEnter={(e) => e.target.style.color = '#7ce3b1'}
                onMouseLeave={(e) => e.target.style.color = ''}
              />
              <Instagram 
                className="h-5 w-5 text-gray-500 cursor-pointer transition-colors duration-200"
                onMouseEnter={(e) => e.target.style.color = '#7ce3b1'}
                onMouseLeave={(e) => e.target.style.color = ''}
              />
              <Linkedin 
                className="h-5 w-5 text-gray-500 cursor-pointer transition-colors duration-200"
                onMouseEnter={(e) => e.target.style.color = '#7ce3b1'}
                onMouseLeave={(e) => e.target.style.color = ''}
              />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">For Patients</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a 
                  href="#" 
                  className="transition-colors duration-200"
                  onMouseEnter={(e) => e.target.style.color = '#7ce3b1'}
                  onMouseLeave={(e) => e.target.style.color = ''}
                >
                  Find Therapists
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="transition-colors duration-200"
                  onMouseEnter={(e) => e.target.style.color = '#7ce3b1'}
                  onMouseLeave={(e) => e.target.style.color = ''}
                >
                  Book Appointment
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="transition-colors duration-200"
                  onMouseEnter={(e) => e.target.style.color = '#7ce3b1'}
                  onMouseLeave={(e) => e.target.style.color = ''}
                >
                  Treatment Areas
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="transition-colors duration-200"
                  onMouseEnter={(e) => e.target.style.color = '#7ce3b1'}
                  onMouseLeave={(e) => e.target.style.color = ''}
                >
                  Insurance
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">For Therapists</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a 
                  href="#" 
                  className="transition-colors duration-200"
                  onMouseEnter={(e) => e.target.style.color = '#7ce3b1'}
                  onMouseLeave={(e) => e.target.style.color = ''}
                >
                  Join Our Network
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="transition-colors duration-200"
                  onMouseEnter={(e) => e.target.style.color = '#7ce3b1'}
                  onMouseLeave={(e) => e.target.style.color = ''}
                >
                  Therapist Portal
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="transition-colors duration-200"
                  onMouseEnter={(e) => e.target.style.color = '#7ce3b1'}
                  onMouseLeave={(e) => e.target.style.color = ''}
                >
                  Resources
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="transition-colors duration-200"
                  onMouseEnter={(e) => e.target.style.color = '#7ce3b1'}
                  onMouseLeave={(e) => e.target.style.color = ''}
                >
                  Support
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Company</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a 
                  href="#" 
                  className="transition-colors duration-200"
                  onMouseEnter={(e) => e.target.style.color = '#7ce3b1'}
                  onMouseLeave={(e) => e.target.style.color = ''}
                >
                  About Us
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="transition-colors duration-200"
                  onMouseEnter={(e) => e.target.style.color = '#7ce3b1'}
                  onMouseLeave={(e) => e.target.style.color = ''}
                >
                  Careers
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="transition-colors duration-200"
                  onMouseEnter={(e) => e.target.style.color = '#7ce3b1'}
                  onMouseLeave={(e) => e.target.style.color = ''}
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="transition-colors duration-200"
                  onMouseEnter={(e) => e.target.style.color = '#7ce3b1'}
                  onMouseLeave={(e) => e.target.style.color = ''}
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-8 text-center text-gray-500">
          <p>&copy; 2024 UNIPHY. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
