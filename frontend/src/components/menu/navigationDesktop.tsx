import React from "react";
import { NAVIGATION_CONTENT } from "./navigationData";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Link } from "react-router";
import { useIntlayer } from "react-intlayer";
import { cn } from "@/lib/utils";

// Helper function to extract string from IntlayerNode
const getLabel = (data: any): string => {
  if (typeof data === 'string') return data;
  if (Array.isArray(data) && data.length > 0 && data[0]?.value) {
    return String(data[0].value);
  }
  return "";
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => (
  <li>
    <MenubarItem asChild>
      <a
        ref={ref}
        className={cn(
          "flex flex-col justify-center items-start cursor-pointer select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:-translate-x-1 duration-100 hover:text-red-700",
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
));
ListItem.displayName = "ListItem";

export const NavigationDesktop: React.FC = React.memo(() => {
  const content = useIntlayer("navigationContent");
  const navigationItems = NAVIGATION_CONTENT();

  return (
    <Menubar className="flex-col md:flex-row border-none shadow-none bg-inherit text-sm font-medium">
      {navigationItems.map((item, idx) => {
        const label = getLabel(content[item.labelKey as keyof typeof content]);

        return (
          <MenubarMenu key={idx}>
            {item.link ? (
              <Link
                to={item.link}
                className="flex items-center gap-1 px-2 py-1 "
              >
                {item.icon && <item.icon className="w-4 h-4" />}
                {label}
              </Link>
            ) : (
              <MenubarTrigger className="flex items-center gap-1">
                {item.icon && <item.icon className="w-4 h-4" />}
                {label}
              </MenubarTrigger>
            )}

            {item.sections && (
              <MenubarContent>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-3 px-10 py-6 w-fit mx-auto">
                  {item.sections.map((section, sIdx) =>
                    section.title === "IMAGE" &&
                    section.link &&
                    section.image ? (
                      <div
                        key={sIdx}
                        className="flex justify-center items-start"
                      >
                        <Link
                          to={section.link}
                          className="relative block w-48 h-32 rounded-md overflow-hidden shadow-md group"
                        >
                          <img
                            src={section.image}
                            alt={getLabel(section.caption)}
                            className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                          <p className="absolute bottom-2 left-2 text-white text-xs font-medium leading-snug">
                            {getLabel(section.caption)}
                          </p>
                        </Link>
                      </div>
                    ) : section.items ? (
                      <li key={sIdx} className="pr-4">
                        <h3 className="font-bold text-red-900 text-xs font-serif ml-2 mb-2">
                          {section.title}
                        </h3>
                        <ul className="space-y-1 text-base">
                          {section.items.map((linkItem, lIdx) => (
                            <ListItem
                              key={lIdx}
                              title={getLabel(linkItem.title)}
                              href={linkItem.href}
                            />
                          ))}
                        </ul>
                      </li>
                    ) : null
                  )}
                </ul>
              </MenubarContent>
            )}
          </MenubarMenu>
        );
      })}
    </Menubar>
  );
});
NavigationDesktop.displayName = "NavigationDesktop";