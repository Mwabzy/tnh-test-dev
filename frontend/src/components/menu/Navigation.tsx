import { FC } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Link } from "react-router";
import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { useIntlayer } from "react-intlayer";

type NavigationProps = object;

const patients_visitors: {
  title: string;
  href: string;
  description: string;
}[] = [
  {
    title: "Clinical Services",
    href: "/clinical-services",
    description:
      "Information about the clinical services available at the Nairobi Hospital.",
  },
  {
    title: "Admission Charges",
    href: "/admission-charges",
    description: "The cost of admission to the Nairobi Hospital.",
  },
  {
    title: "Outpatient Centers",
    href: "/outpatient-centers",
    description:
      "Information about the outpatient centers available at the Nairobi Hospital.",
  },
  {
    title: "Rooms & Wards",
    href: "/rooms-and-wards",
    description:
      "Information about the rooms and wards available at the Nairobi Hospital.",
  },
  {
    title: "High Critical Care",
    href: "/high-critical-care",
    description:
      "Information about the high critical care services available at the Nairobi Hospital.",
  },

  {
    title: "Research",
    href: "/research",
    description:
      "Information about the research services available at the Nairobi Hospital.",
  },
  {
    title: "Clinical FAQs",
    href: "/clinical-faqs",
    description:
      "Frequently asked questions about the clinical services at the Nairobi Hospital.",
  },
  {
    title: "Doctors' Profiles",
    href: "/doctor-profiles",
    description: "Get to know our doctors and their areas of expertise.",
  },
];

// other services
// Laundry, convention center, medical tourism

const other_services: { title: string; href: string; description: string }[] = [
  {
    title: "Laundry Services",
    href: "/laundry-services",
    description:
      "Information about the laundry services available at the Nairobi Hospital.",
  },
  {
    title: "Convention Center",
    href: "/convention-center",
    description:
      "Information about the convention center available at the Nairobi Hospital.",
  },
  {
    title: "Medical Tourism",
    href: "/medical-tourism",
    description:
      "Information about the medical tourism services available at the Nairobi Hospital.",
  },
];

// news and media - new, tenders, careers

const college_health_sciences: {
  title: string;
  href: string;
  description: string;
}[] = [
  {
    title: "About the college",
    href: "/college/about-college",
    description:
      "Information about the College of Health Sciences at the Nairobi Hospital.",
  },
  {
    title: "Programmes, Admission & Sponsorships",
    href: "/college/tuition-and-sponsorships",
    description:
      "Information about the tuition and sponsorships available at the college.",
  },
  {
    title: "Facilities and Downloads",
    href: "/college/facilities-and-downloads",
    description:
      "Information about the facilities and downloads available at the College of Health Sciences.",
  },
  {
    title: "Alumni Network",
    href: "/college/student-alumni",
    description:
      "Information about the alumni of the College of Health Sciences.",
  },
  {
    title: "FAQs",
    href: "/college/college-faqs",
    description:
      "Frequently asked questions about the College of Health Sciences.",
  },
];

const news_media: { title: string; href: string; description: string }[] = [
  {
    title: "News",
    href: "/news",
    description:
      "Information about the new services available at the Nairobi Hospital.",
  },
  {
    title: "Tenders",
    href: "/news/tenders",
    description:
      "Information about the tenders available at the Nairobi Hospital.",
  },
  {
    title: "Careers",
    href: "/news/careers",
    description:
      "Information about the career opportunities available at the Nairobi Hospital.",
  },
];

const Navigation: FC<NavigationProps> = () => {
  const content = useIntlayer("navigationContent");
  return (
    <div>
      <Menubar className="flex-col md:flex-row  border-none shadow-none bg-inherit">
        <MenubarMenu>
          <MenubarTrigger asChild>
            <Link to="/">{content.home}</Link>
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>{content.about_us}</MenubarTrigger>
          <MenubarContent>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 px-8 py-6 w-full">
              {/* Column 1: Our Story */}
              <li className="border-r border-gray-300 pr-4">
                <h3 className="font-bold ml-2 mb-2">OUR STORY</h3>
                <ul className="space-y-1">
                  <ListItem title="Our History" href="/about-us/history" />
                  <ListItem
                    title="Vision, Mission & Core Values"
                    href="/about-us"
                  />
                </ul>
              </li>

              {/* Column 2: Corporate Governance */}
              <li className="border-r border-gray-300 pr-4">
                <h3 className="font-bold ml-2 mb-2">CORPORATE GOVERNANCE</h3>
                <ul className="space-y-1">
                  <ListItem
                    title="Board of Governance Structure"
                    href="/about/board-structure"
                  />
                  <ListItem
                    title="Board of Trustees"
                    href="/about-us/board-of-trustees"
                  />
                  <ListItem
                    title="Board of Management"
                    href="/about-us/board-of-management"
                  />
                  <ListItem
                    title="Senior Management"
                    href="/about-us/senior-management"
                  />
                </ul>
              </li>

              {/* Column 3: Accreditations & Quality */}
              <li className="border-r border-gray-300 pr-4">
                <h3 className="font-bold ml-2 mb-2">
                  ACCREDITATIONS & QUALITY
                </h3>
                <ul className="space-y-1">
                  <ListItem
                    title="Local Accreditations"
                    href="/about-us/accreditation-certification"
                  />
                  <ListItem
                    title="International Certifications"
                    href="/about-us/accreditation-certification"
                  />
                  <ListItem
                    title="Quality & Patient Safety"
                    href="/about-us/accreditation-certification"
                  />
                </ul>
              </li>

              {/* Column 4: Institutional Documents */}
              <li className="border-r border-gray-300 pr-4">
                <h3 className="font-bold ml-2 mb-2">INSTITUTIONAL DOCUMENTS</h3>
                <ul className="space-y-1">
                  <ListItem
                    title="Annual Reports"
                    href="/about/annual-reports"
                  />
                  <ListItem
                    title="Strategic Plan"
                    href="/about/strategic-plan"
                  />
                  <ListItem
                    title="Corporate Social Responsibility"
                    href="/about/csr"
                  />
                </ul>
              </li>
            </ul>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>{content.services}</MenubarTrigger>
          <MenubarContent>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-8 py-6 w-full">
              {/* Column 1: Clinical Services */}
              <li className="border-r border-gray-300 pr-4">
                <h3 className="font-bold ml-2 mb-2">CLINICAL SERVICES</h3>
                <ul className="space-y-1">
                  <ListItem
                    title="Medical Departments & Specialties"
                    href="/clinical/medical-specialties"
                  />
                  <ListItem
                    title="Diagnostic Services"
                    href="/clinical/diagnostic"
                  />
                  <ListItem
                    title="Pharmacy Services"
                    href="/clinical/pharmacy"
                  />
                  <ListItem title="Nursing Services" href="/clinical/nursing" />
                </ul>
              </li>

              {/* Column 2: Outpatient Services */}
              <li className="border-r border-gray-300 pr-4">
                <h3 className="font-bold ml-2 mb-2">OUTPATIENT SERVICES</h3>
                <ul className="space-y-1">
                  <ListItem
                    title="A&E Outpatient Centre"
                    href="/outpatient/a-e"
                  />
                  <ListItem
                    title="Rosslyn Outpatient Centre"
                    href="/outpatient-center/rosslyn-opc"
                  />
                  <ListItem
                    title="Warwick Outpatient Centre"
                    href="/outpatient-center/warwick-opc"
                  />
                  <ListItem
                    title="Galleria Outpatient Centre"
                    href="/outpatient-center/galleria-opc"
                  />
                  <ListItem
                    title="Southfield Outpatient Centre"
                    href="/outpatient-center/southfield-opc"
                  />
                  <ListItem
                    title="Kiambu Outpatient Centre"
                    href="/outpatient-center/kiambu-opc"
                  />
                  <ListItem
                    title="Capital Outpatient Centre"
                    href="/outpatient-center/capital-opc"
                  />
                </ul>
              </li>

              {/* Column 3: Inpatient & Critical Care */}
              <li className="border-r border-gray-300 pr-4">
                <h3 className="font-bold ml-2 mb-2">
                  INPATIENT & CRITICAL CARE
                </h3>
                <ul className="space-y-1">
                  <ListItem
                    title="Admission Process"
                    href="/inpatient/admission"
                  />
                  <ListItem
                    title="Rooms & Wards"
                    href="/inpatient/rooms-wards"
                  />
                  <ListItem
                    title="Critical Care Units (ICU, HDU, NICU, CCU)"
                    href="/inpatient/critical-care"
                  />
                  <ListItem
                    title="Theatre & Surgery"
                    href="/inpatient/surgery"
                  />
                  <ListItem
                    title="Physiotherapy & Rehab"
                    href="/inpatient/physiotherapy"
                  />
                  <ListItem
                    title="Palliative Care"
                    href="/inpatient/palliative"
                  />
                </ul>
              </li>

              {/* Column 4: International Patients */}
              <li className="border-r border-gray-300 pr-4">
                <h3 className="font-bold ml-2 mb-2">INTERNATIONAL PATIENTS</h3>
                <ul className="space-y-1">
                  <ListItem
                    title="Medical Tourism Overview"
                    href="/international/overview"
                  />
                  <ListItem
                    title="Travel Support & Visas"
                    href="/international/visas"
                  />
                  <ListItem
                    title="Language Services"
                    href="/international/language"
                  />
                  <ListItem
                    title="Concierge & Accommodation"
                    href="/international/concierge"
                  />
                </ul>
              </li>
            </ul>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Doctors & Medical Staff</MenubarTrigger>
          <MenubarContent>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 px-8 py-6 w-fit mx-auto justify-center">
              <li className="border-r border-gray-300 pr-4">
                <ul className="space-y-1">
                  <h3 className="font-bold ml-2 mb-2">FIND A DOCTOR</h3>
                  <ListItem title="Doctors’ Profiles" href="#" />
                  <ListItem title="Book an Appointment" href="#" />
                </ul>
              </li>

              <li className="border-r border-gray-300 pr-4">
                <ul className="space-y-1">
                  <h3 className="font-bold ml-2 mb-2">MEDICAL TEAM</h3>
                  <ListItem title="Visiting Consultants" href="#" />
                  <ListItem title="Nursing & Allied Health Staff" href="#" />
                </ul>
              </li>

              <li className="border-r border-gray-300 pr-4">
                <ul className="space-y-1">
                  <h3 className="font-bold ml-2 mb-2">CAREERS IN MEDICINE</h3>
                  <ListItem title="Join Our Medical Team" href="#" />
                  <ListItem
                    title="Internship & Residency Programmes"
                    href="#"
                  />
                  <ListItem title="CME Programmes" href="#" />
                </ul>
              </li>
            </ul>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>{content.college_of_health_sciences}</MenubarTrigger>
          <MenubarContent>
            <ul className="flex flex-col md:flex-row gap-4 px-8 py-6 justify-center items-start">
              {/* Column 1: About school & programmes*/}
              <li className="border-r border-gray-300 pr-4">
                <ul className="space-y-1">
                  <h3 className="font-bold ml-2 mb-2">SCHOOL INFORMATION</h3>
                  <ListItem
                    title="About the college"
                    href="/college/about-college"
                  />
                  <ListItem
                    title="Programmes, Admission & Sponsorships"
                    href="/college/tuition-and-sponsorships"
                  />
                  <ListItem
                    title="Facilities and Downloads"
                    href="/college/facilities-and-downloads"
                  />
                </ul>
              </li>

              {/* Column 2 */}
              <li className="border-r border-gray-300 pr-4">
                <ul className="space-y-1">
                  <h3 className="font-bold ml-2 mb-2">EXTRAS</h3>
                  <ListItem
                    title="Alumni Network"
                    href="/college/student-alumni"
                  />
                  <ListItem title="FAQs" href="/college/college-faqs" />
                </ul>
              </li>
            </ul>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>{content.other_services}</MenubarTrigger>
          <MenubarContent>
            <ul className="flex flex-col md:flex-row gap-4 px-8 py-6 justify-center items-start">
              {/* Column 1: Facilities*/}
              <li className="border-r border-gray-300 pr-4">
                <h3 className="font-bold ml-2 mb-2">HOSPITAL FACILITIES</h3>
                <ul className="space-y-1">
                  <ListItem
                    title="Convention & Conference Centre"
                    href="/convention-center"
                  />
                  <ListItem title="Parking & Transport" href="#" />
                  <ListItem title="Security & Safety" href="#" />
                </ul>
              </li>

              {/* Column 2: Support Services */}
              <li className="border-r border-gray-300 pr-4">
                <h3 className="font-bold ml-2 mb-2">SUPPORT SERVICES</h3>
                <ul className="space-y-1">
                  <ListItem
                    title="Laundry & Housekeeping"
                    href="/laundry-services"
                  />
                  <ListItem
                    title="Catering Services"
                    href="/about-us/board-of-trustees"
                  />
                  <ListItem
                    title="Patient Support Services"
                    href="/about-us/board-of-management"
                  />
                </ul>
              </li>
            </ul>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>{content.notices_and_opportunities}</MenubarTrigger>
          <MenubarContent>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 px-8 py-6 w-fit mx-auto justify-center">
              {/* Column 1: News & Media */}
              <li className="border-r border-gray-300 pl-8">
                <h3 className="font-bold ml-2 mb-2">NEWS & MEDIA</h3>
                <ul className="space-y-1">
                  <ListItem title="Latest News" href="/news/latest" />
                  <ListItem
                    title="Events & Announcements"
                    href="/news/events"
                  />
                  <ListItem
                    title="Health Articles & Blogs"
                    href="/news/articles"
                  />
                </ul>
              </li>

              {/* Column 2: Tenders */}
              <li className="border-r border-gray-300 pl-4">
                <h3 className="font-bold ml-2 mb-2">TENDERS</h3>
                <ul className="space-y-1">
                  <ListItem title="Open Tenders" href="/tenders/open" />
                  <ListItem
                    title="Supplier Information"
                    href="/tenders/suppliers"
                  />
                  <ListItem
                    title="Procurement Guidelines"
                    href="/tenders/guidelines"
                  />
                </ul>
              </li>

              {/* Column 3: Careers */}
              <li className="border-r border-gray-300 pr-4">
                <h3 className="font-bold ml-2 mb-2">CAREERS</h3>
                <ul className="space-y-1">
                  <ListItem title="Job Vacancies" href="/careers/jobs" />
                  <ListItem
                    title="Volunteer Opportunities"
                    href="/careers/volunteer"
                  />
                  <ListItem title="Submit Your CV" href="/careers/submit-cv" />
                </ul>
              </li>
            </ul>
          </MenubarContent>
        </MenubarMenu>
        <div className="flex md:hidden items-center gap-2 mt-10 ">
          <Button
            onClick={() => (window.location.href = "/contact")}
            className="text-xs font-serif flex items-center gap-1"
            variant="outline"
            size="sm"
          >
            <Phone className="text-red-900 w-4 h-4" />
            <span className="text-sm font-serif ">+254 703 082 000</span>
          </Button>
        </div>
      </Menubar>
    </div>
  );
};

export default Navigation;

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <MenubarItem asChild>
        <a
          ref={ref}
          className={cn(
            "flex flex-col justify-center items-start select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-3xl leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </MenubarItem>
    </li>
  );
});
ListItem.displayName = "ListItem";
