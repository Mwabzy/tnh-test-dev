import { Phone, Clock, MapPin } from "lucide-react";
import { Link } from "react-router";

export default function Quicklinks() {
  return (
    <div className="w-full sticky top-0 z-[200] bg-[#8B1C1C] text-white text-sm h-11 flex items-center">
      <div className="flex items-center justify-start px-4 w-full">
        {/* Left Section */}
        <div className="flex items-center space-x-6">
          {/* Phone */}
          <Link to="href:tel:+254202845000">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-yellow-400" />
              <span>
                <span className="font-semibold">Emergency:</span> +254 20
                2845000
              </span>
            </div>
          </Link>

          {/* 24/7 Emergency Services */}
          <Link to={`/doctor-profiles/`}>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-yellow-400" />
              <span>Book an appointment</span>
            </div>
          </Link>

          {/* Location */}
          <Link to={"/contact-us"}>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-yellow-400" />
              <span>Contact Us</span>
            </div>
          </Link>
        </div>

        {/* Right Section */}
      </div>
    </div>
  );
}
