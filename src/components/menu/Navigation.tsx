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
    href: "/careers",
    description:
      "Information about the career opportunities available at the Nairobi Hospital.",
  },
];

const Navigation: FC<NavigationProps> = () => {
  return (
    <div>
      <Menubar className="flex-col md:flex-row  border-none shadow-none bg-inherit">
        <MenubarMenu>
          <MenubarTrigger asChild>
            <Link to="/">Home</Link>
          </MenubarTrigger>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>About Us</MenubarTrigger>
          <MenubarContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <MenubarItem asChild>
                  <a
                    className="flex items-start h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-red-900/50 to-red-900 hover:text-white p-6 no-underline outline-none focus:shadow-md text-white"
                    href="/about-us"
                  >
                    <div className="text-lg font-medium flex items-start">
                      About Us
                    </div>
                    <p className="text-sm leading-tight text-white">
                      The Nairobi Hospital is a leading healthcare institution
                      in Kenya, providing comprehensive medical services and
                      education.
                    </p>
                  </a>
                </MenubarItem>
              </li>
              <ListItem href="/about-us/history" title="History">
                The history of the Nairobi Hospital.
              </ListItem>
              <ListItem
                href="/about-us/board-of-management"
                title="Board of Management"
              >
                The board overseeing the Nairobi Hospital's operations.
              </ListItem>
              <ListItem
                href="/about-us/board-of-trustees"
                title="Board of Trustees"
              >
                The board responsible for the governance of the Nairobi
                Hospital.
              </ListItem>
              <ListItem
                href="/about-us/senior-management"
                title="Senior Management"
              >
                The senior management team overseeing the Nairobi Hospital's
                operations.
              </ListItem>
              <ListItem
                href="/about-us/accreditation-certification"
                title="Accreditation & Certification"
              >
                Information about the accreditation of the Nairobi Hospital.
              </ListItem>
            </ul>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Clinical Services</MenubarTrigger>
          <MenubarContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {patients_visitors.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger asChild>
            <Link to="/medical-tourism">Medical Tourism</Link>
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger asChild>
            <Link to="/college-of-health-sciences">
              College of Health Sciences
            </Link>
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Other Services</MenubarTrigger>
          <MenubarContent>
            <ul className="grid w-[200px] gap-3 p-4 md:w-[300px] md:grid-cols-1 lg:w-[400px]">
              {other_services.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Notices & Opportunities</MenubarTrigger>
          <MenubarContent>
            <ul className="grid w-[200px] gap-3 p-4 md:w-[300px] md:grid-cols-1 lg:w-[400px] ">
              {news_media.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </MenubarContent>
          <div className="block md:hidden flex items-center gap-2 mt-10">
            <div className="flex items-center gap-1">
              <Phone className="text-red-900 w-4 h-4" />
              <span className="text-sm font-serif"> +254 703 082 000</span>
            </div>
            <Button
              onClick={() => (window.location.href = "/contact")}
              className="text-xs font-serif"
              variant="outline"
              size="sm"
            >
              Contact Us
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
