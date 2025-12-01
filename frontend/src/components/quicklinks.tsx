import { Phone, Ambulance, ClipboardClock } from "lucide-react";
import { Link } from "react-router";

export default function Quicklinks() {
  return (
    <div className="flex  items-center px-4 py-1w-full sticky top-0 z-200 bg-[#8B1C1C] text-white text-sm h-11 ">
      <div className="flex space-x-13 md:space-x-6">
        <Link to="href:tel:+254202845000">
          <div className="flex items-center space-x-2">
            <Ambulance className="w-4 h-4 text-yellow-400" />
            <div className="flex flex-col md:flex-row">
              <span className="font-semibold">Emergency :</span>
              <span>+254 20 2845000</span>
            </div>
          </div>
        </Link>

        <Link to={`/booking-calendar?serviceId=1`}>
          <div className="flex items-center space-x-2">
            <ClipboardClock className="w-4 h-4 text-yellow-400" />
            <div className="flex flex-col md:flex-row">
              <span className="font-semibold">Book an</span>
              <span>appointment</span>
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
