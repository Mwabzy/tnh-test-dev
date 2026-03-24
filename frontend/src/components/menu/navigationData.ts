import {
  Home,
  Info,
  Heart,
  GraduationCap,
  Newspaper,
  Building2,
} from "lucide-react";
import { useIntlayer } from "react-intlayer";

import about from "@/assets/navigation_images/about.jpg";
import cicely from "@/assets/navigation_images/cicely.jpg";
import clinical from "@/assets/navigation_images/clinical.png";
import facilities from "@/assets/navigation_images/facilities.jpg";
import news from "@/assets/navigation_images/news.jpg";


export const NAVIGATION_CONTENT = () => {
  const content = useIntlayer("navigationContent");
  const accreditationPath = "/about-us/accreditation-certification";
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
              href: accreditationPath,
            },
            {
              title: content.intl_certifications,
              href: accreditationPath,
            },
            {
              title: content.quality_policy,
              href: accreditationPath,
            },
          ],
        },
        {
          title: content.documents,
          items: [
            { title: content.plan, href: "/about/strategic-plan" },
            
          ],
        },
        {
          title: "IMAGE",
          image: about,
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
              href: "/service-detail/accident-emergency",
            },
            {
              title: content.pharmacy_services,
              href: "/service-detail/pharmacy-services",
            },
            {
              title: content.laboratory_services,
              href: "/service-detail/laboratory-services",
            },
            {
              title: content.radiology_services,
              href: "/service-detail/radiology-services",
            },

            {
              title: content.dental_procedures,
              href: "/service-detail/dental-procedures",
            },
          ],
        },
        {
          title: content.moreservices,
          items: [
            {
              title: content.physical_medicine_center,
              href: "/service-detail/physical-medicine-center",
            },
            {
              title: content.psychosocial_department,
              href: "/service-detail/psychosocial-department",
            },
            {
              title: content.cath_lab_services,
              href: "/service-detail/cath-lab-services",
            },
            {
              title: content.renal_services,
              href: "/service-detail/renal-services",
            },
            {
              title: content.endoscopy_services,
              href: "/service-detail/endoscopy-services",
            },
            {
              title: content.oncology_services,
              href: "/service-detail/oncology-services",
            },
          ],
        },
        {
          title: content.outpatient_services,
          items: [
            {
              title: content.chandaria_ae_centre,
              href: "/outpatient-center/a-e",
            },
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
          image: clinical,
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
          image: cicely,
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
            // {
            //   title: content.events_and_announcements,
            //   href: "/events-announcements",
            // },
            { title: content.health_articles_blogs, href: "/blogs" },
            { title: content.csr, href: "/about/csr" },
          ],
        },
        {
          title: content.tenders,
          items: [
            { title: content.open_tenders, href: "/news/tenders" },
            // { title: content.supplier_info, href: "#" },
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
            // {
            //   title: content.volunteer_opportunities,
            //   href: "#",
            // },
            { title: content.submit_cv, href: "/news/careers" },
          ],
        },
        {
          title: "IMAGE",
          image: news,
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
          ],
        },
        {
          title: content.support_services,
          items: [{ title: content.laundry, href: "/laundry-services" }],
        },
        {
          title: "IMAGE",
          image: facilities,
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
