"use client";

import React, { useState, useEffect, useRef } from "react";
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
  ChevronDown,
  Sparkles,
} from "lucide-react";

const AboutUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isVisible, setIsVisible] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const heroRef = useRef(null);

  // Mouse tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.1 },
    );

    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Form submitted:", formData);
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Compassionate Care",
      description:
        "We connect patients with physiotherapists who prioritize empathetic, patient-centered care and healing.",
      color: "from-pink-400 to-red-400",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Trust & Safety",
      description:
        "All our physiotherapists are verified, licensed professionals committed to maintaining the highest safety standards.",
      color: "from-blue-400 to-indigo-400",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Convenience",
      description:
        "Book appointments 24/7 with flexible scheduling options that fit your lifestyle and recovery needs.",
      color: "from-purple-400 to-pink-400",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Excellence",
      description:
        "We partner only with certified physiotherapists who demonstrate exceptional skills and commitment to patient outcomes.",
      color: "from-yellow-400 to-orange-400",
    },
  ];

  const FloatingElements = () => {
    const positions = [
      { left: 20, top: 30 },
      { left: 35, top: 50 },
      { left: 50, top: 70 },
      { left: 65, top: 40 },
      { left: 80, top: 60 },
      { left: 95, top: 35 },
    ];

    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {positions.map((pos, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-[#7ce3b1] rounded-full opacity-30 animate-pulse"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              animationDelay: `${i * 0.5}s`,
              transform: `translate(${mousePosition.x * (i + 1) * 2}px, ${mousePosition.y * (i + 1) * 2}px)`,
              transition: "transform 0.3s ease-out",
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#7ce3b1]/20 via-transparent to-[#7ce3b1]/10"></div>
        {[...Array(20)].map((_, i) => {
          // Create deterministic values based on index
          const positions = [
            { left: 10, top: 20 },
            { left: 85, top: 15 },
            { left: 25, top: 80 },
            { left: 70, top: 25 },
            { left: 45, top: 60 },
            { left: 15, top: 75 },
            { left: 90, top: 45 },
            { left: 35, top: 30 },
            { left: 60, top: 85 },
            { left: 20, top: 10 },
            { left: 75, top: 70 },
            { left: 5, top: 50 },
            { left: 95, top: 35 },
            { left: 50, top: 5 },
            { left: 30, top: 90 },
            { left: 80, top: 55 },
            { left: 65, top: 40 },
            { left: 40, top: 65 },
            { left: 55, top: 20 },
            { left: 25, top: 45 },
          ];
          const delays = [
            0, 0.5, 1, 1.5, 2, 2.5, 0.3, 0.8, 1.3, 1.8, 2.3, 0.2, 0.7, 1.2, 1.7,
            2.2, 0.4, 0.9, 1.4, 1.9,
          ];
          const durations = [
            2, 3, 2.5, 3.5, 2.2, 2.8, 3.2, 2.6, 3.8, 2.4, 3.6, 2.1, 2.9, 3.1,
            2.7, 3.3, 2.3, 3.7, 2.8, 3.4,
          ];

          return (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#7ce3b1] rounded-full animate-ping"
              style={{
                left: `${positions[i]?.left || 50}%`,
                top: `${positions[i]?.top || 50}%`,
                animationDelay: `${delays[i] || 0}s`,
                animationDuration: `${durations[i] || 2}s`,
              }}
            />
          );
        })}
      </div>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-[#7ce3b1]/10"
      >
        <FloatingElements />

        <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent"></div>

        <div className="relative container max-w-7xl mx-auto px-4 text-center">
          <div className="transform transition-all duration-1000 translate-y-0 opacity-100">
            <div className="mb-8 relative">
              <Sparkles
                className="w-12 h-12 text-[#7ce3b1] mx-auto mb-4 animate-spin"
                style={{ animationDuration: "3s" }}
              />
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#7ce3b1] rounded-full animate-bounce"></div>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold text-gray-800 mb-6 relative">
              About{" "}
              <span
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#7ce3b1] to-[#5dd498] animate-pulse"
                style={{
                  transform: `translateX(${mousePosition.x * 5}px) translateY(${mousePosition.y * 5}px)`,
                  transition: "transform 0.3s ease-out",
                }}
              >
                AbhailePhysiotherapy
              </span>
            </h1>

            <div className="w-32 h-1 bg-gradient-to-r from-[#7ce3b1] to-[#5dd498] mx-auto mb-6 transform scale-x-0 animate-pulse origin-left"></div>

            <p
              className="text-gray-600 text-xl max-w-3xl mx-auto mb-8 opacity-0 animate-pulse"
              style={{ animationDelay: "0.5s" }}
            >
              Connecting patients with trusted physiotherapists for personalized
              care and faster recovery
            </p>

            <div className="animate-bounce mt-12">
              <ChevronDown className="w-8 h-8 text-[#7ce3b1] mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section
        id="mission"
        data-animate
        className="py-20 bg-gradient-to-r from-gray-50 to-white border-t border-gray-200 relative"
      >
        <div className="container max-w-7xl mx-auto px-4">
          <div
            className={`max-w-4xl mx-auto text-center transform transition-all duration-1000 ${
              isVisible.mission
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4 relative">
              Our Mission
              <div className="absolute -top-4 -right-4 w-3 h-3 bg-[#7ce3b1] rounded-full animate-ping"></div>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-[#7ce3b1] to-[#5dd498] mx-auto mb-8 transform origin-left animate-pulse"></div>

            <div className="bg-white rounded-3xl p-10 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#7ce3b1]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-4 right-4 w-8 h-8 border-2 border-[#7ce3b1] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-spin"></div>

              <p className="text-gray-700 text-lg leading-relaxed relative z-10">
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
      <section id="vision" data-animate className="py-20 bg-white relative">
        <div className="container max-w-7xl mx-auto px-4">
          <div
            className={`max-w-4xl mx-auto text-center transform transition-all duration-1000 delay-200 ${
              isVisible.vision
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4 relative">
              Our Vision
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-gradient-to-r from-[#7ce3b1] to-[#5dd498] rounded-full animate-bounce"></div>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-[#5dd498] to-[#7ce3b1] mx-auto mb-8 animate-pulse"></div>

            <div className="bg-gradient-to-br from-gray-50 to-[#7ce3b1]/5 rounded-3xl p-10 border border-gray-200 hover:border-[#7ce3b1] transition-all duration-500 transform hover:scale-105 relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-[#7ce3b1]/10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>

              <p className="text-gray-700 text-lg leading-relaxed relative z-10">
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

      {/* Values Section */}
      <section
        id="values"
        data-animate
        className="py-20 bg-gradient-to-br from-gray-50 to-white border-t border-gray-200"
      >
        <div className="container max-w-7xl mx-auto px-4">
          <div
            className={`text-center mb-16 transform transition-all duration-1000 ${
              isVisible.values
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
              Our Values
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-[#7ce3b1] to-[#5dd498] mx-auto mb-6 animate-pulse"></div>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              These core values guide our commitment to transforming
              physiotherapy care delivery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className={`group transform transition-all duration-700 ${
                  isVisible.values
                    ? "translate-y-0 opacity-100"
                    : "translate-y-20 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="bg-white rounded-3xl p-8 border border-gray-200 hover:border-[#7ce3b1] transition-all duration-500 hover:shadow-xl h-full relative overflow-hidden group-hover:-translate-y-4">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  ></div>

                  <div className="flex flex-col items-center text-center relative z-10">
                    <div className="relative mb-6">
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${value.color} rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500`}
                      ></div>
                      <div className="text-[#7ce3b1] group-hover:scale-110 transition-transform duration-300 relative z-10 p-4">
                        {value.icon}
                      </div>
                    </div>

                    <h3 className="text-gray-800 font-bold text-xl mb-4 group-hover:text-[#7ce3b1] transition-colors duration-300">
                      {value.title}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>

                  <div className="absolute bottom-4 right-4 w-6 h-6 border-2 border-[#7ce3b1] rounded-full opacity-0 group-hover:opacity-100 group-hover:rotate-180 transition-all duration-500"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section id="founder" data-animate className="py-20 bg-white relative">
        <div className="container max-w-7xl mx-auto px-4">
          <div
            className={`text-center mb-16 transform transition-all duration-1000 ${
              isVisible.founder
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
              Our Founder
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-[#7ce3b1] to-[#5dd498] mx-auto mb-6 animate-pulse"></div>
          </div>

          <div
            className={`max-w-4xl mx-auto transform transition-all duration-1000 delay-300 ${
              isVisible.founder
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
          >
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-10 border border-gray-200 hover:shadow-xl transition-all duration-500 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#7ce3b1] to-[#5dd498] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>

              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10">
                <div className="flex-shrink-0 relative">
                  <div className="relative group/avatar">
                    <div className="w-56 h-56 bg-gradient-to-br from-[#7ce3b1] to-[#5dd498] rounded-3xl flex items-center justify-center transform group-hover/avatar:rotate-3 transition-transform duration-500 relative overflow-hidden">
                      <div className="absolute inset-0 bg-white/10 group-hover/avatar:bg-white/20 transition-colors duration-500"></div>
                      <User className="w-28 h-28 text-white relative z-10" />

                      <div className="absolute -top-4 -right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center group-hover/avatar:animate-bounce">
                        <Sparkles className="w-4 h-4 text-[#7ce3b1]" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 text-center lg:text-left space-y-6">
                  <div>
                    <h3 className="text-4xl font-bold text-gray-800 mb-2 group-hover:text-[#7ce3b1] transition-colors duration-300">
                      Dr. Sarah Mitchell
                    </h3>
                    <p className="text-[#7ce3b1] font-semibold text-lg mb-1">
                      Founder & CEO, Registered Physiotherapist
                    </p>
                    <div className="flex justify-center lg:justify-start items-center gap-2 mb-6 group/linkedin">
                      <Linkedin className="w-5 h-5 text-[#7ce3b1] group-hover/linkedin:animate-bounce" />
                      <a
                        href="#"
                        className="text-[#7ce3b1] hover:text-[#5dd498] transition-colors relative group/link"
                      >
                        linkedin.com/in/drsarahmitchell
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#5dd498] group-hover/link:w-full transition-all duration-300"></div>
                      </a>
                    </div>
                  </div>

                  <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                    <p className="transform hover:translate-x-2 transition-transform duration-300">
                      Dr. Sarah Mitchell is a licensed physiotherapist with over
                      12 years of clinical experience specializing in sports
                      rehabilitation and chronic pain management. She founded
                      AbhailePhysiotherapy after experiencing firsthand the
                      challenges patients face when trying to access timely,
                      quality physiotherapy care.
                    </p>

                    <p className="transform hover:translate-x-2 transition-transform duration-300 delay-100">
                      Sarah holds a Doctor of Physical Therapy from the
                      University of Toronto and is certified in manual therapy
                      and dry needling techniques. Her passion for combining
                      technology with compassionate care drives
                      AbhailePhysiotherapy's mission to make physiotherapy more
                      accessible and effective for all patients.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        data-animate
        className="py-20 bg-gradient-to-br from-gray-50 to-white border-t border-gray-200"
      >
        <div className="container max-w-7xl mx-auto px-4">
          <div
            className={`text-center mb-16 transform transition-all duration-1000 ${
              isVisible.contact
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
              Contact Us
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-[#7ce3b1] to-[#5dd498] mx-auto mb-6 animate-pulse"></div>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Have questions about our platform? Need support with booking?
              We're here to help.
            </p>
          </div>

          <div
            className={`max-w-5xl mx-auto transform transition-all duration-1000 delay-300 ${
              isVisible.contact
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#7ce3b1]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <h3 className="text-3xl font-bold text-gray-800 mb-8 relative z-10">
                    Get In Touch
                  </h3>

                  <div className="space-y-6 relative z-10">
                    {[
                      {
                        icon: Mail,
                        label: "Email",
                        value: "info@abhailephysiotherapy.com",
                        color: "from-blue-400 to-cyan-400",
                      },
                      {
                        icon: Phone,
                        label: "Phone",
                        value: "1-800-ABHAILE (864-7479)",
                        color: "from-green-400 to-emerald-400",
                      },
                      {
                        icon: MapPin,
                        label: "Address",
                        value: "Dublin, Ireland | Available Nationwide",
                        color: "from-purple-400 to-pink-400",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 group/item transform hover:translate-x-2 transition-all duration-300"
                      >
                        <div
                          className={`w-14 h-14 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300 relative overflow-hidden`}
                        >
                          <div className="absolute inset-0 bg-white/20 group-hover/item:bg-white/30 transition-colors duration-300"></div>
                          <item.icon className="w-6 h-6 text-white relative z-10" />
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm font-medium">
                            {item.label}
                          </p>
                          <p className="text-gray-800 font-semibold">
                            {item.value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#7ce3b1]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="space-y-6 relative z-10">
                  {[
                    {
                      name: "name",
                      label: "Full Name",
                      type: "text",
                      placeholder: "Enter your full name",
                    },
                    {
                      name: "email",
                      label: "Email Address",
                      type: "email",
                      placeholder: "Enter your email address",
                    },
                    {
                      name: "subject",
                      label: "Subject",
                      type: "text",
                      placeholder: "Enter message subject",
                    },
                  ].map((field, index) => (
                    <div key={field.name} className="group/field">
                      <label className="block text-gray-800 font-semibold mb-2 group-focus-within/field:text-[#7ce3b1] transition-colors duration-300">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#7ce3b1] focus:bg-white transition-all duration-300 transform focus:scale-105"
                        placeholder={field.placeholder}
                        style={{ transitionDelay: `${index * 100}ms` }}
                      />
                    </div>
                  ))}

                  <div className="group/field">
                    <label className="block text-gray-800 font-semibold mb-2 group-focus-within/field:text-[#7ce3b1] transition-colors duration-300">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#7ce3b1] focus:bg-white transition-all duration-300 resize-none transform focus:scale-105"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#7ce3b1] to-[#5dd498] hover:from-[#5dd498] hover:to-[#7ce3b1] text-white font-bold py-4 px-8 rounded-xl transition-all duration-500 flex items-center justify-center gap-3 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group/button"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/button:translate-x-[100%] transition-transform duration-700"></div>

                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 group-hover/button:translate-x-1 transition-transform duration-300" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-[#7ce3b1] to-[#5dd498] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group z-50"
      >
        <ChevronDown className="w-6 h-6 rotate-180 group-hover:-translate-y-1 transition-transform duration-300" />
      </button>
    </div>
  );
};

export default AboutUsPage;
