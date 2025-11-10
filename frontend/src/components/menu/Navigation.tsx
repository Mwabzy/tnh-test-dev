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
import {
  Phone,
  Home,
  Info,
  Heart,
  GraduationCap,
  Newspaper,
  Building2,
} from "lucide-react";
import anderson from "@/assets/opc_images/anderson.jpg";

import { useIntlayer } from "react-intlayer";

type NavigationProps = object;

const Navigation: FC<NavigationProps> = () => {
  const content = useIntlayer("navigationContent");
  return (
    <div>
      <Menubar className="flex-col md:flex-row border-none shadow-none bg-inherit text-sm font-medium">
        {/* Home */}
        <MenubarMenu>
          <MenubarTrigger asChild>
            <Link to="/" className="flex items-center gap-1">
              <Home className="w-4 h-4" />
              {content.home}
            </Link>
          </MenubarTrigger>
        </MenubarMenu>

        {/* About Us */}
        <MenubarMenu>
          <MenubarTrigger className="flex items-center gap-1">
            <Info className="w-4 h-4" />
            {content.about_us}
          </MenubarTrigger>
          <MenubarContent>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-3 px-10 py-6 items-start w-fit mx-auto">
              {/* Column 1: Our Story */}
              <li className="pr-4">
                {" "}
                <h3 className="font-bold text-red-900 text-xs font-serif ml-2 mb-2">
                  OUR STORY
                </h3>{" "}
                <ul className="space-y-1 text-base">
                  {" "}
                  <ListItem title="Our History" href="/about-us/history" />{" "}
                  <ListItem title="Vision, Mission & Core Values" href="/about-us" />{" "}
                </ul>{" "}
              </li>
              {/* Column 2: Corporate Governance */}
              <li className="pr-4">
                {" "}
                <h3 className="font-bold text-red-900 text-xs font-serif ml-2 mb-2">
                  CORPORATE GOVERNANCE
                </h3>{" "}
                <ul className="space-y-1 text-base">
                  {" "}
                  <ListItem
                    title="Board of Trustees"
                    href="/about-us/board-of-trustees"
                  />{" "}
                  <ListItem
                    title="Board of Management"
                    href="/about-us/board-of-management"
                  />{" "}
                  <ListItem
                    title="Senior Management"
                    href="/about-us/senior-management"
                  />{" "}
                </ul>{" "}
              </li>
              {/* Column 3: Accreditations & Quality */}
              <li className="pr-4">
                {" "}
                <h3 className="font-bold text-red-900 text-xs font-serif ml-2 mb-2">
                  {" "}
                  ACCREDITATIONS & QUALITY{" "}
                </h3>{" "}
                <ul className="space-y-1 text-base">
                  {" "}
                  <ListItem
                    title="Local Accreditations"
                    href="/about-us/accreditation-certification"
                  />{" "}
                  <ListItem
                    title="International Certifications"
                    href="/about-us/accreditation-certification"
                  />{" "}
                  <ListItem
                    title="Quality & Patient Safety"
                    href="/about-us/accreditation-certification"
                  />{" "}
                </ul>{" "}
              </li>
              {/* Column 4: Institutional Documents */}
              <li className="pr-4">
                {" "}
                <h3 className="font-bold text-red-900 text-xs font-serif ml-2 mb-2">
                  INSTITUTIONAL DOCUMENTS
                </h3>{" "}
                <ul className="space-y-1 text-base">
                  {" "}
                  <ListItem
                    title="Strategic Plan"
                    href="/about/strategic-plan"
                  />{" "}
                  <ListItem
                    title="Corporate Social Responsibility"
                    href="/about/csr"
                  />{" "}
                </ul>{" "}
              </li>{" "}
              {/* Column 5 (Image Section) */}
              <div className="flex justify-center items-start">
                <Link
                  to="/about-us"
                  className="relative block w-48 h-32 rounded-md overflow-hidden shadow-md group"
                >
                  {/* Image */}
                  <img
                    src={anderson}
                    alt="Leadership & Governance"
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                  {/* Text overlay */}
                  <p className="absolute bottom-2 left-2 text-white text-xs font-medium leading-snug">
                    Leadership & Governance at the
                    <br />
                    Nairobi Hospital
                  </p>
                </Link>
              </div>
            </ul>
          </MenubarContent>
        </MenubarMenu>

        {/*  Clinical Services / Doctors */}
        <MenubarMenu>
          <MenubarTrigger className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            Clinical Services
          </MenubarTrigger>
          <MenubarContent>
            <ul className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-5 gap-x-6 gap-y-3 px-10 py-6 items-start w-fit mx-auto">
              {/* Column 1: Clinical Services */}
              <li className="pr-4">
                {" "}
                <h3 className="font-bold text-red-900 text-xs font-serif ml-2 mb-2">
                  CLINICAL SERVICES
                </h3>{" "}
                <ul className="space-y-1 text-base">
                  {" "}
                  <ListItem
                    title="Anderson Specialty Clinics"
                    href="/clinical-services"
                  />{" "}
                  <ListItem
                    title="Accident and Emergency"
                    href="/clinical-services/accident-emergency"
                  />{" "}
                  <ListItem
                    title="Pharmacy Services"
                    href="/clinical-services/pharmacy-services"
                  />{" "}
                  <ListItem
                    title="Laboratory Services"
                    href="/clinical-services/laboratory-services"
                  />{" "}
                  <ListItem
                    title="Radiology Services"
                    href="/clinical-services/radiology-services"
                  />{" "}
                  <ListItem
                    title="Endoscopy Services"
                    href="/clinical-services/endoscopy-services"
                  />{" "}
                  <ListItem
                    title="Dental Procedures"
                    href="/clinical-services/dental-procedures"
                  />{" "}
                </ul>{" "}
              </li>

              {/* Column 2: Clinical Services */}
              <li className="pr-4">
  {" "}
  <h3 className="font-bold text-red-900 text-xs font-serif ml-2 mb-2">
    CLINICAL SERVICES
  </h3>{" "}
  <ul className="space-y-1 text-base">
    { " " }
    <ListItem
      title="Physical Medicine Centre"
      href="/clinical-services/physical-medicine-center"
    />{" "}
    <ListItem
      title="Psychosocial Department"
      href="/clinical-services/psychosocial-department"
    />{" "}
    <ListItem
      title="Cath Lab Services"
      href="/clinical-services/cath-lab-services"
    />{" "}
    <ListItem
      title="Antenatal Services"
      href="/clinical-services/antenatal-services"
    />{" "}
    <ListItem
      title="Renal Services"
      href="/clinical-services/renal-services"
    />{" "}
    <ListItem
      title="Oncology Services"
      href="/clinical-services/oncology-services"
    />{" "}
  </ul>{" "}
</li>

              {/* Column 3: Outpatient Services */}
              <li className=" pr-4">
                {" "}
                <h3 className="font-bold text-red-900 text-xs font-serif ml-2 mb-2">
                  OUTPATIENT SERVICES
                </h3>{" "}
                <ul className="space-y-1 text-base">
                  {" "}
                  <ListItem
                    title="Chandaria A&E Centre"
                    href="/outpatient/a-e"
                  />{" "}
                  <ListItem
                    title="Capital Outpatient Centre"
                    href="/outpatient-center/capital-opc"
                  />{" "}
                  <ListItem
                    title="Galleria Outpatient Centre"
                    href="/outpatient-center/galleria-opc"
                  />{" "}
                  <ListItem
                    title="Kiambu Outpatient Centre"
                    href="/outpatient-center/kiambu-opc"
                  />{" "}
                  <ListItem
                    title="Rosslyn Outpatient Centre"
                    href="/outpatient-center/rosslyn-opc"
                  />{" "}
                  <ListItem
                    title="Southfield Outpatient Centre"
                    href="/outpatient-center/southfield-opc"
                  />{" "}
                  <ListItem
                    title="Warwick Outpatient Centre"
                    href="/outpatient-center/warwick-opc"
                  />{" "}
                </ul>{" "}
              </li>
              {/* Column 4: Inpatient & Critical Care */}
              <li className="pr-4">
                {" "}
                <h3 className="font-bold text-red-900 text-xs font-serif ml-2 mb-2">
                  {" "}
                  INPATIENT & CRITICAL CARE{" "}
                </h3>{" "}
                <ul className="space-y-1 text-base">
                  {" "}
                  <ListItem
                    title="Admission Process"
                    href="/inpatient/admission"
                  />{" "}
                  <ListItem
                    title="Rooms and Wards"
                    href="/inpatient/rooms-wards"
                  />{" "}
                  <ListItem
                    title="Critical Care Services"
                    href="/inpatient/critical-care"
                  />{" "}
                  <ListItem
                    title="Theatre & Surgery"
                    href="/inpatient/surgery"
                  />{" "}
                  <ListItem
                    title="Infection Control"
                    href="/inpatient/infection-control"
                  />{" "}
                </ul>{" "}
              </li>
              {/* Column 5 (Image Section) */}
              <div className="flex justify-center items-start">
                <Link
                  to="/clinical/medical-specialties"
                  className="relative block w-48 h-32 rounded-md overflow-hidden shadow-md group"
                >
                  {/* Image */}
                  <img
                    src={anderson}
                    alt="Leadership & Governance"
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                  {/* Text overlay */}
                  <p className="absolute bottom-2 left-2 text-white text-xs font-medium leading-snug">
                    Leadership & Governance at the
                    <br />
                    Nairobi Hospital
                  </p>
                </Link>
              </div>
            </ul>
          </MenubarContent>
        </MenubarMenu>

        {/* College of Health Sciences */}
        <MenubarMenu>
          <MenubarTrigger className="flex items-center gap-1">
            <GraduationCap className="w-4 h-4" />
            {content.college_of_health_sciences}
          </MenubarTrigger>
          <MenubarContent>
            <ul className="flex flex-col md:flex-row lg:grid-cols-3 gap-x-6 gap-y-3 px-10 py-6 items-start w-fit mx-auto">
              {/* Column 1: About school & programmes*/}
              <li className="pr-4">
                <ul className="space-y-1 text-base">
                  <h3 className="font-bold text-red-900 text-xs font-serif ml-2 mb-2">
                    SCHOOL INFORMATION
                  </h3>
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
              <li className="pr-4">
                <ul className="space-y-1 text-base">
                  <h3 className="font-bold text-red-900 text-xs font-serif ml-2 mb-2">
                    EXTRAS
                  </h3>
                  <ListItem
                    title="Alumni Network"
                    href="/college/student-alumni"
                  />
                  <ListItem title="FAQs" href="/college/college-faqs" />
                </ul>
              </li>
              {/* Column 5 (Image Section) */}
              <div className="flex justify-center items-start">
                <Link
                  to="/college/student-alumni"
                  className="relative block w-48 h-32 rounded-md overflow-hidden shadow-md group"
                >
                  {/* Image */}
                  <img
                    src={anderson}
                    alt="Leadership & Governance"
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                  {/* Text overlay */}
                  <p className="absolute bottom-2 left-2 text-white text-xs font-medium leading-snug">
                    Leadership & Governance at the
                    <br />
                    Nairobi Hospital
                  </p>
                </Link>
              </div>
            </ul>
          </MenubarContent>
        </MenubarMenu>

        {/*  Research */}
        {/* <MenubarMenu>
          <MenubarTrigger className="flex items-center gap-1">
            <FlaskConical className="w-4 h-4" />
            Research
          </MenubarTrigger>
          <MenubarContent>
          
          </MenubarContent>
        </MenubarMenu> */}

        {/* News & Opportunities */}
        <MenubarMenu>
          <MenubarTrigger className="flex items-center gap-1">
            <Newspaper className="w-4 h-4" />
            {content.notices_and_opportunities}
          </MenubarTrigger>
          <MenubarContent>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-3 px-10 py-6 items-start w-fit mx-auto">
              {/* Column 1: News & Media */}{" "}
              <li className="pr-4">
                <h3 className="font-bold ml-2 mb-2 text-xs text-red-900 font-serif">
                  NEWS & MEDIA
                </h3>
                <ul className="space-y-1 text-base">
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
              <li className="pr-4">
                {" "}
                <h3 className="font-bold ml-2 mb-2 text-red-900 text-xs font-serif">
                  TENDERS
                </h3>{" "}
                <ul className="space-y-1 text-base">
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
              </li>{" "}
              {/* Column 3: Careers */}
              <li className="pr-4">
                <h3 className="font-bold ml-2 mb-2 text-xs text-red-900 font-serif">
                  CAREERS
                </h3>
                <ul className="space-y-1 text-base">
                  <ListItem title="Job Vacancies" href="/careers/jobs" />
                  <ListItem
                    title="Volunteer Opportunities"
                    href="/careers/volunteer"
                  />
                  <ListItem title="Submit Your CV" href="/careers/submit-cv" />
                </ul>
              </li>
              {/* Column 5 (Image Section) */}
              <div className="flex justify-center items-start">
                <Link
                  to="/careers/volunteer"
                  className="relative block w-48 h-32 rounded-md overflow-hidden shadow-md group"
                >
                  {/* Image */}
                  <img
                    src={anderson}
                    alt="Leadership & Governance"
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                  {/* Text overlay */}
                  <p className="absolute bottom-2 left-2 text-white text-xs font-medium leading-snug">
                    Leadership & Governance at the
                    <br />
                    Nairobi Hospital
                  </p>
                </Link>
              </div>
            </ul>
          </MenubarContent>
        </MenubarMenu>

        {/* Facilities & Services */}
        <MenubarMenu>
          <MenubarTrigger className="flex items-center gap-1">
            <Building2 className="w-4 h-4" />
            {content.other_services}
          </MenubarTrigger>
          <MenubarContent>
            <ul className="flex flex-col md:flex-row lg:grid-cols-3 gap-x-6 gap-y-3 px-10 py-6 items-start w-fit mx-auto">
              {/* Column 1: Facilities*/}
              <li className="pr-4">
                <h3 className="font-bold ml-2 mb-2 text-xs text-red-900 font-serif">
                  HOSPITAL FACILITIES
                </h3>
                <ul className="space-y-1 text-base">
                  <ListItem
                    title="Convention & Conference Centre"
                    href="/convention-center"
                  />
                  <ListItem title="Parking & Transport" href="#" />
                  <ListItem title="Security & Safety" href="#" />
                </ul>
              </li>{" "}
              {/* Column 2: Support Services */}
              <li className=" pr-4">
                <h3 className="font-bold ml-2 mb-2 text-xs text-red-900 font-serif">
                  SUPPORT SERVICES
                </h3>
                <ul className="space-y-1 text-base">
                  {" "}
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
              {/* Column 5 (Image Section) */}
              <div className="flex justify-center items-start">
                <Link
                  to="/about-us/board-of-management"
                  className="relative block w-48 h-32 rounded-md overflow-hidden shadow-md group"
                >
                  {/* Image */}
                  <img
                    src={anderson}
                    alt="Leadership & Governance"
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                  {/* Text overlay */}
                  <p className="absolute bottom-2 left-2 text-white text-xs font-medium leading-snug">
                    Leadership & Governance at the
                    <br />
                    Nairobi Hospital
                  </p>
                </Link>
              </div>
            </ul>
            {/* facilities dropdown */}
          </MenubarContent>
        </MenubarMenu>

        {/*  Mobile contact (unchanged) */}
        <div className="flex md:hidden items-center gap-2 mt-10">
          <Button
            onClick={() => (window.location.href = "/contact")}
            className="text-xs font-serif flex items-center gap-1"
            variant="outline"
            size="sm"
          >
            <Phone className="text-red-900 w-4 h-4" />
            <span className="text-sm font-serif">+254 703 082 000</span>
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
            "flex flex-col justify-center  items-start cursor-pointer select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:-translate-x-1 duration-100 hover:text-red-700",
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
