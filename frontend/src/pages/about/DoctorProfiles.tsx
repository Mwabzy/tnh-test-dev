import { FC, useState } from "react";
import ContactForm from "@/components/ContactForm";
import hospitalview from "@/assets/heroimages/heroimage2.JPG";

import alexkagiaImg from "@/assets/doctorsImages/alexkagia.png";
import bwmendwaImg from "@/assets/doctorsImages/bmwendwa.png";
import fahmoyusufImg from "@/assets/doctorsImages/fahmoyusuf.png";
import jorammugoImg from "@/assets/doctorsImages/jorammugo.png";
import laurynmengesaImg from "@/assets/doctorsImages/laurynmengesa.png";
import leahopereImg from "@/assets/doctorsImages/leahopere.png";
import mbaluImg from "@/assets/doctorsImages/mbalu.png";
import mbanganjengoImg from "@/assets/doctorsImages/mbanganjengo.png";
import mchiforImg from "@/assets/doctorsImages/mchifor.png";
import ominabrianImg from "@/assets/doctorsImages/ominabrian.png";
import peacemwigeImg from "@/assets/doctorsImages/peacemwige.png";
import pkogeImg from "@/assets/doctorsImages/pkoge.png";
import pkoigiImg from "@/assets/doctorsImages/pkoigi.png";
import rahulImg from "@/assets/doctorsImages/rahul.png";
import samuelowuorImg from "@/assets/doctorsImages/samuelowuor.png";
import skafoeImg from "@/assets/doctorsImages/skafoe.png";
import smuruthuImg from "@/assets/doctorsImages/smuruthu.png";
import tomnyabogaImg from "@/assets/doctorsImages/tomnyaboga.png";
import zeinabahmedImg from "@/assets/doctorsImages/zeinabahmed.png";
import rohnipatilImg from "@/assets/doctorsImages/rohnipatil.png";
import Heading from "@/components/Heading";
import { FaUserMd, FaCalendarCheck } from "react-icons/fa";
import { Link } from "react-router";

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

export const teamMembers: TeamMember[] = [
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
      "Nephrology Clinic",
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
    location: "Anderson Clinic",
    licensingDetails: "KMPDC - A6270",
    awardsAndRecognition: [],
    ResearchAndPublications: [
      "Prevalence of pain symptoms suggestive of Endometriosis - EAMJ, 2017",
    ],
    servicesOffered: [
      "Antenatal Clinic",
      "Gynaecology Clinic",
    ],
    socialMediaWebsite: ["LinkedIn-Alex Kagia"],
  },
  {
    name: "Dr. Ngala Bryan Mwendwa",
    title: "General Paediatrician",
    id: "p-ngala",
    image: bwmendwaImg,
    description: [
      "Dr. Ngala Bryan Mwendwa is a board-certified medical doctor with over 12 years of experience in General Paediatrics. He holds an MD and MMed in Paediatrics & Child Health.",
      "He is a member of the Kenya Paediatric Association and is recognized for his advocacy on child health and welfare across social media platforms, where he has built a trusted presence in the region.",
      "Dr. Ngala is passionate about improving child healthcare and remains actively involved in public education and professional development.",
    ],
    languages: ["English", "Swahili", "Setswana", "Russian"],
    email: "askdrreign@gmail.com",
    phone: "0705916055",
    clinicDepartment: "The Nairobi Hospital Department of Paediatrics",
    schedule: ["On request"],
    location: "The Nairobi Hospital",
    licensingDetails: "KMPDC - A8800",
    awardsAndRecognition: [
      "International Paediatrics Association Leaders Academy",
    ],
    ResearchAndPublications: [
      "List of key research projects or publications (if any)",
    ],
    servicesOffered: [
      "Paediatrics Clinic",
    ],
    socialMediaWebsite: [],
  },
  {
    name: "Dr. Fahmo Mohamed Yusuf",
    title: "Doctor - Senior Registrar",
    id: "p-fahmo",
    image: fahmoyusufImg,
    description: [
      "Dr. Fahmo Mohamed Yusuf is a highly motivated Paediatrician with approximately 10 years of healthcare experience. She earned her MBChB/MD from Emilio Aguinaldo College and her Master’s in Medicine from the University of Nairobi.",
      "Dr. Fahmo is known for providing compassionate and comprehensive care to children, with expertise in diagnosing and managing various paediatric illnesses and injuries.",
      "She is also recognized for her strong communication skills and ability to build trust and rapport with young patients and their families.",
    ],
    languages: ["English", "Swahili", "Somali"],
    email: "fahmomym@gmail.com",
    phone: "0729972810",
    clinicDepartment: "Department of Paediatrics - The Nairobi Hospital",
    schedule: ["Available every day"],
    location: "The Nairobi Hospital - Main Hospital",
    licensingDetails: "Kenya Medical Practitioners and Dentists Board - A11034",
    awardsAndRecognition: [],
    ResearchAndPublications: [],
    servicesOffered: [
      "Paediatrics Clinic",
      "Well-baby Clinic",
    ],
    socialMediaWebsite: ["LinkedIn - Dr. Fahmo Yusuf"],
  },
  {
    name: "Dr. Joram Mugo Muthui",
    title: "Obstetrician-Gynaecologist",
    id: "p-mugo",
    image: jorammugoImg,
    description: [
      "Dr. Joram Mugo Muthui is a compassionate Obstetrician and Gynaecologist with seven years of experience, dedicated to providing comprehensive and quality reproductive healthcare to women of all ages.",
    ],
    languages: ["English", "Kiswahili", "Kikuyu"],
    email: "mugomuthui@gmail.com",
    phone: "+254 708567303",
    clinicDepartment: "Obstetrics and Gynaecology",
    schedule: ["Monday to Friday, 8:00 am to 5:00 pm"],
    location: "The Nairobi Hospital, Obstetrics and Gynaecology Department",
    licensingDetails: "Kenya Medical Practitioners and Dentists Council",
    awardsAndRecognition: [],
    ResearchAndPublications: [],
    servicesOffered: ["Gynaecology Clinic", "Antenatal & Obstetrics Clinic"],
    socialMediaWebsite: [],
  },
  {
    name: "Dr. Lauryn Busolo Mengesa",
    title: "Obstetrician-Gynaecologist",
    id: "p-mengesa",
    image: laurynmengesaImg,
    description: [
      "Dr. Lauryn Busolo Mengesa is a highly experienced Obstetrician and Gynaecologist with 12 years in clinical practice. She earned both her undergraduate and Master’s degrees in Obstetrics and Gynaecology from the University of Nairobi, where she also served as Deputy Chief Resident.",
      "Her passion lies in Women’s Health, Fertility Medicine, and Global Surgery. She has received multiple certifications from the University of Washington in Leadership in Healthcare and Monitoring & Evaluation, and has trained in Global Surgery at the University of Oxford.",
      "Dr. Mengesa is actively engaged in research and healthcare systems strengthening. She has presented her work locally at Kenya Obstetrical Gynaecological Society (KOGS) meetings, and internationally at conferences such as Health Systems Global (Colombia, 2022) and the West African Infectious Diseases Conference (Sierra Leone, 2024).",
      "She is a fellow of the Emerging Voices for Global Health (EV4GH 2022) and the African Population & Health Research Centre (APHRC), and also volunteers with Safari Doctors to expand care access in remote areas.",
      "Beyond medicine, she enjoys interior design, travel, and spending time with her daughters.",
    ],
    languages: ["English", "Swahili", "Conversational French"],
    email: "lmengesa@nbihosp.org; lauryn.mengesa@gmail.com",
    phone: "+254 702 170 282",
    clinicDepartment: "Obstetrics & Gynaecology",
    schedule: ["On request"],
    location: "Nairobi Hospital",
    licensingDetails: "KMPDC - A9486",
    awardsAndRecognition: [
      "University of Washington certifications in Leadership in Healthcare and Monitoring & Evaluation",
      "Training in Global Surgery - University of Oxford",
      "Research training - UW/Fred Hutch CFAR and CITI",
      "Fellow - Emerging Voices for Global Health (EV4GH 2022)",
      "Fellow - African Population & Health Research Centre (APHRC)",
      "Presentations at KOGS, HSG Colombia (2022), and West African Infectious Diseases Conference (2024)",
    ],
    ResearchAndPublications: [
      "Phyllodes tumor, cardiovascular and chronic renal disease in a young lady on hormone replacement therapy: A case report – *Journal of Obstetrics and Gynaecology of Eastern and Central Africa*, 2024. https://doi.org/10.59692/jogeca.v36i3.270",
      "Awaiting Publication: Return to fertility after use of subcutaneous depot medroxyprogesterone acetate 104 mg – Narrative Review",
      "Awaiting Publication: Association between hypertensive disorders in pregnancy and adverse outcomes among women with SARS-CoV-2 – Nested Case-Control Study",
    ],
    servicesOffered: [
      "Antenatal & Obstetrics Clinic",
      "Gynaecology Clinic",
    ],
    socialMediaWebsite: ["@daktari_mengesa"],
  },
  {
    name: "Dr. Leah Akoth Opere",
    title: "Doctor",
    id: "p-opere",
    image: leahopereImg,
    description: [
      "Dr. Leah Akoth Opere graduated from the University of Nairobi with a Bachelor’s Degree in Medicine and Surgery. She completed her internship at Mater Hospital where she developed a passion for critical care.",
      "She worked for five years in the Nairobi Hospital ICU while pursuing her Master of Medicine in Anaesthesia and Critical Care at the University of Nairobi.",
      "Currently, she is a Senior Registrar in Anaesthesia at The Nairobi Hospital and volunteers as an Anaesthesia provider at medical camps in her free time.",
    ],
    languages: ["English", "Swahili"],
    email: "opereleah@gmail.com",
    phone: "+254723488191, +254787596541",
    clinicDepartment: "Department of Anaesthesia",
    schedule: ["Monday-Friday and every other weekend"],
    location: "The Nairobi Hospital, Main Hospital",
    licensingDetails: "KMPDC - A10930",
    awardsAndRecognition: [],
    ResearchAndPublications: [
      "Predictors of weaning success in mechanically ventilated patients at KNH critical care unit.",
    ],
    servicesOffered: [
      "Anaesthesiology Clinic",
    ],
    socialMediaWebsite: [],
  },
  {
    name: "Dr. Chifor Mfu Theresia",
    title: "Paediatrician",
    id: "p-chifor",
    image: mchiforImg,
    description: [
      "Dr. Chifor is a compassionate and internationally experienced paediatrician committed to safeguarding child health through evidence-based care, accurate diagnosis, and culturally sensitive practice.",
      "She has a strong foundation in both local and global health systems and has worked across diverse contexts, offering holistic, child-centred solutions aligned with national and international paediatric guidelines.",
      "Known for empathetic engagement with children and families, Dr. Chifor excels in problem-solving and long-term management of complex paediatric conditions.",
      "She collaborates effectively within multidisciplinary teams, contributing through teaching, coaching, and data-driven insights.",
      "Her clinical work is underpinned by rigorous research, disease diagnosis, and public health analysis.",
      "Beyond the clinic, Dr. Chifor is an active social media advocate promoting child health and empowering communities.",
      "She brings a rare balance of clinical precision and human connection.",
    ],
    languages: ["English", "French", "Swahili"],
    email: "chifor.terry@gmail.com",
    phone: "0746393720",
    clinicDepartment:
      "Paediatric Department, Nursery, St Marys and Anderson Clinics",
    schedule: ["Monday to Friday 8 am to 4 pm"],
    location: "Anderson Clinic, Room 9",
    licensingDetails: "KMPDC - C0001459",
    awardsAndRecognition: ["Presidents Award for Excellence - 2008"],
    ResearchAndPublications: [
      "Prevalence and determinants of antibiotic self-medication among adult patients with respiratory tract infections in the Mboppi Baptist Hospital, Douala, Cameroon: a cross-sectional study (Co-author, PubMed 2018)",
      "Assessment of Nutritional Status and Dietary Diversity Amongst HIV-Positive Patients Attending The Limbe Regional Hospital (Research and thesis)",
      "Sacral Perineural (Tarlov) Cyst: A rare presentation in an Adolescent in Cameroon (Co-author, Accepted for publication in The Journal of Medical Research)",
      "Exploration of feeding practices in Bomachoge Borabu sub-county Nairobi (Poster presented at KPA 2023)",
      "Antimicrobial prescription practices amongst neonates with early onset neonatal sepsis in Mboppi and Bonaberi Baptist hospitals Cameroon (Thesis)",
    ],
    servicesOffered: [
      "Pediatric Clinic",
    ],
    socialMediaWebsite: ["Terry Chifor"],
  },
  {
    name: "Dr. Damaris Kavindu Mbalu",
    title: "General Surgeon",
    id: "p-mbalu",
    image: mbaluImg,
    description: [
      "Dr. Damaris Kavindu Mbalu is a highly experienced General Surgeon with 15 years in clinical practice. She completed her undergraduate training at Moi University, School of Medicine, and pursued her surgical residency under the College of Surgeons of East, Central and Southern Africa (COSECSA).",
      "Currently, she leads the Hospital Surgery Team at The Nairobi Hospital.",
      "While she practices adult general surgery, she also has a keen passion for paediatric surgery and continues to develop in both areas.",
      "Dr. Mbalu brings strong clinical leadership and surgical expertise, along with a growing focus on trauma care and health systems management.",
    ],
    languages: ["English", "Swahili"],
    email: "dmbalu@nbihosp.org",
    phone: "0720917318",
    clinicDepartment: "Surgery / Surgical Outpatient Clinic",
    schedule: ["Thursday 8:00 am – Anderson Clinic"],
    location: "Main Hospital, The Nairobi Hospital",
    licensingDetails: "KMPDC",
    awardsAndRecognition: [
      "Leadership in Management in Health – University of Washington, June 2021",
      "Advanced Trauma Life Support – February 2021",
    ],
    ResearchAndPublications: [],
    servicesOffered: [],
    socialMediaWebsite: ["https://www.linkedin.com/in/damaris-mbalu-113733aa"],
  },
  {
    name: "Dr. Njengo Beatrice Mbanga",
    title: "Anaesthesiologist - Senior Registrar",
    id: "p-mbanga",
    image: mbanganjengoImg,
    description: [
      "Dr. Njengo Beatrice Mbanga is a dedicated Anaesthesiologist with over 12 years of medical experience, including 2 years as a specialist.",
      "She completed her undergraduate training at Kilimanjaro Christian Medical College (Tumaini University) in Moshi, Tanzania.",
      "Her internship was undertaken at Aga Khan University Hospital, Nairobi, after which she spent five years working in the Paediatrics Department, rotating between the paediatric ward, casualty, and NICU.",
      "She pursued her postgraduate studies in Anaesthesia and Critical Care at Muhimbili University of Health and Allied Sciences from November 2019 to August 2023.",
      "Dr. Mbanga currently serves at The Nairobi Hospital in the Department of Anaesthesia, offering care during pre-op, intra-op, and post-op phases of surgery.",
    ],
    languages: ["Swahili", "English"],
    email: "nmbanga@nbihosp.org",
    phone: "+254748924426",
    clinicDepartment: "Department of Anaesthesia",
    schedule: [
      "Tuesday night",
      "Thursday day",
      "Friday night",
      "Every alternate weekend",
    ],
    location: "The Main Hospital",
    licensingDetails: "KMPDC - A8695",
    awardsAndRecognition: [],
    ResearchAndPublications: [],
    servicesOffered: [
      "Anaesthesiology Clinic",
    ],
    socialMediaWebsite: [],
  },
  {
    name: "Dr. Paul Kamau Koigi",
    title:
      "Consultant Obstetrician & Gynaecologist | Sub-specialist in Reproductive Endocrinology and Fertility | HOD Research",
    id: "p-koigi",
    image: pkoigiImg,
    description: [
      "Dr. Paul Kamau Koigi is a consultant Obstetrician/Gynaecologist and IVF sub-specialist with over 16 years of experience.",
      "He holds a Bachelor’s Degree, two Master’s Degrees, a Postgraduate Diploma in Sexual and Reproductive Medicine, and is currently pursuing a PhD at the University of Nairobi.",
      "Dr. Koigi is a recognized academic, researcher, lecturer, and editor. He has held leadership roles in key medical organizations such as FASK, KOGS, and JOGECA, and has contributed to national guidelines and authored over 100 peer-reviewed publications.",
      "He currently serves as the Head of Research at The Nairobi Hospital and is an active grant reviewer for the John and Catherine McArthur Foundation.",
      "Dr. Koigi is passionate about women’s health, fertility care, surgical excellence, research mentorship, and academic publishing.",
    ],
    languages: ["English", "Swahili"],
    email: "pkoigi@nbihosp.org, dr.koigi13@gmail.com",
    phone: "0719662202",
    clinicDepartment: "Obs/Gyn Department; HOD Research; TNH Medical Journal",
    schedule: [
      "Monday: 12:00 pm – 5:00 pm (Anderson Clinic)",
      "Tuesday: 9:00 am – 1:00 pm (Southfield Clinic)",
    ],
    location: "Anderson and Southfield Clinics, The Nairobi Hospital",
    licensingDetails:
      "Kenya Medical Practitioners and Dentists Board, Medical License (2011), Specialist Recognition (2018),Sub-specialist Recognition (2024)",

    awardsAndRecognition: [
      "Best Postgraduate Student in Obstetrics and Gynaecology (2016)",
      "Founder member of the Clinical Research Society of Kenya",
      "Founder member of the Africa Reproductive Care Society",
      "Meritorious recognition for reviving JOGECA (2019)",
      "Excellence in leadership for JOGECA (2020)",
      "Certificate of excellence in PGD-SRM, University of South Wales (2024)",
      "Appreciation from TNH for Innovations Evaluation Committee leadership (2024)",
      "Alignment of ECSACOG curriculum with KMPDC (2018–2019)",
      "Service in KOGS National Governing Council (2017–2021)",
      "Ag. Asst. Secretary General of FASK (2021–present)",
    ],
    ResearchAndPublications: [
      "Sub-PI for Phase IV Clinical Trial on diabetic macular edema treatment",
      "Grant reviewer – John and Catherine McArthur Foundation",
      "Contributed to two sets of Kenyan National Reproductive Health Guidelines",
      "100+ peer-reviewed publications",
      "Top 5 publications: https://www.glowm.com/author-contribution/type/continuous/item/15233",
    ],
    servicesOffered: [
      "Obstetrics & Gynaecology Clinic",
    ],
    socialMediaWebsite: [
      "LinkedIn: Paul Koigi",
      "Facebook: Dr. Paul Koigi",
      "Instagram: dr_paul_koigi",
      "ORCID: https://orcid.org/0000-0001-6775-2184",
      "Wiley Author Services: Dr. Paul Koigi",
      "Clarivate Web of Science: Dr. Paul Koigi",
    ],
  },
  {
    name: "Dr. Peace Mukami Mwige",
    title: "General Surgeon",
    id: "p-mwige",
    image: peacemwigeImg,
    description: [
      "Dr. Peace Mwige is a dedicated and skilled General Surgeon with 10 years of experience in delivering quality surgical care. She is known for her excellent communication and interpersonal skills, complemented by strong academic and clinical training.",
      "Her career goal is to apply her knowledge and experience in a multidisciplinary environment while offering evidence-based, up-to-date care to patients. Dr. Mwige is deeply committed to lifelong learning, research, and surgical excellence.",
      "She provides both emergency and elective surgical services across various clinics including Anderson, Rosslyn Riviera, and Southfield under The Nairobi Hospital.",
    ],
    languages: ["English", "Swahili"],
    email: "peacemwige@nbihosp.org",
    phone: "0722750385",
    clinicDepartment: "Surgical Clinics – Anderson, Rosslyn, Southfield",
    schedule: [
      "Monday 8:00 am – 1:00 pm",
      "Thursday 8:00 am – 1:00 pm",
      "Friday 8:00 am – 1:00 pm",
    ],
    location: "Main Hospital / Anderson / Rosslyn Riviera / Southfield",
    licensingDetails:
      "Kenya Medical Practitioners and Dentists Council (KMPDC) – A5947",
    awardsAndRecognition: [],
    ResearchAndPublications: [
      "Incidence of post-thyroidectomy hypocalcaemia in KNH – University of Nairobi Repository",
    ],
    servicesOffered: [
      "General Surgery Clinic",
    ],
    socialMediaWebsite: ["LinkedIn: www.linkedin.com/in/peace-mwige-ab3368208"],
  },
  {
    name: "Dr. Rahul Ramkrishna Zode",
    title: "Pathologist",
    id: "r-zode",
    image: rahulImg,
    description: [
      "Dr. Rahul Ramkrishna Zode is an experienced M.D. in Pathology from Mumbai, India, with over 14.5 years of clinical and diagnostic experience. He currently serves as the Chief Pathologist at The Nairobi Hospital.",
      "Dr. Zode is a certified internal auditor for ISO 15189 standards and a member of the Indian Association of Pathologists & Microbiologists. His academic contributions include co-authoring five indexed publications.",
      "He also serves as an advisor for IVD instruments at the Pharmacy and Poisons Board (PPB) in Kenya, reflecting his expertise in laboratory quality systems and diagnostics.",
    ],
    languages: ["English", "Hindi"],
    email: "rahulzode@nbihosp.org",
    phone: "5701",
    clinicDepartment: "Department of Laboratory Services",
    schedule: [
      "Monday – Friday: 8:00 am – 5:00 pm",
      "Saturday: 8:00 am – 1:00 pm",
    ],
    location: "Main Hospital Laboratory",
    licensingDetails: "KMPDC – Reg. No: C00000114",
    awardsAndRecognition: [
      "Advisor for IVD instruments at the Pharmacy and Poisons Board (PPB) in Kenya",
    ],
    ResearchAndPublications: ["5 indexed publications (titles not specified)"],
    servicesOffered: ["Pathology & Laboratory Medicine Clinic"],
    socialMediaWebsite: [],
  },
  {
    name: "Dr. Sylvia Nyanyu Mruttu",
    title: "Obstetrician/Gynaecologist",
    id: "s-mruttu",
    image: smuruthuImg,
    description: [
      "Dr. Sylvia Mruttu is a compassionate obstetrician and gynaecologist with over 12 years of clinical experience focused on enhancing women’s health and well-being.",
      "She currently serves as the Team Leader of the Department of Obstetrics and Gynaecology at The Nairobi Hospital, where she leads multidisciplinary teams to deliver high-quality, evidence-based care.",
      "Dr. Mruttu is a passionate advocate for patient education and empowerment, and she actively promotes mentorship, protocol development, and quality improvement within reproductive health services.",
    ],
    languages: ["English", "Swahili"],
    email: "sylviamruttu@nbihosp.org",
    phone: "0721354735",
    clinicDepartment: "Department of Obstetrics and Gynaecology",
    schedule: [
      "Mondays: Capital Centre Branch, 9am–1pm",
      "Wednesdays: Anderson Clinic, Main Hospital, 9am–1pm",
    ],
    location: "Main Hospital, Capital Centre",
    licensingDetails:
      "Kenya Medical Practitioner and Dentists Board (A6841), Medical License: 2010, Specialist Recognition: 2017",

    awardsAndRecognition: [
      "Team Leader, Department of Obstetrics and Gynaecology – The Nairobi Hospital (2019)",
    ],
    ResearchAndPublications: [],
    servicesOffered: [
      "Obstetrics & Gynaecology Clinic",
    ],
    socialMediaWebsite: [
      "LinkedIn: https://www.linkedin.com/in/dr-sylvia-mruttu",
    ],
  },
  {
    name: "Mr. Samuel Owuor Odede, OGW",
    title: "Orthopaedic Surgeon (Hip & Knee Arthroplasty)",
    id: "s-odede",
    image: samuelowuorImg,
    description: [
      "Mr. Samuel Owuor Odede is a trauma surgeon and specialist in hip and knee arthroplasty with over 26 years of clinical experience.",
      "He currently serves in the Clinical Directorate and holds the position of Director, Medical Services & Research Office.",
    ],
    languages: ["English", "Swahili", "French"],
    email: "samuelodede@nbihosp.org",
    phone: "+254724101656",
    clinicDepartment: "Clinical Directorate",
    schedule: [],
    location: "Director, Medical Services & Research Office",
    licensingDetails:
      "Kenya Medical Practitioners and Dentists Council (KMPDC), General Medical Council (GMC) – UK",
    awardsAndRecognition: [
      "Harvard Presidential Scholar",
      "Presidential Award - OGW (Order of the Grand Warrior)",
    ],
    ResearchAndPublications: ["Hip Surgery in Centenarians"],
    servicesOffered: ["Orthopaedic Surgery Clinic",],
    socialMediaWebsite: ["LinkedIn: https://www.linkedin.com/in/samuelodede"],
  },
  {
    name: "Dr. Tom Maseno Nyaboga",
    title: "Consultant Anatomical Pathologist",
    id: "t-nyaboga",
    image: tomnyabogaImg,
    description: [
      "Board registered Consultant Anatomical Pathologist with 12 years of experience in diagnostic surgical pathology at a premier referral hospital laboratory.",
      "Passionate about quality in laboratory diagnosis and experienced in building quality laboratory systems aligned with ISO 15189 accreditation standards.",
      "Committed to mentorship and training for pathologists, medical students, residents, and technologists to achieve world-class tissue diagnosis and improved patient safety.",
      "Skilled in surgical pathology, cytopathology, immunohistochemistry, fine needle aspiration, and cancer diagnosis, with a holistic approach to quality laboratory medicine.",
    ],
    languages: ["English", "Swahili", "Ekegusii"],
    email: "tomnyaboga@nbihosp.org",
    phone: "Ext 5723",
    clinicDepartment: "Pathology, Main laboratory",
    schedule: ["Monday to Friday, 8:00 AM – 4:00 PM"],
    location: "Pathologists Offices, Laboratory building, Argwings Kodhek Road",
    licensingDetails:
      "Medical Practitioners and Dentists Board, Registration Number: A5423",
    awardsAndRecognition: [
      "Certificate of Appreciation for voluntary services as Vice-Chairperson of Aga Khan University Residents’ Council Committee (2012-2013)",
    ],
    ResearchAndPublications: [
      "T Nyaboga, N Kumar. Diagnosis of Langerhans cell histiocytosis on fine needle aspiration cytology – a case report (2012). Histopathology 61(Suppl. 1), 45–58.",
      "T Nyaboga, Z Moloo. HER 2 expression in gastric cancer: A Kenyan perspective (2012). Histopathology 61(Suppl. 1), 90-91.",
    ],
    servicesOffered: [
      "Anatomical Pathology Clinic",
    ],
    socialMediaWebsite: ["https://www.linkedin.com/in/tom-nyaboga-18158022/"],
  },
  {
    name: "Dr. Zeinab Ahmed Mohamed",
    title: "Senior Registrar, Pediatrician",
    id: "z-ahmed-mohamed",
    image: zeinabahmedImg,
    description: [
      "Highly motivated pediatrician with about 10 years of experience in healthcare.",
      "Completed both undergraduate and Masters in Pediatrics from the University of Nairobi.",
      "Trained in aeromedical evacuation of patients.",
      "Committed to providing quality care and achieving exceptional patient outcomes.",
    ],
    languages: ["English", "Swahili"],
    email: "Zeinabriday@gmail.com",
    phone: "0717459100",
    clinicDepartment: "Department of Pediatrics, The Nairobi Hospital",
    schedule: ["Available every day"],
    location: "The Nairobi Hospital - Main Hospital",
    licensingDetails:
      "Kenya Medical Practitioners and Dentists Board, Registration Number: A11181",
    awardsAndRecognition: [],
    ResearchAndPublications: [],
    servicesOffered: [
      "Paediatrics Clinic",
    ],
    socialMediaWebsite: ["LinkedIn - Dr. Zeinab Mohamed"],
  },
  {
    id: "s-kafoe",
    name: "Dr. Samuel Amara Kafoe",
    title: "Pediatric Specialist",
    image: skafoeImg,
    description: [
      `Dedicated Paediatric Specialist with over 5 years of experience delivering
  outstanding patient care in busy paediatric clinics, hospitals, and facilities. Committed to
  enhancing patient visits and health outcomes through exceptional care and support. Consistently
  provides top-quality treatment to patients while administering vaccines, conducting physical
  exams, and performing other procedures. Proven ability to collaborate effectively with
  colleagues to foster a welcoming and compassionate work environment. Skilled in consulting
  with parents during high-stress situations, ensuring they receive the necessary attention and
  guidance.`,
    ],
    languages: ["English", "Swahili"],
    email: "kafoesamuel@gmail.com",
    phone: "0741871018",
    clinicDepartment: "Pediatrics",
    schedule: [],
    location: "Main Hospital",
    licensingDetails: "",
    awardsAndRecognition: [],
    ResearchAndPublications: [],
    servicesOffered: ["Paediatrics Clinic",],
    socialMediaWebsite: [],
  },
  {
    id: "rohini",
    name: "Dr. Rohini Kalagouda Patil",
    title: "Pediatrician & Pediatric Critical Care Specialist",
    image: rohnipatilImg,
    description: [
      "Dr. Rohini Kalagouda Patil is a dedicated and experienced pediatrician specializing in pediatric critical care with over a decade of experience.",
      "She is currently a valued member of The Nairobi Hospital team, where she has been serving since January 2021.",
      "She has offered clinical care in non-critical as well as critical medical conditions including and not limited to critical neurological, cardiac, trauma and poisoning, metabolic conditions, and postsurgical patients.",
      "She is passionate about research in the field of pediatric sepsis, hospital-acquired infections, and antimicrobial stewardship programs.",
      "She always believes and tries to follow the principles of resilience, patience, hard work, and dedication to make a real difference to the lives of young ones in Kenya.",
    ],
    languages: ["Hindi", "English", "Kiswahili"],
    email: "rpatil@nbihosp.org",
    phone: "+254788883669",
    clinicDepartment: "Pediatrics and Pediatric Critical Care",
    schedule: [
      "Outpatient - Thursday pediatric clinic 9am–2pm at the Anderson building, Specialist Clinics, first floor",
      "Inpatient - All weekdays from 8am–4pm at The Nairobi Hospital St. Mary’s Ward, Pediatric Critical Care Unit",
    ],
    location: "The Nairobi Hospital",
    licensingDetails:
      "Medical registration number by Kenya Medical Practitioners and Dentists Council - C0000105, Specialist practice licence for 2025 - 004123",
    awardsAndRecognition: [
      "Medical registration number by Kenya Medical Practitioners and Dentists Council - C0000105",
      "Specialist practice licence for 2025 - 004123",
    ],
    ResearchAndPublications: [
      "Epidemiology of respiratory pathogens among children admitted based on rapid molecular tests in a private tertiary hospital in Nairobi, Kenya - a retrospective study (submitted to British Medical Journal Open Respiratory Research)",
      "Neonatal spontaneous abdominal aortic thrombosis associated with hypernatremic dehydration and acute renal failure - A case series",
    ],
    servicesOffered: [
      "Paediatrics Clinic",
    ],
    socialMediaWebsite: [],
  },
];

const ITEMS_PER_PAGE = 6;

const DoctorProfiles: FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [specialtyClinic, setSpecialtyClinic] = useState("");
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [firstLetter, setFirstLetter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const locations = [
    "Main Hospital",
    "Anderson Specialty",
    "Capital Center OPC",
    "Galleria OPC",
    "Kiambu OPC",
    "Roslyn Riviera OPC",
    "South Field OPC",
    "Warwick OPC",
  ];

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // Filtering Logic
  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesClinic = specialtyClinic
      ? member.clinicDepartment
          ?.toLowerCase()
          .includes(specialtyClinic.toLowerCase())
      : true;

    const matchesLocation =
      selectedLocations.length > 0
        ? selectedLocations.includes(member.location)
        : true;

    const matchesFirstLetter = firstLetter
      ? member.name.charAt(0).toLowerCase() === firstLetter.toLowerCase()
      : true;

    return (
      matchesSearch && matchesClinic && matchesLocation && matchesFirstLetter
    );
  });

  // Pagination
  const totalPages = Math.ceil(filteredMembers.length / ITEMS_PER_PAGE);
  const paginatedMembers = filteredMembers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePrev = () => currentPage > 1 && setCurrentPage((p) => p - 1);
  const handleNext = () =>
    currentPage < totalPages && setCurrentPage((p) => p + 1);

  const toggleLocation = (loc: string) => {
    setSelectedLocations((prev) =>
      prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc]
    );
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSpecialtyClinic("");
    setSelectedLocations([]);
    setFirstLetter("");
    setCurrentPage(1);
  };

  return (
    <>
      <Heading
        image_url={hospitalview}
        style="background"
        title="Doctors' Profiles"
        description="Get to know our doctors and their areas of expertise."
      />

      <div className="flex flex-col lg:flex-row gap-6 mt-6 md:mx-40 mb-10 ">
        {/* Filters Sidebar */}
        <div className="w-full lg:w-1/4 bg-white rounded-lg shadow-md border p-6 md:sticky md:top-28 h-fit">
          <h3 className="font-bold font-serif text-xl text-red-900 mb-6 pb-3">
            Narrow your search
          </h3>

          {/* By Doctor's Name */}
          <div className="mb-6">
            <label className="block text-base font-serif font-semibold text-gray-800 mb-3">
              By Doctor's Name
            </label>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search name..."
              className="w-full border-2 border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 rounded-md px-4 py-2 text-sm transition-colors duration-200"
            />
          </div>

          {/* By Specialty Clinic */}
          <div className="mb-6">
            <label className="block text-base font-serif font-semibold text-gray-800 mb-3">
              By Specialty Clinic
            </label>
            <input
              value={specialtyClinic}
              onChange={(e) => setSpecialtyClinic(e.target.value)}
              placeholder="e.g. Renal Unit"
              className="w-full border-2 border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 rounded-md px-4 py-2 text-sm transition-colors duration-200"
            />
          </div>

          {/* By Location */}
          <div className="mb-6">
            <label className="block text-base font-serif font-semibold text-gray-800 mb-3">
              By Location
            </label>
            <div className="space-y-2">
              {locations.map((loc) => (
                <div key={loc} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedLocations.includes(loc)}
                    onChange={() => toggleLocation(loc)}
                    className="mr-3 w-4 h-4 text-red-600 border-2 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
                  />
                  <span className="text-sm text-gray-700 hover:text-red-900 cursor-pointer select-none" onClick={() => toggleLocation(loc)}>
                    {loc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Filter by First Name */}
          <div className="mb-6">
            <label className="block text-base font-serif font-semibold text-gray-800 mb-3">
              Filter by First Name
            </label>
            <div className="grid grid-cols-6 gap-2">
              {alphabet.map((letter) => (
                <button
                  key={letter}
                  onClick={() => setFirstLetter(letter)}
                  className={`w-8 h-8 rounded-full text-sm font-medium border-2 transition-all duration-200 ${
                    firstLetter === letter
                      ? "bg-red-900 text-white border-red-900 shadow-md transform scale-105"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-red-50 hover:border-red-300 hover:text-red-900"
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>

          {/* Reset Filters */}
          <button
            onClick={resetFilters}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-md transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md border border-gray-300"
          >
            Reset all filters
          </button>
        </div>

        {/* Doctors List */}
        <div className="flex-1">
          {paginatedMembers.length > 0 ? (
            paginatedMembers.map((member, idx) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row bg-white border border-gray-200 rounded-lg shadow-sm mb-6 overflow-hidden hover:shadow-md transition"
              >
                {/* Doctor Image */}
                <div className="p-2">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h:3/4 md:w-50 md:h-50 object-cover"
                  />
                </div>

                {/* Doctor Info */}
                <div className="md:w-2/3 p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold font-serif text-red-800">
                      {member.name}
                    </h3>
                    <p className="text-gray-700 font-serif font-medium mb-2">
                      {member.title}, {member.location}
                    </p>
                    <p className="text-gray-600 text-sm font-sans leading-relaxed">
                      {member.description[0].slice(0, 320)}...
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-4 ">
                    <Link
                      to={`/booking-calendar?doctorId=${member.id}&doctorName=${encodeURIComponent(member.name)}&doctorTitle=${encodeURIComponent(member.title)}`}
                      className="flex items-center justify-center gap-2 text-red-900  px-4 py-2 rounded-md text-sm hover:bg-red-900 hover:text-white transition"
                    >
                      <FaCalendarCheck />
                      Book Appointment
                    </Link>
                    <Link
                      to={`/doctor-details/${member.id}`}
                      className="flex items-center justify-center gap-2 text-red-900  px-4 py-2 rounded-md text-sm hover:bg-red-900 hover:text-white transition"
                    >
                      <FaUserMd />
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-10">
              No doctors found matching your filters.
            </p>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
      <ContactForm contactInfo={{ phone: "" }} />
    </>
  );
};

export default DoctorProfiles;
