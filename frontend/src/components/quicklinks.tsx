import { Phone, Clock, MapPin } from "lucide-react";

export default function TopBar() {
  return (
    <div className="w-full bg-[#8B1C1C] text-white text-sm">
      <div className="flex items-center justify-between px-15 py-2">
        {/* Left Section */}
        <div className="flex items-center space-x-6">
          {/* Phone */}
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4 text-yellow-400" />
            <span>
              <span className="font-semibold">Emergency:</span> +254 20 2845000
            </span>
          </div>

          {/* 24/7 Emergency Services */}
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-yellow-400" />
            <span>24/7 Emergency Services</span>
          </div>

          {/* Location */}
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-yellow-400" />
            <span>Argwings Kodhek Road, Nairobi</span>
          </div>
        </div>

        {/* Right Section */}
       
      </div>
    </div>
  );
}
