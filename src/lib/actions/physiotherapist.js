'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getPhysiotherapistsByLocationAndSpecialization(location, specialization) {
  try {
    // Debug: Log what we're searching for
    console.log('Searching for:', { location, specialization });
    const physiotherapists = await prisma.physiotherapistProfile.findMany({
      where: {
        isAvailable: true,
        specializations: {
          some: {
            specialization: {
              name: specialization,
              isActive: true
            }
          }
        },
        clinicAssociations: {
          some: {
            clinic: {
              city: {
                name: {
                  equals: location,
                  mode: 'insensitive'
                }
              }
            }
          }
        }
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phone: true
          }
        },
        specializations: {
          include: {
            specialization: {
              select: {
                name: true
              }
            }
          }
        },
        clinicAssociations: {
          where: {
            clinic: {
              city: {
                name: {
                  equals: location,
                  mode: 'insensitive'
                }
              }
            }
          },
          include: {
            clinic: {
              select: {
                id: true,
                name: true,
                addressLine1: true,
                city: {
                  select: {
                    name: true
                  }
                }
              }
            }
          }
        },
        reviews: {
          select: {
            rating: true
          }
        }
      }
    })

    // Debug: Log what we found
    console.log(`Found ${physiotherapists.length} physiotherapists for ${specialization} in ${location}`);

    // Transform data to match the expected format
    const transformedPhysiotherapists = physiotherapists.map(physio => {
      const avgRating = physio.reviews.length > 0 
        ? physio.reviews.reduce((sum, review) => sum + review.rating, 0) / physio.reviews.length
        : 4.5

      return {
        id: physio.id,
        name: `Dr. ${physio.user.firstName} ${physio.user.lastName}`,
        specialization: specialization,
        experience: `${physio.yearsExperience || 5} years`,
        rating: Math.round(avgRating * 10) / 10,
        reviews: physio.reviews.length,
        location: location,
        image: physio.profileImageUrl || "/profile.png",
        qualifications: [
          physio.qualification || "BSc Physiotherapy",
          `CORU: ${physio.coruRegistration || 'Registered'}`
        ],
        availableSlots: ["09:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"], // Default slots
        price: `€${Math.round(Number(physio.hourlyRate) || 75)}`,
        email: physio.user.email,
        phone: physio.user.phone,
        bio: physio.bio,
        clinics: physio.clinicAssociations.map(assoc => ({
          id: assoc.clinic.id,
          name: assoc.clinic.name,
          address: assoc.clinic.addressLine1,
          city: assoc.clinic.city.name
        }))
      }
    })

    return { success: true, data: transformedPhysiotherapists }
  } catch (error) {
    console.error('Error fetching physiotherapists:', error)
    return { success: false, error: 'Failed to fetch physiotherapists' }
  } finally {
    await prisma.$disconnect()
  }
}

export async function getAllSpecializations() {
  try {
    const specializations = await prisma.specialization.findMany({
      where: {
        isActive: true
      },
      select: {
        id: true,
        name: true,
        description: true
      }
    })

    return { success: true, data: specializations }
  } catch (error) {
    console.error('Error fetching specializations:', error)
    return { success: false, error: 'Failed to fetch specializations' }
  } finally {
    await prisma.$disconnect()
  }
}

export async function getAllCities() {
  try {
    const cities = await prisma.city.findMany({
      select: {
        id: true,
        name: true,
        county: true
      },
      orderBy: {
        name: 'asc'
      }
    })

    return { success: true, data: cities }
  } catch (error) {
    console.error('Error fetching cities:', error)
    return { success: false, error: 'Failed to fetch cities' }
  } finally {
    await prisma.$disconnect()
  }
}

export async function getAllClinics() {
  try {
    const clinics = await prisma.clinic.findMany({
      where: {
        isActive: true
      },
      select: {
        id: true,
        name: true,
        addressLine1: true,
        addressLine2: true,
        eircode: true,
        phone: true,
        email: true,
        city: {
          select: {
            id: true,
            name: true,
            county: true
          }
        }
      },
      orderBy: [
        { city: { name: 'asc' } },
        { name: 'asc' }
      ]
    })

    return { success: true, data: clinics }
  } catch (error) {
    console.error('Error fetching clinics:', error)
    return { success: false, error: 'Failed to fetch clinics' }
  } finally {
    await prisma.$disconnect()
  }
}

/**
 * Admin action: verify or unverify a physiotherapist profile
 * @param {number} profileId - The physiotherapistProfile id
 * @param {boolean} isVerified - true to verify, false to unverify
 */
export async function updatePhysiotherapistVerification(profileId, isVerified) {
  try {
    const updated = await prisma.physiotherapistProfile.update({
      where: { id: profileId },
      data: { isVerified },
    });
    return { success: true, data: updated };
  } catch (error) {
    console.error('Error updating physiotherapist verification:', error);
    return { success: false, error: 'Failed to update verification status' };
  } finally {
    await prisma.$disconnect();
  }
}

// Debug function to check what's actually in the database
export async function getAllPhysiotherapistProfilesForAdmin() {
  try {
    const profiles = await prisma.physiotherapistProfile.findMany({
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            createdAt: true
          }
        },
        specializations: {
          include: {
            specialization: {
              select: {
                name: true
              }
            }
          }
        },
        clinicAssociations: {
          include: {
            clinic: {
              select: {
                id: true,
                name: true,
                addressLine1: true,
                city: {
                  select: {
                    name: true,
                    county: true
                  }
                }
              }
            }
          }
        },
        reviews: {
          select: {
            rating: true
          }
        }
      },
      orderBy: [
        { isVerified: 'asc' },
        { user: { createdAt: 'desc' } }
      ]
    })

    const transformedProfiles = profiles.map(profile => {
      const avgRating = profile.reviews.length > 0 
        ? profile.reviews.reduce((sum, review) => sum + review.rating, 0) / profile.reviews.length
        : 0

      return {
        id: profile.id,
        userId: profile.user.id,
        name: `${profile.user.firstName} ${profile.user.lastName}`,
        email: profile.user.email,
        phone: profile.user.phone,
        coruRegistration: profile.coruRegistration,
        qualification: profile.qualification,
        yearsExperience: profile.yearsExperience,
        hourlyRate: profile.hourlyRate,
        bio: profile.bio,
        isVerified: profile.isVerified,
        isAvailable: profile.isAvailable,
        profileImageUrl: profile.profileImageUrl,
        avgRating: Math.round(avgRating * 10) / 10,
        reviewCount: profile.reviews.length,
        registeredAt: profile.user.createdAt,
        specializations: profile.specializations.map(s => s.specialization.name),
        clinics: profile.clinicAssociations.map(assoc => ({
          id: assoc.clinic.id,
          name: assoc.clinic.name,
          address: assoc.clinic.addressLine1,
          city: assoc.clinic.city.name,
          county: assoc.clinic.city.county
        }))
      }
    })

    return { success: true, data: transformedProfiles }
  } catch (error) {
    console.error('Error fetching physiotherapist profiles for admin:', error)
    return { success: false, error: 'Failed to fetch physiotherapist profiles' }
  } finally {
    await prisma.$disconnect()
  }
}

export async function debugDatabaseContents() {
  try {
    const cities = await prisma.city.findMany({ select: { name: true } })
    const specializations = await prisma.specialization.findMany({ select: { name: true } })
    const physioCount = await prisma.physiotherapistProfile.count()
    const specializationAssignments = await prisma.physiotherapistSpecialization.findMany({
      include: {
        specialization: { select: { name: true } },
        physiotherapist: {
          include: {
            clinicAssociations: {
              include: {
                clinic: {
                  include: {
                    city: { select: { name: true } }
                  }
                }
              }
            }
          }
        }
      }
    })

    console.log('=== DATABASE DEBUG INFO ===')
    console.log('Cities:', cities.map(c => c.name))
    console.log('Specializations:', specializations.map(s => s.name))
    console.log('Total physiotherapists:', physioCount)
    console.log('Sample specialization assignments:', specializationAssignments.slice(0, 5).map(sa => ({
      specialization: sa.specialization.name,
      cities: sa.physiotherapist.clinicAssociations.map(ca => ca.clinic.city.name)
    })))

    // Convert to plain objects to avoid serialization issues
    return { 
      cities: cities.map(c => ({ name: c.name })), 
      specializations: specializations.map(s => ({ name: s.name })), 
      physioCount,
      sampleAssignments: specializationAssignments.slice(0, 5).map(sa => ({
        specialization: sa.specialization.name,
        cities: sa.physiotherapist.clinicAssociations.map(ca => ca.clinic.city.name)
      }))
    }
  } catch (error) {
    console.error('Debug error:', error)
    return null
  } finally {
    await prisma.$disconnect()
  }
}