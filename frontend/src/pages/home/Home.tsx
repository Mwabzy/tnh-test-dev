import { FC } from "react";
import Hero from "./hero";
import Opc from "./opc";
import Features from "./features";
import InsuranceSlider from "./InsuranceSlider";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import Blogpost from "@/components/blogpost";
import Services from "./ClinicalServices";
import DoctorBrief from "../about/DoctorsCard";
import alexkagiaImg from "@/assets/doctorsImages/alexkagia.png";
import pkogeImg from "@/assets/doctorsImages/pkoge.png";
import ominabrianImg from "@/assets/doctorsImages/ominabrian.png";

type TeamMember = {
  name: string;
  title: string;
  image: string;
  id: string;
  languages: string[];
  description: string[];
  email?: string;
  phone?: string;
  clinicDepartment: string;
  schedule: string[];
  location: string;
  licensingDetails: string;
  awardsAndRecognition: string[];
  ResearchAndPublications: string[];
  servicesOffered: string[];
  socialMediaWebsite?: string[];
};
const teamMembers: TeamMember[] = [
  {
    name: "Dr. Peris Mbatha Mutuku",
    title: "Nephrologist",
    id: "p-koge",
    image: pkogeImg,
    description: [
      "Dr Peris M. Koge. Consultant Physician and Lead Nephrologist at Nairobi Hospital, as well as Peritoneal Dialysis specialist. Fellow of International Society of Nephrology (ISN) EAKI-University of Nairobi and International Society of Peritoneal Dialysis (ISPD) Stellenbosch University. MMED Internal Medicine (UON), MBChB Makerere University (MUK). Has a certificate in co-counseling and developmental counseling (MUK). Has critical care and Aeromedical evacuation experience and Trainer of Trainers (TOT) in BLS, ACLS, and PHTLS (Pre-Hospital Trauma Life Support). She is an ISPD Early Career Committee Member Representing Africa. She is a Kenya Renal Association (KRA), African Association of Nephrology (AFRAN), ISN, and ISPD member. She has a keen interest in Critical Care Nephrology and interventional Nephrology.",
    ],
    languages: ["English", "Swahili"],
    email: "pmutuku@nbihosp.org",
    phone: "Renal unit 0703082185, Mobile 0723105122",
    clinicDepartment: "Renal Unit",
    schedule: ["Tuesday 10 am-3 pm", "Friday 11 am-3 pm Anderson clinic"],
    location: "Main Hospital",
    licensingDetails: "Kenya Medical Practitioners Board",
    awardsAndRecognition: [
      "Won 1st prize for E-poster Abstract presentation of the below publication",
    ],
    ResearchAndPublications: [
      "Journal of Pan African Thoracic Society (JPATS). Published on 30th September 2023",
      "Point of Care lactate as a predictor of 7-day Morbidity and Mortality in critically ill patients presenting to the emergency department at Kenyatta National Hospital.",
    ],
    servicesOffered: [
      "Consultations",
      "Transplant services",
      "Dialysis Services",
      "Angioaccess establishment and removal",
      "Renal Biopsies",
      "Peritoneal dialysis catheter insertion",
    ],
    socialMediaWebsite: ["LinkedIn", "X-koperism", "Facebook"],
  },
  {
    name: "Dr. Omina Brian Odari",
    title: "Doctor",
    id: "p-omina",
    image: ominabrianImg,
    description: [
      "Dr. Omina Brian Odari is a Medical Liaison Officer with a specialization in Global Health Management. With 12 years of experience, he currently serves as the official point of contact for The Nairobi Hospital. His contributions include:",
      "1. Repaired relationships with UNSOS and coordinated patient care, leading to increased referrals.",
      "2. Reactivated the International SOS account and enhanced collaboration with AMREF.",
      "3. Improved turnaround times for medical reports and discharges.",
      "4. Ensured communication and coordination between admitting consultants and the ADT team.",
      "5. Secured TNH as the primary provider for UNISURE international insurance.",
      "6. Facilitated partnerships with Kings Hospital London-Dubai, Life Care Insurance, and strategic players in medical tourism.",
      "7. Participated in securing a UN umbrella contract for TNH's services to UN peacekeeping missions in Africa.",
      "8. Facilitated TNH’s participation in the East African Health Expo 2023.",
      "9. Established referral programs with the Malawi government, African Union, UN Sudan mission, and Bill & Melinda Gates Foundation.",
    ],
    languages: ["English", "Swahili"],
    email: "bomina@nbihosp.org",
    phone: "+254742603205",
    clinicDepartment: "Clinical Directorate, Medical Tourism Department",
    schedule: ["Monday to Friday 8:00 am - 5:00 pm"],
    location: "Nairobi Hospital - Main Hospital",
    licensingDetails: "Kenya Medical Practitioners and Dentists Board",
    awardsAndRecognition: [],
    ResearchAndPublications: [],
    servicesOffered: [
      "Medical liaison services",
      "Strategic partnership facilitation",
      "Referral coordination",
      "Medical tourism program development",
      "Healthcare diplomacy and stakeholder engagement",
    ],
  },
  {
    name: "Dr. Alex Gathura Kagia",
    title: "Obstetrician-Gynaecologist",
    id: "p-kagia",
    image: alexkagiaImg,
    description: [
      "Dr. Alex Gathura Kagia is a dedicated Obstetrician-Gynaecologist with 8 years of experience. His medical journey includes:",
      "• June 2017 to Date: Hospital Obstetrician-Gynaecologist at Nairobi Hospital",
      "• June 2011 - May 2017: Senior Medical Officer, Nairobi Hospital",
      "• July 2010 - May 2011: Medical Superintendent, Moyale District Hospital",
      "• February 2008 - June 2010: Medical Officer, Kathiani Sub District Hospital",
      "• January 2007 - January 2008: Medical Officer Intern, Coast Provincial General Hospital",
    ],
    languages: ["English", "Swahili", "Kikuyu"],
    email: "akagia@nbihosp.org; kagia2001@yahoo.com",
    phone: "0721837208; 0745049760",
    clinicDepartment: "Obstetrics-Gynaecology",
    schedule: ["Hospital Departmental Rota"],
    location: "Anderson Clinic / Labour Ward",
    licensingDetails: "KMPDC - A6270",
    awardsAndRecognition: [],
    ResearchAndPublications: [
      "Prevalence of pain symptoms suggestive of Endometriosis - EAMJ, 2017",
    ],
    servicesOffered: [
      "Antenatal & Gynaecological outpatient services",
      "Hospital deliveries (Normal & Caesarean)",
      "Gynaecological surgeries (minor & major)",
    ],
    socialMediaWebsite: ["LinkedIn-Alex Kagia"],
  },
];

type HomeProps = object;

const Home: FC<HomeProps> = () => {
  return (
    <>
      <Hero />
      <Features />
      {/* /<Metrics /> */}
      {/* <ServicesSection /> */}
      <Services/>
      <DoctorBrief
        title="Meet Our Doctors"
        description="Our team of experienced and dedicated doctors is here to provide you with the best healthcare services."
        members={teamMembers}
      />
      {/* <Opc /> */}
      <TestimonialCarousel
        testimonials={[
          {
            name: "Cate Nyambura",
            title: "Patient",
            image: "https://lh3.googleusercontent.com/a-/ALV-UjUOuxfWm6fzqbcmzhp-1rAs8wv4NgfJ9ixm-gRj-wXmHkqFPz-EMg=w72-h72-p-rp-mo-ba8-br100",
            quote:
             `Great and excellent service. Took less than an hour to get admitted along with the mandatory COVID test. I was admitted in the Presidential St. Michael Suite and the nurses were attentive, supportive with the best service. Discharge was seamless and everything was sorted easily and the wait staff was very prompt.`,
          },
          {
            name: "Jimmy Wanyangu",
            title: "Patient",
            image:
              "https://lh3.googleusercontent.com/a-/ALV-UjW3GTYCl5luQDf88tAC-0e8kklmblsInt5VAmbW7JWEfXQoLNs=w72-h72-p-rp-mo-ba3-br100",
            quote: `Good customer service,location is perfect within the Hospital's vicinity. Interior decor is superb especially the concrete planters on each table.
Most institutions have workers who do not understand courtesy but Nairobi hospital understands importance of courtesy right from the gate I am really impressed !`,
          },
        ]}
      />
      <Blogpost />
      <InsuranceSlider />
    </>
  );
};

export default Home;
