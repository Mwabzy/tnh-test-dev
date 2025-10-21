import { Phone, Clock, MapPin } from "lucide-react";
import { Link } from "react-router";


export default function TopBar() {
  return (
    <div className="w-full bg-[#8B1C1C] text-white text-sm">
      <div className="flex items-center justify-end px-15 py-2">
        {/* Left Section */}
        <div className="flex items-center space-x-6">
          {/* Phone */}

          <Link to="href:tel:+254202845000">
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4 text-yellow-400" />
            <span>
              <span className="font-semibold">Emergency:</span> +254 20 2845000
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
        
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-yellow-400" />
            <span>Contact Us</span>
          </div>
        </div>
      

        {/* Right Section */}
      </div>
    </div>
  );
}
