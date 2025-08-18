import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router";
import { cn } from "@/lib/utils";

interface MenuItemProps {
  name: string;
  link?: string;
  dropdown?: { name: string; link: string }[][];
}

const MenuItem: React.FC<MenuItemProps> = ({ name, link, dropdown }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const menuItemRef = useRef<HTMLLIElement | null>(null);

  const handleDropdownToggle = () => {
    setOpenDropdown((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuItemRef.current &&
        !menuItemRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    // Clean up event listener when unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const minWidthClass = name.length > 7 ? "min-w-[200px]" : "min-w-[80px]";

  return (
    <li ref={menuItemRef} className="relative font-semibold text-black border w-full text-xs">
      {dropdown ? (
        <>
          <div
            onClick={handleDropdownToggle}
            className={cn(
              "flex items-center hover:bg-red-900 hover:rounded-xl hover:text-white w-full p-2",
              minWidthClass // Apply conditional min-width
            )}
          >
            <span>{name} </span>
            <span><ChevronDown className="w-4 h-4 ml-2" /></span>
          </div>
          {openDropdown && (
            <div
              ref={dropdownRef}
              className="absolute left-0 top-full bg-white text-black shadow-lg p-4 grid gap-2 w-64 z-10"
            >
              {dropdown.flat().map((subItem, index) => (
                <div
                  key={index}
                  className="p-2 rounded-lg hover:bg-yellow-600 hover:text-white"
                >
                  <Link to={subItem.link}>{subItem.name}</Link>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <Link
          to={link || "#"}
          className={cn(
            "flex items-center hover:bg-red-900 hover:rounded-xl hover:text-white w-full p-2",
            minWidthClass // Apply conditional min-width
          )}
        >
          {name}
        </Link>
      )}
    </li>
  );
};

export default MenuItem;
