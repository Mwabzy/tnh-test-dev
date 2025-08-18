import React from "react";
import MenuItem from "./MenuItem";

interface MenuProps {
  menuItems: {
    name: string;
    link?: string;
    dropdown?: { name: string; link: string }[][];
  }[];
}

const MenuComponent: React.FC<MenuProps> = ({ menuItems }) => {
  return (
    <ul className="flex flex-col lg:flex-row lg:gap-3 p-6 lg:p-0 w-full border">
      {menuItems.map((item, index) => (
        <MenuItem
          key={index}
          name={item.name}
          link={item.link}
          dropdown={item.dropdown}
        />
      ))}
    </ul>
  );
};

export default MenuComponent;
