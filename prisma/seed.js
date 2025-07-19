const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Clean existing data (optional - remove if you want to keep existing data)
  await cleanDatabase();

  // Seed data
  await seedUserRoles();
  await seedCities();
  await seedSpecializations();
  await seedBookingStatuses();
  await seedPaymentMethods();
  await seedUsers();
  await seedPhysiotherapistProfiles();
  await seedClinics();
  await seedPhysiotherapistClinics();
  await seedUserAddresses();
  await seedAvailabilityTemplates();
  await seedSpecificAvailability();
  await seedBookings();
  await seedPayments();
  await seedReviews();
  await seedPatientMedicalHistory();
  await seedTreatmentSessions();
  await seedNotifications();

  console.log("✅ Database seeded successfully!");
}

async function cleanDatabase() {
  console.log("🧹 Cleaning existing data...");

  // Delete in reverse dependency order
  await prisma.notification.deleteMany();
  await prisma.treatmentSession.deleteMany();
  await prisma.patientMedicalHistory.deleteMany();
  await prisma.review.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.specificAvailability.deleteMany();
  await prisma.availabilityTemplate.deleteMany();
  await prisma.physiotherapistClinic.deleteMany();
  await prisma.userAddress.deleteMany();
  await prisma.clinic.deleteMany();
  await prisma.physiotherapistSpecialization.deleteMany();
  await prisma.physiotherapistProfile.deleteMany();
  await prisma.user.deleteMany();
  await prisma.paymentMethod.deleteMany();
  await prisma.bookingStatus.deleteMany();
  await prisma.specialization.deleteMany();
  await prisma.city.deleteMany();
  await prisma.userRole.deleteMany();

  console.log("✅ Database cleaned");
}

async function seedUserRoles() {
  console.log("👤 Seeding user roles...");

  await prisma.userRole.createMany({
    data: [
      { name: "Patient", description: "Regular patient user" },
      { name: "Physiotherapist", description: "Qualified physiotherapist" },
      { name: "Admin", description: "System administrator" },
      { name: "Clinic Manager", description: "Clinic management staff" },
    ],
  });
}

async function seedCities() {
  console.log("🏙️ Seeding cities...");

  await prisma.city.createMany({
    data: [
      {
        name: "Dublin",
        county: "Dublin",
        eircodePrefix: "D01",
        latitude: 53.349805,
        longitude: -6.26031,
      },
      {
        name: "Cork",
        county: "Cork",
        eircodePrefix: "T12",
        latitude: 51.89888,
        longitude: -8.475439,
      },
      {
        name: "Galway",
        county: "Galway",
        eircodePrefix: "H91",
        latitude: 53.270668,
        longitude: -9.05679,
      },
      {
        name: "Limerick",
        county: "Limerick",
        eircodePrefix: "V94",
        latitude: 52.668018,
        longitude: -8.630498,
      },
      {
        name: "Waterford",
        county: "Waterford",
        eircodePrefix: "X91",
        latitude: 52.25907,
        longitude: -7.10431,
      },
      {
        name: "Kilkenny",
        county: "Kilkenny",
        eircodePrefix: "R95",
        latitude: 52.65437,
        longitude: -7.244553,
      },
      {
        name: "Wexford",
        county: "Wexford",
        eircodePrefix: "Y35",
        latitude: 52.334209,
        longitude: -6.45772,
      },
      {
        name: "Sligo",
        county: "Sligo",
        eircodePrefix: "F91",
        latitude: 54.269927,
        longitude: -8.46947,
      },
    ],
  });
}

async function seedSpecializations() {
  console.log("🏥 Seeding specializations...");

  await prisma.specialization.createMany({
    data: [
      {
        name: "Sports Physiotherapy",
        description:
          "Treatment of sports-related injuries and performance enhancement",
      },
      {
        name: "Orthopedic Physiotherapy",
        description: "Treatment of musculoskeletal conditions and injuries",
      },
      {
        name: "Neurological Physiotherapy",
        description:
          "Treatment of neurological conditions like stroke, MS, Parkinsons",
      },
      {
        name: "Pediatric Physiotherapy",
        description: "Physiotherapy treatment for children and adolescents",
      },
      {
        name: "Geriatric Physiotherapy",
        description:
          "Treatment focused on age-related conditions in elderly patients",
      },
      {
        name: "Cardiopulmonary Physiotherapy",
        description: "Treatment of heart and lung conditions",
      },
      {
        name: "Manual Therapy",
        description:
          "Hands-on treatment techniques including joint mobilization",
      },
      {
        name: "Dry Needling",
        description:
          "Treatment using thin needles to treat myofascial trigger points",
      },
      {
        name: "Vestibular Rehabilitation",
        description: "Treatment of balance and dizziness disorders",
      },
      {
        name: "Pelvic Floor Physiotherapy",
        description: "Treatment of pelvic floor dysfunction",
      },
    ],
  });
}

async function seedBookingStatuses() {
  console.log("📅 Seeding booking statuses...");

  await prisma.bookingStatus.createMany({
    data: [
      { name: "Scheduled", description: "Booking is confirmed and scheduled" },
      {
        name: "Completed",
        description: "Treatment session has been completed",
      },
      { name: "Cancelled", description: "Booking has been cancelled" },
      {
        name: "No Show",
        description: "Patient did not attend the appointment",
      },
      {
        name: "Rescheduled",
        description: "Booking has been moved to a different time",
      },
      { name: "Pending", description: "Booking is waiting for confirmation" },
    ],
  });
}

async function seedPaymentMethods() {
  console.log("💳 Seeding payment methods...");

  await prisma.paymentMethod.createMany({
    data: [
      { name: "Credit Card" },
      { name: "Debit Card" },
      { name: "Cash" },
      { name: "Bank Transfer" },
      { name: "Insurance" },
      { name: "HSE" },
    ],
  });
}

async function seedUsers() {
  console.log("👥 Seeding users...");

  const hashedPassword = await bcrypt.hash("password123", 10);
  const roles = await prisma.userRole.findMany();

  const patientRole = roles.find((r) => r.name === "Patient");
  const physioRole = roles.find((r) => r.name === "Physiotherapist");
  const adminRole = roles.find((r) => r.name === "Admin");

  // Create patients
  await prisma.user.createMany({
    data: [
      {
        email: "john.doe@example.com",
        passwordHash: hashedPassword,
        firstName: "John",
        lastName: "Doe",
        phone: "+353871234567",
        dateOfBirth: new Date("1985-06-15"),
        gender: "Male",
        roleId: patientRole.id,
        ppsNumber: "1234567A",
        emailVerified: true,
      },
      {
        email: "jane.smith@example.com",
        passwordHash: hashedPassword,
        firstName: "Jane",
        lastName: "Smith",
        phone: "+353871234568",
        dateOfBirth: new Date("1990-03-22"),
        gender: "Female",
        roleId: patientRole.id,
        ppsNumber: "1234568B",
        emailVerified: true,
      },
      {
        email: "michael.brown@example.com",
        passwordHash: hashedPassword,
        firstName: "Michael",
        lastName: "Brown",
        phone: "+353871234569",
        dateOfBirth: new Date("1978-11-08"),
        gender: "Male",
        roleId: patientRole.id,
        ppsNumber: "1234569C",
        emailVerified: true,
      },
      {
        email: "sarah.wilson@example.com",
        passwordHash: hashedPassword,
        firstName: "Sarah",
        lastName: "Wilson",
        phone: "+353871234570",
        dateOfBirth: new Date("1992-08-14"),
        gender: "Female",
        roleId: patientRole.id,
        ppsNumber: "1234570D",
        emailVerified: true,
      },
    ],
  });

  // Create physiotherapists
  await prisma.user.createMany({
    data: [
      {
        email: "dr.emily.johnson@physio.ie",
        passwordHash: hashedPassword,
        firstName: "Emily",
        lastName: "Johnson",
        phone: "+353871234571",
        dateOfBirth: new Date("1980-04-12"),
        gender: "Female",
        roleId: physioRole.id,
        emailVerified: true,
        phoneVerified: true,
      },
      {
        email: "dr.david.murphy@physio.ie",
        passwordHash: hashedPassword,
        firstName: "David",
        lastName: "Murphy",
        phone: "+353871234572",
        dateOfBirth: new Date("1975-09-25"),
        gender: "Male",
        roleId: physioRole.id,
        emailVerified: true,
        phoneVerified: true,
      },
      {
        email: "dr.lisa.kelly@physio.ie",
        passwordHash: hashedPassword,
        firstName: "Lisa",
        lastName: "Kelly",
        phone: "+353871234573",
        dateOfBirth: new Date("1982-01-18"),
        gender: "Female",
        roleId: physioRole.id,
        emailVerified: true,
        phoneVerified: true,
      },
    ],
  });

  // Create admin
  await prisma.user.create({
    data: {
      email: "admin@physio.ie",
      passwordHash: hashedPassword,
      firstName: "Admin",
      lastName: "User",
      phone: "+353871234574",
      roleId: adminRole.id,
      emailVerified: true,
      phoneVerified: true,
    },
  });
}

async function seedPhysiotherapistProfiles() {
  console.log("🏥 Seeding physiotherapist profiles...");

  const physios = await prisma.user.findMany({
    where: { role: { name: "Physiotherapist" } },
  });

  const specializations = await prisma.specialization.findMany();

  for (let i = 0; i < physios.length; i++) {
    const physio = physios[i];

    // Create profile
    const profile = await prisma.physiotherapistProfile.create({
      data: {
        userId: physio.id,
        coruRegistration: `CORU${String(i + 1).padStart(6, "0")}`,
        qualification: "BSc Physiotherapy, MSc Sports Physiotherapy",
        yearsExperience: Math.floor(Math.random() * 20) + 5,
        bio: `Experienced physiotherapist specializing in comprehensive rehabilitation and patient care. Committed to helping patients achieve their optimal physical function and quality of life.`,
        hourlyRate: 70 + i * 10,
        isVerified: true,
        isAvailable: true,
      },
    });

    // Add 2-3 specializations per physiotherapist
    const selectedSpecs = specializations.slice(i * 2, i * 2 + 3);
    for (const spec of selectedSpecs) {
      await prisma.physiotherapistSpecialization.create({
        data: {
          physiotherapistId: profile.id,
          specializationId: spec.id,
        },
      });
    }
  }
}

async function seedClinics() {
  console.log("🏢 Seeding clinics...");

  const cities = await prisma.city.findMany();

  await prisma.clinic.createMany({
    data: [
      {
        name: "Dublin Sports Clinic",
        addressLine1: "123 Grafton Street",
        cityId: cities.find((c) => c.name === "Dublin").id,
        eircode: "D02XY45",
        phone: "+35315551234",
        email: "info@dublinsports.ie",
        websiteUrl: "https://dublinsports.ie",
        latitude: 53.3416,
        longitude: -6.26013,
      },
      {
        name: "Cork Physiotherapy Centre",
        addressLine1: "456 Patrick Street",
        cityId: cities.find((c) => c.name === "Cork").id,
        eircode: "T12AB67",
        phone: "+35215551234",
        email: "reception@corkphysio.ie",
        websiteUrl: "https://corkphysio.ie",
        latitude: 51.898026,
        longitude: -8.468493,
      },
      {
        name: "Galway Rehabilitation Clinic",
        addressLine1: "789 Shop Street",
        cityId: cities.find((c) => c.name === "Galway").id,
        eircode: "H91CD89",
        phone: "+35315551235",
        email: "hello@galwayrehab.ie",
        latitude: 53.271889,
        longitude: -9.048966,
      },
      {
        name: "Limerick Wellness Centre",
        addressLine1: "321 O'Connell Street",
        cityId: cities.find((c) => c.name === "Limerick").id,
        eircode: "V94EF12",
        phone: "+35315551236",
        email: "contact@limerickwellness.ie",
        latitude: 52.661252,
        longitude: -8.628238,
      },
    ],
  });
}

async function seedPhysiotherapistClinics() {
  console.log("🤝 Seeding physiotherapist-clinic associations...");

  const physios = await prisma.physiotherapistProfile.findMany();
  const clinics = await prisma.clinic.findMany();

  // Associate each physiotherapist with 1-2 clinics
  for (let i = 0; i < physios.length; i++) {
    const physio = physios[i];

    // Primary clinic
    await prisma.physiotherapistClinic.create({
      data: {
        physiotherapistId: physio.id,
        clinicId: clinics[i % clinics.length].id,
        isPrimary: true,
        startDate: new Date("2023-01-01"),
      },
    });

    // Secondary clinic (50% chance)
    if (Math.random() > 0.5) {
      await prisma.physiotherapistClinic.create({
        data: {
          physiotherapistId: physio.id,
          clinicId: clinics[(i + 1) % clinics.length].id,
          isPrimary: false,
          startDate: new Date("2023-06-01"),
        },
      });
    }
  }
}
async function seedUserAddresses() {
  console.log("🏠 Seeding user addresses...");

  const users = await prisma.user.findMany({
    where: { role: { name: "Patient" } },
  });
  const cities = await prisma.city.findMany();

  const addresses = [
    { line1: "12 Merrion Square", line2: "Apt 4B" },
    { line1: "45 Pembroke Road", line2: null },
    { line1: "78 Fitzwilliam Square", line2: "Ground Floor" },
    { line1: "23 Leeson Street", line2: "Unit 2" },
  ];

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const address = addresses[i % addresses.length];
    const city = cities[Math.floor(Math.random() * cities.length)];

    // Calculate coordinates with proper decimal precision
    const latitudeOffset = (Math.random() - 0.5) * 0.01;
    const longitudeOffset = (Math.random() - 0.5) * 0.01;

    // Convert to numbers first, then calculate
    const baseLatitude = parseFloat(city.latitude);
    const baseLongitude = parseFloat(city.longitude);

    const finalLatitude = (baseLatitude + latitudeOffset).toFixed(6);
    const finalLongitude = (baseLongitude + longitudeOffset).toFixed(6);

    await prisma.userAddress.create({
      data: {
        userId: user.id,
        addressLine1: address.line1,
        addressLine2: address.line2,
        cityId: city.id,
        eircode: `${city.eircodePrefix}${String(Math.floor(Math.random() * 999)).padStart(3, "0")}`,
        latitude: finalLatitude,
        longitude: finalLongitude,
        isPrimary: true,
      },
    });
  }
}
async function seedAvailabilityTemplates() {
  console.log("📅 Seeding availability templates...");

  const physios = await prisma.physiotherapistProfile.findMany();
  const clinics = await prisma.clinic.findMany();

  // Standard availability: Monday-Friday 9:00-17:00
  for (const physio of physios) {
    const primaryClinic = await prisma.physiotherapistClinic.findFirst({
      where: { physiotherapistId: physio.id, isPrimary: true },
    });

    // Weekdays
    for (let day = 0; day < 5; day++) {
      // 0 = Monday, 4 = Friday
      await prisma.availabilityTemplate.create({
        data: {
          physiotherapistId: physio.id,
          dayOfWeek: day,
          startTime: "09:00",
          endTime: "17:00",
          clinicId: primaryClinic.clinicId,
        },
      });
    }

    // Saturday (some physios)
    if (Math.random() > 0.5) {
      await prisma.availabilityTemplate.create({
        data: {
          physiotherapistId: physio.id,
          dayOfWeek: 5, // Saturday
          startTime: "09:00",
          endTime: "13:00",
          clinicId: primaryClinic.clinicId,
        },
      });
    }
  }
}

async function seedSpecificAvailability() {
  console.log("📋 Seeding specific availability...");

  const physios = await prisma.physiotherapistProfile.findMany();

  // Add some specific availability overrides
  for (const physio of physios) {
    const primaryClinic = await prisma.physiotherapistClinic.findFirst({
      where: { physiotherapistId: physio.id, isPrimary: true },
    });

    // Holiday unavailability
    await prisma.specificAvailability.create({
      data: {
        physiotherapistId: physio.id,
        date: new Date("2024-12-25"),
        startTime: "00:00",
        endTime: "23:59",
        clinicId: primaryClinic.clinicId,
        isAvailable: false,
        reason: "Christmas Holiday",
      },
    });

    // Extended hours for specific date
    await prisma.specificAvailability.create({
      data: {
        physiotherapistId: physio.id,
        date: new Date("2024-08-15"),
        startTime: "08:00",
        endTime: "20:00",
        clinicId: primaryClinic.clinicId,
        isAvailable: true,
        reason: "Extended hours",
      },
    });
  }
}

async function seedBookings() {
  console.log("📝 Seeding bookings...");

  const patients = await prisma.user.findMany({
    where: { role: { name: "Patient" } },
  });
  const physios = await prisma.physiotherapistProfile.findMany();
  const clinics = await prisma.clinic.findMany();
  const statuses = await prisma.bookingStatus.findMany();
  const specializations = await prisma.specialization.findMany();

  const scheduledStatus = statuses.find((s) => s.name === "Scheduled");
  const completedStatus = statuses.find((s) => s.name === "Completed");

  // Create bookings for the past month and upcoming month
  for (let i = 0; i < 20; i++) {
    const patient = patients[Math.floor(Math.random() * patients.length)];
    const physio = physios[Math.floor(Math.random() * physios.length)];
    const clinic = clinics[Math.floor(Math.random() * clinics.length)];
    const specialization =
      specializations[Math.floor(Math.random() * specializations.length)];

    // Random date within ±30 days
    const baseDate = new Date();
    const randomDays = Math.floor(Math.random() * 60) - 30;
    const appointmentDate = new Date(baseDate);
    appointmentDate.setDate(baseDate.getDate() + randomDays);

    // Random time between 9:00 and 16:00
    const hours = Math.floor(Math.random() * 8) + 9;
    const minutes = [0, 30][Math.floor(Math.random() * 2)];
    const appointmentTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;

    const isCompleted = appointmentDate < new Date();

    await prisma.booking.create({
      data: {
        bookingReference: `BK${String(Date.now() + i).slice(-8)}`,
        patientId: patient.id,
        physiotherapistId: physio.id,
        clinicId: clinic.id,
        appointmentDate: appointmentDate,
        appointmentTime: appointmentTime,
        durationMinutes: [30, 45, 60][Math.floor(Math.random() * 3)],
        statusId: isCompleted ? completedStatus.id : scheduledStatus.id,
        treatmentTypeId: specialization.id,
        totalAmount: physio.hourlyRate,
        patientNotes:
          i % 3 === 0
            ? "Lower back pain for 2 weeks. Pain worse in morning."
            : null,
      },
    });
  }
}

async function seedPayments() {
  console.log("💰 Seeding payments...");

  const bookings = await prisma.booking.findMany({
    include: { status: true },
  });
  const paymentMethods = await prisma.paymentMethod.findMany();

  const completedBookings = bookings.filter(
    (b) => b.status.name === "Completed",
  );

  for (const booking of completedBookings) {
    const paymentMethod =
      paymentMethods[Math.floor(Math.random() * paymentMethods.length)];

    await prisma.payment.create({
      data: {
        bookingId: booking.id,
        paymentMethodId: paymentMethod.id,
        amount: booking.totalAmount,
        currency: "EUR",
        transactionId: `TXN${String(Date.now() + Math.random()).slice(-10)}`,
        status: "completed",
        processedAt: new Date(
          booking.appointmentDate.getTime() + 24 * 60 * 60 * 1000,
        ),
      },
    });
  }
}

async function seedReviews() {
  console.log("⭐ Seeding reviews...");

  const completedBookings = await prisma.booking.findMany({
    where: { status: { name: "Completed" } },
  });

  const reviewTexts = [
    "Excellent treatment, very professional and knowledgeable.",
    "Great experience, significant improvement after just a few sessions.",
    "Highly recommend! Very thorough assessment and effective treatment.",
    "Professional service, clean facilities, and great results.",
    "Outstanding care and attention to detail. Felt much better after treatment.",
  ];

  // 70% of completed bookings get reviews
  const bookingsToReview = completedBookings.slice(
    0,
    Math.floor(completedBookings.length * 0.7),
  );

  for (const booking of bookingsToReview) {
    await prisma.review.create({
      data: {
        bookingId: booking.id,
        patientId: booking.patientId,
        physiotherapistId: booking.physiotherapistId,
        rating: Math.floor(Math.random() * 2) + 4, // 4-5 stars mostly
        reviewText: reviewTexts[Math.floor(Math.random() * reviewTexts.length)],
        isAnonymous: Math.random() > 0.7,
        isApproved: true,
      },
    });
  }
}

async function seedPatientMedicalHistory() {
  console.log("🏥 Seeding patient medical history...");

  const patients = await prisma.user.findMany({
    where: { role: { name: "Patient" } },
  });

  const conditions = [
    {
      name: "Lower Back Pain",
      description: "Chronic lower back pain due to poor posture",
    },
    {
      name: "Shoulder Impingement",
      description:
        "Right shoulder impingement from repetitive overhead activities",
    },
    {
      name: "Knee Ligament Injury",
      description: "Previous ACL injury from sports, fully recovered",
    },
    { name: "Neck Strain", description: "Chronic neck strain from desk work" },
    {
      name: "Tennis Elbow",
      description: "Lateral epicondylitis from repetitive activities",
    },
    {
      name: "Plantar Fasciitis",
      description: "Heel pain and stiffness, worse in mornings",
    },
  ];

  for (const patient of patients) {
    // Each patient gets 1-3 conditions
    const numConditions = Math.floor(Math.random() * 3) + 1;
    const selectedConditions = conditions
      .sort(() => 0.5 - Math.random())
      .slice(0, numConditions);

    for (const condition of selectedConditions) {
      const diagnosisDate = new Date();
      diagnosisDate.setMonth(
        diagnosisDate.getMonth() - Math.floor(Math.random() * 24),
      );

      await prisma.patientMedicalHistory.create({
        data: {
          patientId: patient.id,
          conditionName: condition.name,
          description: condition.description,
          diagnosisDate: diagnosisDate,
          isCurrent: Math.random() > 0.3, // 70% are current
        },
      });
    }
  }
}

async function seedTreatmentSessions() {
  console.log("📋 Seeding treatment sessions...");

  const completedBookings = await prisma.booking.findMany({
    where: { status: { name: "Completed" } },
  });

  const sessionNotes = [
    "Patient responded well to manual therapy. ROM improved significantly.",
    "Applied dry needling to trigger points. Patient experienced immediate relief.",
    "Continued with strengthening exercises. Good progress noted.",
    "Joint mobilization performed. Patient reports reduced stiffness.",
    "Ultrasound therapy applied. Inflammation appears to be reducing.",
  ];

  const exercises = [
    "Hip flexor stretches - 3 sets of 30 seconds, twice daily",
    "Shoulder blade squeezes - 2 sets of 15 repetitions",
    "Core strengthening - plank hold 30 seconds, 3 times",
    "Calf stretches against wall - hold 30 seconds each leg",
    "Neck rotation exercises - 10 repetitions each direction",
  ];

  for (const booking of completedBookings) {
    const nextAppt = new Date(booking.appointmentDate);
    nextAppt.setDate(nextAppt.getDate() + 7); // 1 week follow-up

    await prisma.treatmentSession.create({
      data: {
        bookingId: booking.id,
        sessionNotes:
          sessionNotes[Math.floor(Math.random() * sessionNotes.length)],
        exercisesPrescribed:
          exercises[Math.floor(Math.random() * exercises.length)],
        nextAppointmentRecommended: Math.random() > 0.3 ? nextAppt : null,
        progressNotes:
          "Patient showing good progress. Continue current treatment plan.",
      },
    });
  }
}

async function seedNotifications() {
  console.log("🔔 Seeding notifications...");

  const users = await prisma.user.findMany();

  const notifications = [
    {
      title: "Appointment Reminder",
      message: "You have an appointment tomorrow at 2:00 PM with Dr. Johnson",
      type: "reminder",
    },
    {
      title: "Booking Confirmed",
      message:
        "Your appointment has been confirmed for next Friday at 10:00 AM",
      type: "booking",
    },
    {
      title: "Payment Successful",
      message: "Payment of €70 has been processed successfully",
      type: "payment",
    },
    {
      title: "Treatment Plan Updated",
      message: "Your physiotherapist has updated your treatment plan",
      type: "system",
    },
    {
      title: "Review Request",
      message: "Please rate your recent session with Dr. Murphy",
      type: "system",
    },
  ];

  for (const user of users) {
    // Each user gets 2-5 notifications
    const numNotifications = Math.floor(Math.random() * 4) + 2;

    for (let i = 0; i < numNotifications; i++) {
      const notification =
        notifications[Math.floor(Math.random() * notifications.length)];
      const createdAt = new Date();
      createdAt.setDate(createdAt.getDate() - Math.floor(Math.random() * 7));

      await prisma.notification.create({
        data: {
          userId: user.id,
          title: notification.title,
          message: notification.message,
          type: notification.type,
          isRead: Math.random() > 0.4, // 60% read
          createdAt: createdAt,
        },
      });
    }
  }
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
