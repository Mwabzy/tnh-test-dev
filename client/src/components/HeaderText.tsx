import { FC } from "react";

interface HeaderTextProps {
  title: string;
  description: string;
}

const HeaderText: FC<HeaderTextProps> = ({
  title,
  description,
}: HeaderTextProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6 lg:gap-8 mx-auto px-4 py-10">
      <h1 className="text-6xl font-serif font-bold text-red-900 w-full">
        {title}
      </h1>
      <p className="text-black mt-2">{description}</p>
    </div>
  );
};

export default HeaderText;
