import { ChevronDown } from "lucide-react";
import { useRef, useState } from "react";
import { Link } from "react-router";

export interface MenuItem {
  name: string;
  link: string;
}

export interface MenuListType {
  item: MenuItem;
  dropdown?: MenuItem[];
}

type MenuListProps = {
  items: MenuListType[];
};

const MenuList = ({ items }: MenuListProps) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  return (
    <div>
      <ul className="flex flex-col lg:flex-row lg:gap-8 p-6 lg:p-0 text-sm border border-blue-200 bg-white rounded-lg shadow-md">
        {items?.map((item: MenuListType) => (
          <li
            key={new Date().getTime()}
            className="relative py-2.5 font-semibold text-black w-full border"
          >
            {item.dropdown ? (
              <>
                {item.dropdown.map((subItem) => (
                  <button
                    onClick={() =>
                      setOpenMenu(
                        openMenu === subItem.name ? null : subItem.name
                      )
                    }
                    className="flex items-center px-4 py-2 hover:bg-red-900 hover:rounded-xl hover:text-white w-full lg:w-auto"
                  >
                    {subItem.name} <ChevronDown className="w-4 h-4 ml-2" />
                  </button>
                ))}
              </>
            ) : (
              <Link
                to={item.item?.link}
                className="block px-4 py-2 hover:bg-red-900 hover:rounded-xl hover:text-white"
              >
                {item.item?.name}
              </Link>
            )}
            {item.dropdown && openMenu === item.item.name && (
              <div
                ref={dropdownRef}
                className="absolute left-0 top-full bg-white text-black shadow-lg p-4 grid gap-2 w-64"
              >
                {item.dropdown.flat().map((subItem) => (
                  <Link
                    key={subItem.name}
                    to={subItem.link}
                    className="p-2 rounded-lg hover:bg-yellow-600 hover:text-white"
                  >
                    {subItem.name}
                  </Link>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuList;
