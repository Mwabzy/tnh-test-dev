import { Phone, Ambulance, ClipboardClock } from "lucide-react";
import { Link } from "react-router";

export default function Quicklinks() {
  return (
    <div className="flex items-center px-2 sm:px-4 py-1 w-full sticky top-0 z-50 bg-[#8B1C1C] text-white text-xs sm:text-sm h-11">
      <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6">
        <Link to="tel:+254202845000">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <Ambulance className="w-4 h-4 text-yellow-400" />
            <div className="flex flex-col sm:flex-row text-[12px] sm:text-sm">
              <span className="font-semibold">Emergency :+254 703 082000</span>
            </div>
          </div>
        </Link>

        <Link to={`/booking-calendar?serviceId=1`}>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <ClipboardClock className="w-4 h-4 text-yellow-400" />
            <div className="flex flex-col sm:flex-row text-[12px] sm:text-sm">
              <span className="font-semibold">Book an appointment</span>
            </div>
          </div>
        </Link>

        <Link to={"/contact-us"}>
          <div className="hidden md:flex items-center space-x-2">
            <Phone className="w-4 h-4 text-yellow-400" />
            <span>Contact Us</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
