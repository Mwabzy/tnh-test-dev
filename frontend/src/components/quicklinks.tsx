import { Phone, Ambulance, ClipboardClock, Clock3, Stethoscope } from "lucide-react";
import { Link } from "react-router";
import { useIntlayer } from "react-intlayer";

const Quicklinks = () => {
  const content = useIntlayer("quickLinksContent");
  return (
    <div className="w-full min-h-11 md:h-11 sticky top-0 z-50 bg-[#8B1C1C] text-white text-xs sm:text-sm px-2 sm:px-4 py-1 md:py-0 md:flex md:items-center">
      <div className="grid grid-cols-2 gap-x-3 gap-y-1 md:flex md:items-center md:gap-x-6 md:h-full">
        <Link to="tel:+254202845000" className="flex items-center space-x-1 sm:space-x-2 min-w-0">
          <Ambulance className="w-4 h-4 text-yellow-400 shrink-0" />
          <span className="font-semibold text-[11px] sm:text-sm leading-none whitespace-nowrap">{content.emergency}</span>
        </Link>

        <Link to={`/booking-calendar?serviceId=1`} className="flex items-center space-x-1 sm:space-x-2 min-w-0">
          <ClipboardClock className="w-4 h-4 text-yellow-400 shrink-0" />
          <span className="font-semibold text-[11px] sm:text-sm leading-none whitespace-nowrap">{content.bookingtitle}</span>
        </Link>

        <Link to="/doctor-profiles" className="flex items-center space-x-1 sm:space-x-2 min-w-0">
          <Stethoscope className="w-4 h-4 text-yellow-400 shrink-0" />
          <span className="font-semibold text-[11px] sm:text-sm leading-none whitespace-nowrap">{content.find_a_doctor}</span>
        </Link>

        <Link to="/contact-us" className="flex items-center space-x-1 sm:space-x-2 min-w-0">
          <Phone className="w-4 h-4 text-yellow-400 shrink-0" />
          <span className="font-semibold text-[11px] sm:text-sm leading-none whitespace-nowrap">{content.contact_us}</span>
        </Link>

        <Link to="/inpatient/visiting-hours" className="flex items-center space-x-1 sm:space-x-2 min-w-0">
          <Clock3 className="w-4 h-4 text-yellow-400 shrink-0" />
          <span className="font-semibold text-[11px] sm:text-sm leading-none whitespace-nowrap">{content.visiting_hours}</span>
        </Link>
      </div>
    </div>
  );
};
export default Quicklinks;
