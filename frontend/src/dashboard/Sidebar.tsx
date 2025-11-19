import { FC, useState } from "react";
import { NavLink } from "react-router";
import {
  clinicalSection,
  otherServices,
  collegeHealthSciences,
  newsMedia,
  aboutPages,
} from "./sidebarData";
import Logo from "@/components/menu/Logo";
import { Link } from "react-router";

const Sidebar: FC = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const sections = [
    { title: "Clinical Services", key: "clinical", items: clinicalSection },
    { title: "About pages", key: "about", items: aboutPages },
    { title: "Other Services", key: "other", items: otherServices },
    { title: "College", key: "college", items: collegeHealthSciences },
    { title: "News & Media", key: "news", items: newsMedia },
  ];

  return (
    <aside className="w-64 bg-white shadow-md h-screen fixed left-0 top-0 p-4 overflow-y-auto z-40">
      <Logo orientation="vertical" type="both" className="ml-1" />
      <Link to="/dashboard">
        <h2 className="text-xl font-semibold text-gray-800 m-4">
          Website Dashboard
        </h2>
      </Link>
      <nav>
        {/* Sidebar sections */}
        {sections.map((section) => (
          <div key={section.key} className="mb-4">
            <button
              onClick={() => toggleSection(section.key)}
              className="w-full text-left font-semibold text-gray-700 p-2 hover:bg-yellow-500 rounded-lg flex justify-between"
            >
              {section.title}
              <span>{openSection === section.key ? "-" : "+"}</span>
            </button>
            {openSection === section.key && (
              <ul className="ml-2 mt-2">
                {section.items.map((item) => (
                  <li key={item.title}>
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        `block p-2 rounded ${
                          isActive
                            ? "bg-red-200 text-white"
                            : "hover:bg-yellow-500"
                        }`
                      }
                    >
                      {item.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
