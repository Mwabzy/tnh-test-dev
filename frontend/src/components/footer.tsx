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
    <footer className="bg-red-900 text-white py-6 px-4 text-sm">
      {/* Contact Section */}
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between gap-16">
          <div className="md:w-1/3 ">
            <h3 className="text-xl font-semibold text-white mb-3">
              Subscribe to Our Mailing List
            </h3>
            <p className="text-white mb-5">
              Stay updated with the latest health tips, medical services, and
              hospital news.
            </p>

            <form className="flex flex-col  items-center sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full flex-1 p-2 rounded-md text-black bg-white"
              />

              <button
                type="submit"
                className="px-6 py-3 w-30 bg-yellow-600 text-white hover:text-red-900 font-medium rounded-lg hover:bg-white transition"
              >
                Subscribe
              </button>
            </form>
          </div>

          <div className="flex flex-col md:flex-row gap-8 md:w-2/3">
            <div className="md:w-1/2">
              <h3 className="text-xl w-2/3 font-semibold text-white mb-3">
                Contact Information
              </h3>
              <p className="text-white mb-1">The Nairobi Hospital</p>
              <p className="text-white mb-1">
                P.O. Box 30026 - 00100 GPO, Nairobi, Kenya
              </p>
              <p className="text-white mb-1">Phone: +254 20 2845000</p>
              <p className="text-white mb-1">
                Email: nbihosp.org
                <a href="mailto:nbihosp.org"></a>
              </p>
            </div>

            <div className="md:w-1/2">
              <h3 className="text-xl w-2/3 font-semibold text-white mb-3">
                Quick Links
              </h3>
              <Link to="/about-us">
                <p className="text-white mb-1">About Us</p>{" "}
              </Link>
              <Link to="/doctor-profiles">
                <p className="text-white mb-1">Find a Doctor</p>
              </Link>
              <Link to="/clinical-services">
                <p className="text-white mb-1">Speciality Clinics</p>
              </Link>
              <Link to="/news">
                <p className="text-white mb-1">News and Events</p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <hr className="w-5/6 mx-auto my-4 border-white  md:my-10 " />

      <div className="flex flex-col md:flex-row justify-between items-center md:items-center gap-10 md:gap-0 px-4 max-w-6xl mx-auto mb-12">
        <div className="flex gap-3">
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
        <p className="text-lg md:ml-14">
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
