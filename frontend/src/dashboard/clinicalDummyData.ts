import { ClinicalService } from "@/types";

export const mockClinicalServices: ClinicalService[] = [
  {
    id: 1,
    title: "Pharmacy Services",
    tagline: "Your health, our expertise in every prescription.",
    overview:
      "Comprehensive pharmacy care offering safe medication dispensing, consultations, and wellness support for all patients.",
    detailedDescription:
      "Our pharmacy ensures personalized medication management, vaccination services, and expert counseling to optimize your health outcomes.",
    features: [
      {
        title: "Medication dispensing and management",
        description:
          "Accurate dispensing of prescriptions with guidance on usage and interactions.",
      },
      { title: "Health consultations and wellness programs" },
      {
        title: "Vaccinations and preventive care",
        description:
          "Immunization services for children and adults to prevent diseases.",
      },
      { title: "Medication therapy management" },
    ],
    doctors: [
      {
        name: "Dr. Jane Doe",
        title: "Pharmacist",
        image:
          "https://img.freepik.com/free-photo/portrait-of-young-female-pharmacist_23-2148756260.jpg",
        bio: "Dr. Jane Doe is a licensed pharmacist with over 10 years of experience in community pharmacy, specializing in medication therapy management and patient education.",
      },
      {
        name: "Dr. John Smith",
        title: "Pharmacist",
        image: "https://img.freepik.com/free-photo/portrait-you",
        bio: "Dr. John Smith is a clinical pharmacist with expertise in chronic disease management and a passion for improving patient outcomes through personalized medication plans.",
      },
    ],
    testimonials: [
      {
        name: "Sarah Johnson",
        title: "Satisfied Patient",
        image:
          "https://img.freepik.com/free-photo/portrait-of-young-female-pharmacist_23-2148756260.jpg",
        quote:
          "The pharmacy team at The Nairobi Hospital has been incredibly helpful in managing my medications.",
      },
    ],
    contact: {
      phone: "+254 700 000 000",
      email: "clinicservice@nbihosp.org",
    },
    isBookable: false,
    hasReadMore: false,
    timingsOnOverview: "Mon–Fri 8am–5pm",
    images: [
      {
        url: "https://img.freepik.com/free-photo/african-american-pharmacist-working-drugstore-hospital-pharmacy-african-healthcare_627829-14281.jpg",
        alt: "Pharmacy Services",
      },
    ],
    locations: ["Main Hospital", "Anderson Specialty", "Capital Center OPC"],
  },
  {
    id: 2,
    title: "Laboratory Services",
    tagline: "Accurate results for better health decisions.",
    overview:
      "State-of-the-art lab offering fast, precise diagnostic tests to support effective medical decisions.",
    detailedDescription:
      "Our laboratory uses advanced equipment to deliver accurate results, aiding in disease diagnosis, monitoring, and preventive care.",
    features: [
      {
        title: "Comprehensive diagnostic testing",
        description:
          "Full range of blood, urine, and molecular tests for accurate diagnosis.",
      },
      { title: "Fast and reliable results" },
      { title: "State-of-the-art equipment" },
      {
        title: "Qualified laboratory technologists",
        description:
          "Experienced technologists ensure proper sample handling and analysis.",
      },
    ],
    doctors: [
      {
        name: "Dr. Jane Doe",
        title: "Lab Technologist",
        image:
          "https://img.freepik.com/free-photo/portrait-of-young-female-pharmacist_23-2148756260.jpg",
        bio: "Dr. Jane Doe is a laboratory scientist specializing in clinical chemistry and hematology.",
      },
    ],
    testimonials: [
      {
        name: "Michael Kimani",
        title: "Satisfied Patient",
        quote:
          "The laboratory services are efficient and reliable. I always get my results on time.",
      },
    ],
    contact: {
      phone: "+254 700 000 001",
      email: "labservices@nbihosp.org",
    },
    isBookable: true,
    hasReadMore: true,
    timingsOnOverview: "Mon–Sat 7am–6pm",
    images: [
      {
        url: "https://img.freepik.com/free-photo/medical-doctor-girl-working-with-microscope-young-female-scientist-doing-vaccine-research_1157-48128.jpg?uid=R116808220&ga=GA1.1.1105653371.1743490554&semt=ais_hybrid&w=740",
        alt: "Laboratory Services",
      },
    ],
    locations: ["Main Hospital", "Galleria OPC", "Kiambu OPC"],
  },
  {
    id: 3,
    title: "Radiology Services",
    tagline: "Advanced imaging for precise diagnosis.",
    overview:
      "High-quality imaging services including MRI, CT, and X-rays to support accurate medical diagnoses.",
    detailedDescription:
      "Our radiology department provides advanced imaging for precise diagnosis, aiding treatment planning with minimal patient discomfort.",
    features: [
      { title: "MRI and CT scanning" },
      {
        title: "Ultrasound imaging",
        description:
          "Safe and detailed imaging for internal organs and prenatal care.",
      },
      { title: "Digital X-ray" },
      { title: "Interventional radiology" },
    ],
    doctors: [
      {
        name: "Dr. Jane Doe",
        title: "Radiologist",
        image:
          "https://img.freepik.com/free-photo/portrait-of-young-female-pharmacist_23-2148756260.jpg",
        bio: "Expert in radiologic imaging with focus on oncology diagnostics.",
      },
    ],
    testimonials: [
      {
        name: "Peter Otieno",
        title: "Patient",
        quote:
          "Radiology services were efficient, and the staff was very professional.",
      },
    ],
    contact: {
      phone: "+254 700 000 002",
      email: "radiology@nbihosp.org",
    },
    isBookable: true,
    hasReadMore: true,
    timingsOnOverview: "Mon–Sat 8am–5pm",
    images: [
      {
        url: "https://img.freepik.com/premium-photo/two-doctors-are-looking-x-rays-medical-rear-view-chief-physician-afro-american-man-caucasian-woman-looking-x-rays-mri-clear-light_141188-3575.jpg?w=996",
        alt: "Radiology Services",
      },
    ],
    locations: ["Main Hospital", "Roslyn Riviera OPC"],
  },
  {
    id: 4,
    title: "Dental Services",
    tagline: "Bright smiles, healthy teeth, happy patients.",
    overview:
      "Full-spectrum dental care for all ages, offering cleanings, restorative, and cosmetic dentistry services.",
    detailedDescription:
      "Our dental clinic provides gentle, professional care including orthodontics, pediatric dentistry, and cosmetic procedures for lasting oral health.",
    features: [
      { title: "General dentistry" },
      {
        title: "Cosmetic dentistry",
        description:
          "Enhancing smiles with whitening, veneers, and aesthetic restorations.",
      },
      { title: "Orthodontics" },
      {
        title: "Pediatric dental care",
        description:
          "Child-focused dental care ensuring healthy teeth from early years.",
      },
    ],
    doctors: [
      {
        name: "Dr. Jane Doe",
        title: "Dentist",
        image:
          "https://img.freepik.com/free-photo/portrait-of-young-female-pharmacist_23-2148756260.jpg",
        bio: "Dr. Jane Doe is a dentist with 12 years of experience in restorative and cosmetic dentistry.",
      },
    ],
    testimonials: [
      {
        name: "Emily Njeri",
        title: "Patient",
        quote:
          "The dental team was amazing — gentle, professional, and thorough.",
      },
    ],
    contact: { phone: "+254 700 000 003", email: "dental@nbihosp.org" },
    isBookable: true,
    hasReadMore: true,
    timingsOnOverview: "Mon–Fri 9am–5pm",
    images: [
      {
        url: "https://img.freepik.com/free-photo/happy-afro-kid-regular-check-up-teeth-dental-clinic_651396-1411.jpg?t=st=1744634041~exp=1744637641~hmac=6fcaa5bcb2893a5de97602b0c8d45bfd8a51f0de1f3bc3b6f88580bbd077c52c&w=900",
        alt: "Dental Services",
      },
    ],
    locations: ["Main Hospital", "Capital Center OPC", "South Field OPC"],
  },
];
