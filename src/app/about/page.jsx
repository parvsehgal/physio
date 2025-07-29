"use client";

import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  ArrowLeft,
  Linkedin,
  Send,
  User,
  MessageSquare,
  Heart,
  Shield,
  Clock,
  Award,
} from "lucide-react";

const AboutUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Compassionate Care",
      description:
        "We connect patients with physiotherapists who prioritize empathetic, patient-centered care and healing.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Trust & Safety",
      description:
        "All our physiotherapists are verified, licensed professionals committed to maintaining the highest safety standards.",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Convenience",
      description:
        "Book appointments 24/7 with flexible scheduling options that fit your lifestyle and recovery needs.",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Excellence",
      description:
        "We partner only with certified physiotherapists who demonstrate exceptional skills and commitment to patient outcomes.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-br from-gray-50 to-[#7ce3b1]/20">
        <div className="absolute inset-0 bg-white/60"></div>
        <div className="relative container max-w-7xl mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6">
              About <span className="text-[#7ce3b1]">AbhailePhysiotherapy</span>
            </h1>
            <div className="w-24 h-1 bg-[#7ce3b1] mx-auto mb-6"></div>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              Connecting patients with trusted physiotherapists for personalized
              care and faster recovery
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Our Mission
            </h2>
            <div className="w-24 h-1 bg-[#7ce3b1] mx-auto mb-8"></div>
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
              <p className="text-gray-700 text-lg leading-relaxed">
                At AbhailePhysiotherapy, our mission is to make quality
                physiotherapy accessible to everyone by connecting patients with
                skilled, licensed physiotherapists in their area. We believe
                that recovery shouldn't be delayed by complicated booking
                processes or limited availability. Through our innovative
                platform, we're bridging the gap between patients seeking care
                and physiotherapists ready to provide exceptional treatment and
                rehabilitation services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 bg-white">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Our Vision
            </h2>
            <div className="w-24 h-1 bg-[#7ce3b1] mx-auto mb-8"></div>
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <p className="text-gray-700 text-lg leading-relaxed">
                We envision a healthcare ecosystem where physiotherapy is easily
                accessible, personalized, and integrated into everyone's
                wellness journey. Our goal is to become the leading platform
                that empowers patients to take control of their recovery while
                enabling physiotherapists to focus on what they do best -
                healing and restoring mobility. Together, we're building a
                healthier, more active community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Our Values
            </h2>
            <div className="w-24 h-1 bg-[#7ce3b1] mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              These core values guide our commitment to transforming
              physiotherapy care delivery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#7ce3b1] transition-all duration-300 hover:shadow-lg h-full">
                  <div className="flex flex-col items-center text-center">
                    <div className="text-[#7ce3b1] mb-4 group-hover:scale-110 transition-transform duration-300">
                      {value.icon}
                    </div>
                    <h3 className="text-gray-800 font-semibold text-xl mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16 bg-white">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Our Founder
            </h2>
            <div className="w-24 h-1 bg-[#7ce3b1] mx-auto mb-6"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="w-48 h-48 bg-gradient-to-br from-[#7ce3b1] to-[#5dd498] rounded-2xl flex items-center justify-center">
                      <User className="w-24 h-24 text-white" />
                    </div>
                  </div>
                </div>

                <div className="flex-1 text-center lg:text-left">
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">
                    Dr. Sarah Mitchell
                  </h3>
                  <p className="text-[#7ce3b1] font-semibold text-lg mb-1">
                    Founder & CEO, Registered Physiotherapist
                  </p>
                  <div className="flex justify-center lg:justify-start items-center gap-2 mb-6">
                    <Linkedin className="w-5 h-5 text-[#7ce3b1]" />
                    <a
                      href="#"
                      className="text-[#7ce3b1] hover:text-[#5dd498] transition-colors"
                    >
                      linkedin.com/in/drsarahmitchell
                    </a>
                  </div>

                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    Dr. Sarah Mitchell is a licensed physiotherapist with over
                    12 years of clinical experience specializing in sports
                    rehabilitation and chronic pain management. She founded
                    AbhailePhysiotherapy after experiencing firsthand the
                    challenges patients face when trying to access timely,
                    quality physiotherapy care. Her vision was to create a
                    seamless platform that puts patient needs first while
                    supporting fellow healthcare professionals.
                  </p>

                  <p className="text-gray-700 text-lg leading-relaxed">
                    Sarah holds a Doctor of Physical Therapy from the University
                    of Toronto and is certified in manual therapy and dry
                    needling techniques. She has treated everyone from Olympic
                    athletes to elderly patients recovering from surgery. Her
                    passion for combining technology with compassionate care
                    rives AbhailePhysiotherapy's mission to make physiotherapy
                    more accessible and effective for all patients.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Form */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Contact Us
            </h2>
            <div className="w-24 h-1 bg-[#7ce3b1] mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Have questions about our platform? Need support with booking?
              We're here to help.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">
                    Get In Touch
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#7ce3b1]/20 rounded-lg flex items-center justify-center">
                        <Mail className="w-6 h-6 text-[#7ce3b1]" />
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Email</p>
                        <p className="text-gray-800">
                          info@abhailephysiotherapy.com
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#7ce3b1]/20 rounded-lg flex items-center justify-center">
                        <Phone className="w-6 h-6 text-[#7ce3b1]" />
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Phone</p>
                        <p className="text-gray-800">
                          1-800-ABHAILE (864-7479)
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#7ce3b1]/20 rounded-lg flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-[#7ce3b1]" />
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Address</p>
                        <p className="text-gray-800">
                          Dublin, Ireland | Available Nationwide
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <div className="space-y-6">
                  <div>
                    <div className="block text-gray-800 font-medium mb-2">
                      Full Name
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#7ce3b1] transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <div className="block text-gray-800 font-medium mb-2">
                      Email Address
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#7ce3b1] transition-colors"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <div className="block text-gray-800 font-medium mb-2">
                      Subject
                    </div>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#7ce3b1] transition-colors"
                      placeholder="Enter message subject"
                    />
                  </div>

                  <div>
                    <div className="block text-gray-800 font-medium mb-2">
                      Message
                    </div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#7ce3b1] transition-colors resize-none"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="w-full bg-[#7ce3b1] hover:bg-[#5dd498] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
