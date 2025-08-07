import { Phone, Mail } from "lucide-react";
import { getSpecializationIdByName } from "@/lib/actions/booking";
export default function TherapistCard({ therapist }) {
  return (
    <div className="bg-white border border-emerald-100 p-6 rounded-2xl shadow-md space-y-4 w-full max-w-lg mx-auto">
      {/* Header Row */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <img
            src={therapist.image}
            alt={therapist.name}
            className="w-14 h-14 rounded-full object-cover border border-gray-200"
          />
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              {therapist.name}
            </h3>
            <p className="text-sm text-emerald-600 font-medium">
              {therapist.specialization}
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-emerald-600 text-lg font-semibold">
            €{therapist.price}
          </p>
          <p className="text-xs text-gray-400">per session</p>
        </div>
      </div>

      {/* Rating + Experience */}
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <span>⭐ {therapist.rating} ({therapist.reviews} reviews)</span>
        <span>•</span>
        <span>{therapist.experience} years</span>
      </div>

      {/* Qualifications */}
      <div className="space-x-2 flex flex-wrap">
        {therapist.qualifications?.length ? (
          therapist.qualifications.map((q, i) => (
            <span
              key={i}
              className="bg-emerald-50 text-emerald-600 text-xs font-medium px-2 py-1 rounded-full"
            >
              {q}
            </span>
          ))
        ) : (
          <span className="bg-emerald-50 text-emerald-600 text-xs font-medium px-2 py-1 rounded-full">
            BSc Physiotherapy, Sports Massage Specialist
          </span>
        )}
      </div>

      {/* Available Slots */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-1">Available Slots</p>
        <div className="flex flex-wrap gap-2">
          {(therapist.availableSlots || ["09:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"]).map((slot, i) => (
            <button
              key={i}
              className="border border-emerald-500 text-emerald-600 text-sm px-3 py-1 rounded-md hover:bg-emerald-50"
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 mt-4">
        <button  className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold py-2 rounded-md">
          Book Appointment
        </button>

        {/* Phone Icon Link */}
        {therapist.phone && (
          <a
            href={`tel:${therapist.phone}`}
            className="border border-emerald-500 text-emerald-500 p-2 rounded-md hover:bg-emerald-50"
            title={`Call ${therapist.name}`}
          >
            <Phone size={18} />
          </a>
        )}

        {/* Email Icon Link */}
        {therapist.email && (
          <a
            href={`mailto:${therapist.email}`}
            className="border border-emerald-500 text-emerald-500 p-2 rounded-md hover:bg-emerald-50"
            title={`Email ${therapist.name}`}
          >
            <Mail size={18} />
          </a>
        )}
      </div>
    </div>
  );
}
