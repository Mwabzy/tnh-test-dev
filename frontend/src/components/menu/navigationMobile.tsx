import React, { useState } from "react";
import { NAVIGATION_CONTENT } from "./navigationData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router";
import { useIntlayer } from "react-intlayer";

export const NavigationMobile: React.FC<{ onNavigate?: () => void }> = ({
  onNavigate,
}) => {
  const content = useIntlayer("navigationContent");
  const [openItems, setOpenItems] = useState<string[]>([]);

  return (
    <div className="overflow-y-auto h-full px-4 text-left">
      <Accordion
        type="multiple"
        value={openItems}
        onValueChange={setOpenItems}
        className="flex flex-col gap-2"
      >
        {NAVIGATION_CONTENT.map((item, idx) => {
          const hasSubmenu = item.sections && item.sections.length > 0;
          const label = item.labelKey
            ? content[item.labelKey as keyof typeof content][0].value
            : item.label;

          // Home link with no sub menu
          if (!hasSubmenu) {
            return (
              <div key={idx} className="py-2">
                <Link
                  to={item.link ?? "#"}
                  onClick={onNavigate}
                  className="block px-2 py-3 rounded-md hover:bg-gray-100"
                >
                  <div className="flex items-center gap-2">
                    {item.icon && <item.icon className="w-5 h-5" />}
                    <span>{label}</span>
                  </div>
                </Link>
              </div>
            );
          }

          //Other menus with submenus
          return (
            <AccordionItem key={idx} value={label!}>
              <AccordionTrigger className="px-2 py-3 text-left justify-start">
                <div className="flex items-center gap-2">
                  {item.icon && <item.icon className="w-4 h-4" />}
                  <span>{label}</span>
                </div>
              </AccordionTrigger>

              <AccordionContent>
                {item.sections?.map((section, sIdx) =>
                  section.title === "IMAGE" && section.link && section.image ? (
                    <Link
                      key={sIdx}
                      to={section.link}
                      onClick={onNavigate}
                      className="block mb-2"
                    >
                      <img
                        src={section.image}
                        alt={section.caption}
                        className="w-full h-32 object-cover rounded-md"
                      />
                      <p className="text-xs mt-1">{section.caption}</p>
                    </Link>
                  ) : (
                    <div key={sIdx} className="mb-4">
                      <h3 className="font-bold text-red-900 text-xs font-serif mb-2 pl-3">
                        {section.title}
                      </h3>
                      <ul>
                        {section.items?.map((linkItem, lIdx) => (
                          <li key={lIdx}>
                            <Link
                              to={linkItem.href}
                              onClick={onNavigate}
                              className="block py-1 pl-5 hover:text-red-700"
                            >
                              {linkItem.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                )}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};
