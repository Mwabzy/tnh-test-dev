import { FC } from "react";

interface HeadingProps {
  image_url?: string;
  title?: string;
  description?: string;
  style: "background" | "image" | "text";
}

const Heading: FC<HeadingProps> = ({
  image_url,
  title,
  description,
  style,
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center w-full h-[300px] bg-cover bg-center bg-no-repeat
        ${style === "background" ? `bg-red-900` : ""}
        ${style === "image" ? `bg-gray-200` : ""}
        ${style === "text" ? `bg-white` : ""}`}
      style={{ backgroundImage: image_url ? `url(${image_url})` : "none" }}
    >
      <div className={`flex items-center justify-center w-full h-full ${image_url ? "bg-black/50" : ""}`}>
        <div className="flex flex-col  md:flex-row items-center justify-between w-full max-w-7xl px-4 gap-4 md:gap-0">
          <div className="w-full md:w-[40%] text-center md:text-left">
            <h1
              className={`text-3xl md:text-6xl font-bold font-serif
                ${style === "background" ? "text-white" : ""}
                ${style === "image" ? "text-white" : ""}
                ${style === "text" ? "text-red-900" : ""}
                `}
            >
              {title}
            </h1>
          </div>
          <div className="w-full md:w-[60%] text-center md:text-left">
            <p
              className={`text-base md:text-xl
                ${style === "background" ? "text-white" : ""}
                ${style === "image" ? "text-white" : ""}
                ${style === "text" ? "text-gray-900" : ""}
                `}
            >
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Heading;
