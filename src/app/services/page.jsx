"use client";
import { useState, useEffect } from "react";
import { getSpecializations } from "../../lib/services/specialization";
import { Stethoscope, Heart, Users, Star, Calendar, X } from "lucide-react";

const SpecializationsPage = () => {
  const [specializations, setSpecializations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        setLoading(true);
        const response = await getSpecializations();
        
        if (response.success) {
          setSpecializations(response.data);
        } else {
          setError(response.message || "Failed to fetch specializations");
        }
      } catch (err) {
        console.error("Error fetching specializations:", err);
        setError("An error occurred while fetching specializations");
      } finally {
        setLoading(false);
      }
    };

    fetchSpecializations();
  }, []);

  // Calendar helper functions
  const formatServiceName = (name) => {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handleBookClick = (service) => {
    setSelectedService(service);
    setShowCalendar(true);
  };

  const handleDateClick = (day) => {
    const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const formattedService = formatServiceName(selectedService.name);
    const formattedDate = formatDate(selectedDate);
    const url = `/find/${formattedService}/dublin/${formattedDate}`;
    window.location.href = url;
  };

  const navigateMonth = (direction) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const today = new Date();
    const days = [];
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isToday = date.toDateString() === today.toDateString();
      const isPast = date < today && !isToday;
      
      days.push(
        <button
          key={day}
          onClick={() => !isPast && handleDateClick(day)}
          disabled={isPast}
          className={`h-10 w-10 rounded-lg text-sm font-medium transition-all duration-200 ${
            isPast
              ? 'text-gray-300 cursor-not-allowed'
              : isToday
              ? 'bg-[#7ce3b1] text-white shadow-md'
              : 'text-gray-700 hover:bg-[#7ce3b1]/20 hover:text-[#5eb893]'
          }`}
        >
          {day}
        </button>
      );
    }

    return (
      <div className="bg-white rounded-xl p-6 shadow-xl max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">
            Select Date for {selectedService?.name}
          </h3>
          <button
            onClick={() => setShowCalendar(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            ←
          </button>
          <h4 className="text-lg font-semibold text-gray-800">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h4>
          <button
            onClick={() => navigateMonth(1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            →
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="h-8 flex items-center justify-center text-xs font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days}
        </div>

        <div className="mt-4 text-xs text-gray-500 text-center">
          Click on a date to book your appointment
        </div>
      </div>
    );
  };

  return (
    <>
      <section className="relative bg-gradient-to-br from-[#7ce3b1]/10 via-white to-[#7ce3b1]/5 min-h-screen py-20 px-4 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{
          backgroundImage: "url('/bone.png')",
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center space-y-6 mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-[#7ce3b1]/20 px-4 py-2 rounded-full">
            <Stethoscope className="h-5 w-5 text-[#7ce3b1]" />
            <span className="text-[#5eb893] font-medium">Our Specializations</span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight animate-slide-in-left">
            Expert Care in
            <span className="text-[#7ce3b1] block animate-bounce-subtle">
              Every Specialty
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto animate-fade-in delay-300">
            Discover our comprehensive range of physiotherapy specializations. 
            Each treatment area is designed to provide targeted care for your specific needs.
          </p>

          <div className="flex flex-wrap justify-center gap-8 pt-4">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-[#7ce3b1]" />
              <span className="text-gray-700 font-medium">Personalized Care</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-[#6dd4a2]" />
              <span className="text-gray-700 font-medium">Expert Therapists</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-[#5eb893]" />
              <span className="text-gray-700 font-medium">Proven Results</span>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#7ce3b1]"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center max-w-md mx-auto">
            <div className="text-red-600 font-semibold mb-2">Error Loading Specializations</div>
            <p className="text-red-500">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-300"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Specializations Grid - Optimized for 7 services */}
        {!loading && !error && (
          <div className="space-y-8 animate-fade-in delay-500">
            {/* First row - 3 cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {specializations.slice(0, 3).map((spec, index) => (
                <div
                  key={spec.id}
                  className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 border hover:border-[#7ce3b1]/50 transition-all duration-500 hover:scale-105 group animate-slide-in-up w-full max-w-sm"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Card Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#7ce3b1]/20 to-[#7ce3b1]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col">
                    <div className="flex-grow space-y-4">
                      {/* Icon/Number */}
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#7ce3b1] to-[#6dd4a2] text-white rounded-xl font-bold text-lg shadow-lg">
                        {index + 1}
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#5eb893] transition-colors duration-300">
                        {spec.name}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-gray-600 leading-relaxed">
                        {spec.description || "Specialized physiotherapy treatment designed to help you recover and improve your quality of life."}
                      </p>
                    </div>
                    
                    {/* CTA Button */}
                    <button 
                      onClick={() => handleBookClick(spec)}
                      className="w-full bg-gradient-to-r from-[#7ce3b1] to-[#6dd4a2] hover:from-[#6dd4a2] hover:to-[#5eb893] text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 mt-4"
                    >
                      Book Now
                    </button>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -top-2 -right-2 w-16 h-16 bg-[#7ce3b1]/30 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                  <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-[#7ce3b1]/20 rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>

            {/* Second row - 3 cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {specializations.slice(3, 6).map((spec, index) => (
                <div
                  key={spec.id}
                  className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 border hover:border-[#7ce3b1]/50 transition-all duration-500 hover:scale-105 group animate-slide-in-up w-full max-w-sm"
                  style={{ animationDelay: `${(index + 3) * 100}ms` }}
                >
                  {/* Card Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#7ce3b1]/20 to-[#7ce3b1]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col">
                    <div className="flex-grow space-y-4">
                      {/* Icon/Number */}
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#7ce3b1] to-[#6dd4a2] text-white rounded-xl font-bold text-lg shadow-lg">
                        {index + 4}
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#5eb893] transition-colors duration-300">
                        {spec.name}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-gray-600 leading-relaxed">
                        {spec.description || "Specialized physiotherapy treatment designed to help you recover and improve your quality of life."}
                      </p>
                    </div>
                    
                    {/* CTA Button */}
                    <button 
                      onClick={() => handleBookClick(spec)}
                      className="w-full bg-gradient-to-r from-[#7ce3b1] to-[#6dd4a2] hover:from-[#6dd4a2] hover:to-[#5eb893] text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 mt-4"
                    >
                      Book Now
                    </button>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -top-2 -right-2 w-16 h-16 bg-[#7ce3b1]/30 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                  <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-[#7ce3b1]/20 rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>

            {/* Third row - 1 centered card */}
            {specializations.length === 7 && (
              <div className="flex justify-center">
                <div
                  className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 border hover:border-[#7ce3b1]/50 transition-all duration-500 hover:scale-105 group animate-slide-in-up w-full max-w-sm"
                  style={{ animationDelay: '600ms' }}
                >
                  {/* Card Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#7ce3b1]/20 to-[#7ce3b1]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col">
                    <div className="flex-grow space-y-4">
                      {/* Icon/Number */}
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#7ce3b1] to-[#6dd4a2] text-white rounded-xl font-bold text-lg shadow-lg">
                        7
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#5eb893] transition-colors duration-300">
                        {specializations[6].name}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-gray-600 leading-relaxed">
                        {specializations[6].description || "Specialized physiotherapy treatment designed to help you recover and improve your quality of life."}
                      </p>
                    </div>
                    
                    {/* CTA Button */}
                    <button 
                      onClick={() => handleBookClick(specializations[6])}
                      className="w-full bg-gradient-to-r from-[#7ce3b1] to-[#6dd4a2] hover:from-[#6dd4a2] hover:to-[#5eb893] text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 mt-4"
                    >
                      Book Now
                    </button>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -top-2 -right-2 w-16 h-16 bg-[#7ce3b1]/30 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                  <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-[#7ce3b1]/20 rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && specializations.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
              <Stethoscope className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-700 mb-2">No Specializations Available</h3>
              <p className="text-gray-500">
                We're currently updating our specializations. Please check back soon.
              </p>
            </div>
          </div>
        )}

        {/* Bottom CTA Section */}
        {!loading && !error && specializations.length > 0 && (
          <div className="mt-20 text-center space-y-6 animate-fade-in delay-700">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-[#7ce3b1]/30 shadow-lg max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to Start Your Recovery Journey?
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                Book an appointment with our certified physiotherapists and get personalized treatment plans.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-[#7ce3b1] to-[#6dd4a2] hover:from-[#6dd4a2] hover:to-[#5eb893] text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  Book Appointment Now
                </button>
                <button className="border-2 border-[#7ce3b1] text-[#5eb893] hover:bg-[#7ce3b1]/10 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105">
                  Find Therapists
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Animation Elements */}
      <div className="absolute top-20 right-10 w-20 h-20 bg-[#7ce3b1]/40 rounded-full opacity-40 animate-float"></div>
      <div className="absolute bottom-20 left-10 w-24 h-24 bg-[#7ce3b1]/30 rounded-full opacity-30 animate-float-delayed"></div>
      <div className="absolute top-1/2 right-20 w-16 h-16 bg-[#7ce3b1]/50 rounded-full opacity-50 animate-float"></div>
    </section>

    {/* Calendar Modal */}
    {showCalendar && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="relative">
          {renderCalendar()}
        </div>
      </div>
    )}
    </>
  );
};

export default SpecializationsPage;
