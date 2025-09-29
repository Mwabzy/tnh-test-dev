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
    title: "Tuition and Sponsorships",
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
    title: "Alumni",
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
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 w-full max-w-[1000px]">
              {/* Column 1: Our Story */}
              <li>
                <h3 className="font-bold mb-2">Our Story</h3>
                <ul className="space-y-1">
                  <ListItem title="Our History" href="/about/history" />
                  <ListItem
                    title="Vision, Mission & Core Values"
                    href="/about/vision-mission"
                  />
                </ul>
              </li>

              {/* Column 2: Corporate Governance */}
              <li>
                <h3 className="font-bold mb-2">Corporate Governance</h3>
                <ul className="space-y-1">
                  <ListItem
                    title="Board Governance Structure"
                    href="/about/board-structure"
                  />
                  <ListItem title="Trustees" href="/about/trustees" />
                  <ListItem
                    title="Board of Management"
                    href="/about/board-management"
                  />
                  <ListItem
                    title="Senior Management"
                    href="/about/senior-management"
                  />
                </ul>
              </li>

              {/* Column 3: Accreditations & Quality */}
              <li>
                <h3 className="font-bold mb-2">Accreditations & Quality</h3>
                <ul className="space-y-1">
                  <ListItem
                    title="Local Accreditations"
                    href="/about/local-accreditations"
                  />
                  <ListItem
                    title="International Certifications"
                    href="/about/international-certifications"
                  />
                  <ListItem
                    title="Quality & Patient Safety"
                    href="/about/quality-safety"
                  />
                </ul>
              </li>

              {/* Column 4: Institutional Documents */}
              <li>
                <h3 className="font-bold mb-2">Institutional Documents</h3>
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
          <MenubarContent className="absolute left-0 top-full w-screen bg-white shadow-lg border-t z-50">
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
              {/* Column 1: Clinical Services */}
              <li>
                <h3 className="font-bold mb-2">Clinical Services</h3>
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
              <li>
                <h3 className="font-bold mb-2">Outpatient Services</h3>
                <ul className="space-y-1">
                  <ListItem
                    title="A&E Outpatient Centre"
                    href="/outpatient/a-e"
                  />
                  <ListItem
                    title="Roselyn Outpatient Centre"
                    href="/outpatient/roselyn"
                  />
                  <ListItem
                    title="Warwick Outpatient Centre"
                    href="/outpatient/warwick"
                  />
                  <ListItem
                    title="Galleria Outpatient Centre"
                    href="/outpatient/galleria"
                  />
                  <ListItem
                    title="Southfield Outpatient Centre"
                    href="/outpatient/southfield"
                  />
                  <ListItem
                    title="Kiambu Outpatient Centre"
                    href="/outpatient/kiambu"
                  />
                  <ListItem
                    title="Capital Outpatient Centre"
                    href="/outpatient/capital"
                  />
                </ul>
              </li>

              {/* Column 3: Inpatient & Critical Care */}
              <li>
                <h3 className="font-bold mb-2">Inpatient & Critical Care</h3>
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
              <li>
                <h3 className="font-bold mb-2">International Patients</h3>
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
          <MenubarTrigger>{content.college_of_health_sciences}</MenubarTrigger>
          <MenubarContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {college_health_sciences.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {/* {component.description} */}
                </ListItem>
              ))}
            </ul>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>{content.other_services}</MenubarTrigger>
          <MenubarContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[400px] md:grid-cols-1 lg:w-[400px]">
              {other_services.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {/* {component.description} */}
                </ListItem>
              ))}
            </ul>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>{content.notices_and_opportunities}</MenubarTrigger>
          <MenubarContent className="absolute left-0 top-full w-screen bg-white shadow-lg border-t z-50">
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
              {/* Column 1: News & Media */}
              <li>
                <h3 className="font-bold mb-2">News & Media</h3>
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
              <li>
                <h3 className="font-bold mb-2">Tenders</h3>
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
              <li>
                <h3 className="font-bold mb-2">Careers</h3>
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
        </MenubarMenu>
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
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </MenubarItem>
    </li>
  );
});
ListItem.displayName = "ListItem";
