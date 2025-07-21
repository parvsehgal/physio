"use client";
import React, { useState, useEffect, use } from "react";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Star,
  Award,
  Phone,
  Mail,
  ArrowLeft,
} from "lucide-react";
import Footer from "@/app/components/footer";
import Header from "@/app/components/header";
import { getPhysiotherapistsByLocationAndSpecialization, debugDatabaseContents } from "@/lib/actions/physiotherapist";

const PhysiotherapyBookingPage = ({ params }) => {
  // Unwrap params using React.use()
  const unwrappedParams = use(params);
  const { slug } = unwrappedParams;
  const [service, location, date] = slug || [];

  // Convert URL-friendly service name to display name
  const formatServiceName = (serviceName) => {
    if (!serviceName) return "Service";

    // Convert kebab-case to Title Case
    return serviceName
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Convert display name back to key for serviceDescriptions lookup
  const getServiceKey = (serviceName) => {
    if (!serviceName) return "Geriatric Physiotherapy";

    const formattedName = formatServiceName(serviceName);

    // Map URL service names to our service description keys
    const serviceMap = {
      "Post Surgical Rehabilitation": "Post Surgical Rehabilitation",
      "Geriatric Physiotherapy": "Geriatric Physiotherapy",
      "Sports Massage": "Sports Massage",
      "Sports Injuries And Rehabilitation":
        "Sports Injuries and Rehabilitation",
      "Musculoskeletal Physiotherapy": "Musculoskeletal Physiotherapy",
      "Pediatric Physiotherapy": "Pediatric Physiotherapy",
      "Womens Health": "Women's Health",
    };

    return serviceMap[formattedName] || "Geriatric Physiotherapy";
  };

  // Set state based on URL params
  const [selectedService, setSelectedService] = useState(
    getServiceKey(service),
  );
  const [selectedLocation, setSelectedLocation] = useState(
    location ? location.charAt(0).toUpperCase() + location.slice(1) : "Dublin",
  );
  const [selectedDate, setSelectedDate] = useState(date || "2025-07-20");
  const [physiotherapists, setPhysiotherapists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Update state when params change
  useEffect(() => {
    if (service) setSelectedService(getServiceKey(service));
    if (location)
      setSelectedLocation(location.charAt(0).toUpperCase() + location.slice(1));
    if (date) setSelectedDate(date);
  }, [service, location, date]);

  // Fetch physiotherapists when service or location changes
  useEffect(() => {
    const fetchPhysiotherapists = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Debug: Check what's in the database
        const debugInfo = await debugDatabaseContents();
        console.log('Debug info:', debugInfo);
        
        const result = await getPhysiotherapistsByLocationAndSpecialization(
          selectedLocation,
          selectedService
        );
        
        if (result.success) {
          setPhysiotherapists(result.data);
        } else {
          setError(result.error);
          setPhysiotherapists([]);
        }
      } catch (err) {
        setError('Failed to fetch physiotherapists');
        setPhysiotherapists([]);
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPhysiotherapists();
  }, [selectedService, selectedLocation]);

  // Service descriptions
  const serviceDescriptions = {
    "Geriatric Physiotherapy": {
      title: "Geriatric Physiotherapy",
      description:
        "Specialized care for older adults focusing on mobility, balance, and maintaining independence. Our geriatric physiotherapists help manage age-related conditions and improve quality of life.",
      benefits: [
        "Improved balance and fall prevention",
        "Enhanced mobility and strength",
        "Pain management",
        "Post-surgery rehabilitation",
        "Chronic condition management",
      ],
      icon: "👴",
    },
    "Post Surgical Rehabilitation": {
      title: "Post Surgical Rehabilitation",
      description:
        "Comprehensive recovery programs designed to restore function and mobility after surgery. Our specialized approach ensures safe and effective healing.",
      benefits: [
        "Faster recovery times",
        "Reduced pain and swelling",
        "Improved range of motion",
        "Scar tissue management",
        "Strength restoration",
      ],
      icon: "🏥",
    },
    "Sports Massage": {
      title: "Sports Massage",
      description:
        "Therapeutic massage techniques specifically designed for athletes and active individuals to enhance performance and aid recovery.",
      benefits: [
        "Enhanced athletic performance",
        "Faster muscle recovery",
        "Injury prevention",
        "Improved flexibility",
        "Stress relief",
      ],
      icon: "💪",
    },
    "Sports Injuries and Rehabilitation": {
      title: "Sports Injuries and Rehabilitation",
      description:
        "Expert treatment for sports-related injuries with focus on returning athletes to their peak performance safely and effectively.",
      benefits: [
        "Quick return to sport",
        "Injury prevention strategies",
        "Performance optimization",
        "Biomechanical analysis",
        "Customized training programs",
      ],
      icon: "⚽",
    },
    "Musculoskeletal Physiotherapy": {
      title: "Musculoskeletal Physiotherapy",
      description:
        "Treatment for conditions affecting muscles, bones, joints, and connective tissues. Comprehensive care for both acute and chronic conditions.",
      benefits: [
        "Pain relief",
        "Improved joint mobility",
        "Muscle strengthening",
        "Posture correction",
        "Functional restoration",
      ],
      icon: "🦴",
    },
    "Pediatric Physiotherapy": {
      title: "Pediatric Physiotherapy",
      description:
        "Specialized care for children with developmental delays, injuries, or conditions affecting movement and physical development.",
      benefits: [
        "Developmental milestone support",
        "Improved motor skills",
        "Enhanced coordination",
        "Pain management",
        "Family education",
      ],
      icon: "👶",
    },
    "Women's Health": {
      title: "Women's Health Physiotherapy",
      description:
        "Specialized care addressing women's unique health needs including pelvic floor dysfunction, pregnancy-related issues, and postpartum recovery.",
      benefits: [
        "Pelvic floor rehabilitation",
        "Pregnancy support",
        "Postpartum recovery",
        "Incontinence treatment",
        "Core strengthening",
      ],
      icon: "👩",
    },
  };

  // Since we fetch filtered data from server, no client-side filtering needed
  const filteredPhysiotherapists = physiotherapists;

  const currentService =
    serviceDescriptions[selectedService] ||
    serviceDescriptions["Geriatric Physiotherapy"];

  // Format date for display
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Service Information Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{currentService.icon}</span>
                <h1 className="text-3xl font-bold text-gray-900">
                  {currentService.title}
                </h1>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {currentService.description}
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-emerald-600">
                  <Users className="h-5 w-5" />
                  <span className="font-medium">
                    {filteredPhysiotherapists.length} Available Therapists
                  </span>
                </div>
                <div className="flex items-center gap-2 text-emerald-600">
                  <Calendar className="h-5 w-5" />
                  <span className="font-medium">Flexible Booking</span>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Treatment Benefits
              </h3>
              <ul className="space-y-3">
                {currentService.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Available Physiotherapists Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Available Physiotherapists
          </h2>
          <p className="text-gray-600">
            Choose from our qualified professionals in {selectedLocation}
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
            <span className="ml-3 text-gray-600">Loading physiotherapists...</span>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Error Loading Data
            </h3>
            <p className="text-gray-600 mb-4">
              {error}
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Physiotherapists Grid */}
        {!loading && !error && (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredPhysiotherapists.map((therapist) => (
            <div
              key={therapist.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={therapist.image}
                    alt={therapist.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {therapist.name}
                    </h3>
                    <p className="text-emerald-600 font-medium">
                      {therapist.specialization}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">
                          {therapist.rating}
                        </span>
                        <span className="text-sm text-gray-500">
                          ({therapist.reviews} reviews)
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="h-4 w-4 text-emerald-500" />
                        <span className="text-sm text-gray-600">
                          {therapist.experience}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-emerald-600">
                      {therapist.price}
                    </div>
                    <div className="text-sm text-gray-500">per session</div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Qualifications
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {therapist.qualifications.map((qual, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full"
                        >
                          {qual}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Available Slots
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {therapist.availableSlots.map((slot, index) => (
                        <button
                          key={index}
                          className="px-3 py-1 border border-emerald-300 text-emerald-700 hover:bg-emerald-50 text-sm rounded-lg transition-colors"
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg font-semibold transition-colors">
                    Book Appointment
                  </button>
                  <button className="px-4 py-3 border border-emerald-300 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                    <Phone className="h-5 w-5" />
                  </button>
                  <button className="px-4 py-3 border border-emerald-300 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                    <Mail className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          </div>
        )}

        {/* No Results Message */}
        {!loading && !error && filteredPhysiotherapists.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">😔</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Physiotherapists Available
            </h3>
            <p className="text-gray-600 mb-4">
              We couldn't find any physiotherapists for {selectedService} in{" "}
              {selectedLocation}.
            </p>
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold">
              Search Different Options
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PhysiotherapyBookingPage;
