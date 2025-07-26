'use client';

import { useState, useTransition } from 'react';
import { updatePhysiotherapistVerification, updatePhysiotherapistAvailability } from '../../../lib/actions/physiotherapist';

export default function TherapistDetailModal({ therapist, isOpen, onClose }) {
  const [isPending, startTransition] = useTransition();

  const handleVerificationToggle = async (currentStatus) => {
    startTransition(async () => {
      try {
        const result = await updatePhysiotherapistVerification(therapist.id, !currentStatus);
        if (result.success) {
          window.location.reload();
        } else {
          alert('Failed to update verification status');
        }
      } catch (error) {
        alert('Error updating verification status');
      }
    });
  };

  const handleAvailabilityToggle = async (currentStatus) => {
    startTransition(async () => {
      try {
        const result = await updatePhysiotherapistAvailability(therapist.id, !currentStatus);
        if (result.success) {
          window.location.reload();
        } else {
          alert('Failed to update availability status');
        }
      } catch (error) {
        alert('Error updating availability status');
      }
    });
  };

  if (!isOpen || !therapist) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Therapist Profile Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Image and Basic Info */}
            <div className="lg:col-span-1">
              <div className="text-center">
                <img
                  src={therapist.profileImageUrl || '/profile.png'}
                  alt={therapist.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900">{therapist.name}</h3>
                <div className="mt-2 space-y-1">
                  <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                    therapist.isVerified 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {therapist.isVerified ? 'Verified' : 'Pending Verification'}
                  </span>
                  <br />
                  <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                    therapist.isAvailable 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {therapist.isAvailable ? 'Available' : 'Unavailable'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                <button
                  onClick={() => handleVerificationToggle(therapist.isVerified)}
                  disabled={isPending}
                  className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                    therapist.isVerified
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isPending ? 'Updating...' : therapist.isVerified ? 'Unverify Therapist' : 'Verify Therapist'}
                </button>
                <button
                  onClick={() => handleAvailabilityToggle(therapist.isAvailable)}
                  disabled={isPending}
                  className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                    therapist.isAvailable
                      ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isPending ? 'Updating...' : therapist.isAvailable ? 'Make Unavailable' : 'Make Available'}
                </button>
              </div>
            </div>

            {/* Detailed Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1 text-sm text-gray-900">{therapist.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <p className="mt-1 text-sm text-gray-900">{therapist.phone || 'Not provided'}</p>
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Professional Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Qualification</label>
                    <p className="mt-1 text-sm text-gray-900">{therapist.qualification || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">CORU Registration</label>
                    <p className="mt-1 text-sm text-gray-900">{therapist.coruRegistration || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
                    <p className="mt-1 text-sm text-gray-900">{therapist.yearsExperience || 'Not provided'} years</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Hourly Rate</label>
                    <p className="mt-1 text-sm text-gray-900">€{therapist.hourlyRate || 'Not set'}/hour</p>
                  </div>
                </div>
              </div>

              {/* Specializations */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Specializations</h4>
                <div className="flex flex-wrap gap-2">
                  {therapist.specializations.length > 0 ? (
                    therapist.specializations.map((spec, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        {spec}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No specializations listed</p>
                  )}
                </div>
              </div>

              {/* Clinic Associations */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Associated Clinics</h4>
                {therapist.clinics.length > 0 ? (
                  <div className="space-y-3">
                    {therapist.clinics.map((clinic, index) => (
                      <div key={index} className="bg-white rounded p-3 border">
                        <h5 className="font-medium text-gray-900">{clinic.name}</h5>
                        <p className="text-sm text-gray-600">{clinic.address}</p>
                        <p className="text-sm text-gray-500">{clinic.city}, {clinic.county}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No clinic associations</p>
                )}
              </div>

              {/* Bio */}
              {therapist.bio && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Bio</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">{therapist.bio}</p>
                </div>
              )}

              {/* Reviews Summary */}
              {therapist.reviewCount > 0 && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Reviews Summary</h4>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <span className="text-2xl">⭐</span>
                      <span className="ml-1 text-lg font-medium">{therapist.avgRating}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Based on {therapist.reviewCount} review{therapist.reviewCount !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
              )}

              {/* Registration Date */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Registration Information</h4>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Registered</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {new Date(therapist.registeredAt).toLocaleDateString('en-IE', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}