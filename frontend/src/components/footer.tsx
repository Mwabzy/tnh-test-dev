// import logo from "@/assets/static/logo.png";
import { FaInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router";
// import { useState } from "react";

// const [email, setEmail] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Submitted email:", email);

//   };

const Footer = () => {
  return (
    <footer className="bg-red-900 text-white py-16 px-4 text-sm">
      {/* Contact Section */}
      <div className="text-center mb-16">
        <h2 className="text-2xl md:text-3xl font-semibold mb-2">
          Don't Hesitate, Contact Us
        </h2>
        <button className="bg-white text-black px-6 py-2 rounded hover:bg-gray-200 transition">
          Contact Us
        </button>
      </div>

      <hr className="w-5/6  mx-auto my-4 border-white  md:my-10 " />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 md:gap-0 px-4 max-w-6xl mx-auto mb-12">
        <div className="flex ">
          <img
            src="https://www.kebs.org/wp-content/uploads/2023/09/6.png"
            alt="Instagram preview"
            className="rounded-4xl object-cover w-12 h-12"
          />
          <img
            src="https://www.kebs.org/wp-content/uploads/2023/09/13.png"
            alt="Instagram preview"
            className="rounded-4xl object-cover w-12 h-12"
          />
          <img
            src="https://www.kebs.org/wp-content/uploads/2023/09/9.png"
            alt="Instagram preview"
            className="rounded-4xl object-cover w-12 h-12"
          />
        </div>
        <p className="text-lg">
          ©The Nairobi Hospital. All Rights Reserved 2025.
        </p>
        <div className="flex  flex-col items-center md:items-start">
          {" "}
          <span className="mb-5">
            {" "}
            Get in touch with us on our social media platforms{" "}
          </span>
          <div className="flex gap-2">
            <Link
              to="https://www.facebook.com/TheNairobiHosp"
              className="cursor-pointer"
            >
              <FaFacebook className="w-10 h-10 cursor-pointer" />
            </Link>
            <Link
              to="https://web.whatsapp.com/send?phone=254110922834"
              className="cursor-pointer"
            >
              <FaWhatsapp className="w-10 h-10 cursor-pointer" />
            </Link>
            <Link
              to="https://twitter.com/thenairobihosp"
              className="cursor-pointer"
            >
              <FaXTwitter className="w-10 h-10 cursor-pointer" />
            </Link>
            <Link
              to="https://www.linkedin.com/company/thenairobihospital"
              className="cursor-pointer"
            >
              {" "}
              <FaLinkedinIn className="w-10 h-10 cursor-pointer" />
            </Link>
            <Link
              to="https://www.youtube.com/channel/UChUuucNLoxQqFKgVW2G5AlA"
              className="cursor-pointer"
            >
              <FaYoutube className="w-10 h-10 cursor-pointer" />
            </Link>
            <Link
              to="https://www.instagram.com/nairobihosp/"
              className="cursor-pointer"
            >
              {" "}
              <FaInstagram className="w-10 h-10 cursor-pointer" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom credits */}
      <div className="flex flex-col md:flex-row justify-between items-center px-4 max-w-6xl mx-auto text-xs text-gray-300">
        {/* <img
          src={logo}
          alt="tnh logo"
          className="rounded object-cover w-20 h-20"
        /> */}
      </div>
    </footer>
  );
};

export default Footer;
