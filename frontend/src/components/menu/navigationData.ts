import {
  Home,
  Info,
  Heart,
  GraduationCap,
  Newspaper,
  Building2,
} from "lucide-react";
import { useIntlayer } from "react-intlayer";

export const NAVIGATION_CONTENT = () => {
  const content = useIntlayer("navigationContent");
  return [
    {
      labelKey: "home",
      icon: Home,
      link: "/",
    },
    {
      labelKey: "about_us",
      icon: Info,
      sections: [
        {
          title: content.our_story,
          items: [
            { title: content.our_history, href: "/about-us/history" },
            { title: content.vision, href: "/about-us" },
          ],
        },
        {
          title: content.governance,
          items: [
            { title: content.trustees, href: "/about-us/board-of-trustees" },
            {
              title: content.management,
              href: "/about-us/board-of-management",
            },
            {
              title: content.seniormanagement,
              href: "/about-us/senior-management",
            },
          ],
        },
        {
          title: content.accreditation_certification,
          items: [
            {
              title: content.local_accreditations,
              href: "/about-us/accreditation-certification",
            },
            {
              title: content.intl_certifications,
              href: "/about-us/accreditation-certification",
            },
            {
              title: content.quality_policy,
              href: "/about-us/accreditation-certification",
            },
          ],
        },
        {
          title: content.documents,
          items: [
            { title: content.plan, href: "/about/strategic-plan" },
            { title: content.csr, href: "/about/csr" },
          ],
        },
        {
          title: "IMAGE",
          image:
            "https://cms.thenairobihosp.org/uploads/nai_hospital_1ce6949b74.jpg",
          link: "/about-us",
          caption: content.leadership_image_caption,
        },
      ],
    },
    {
      labelKey: "clinical_services",
      icon: Heart,
      sections: [
        {
          title: content.clinical,
          items: [
            { title: content.anderson_clinic, href: "/anderson-services" },
            {
              title: content.accident_emergency,
              href: "/clinical-services/accident-emergency",
            },
            {
              title: content.pharmacy_services,
              href: "/clinical-services/pharmacy-services",
            },
            {
              title: content.laboratory_services,
              href: "/clinical-services/laboratory-services",
            },
            {
              title: content.radiology_services,
              href: "/clinical-services/radiology-services",
            },
            {
              title: content.endoscopy_services,
              href: "/clinical-services/endoscopy-services",
            },
            {
              title: content.dental_procedures,
              href: "/clinical-services/dental-procedures",
            },
          ],
        },
        {
          title: content.moreservices,
          items: [
            {
              title: content.physical_medicine_center,
              href: "/clinical-services/physical-medicine-center",
            },
            {
              title: content.psychosocial_department,
              href: "/clinical-services/psychosocial-department",
            },
            {
              title: content.cath_lab_services,
              href: "/clinical-services/cath-lab-services",
            },
            {
              title: content.antenatal_services,
              href: "/clinical-services/antenatal-services",
            },
            {
              title: content.renal_services,
              href: "/clinical-services/renal-services",
            },
            {
              title: content.oncology_services,
              href: "/clinical-services/oncology-services",
            },
          ],
        },
        {
          title: content.outpatient_services,
          items: [
            { title: content.chandaria_ae_centre, href: "/outpatient/a-e" },
            {
              title: content.capital_outpatient_centre,
              href: "/outpatient-center/capital-opc",
            },
            {
              title: content.galleria_outpatient_centre,
              href: "/outpatient-center/galleria-opc",
            },
            {
              title: content.kiambu_outpatient_centre,
              href: "/outpatient-center/kiambu-opc",
            },
            {
              title: content.rosslyn_outpatient_centre,
              href: "/outpatient-center/rosslyn-opc",
            },
            {
              title: content.southfield_outpatient_centre,
              href: "/outpatient-center/southfield-opc",
            },
            {
              title: content.warwick_outpatient_centre,
              href: "/outpatient-center/warwick-opc",
            },
          ],
        },
        {
          title: content.inpatient_services,
          items: [
            { title: content.admission_process, href: "/inpatient/admission" },
            { title: content.rooms_and_wards, href: "/inpatient/rooms-wards" },
            {
              title: content.critical_care_services,
              href: "/inpatient/critical-care",
            },
            { title: content.theatre_and_surgery, href: "/inpatient/surgery" },
            {
              title: content.infection_control,
              href: "/inpatient/infection-control",
            },
          ],
        },
        {
          title: "IMAGE",
          image:
            "https://cms.thenairobihosp.org/uploads/920x400_7286e9039b.jpg",
          link: "/clinical/medical-specialties",
          caption: content.image_caption,
        },
      ],
    },
    {
      labelKey: "college_of_health_sciences",
      icon: GraduationCap,
      sections: [
        {
          title: content.school_info,
          items: [
            { title: content.about_college, href: "/college/about-college" },
            {
              title: content.programmes_admissions,
              href: "/college/tuition-and-sponsorships",
            },
            {
              title: content.facilities_downloads,
              href: "/college/facilities-and-downloads",
            },
          ],
        },
        {
          title: content.extras,
          items: [
            { title: content.alumni, href: "/college/student-alumni" },
            { title: "FAQs", href: "/college/college-faqs" },
          ],
        },
        {
          title: "IMAGE",
          image:
            "https://cms.thenairobihosp.org/uploads/Cicely_Mc_Donell_580x500_b4d2c6689e.jpg",
          link: "/college/student-alumni",
          caption: content.college_image_caption,
        },
      ],
    },
    {
      labelKey: "notices_and_opportunities",
      icon: Newspaper,
      sections: [
        {
          title: content.news_media,
          items: [
            { title: content.latest_news, href: "/news" },
            {
              title: content.events_and_announcements,
              href: "/events-announcements",
            },
            { title: content.health_articles_blogs, href: "/blogs" },
          ],
        },
        {
          title: content.tenders,
          items: [
            { title: content.open_tenders, href: "/news/tenders" },
            { title: content.supplier_info, href: "/news/tenders" },
            {
              title: content.procurement_guidelines,
              href: "/news/tenders",
            },
          ],
        },
        {
          title: content.careers,
          items: [
            { title: content.job_vacancies, href: "/news/careers" },
            {
              title: content.volunteer_opportunities,
              href: "/news/careers",
            },
            { title: content.submit_cv, href: "/news/careers" },
          ],
        },
        {
          title: "IMAGE",
          image: "https://thenairobihosp.org/_nuxt/img/news-letter.064bc5a.png",
          link: "/careers/volunteer",
          caption: content.careers_image_caption,
        },
      ],
    },
    {
      labelKey: "other_services",
      icon: Building2,
      sections: [
        {
          title: content.facility_services,
          items: [
            {
              title: content.convention_center,
              href: "/convention-center",
            },
            { title: content.parking_transport, href: "/parking-transport" },
            { title: content.security_safety, href: "#" },
          ],
        },
        {
          title: content.support_services,
          items: [
            { title: content.laundry, href: "/laundry-services" },
            {
              title: content.catering_services,
              href: "/about-us/board-of-trustees",
            },
            {
              title: content.patient_support_services,
              href: "/about-us/board-of-management",
            },
          ],
        },
        {
          title: "IMAGE",
          image:
            "https://cms.thenairobihosp.org/uploads/920x400_Cleaning_9b5e69704e.jpg",
          link: "/about-us/board-of-management",
          caption: content.other_services_image_caption,
        },
      ],
    },
  ];
};

// Fixed type definition
export type NavigationContentKeys =
  | "home"
  | "about_us"
  | "clinical_services"
  | "college_of_health_sciences"
  | "notices_and_opportunities"
  | "other_services";
