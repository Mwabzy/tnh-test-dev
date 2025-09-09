import { ClinicalService } from "@/types";
import { Doctor } from "@/types";
import { Testimonial } from "@/types";
import { ContactInfo } from "@/types";

// Your existing clinicalServices array goes here.
export const mockClinicalServices: ClinicalService[] = [
  {
    id: 1,
    title: "Pharmacy Servicesss",
    tagline: "Comprehensive Pharmaceutical Care",
    overview:
      "Pharmacy services provide comprehensive pharmaceutical care, including medication dispensing, health consultations, and wellness programs.",
    features: [
      "Medication dispensing and management",
      "Health consultations and wellness programs",
      "Vaccinations and preventive care",
      "Medication therapy management",
    ],
    doctors: [
      {
        name: "Dr. Jane Doe",
        title: "Pharmacist",
        image:
          "https://img.freepik.com/free-photo/portrait-of-young-female-pharmacist.jpg",
        bio: "Dr. Jane Doe is a licensed pharmacist with over 10 years of experience...",
      },
    ] as Doctor[],
    testimonial: [
      {
        name: "Sarah Johnson",
        title: "Satisfied Patient",
        image: "https://img.freepik.com/free-photo/portrait.jpg",
        quote:
          "The pharmacy team at The Nairobi Hospital has been incredibly helpful...",
      },
    ] as Testimonial[],
    contact: {
      phone: "+254 700 000 000",
      email: "clinicservice@nbihosp.org",
    } as ContactInfo,
    relatedServices: [
      {
        id: 2,
        title: "Laboratory Services",
        image:
          "https://img.freepik.com/free-photo/medical-doctor-looking-x-ray-film.jpg",
        imageAlt: "Laboratory Services",
        description: "Comprehensive lab services for accurate diagnosis.",
        link: "/clinics/laboratory-services",
      },
    ],
    image: {
      url: "https://img.freepik.com/free-photo/pharmacist.jpg",
      alt: "Pharmacy Services",
    },
  },
  {
    id: 2,
    title: "Lab Servicesss",
    tagline: "Comprehensive Pharmaceutical Care",
    overview:
      "Pharmacy services provide comprehensive pharmaceutical care, including medication dispensing, health consultations, and wellness programs.",
    features: [
      "Medication dispensing and management",
      "Health consultations and wellness programs",
      "Vaccinations and preventive care",
      "Medication therapy management",
    ],
    doctors: [
      {
        name: "Dr. Jane Doe",
        title: "Pharmacist",
        image:
          "https://img.freepik.com/free-photo/portrait-of-young-female-pharmacist.jpg",
        bio: "Dr. Jane Doe is a licensed pharmacist with over 10 years of experience...",
      },
    ] as Doctor[],
    testimonial: [
      {
        name: "Sarah Johnson",
        title: "Satisfied Patient",
        image: "https://img.freepik.com/free-photo/portrait.jpg",
        quote:
          "The pharmacy team at The Nairobi Hospital has been incredibly helpful...",
      },
    ] as Testimonial[],
    contact: {
      phone: "+254 700 000 000",
      email: "clinicservice@nbihosp.org",
    } as ContactInfo,
    relatedServices: [
      {
        id: 2,
        title: "Laboratory Services",
        image:
          "https://img.freepik.com/free-photo/medical-doctor-looking-x-ray-film.jpg",
        imageAlt: "Laboratory Services",
        description: "Comprehensive lab services for accurate diagnosis.",
        link: "/clinics/laboratory-services",
      },
    ],
    image: {
      url: "https://img.freepik.com/free-photo/pharmacist.jpg",
      alt: "Pharmacy Services",
    },
  },
];
