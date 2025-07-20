"use client";
import { requireAuth } from "@/lib/auth";
import { Calendar, MapPin, Users } from "lucide-react";
import { useState } from "react";

const Hero = () => {
  const [selectedService, setSelectedService] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  // Function to handle navigation
  const handleFindPhysiotherapists = async () => {
    // Validate form fields
    const bool = await requireAuth();
    if (!selectedService || !selectedLocation || !selectedDate) {
      alert("Please fill in all fields before searching");
      return;
    }

    // Create URL-friendly slugs
    const serviceSlug = selectedService
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/'/g, "");
    const locationSlug = selectedLocation.toLowerCase();
    const dateSlug = selectedDate;

    // Construct the URL - format: /find/[service]/[location]/[date]
    const url = `/find/${serviceSlug}/${locationSlug}/${dateSlug}`;

    // Navigate to the URL
    window.location.href = url;
  };

  return (
    <section className="relative bg-gradient-to-br from-emerald-50 via-white to-green-50 py-20 px-4 overflow-hidden">
      {/* Background Image - Reduced size */}
      <div
        className="absolute inset-0 bg-contain bg-center bg-no-repeat opacity-10"
        style={{
          backgroundImage: "url('/green.png')",
          backgroundSize: "50%", // Reduced from cover to 50% of container
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Your Path to
                <span className="text-emerald-500 block">
                  Recovery Starts Here
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Book appointments with certified physiotherapists in your area.
                Get personalized treatment plans and recover faster with expert
                care.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-[#7ce3b1] hover:bg-emerald-600 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                Book Appointment
              </button>
              <button className="border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300">
                Find Therapists
              </button>
            </div>

            <div className="flex flex-wrap gap-8 pt-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-emerald-500" />
                <span className="text-gray-700 font-medium">
                  Easy Scheduling
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-emerald-600" />
                <span className="text-gray-700 font-medium">
                  Local Therapists
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-emerald-700" />
                <span className="text-gray-700 font-medium">Expert Care</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 border">
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Quick Booking
                  </h3>
                  <p className="text-gray-600">Schedule your appointment now</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Service
                    </label>
                    <select
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                    >
                      <option value="">Choose your service</option>
                      <option value="Geriatric Physiotherapy">
                        Geriatric Physiotherapy
                      </option>
                      <option value="Post Surgical Rehabilitation">
                        Post Surgical Rehabilitation
                      </option>
                      <option value="Sports Massage">Sports Massage</option>
                      <option value="Sports Injuries and Rehabilitation">
                        Sports Injuries and Rehabilitation
                      </option>
                      <option value="Musculoskeletal Physiotherapy">
                        Musculoskeletal Physiotherapy
                      </option>
                      <option value="Pediatric Physiotherapy">
                        Pediatric Physiotherapy
                      </option>
                      <option value="Women's Health">Women's Health</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Location
                    </label>
                    <select
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                    >
                      <option value="">Choose your location</option>
                      <option value="Dublin">Dublin</option>
                      <option value="Cork">Cork</option>
                      <option value="Galway">Galway</option>
                      <option value="Limerick">Limerick</option>
                      <option value="Waterford">Waterford</option>
                      <option value="Kilkenny">Kilkenny</option>
                      <option value="Drogheda">Drogheda</option>
                      <option value="Dundalk">Dundalk</option>
                      <option value="Bray">Bray</option>
                      <option value="Navan">Navan</option>
                      <option value="Ennis">Ennis</option>
                      <option value="Tralee">Tralee</option>
                      <option value="Carlow">Carlow</option>
                      <option value="Naas">Naas</option>
                      <option value="Athlone">Athlone</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]} // Prevent past dates
                    />
                  </div>

                  <button
                    onClick={handleFindPhysiotherapists}
                    className="w-full bg-gradient-to-r from-[#7ce3b1] to-[#6dd4a2] hover:from-[#6dd4a2] hover:to-[#5eb893] text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Find Available physiotherapists
                  </button>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 w-24 h-24 bg-emerald-200 rounded-full opacity-60"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-emerald-100 rounded-full opacity-40"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
