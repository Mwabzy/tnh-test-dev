import { Phone } from "lucide-react";
import { Mail } from "lucide-react";
import { useIntlayer } from "react-intlayer";
import { Link } from "react-router";

const AboutSection = () => {
  const content = useIntlayer("about_the_hospital");
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-6 my-15 max-w-7xl mx-10 lg:mx-auto ">
        <div className="p-6 border rounded-xl text-center bg-red-800  dark:border-gray-700 shadow-xl                                                                                                        ">
          <h3 className="text-3xl font-bold text-slate-100 mb-2">
            {content.title}
          </h3>
          <div className="text-slate-100 text-lg text-left">
            <p>
              {content.description}
            </p>
          </div>

          <Link
            to="/about"
            className="mt-8 inline-flex items-center px-6 py-3 text-white bg-yellow-600 rounded-lg hover:bg-yellow-400 text-lg font-semibold transition"
          >
            Read more
          </Link>
        </div>
        <div className="p-6 border rounded-xl text-center bg-red-50  dark:border-gray-700 shadow-2xl">
          <h3 className="text-3xl font-bold text-red-800 mb-2">Contact Us</h3>
          <div className="space-y-2 text-xl ">
            <div className="flex items-center justify-center space-x-2">
              <Phone className="h-5 w-5 text-red-900" />
              <span>+254 703082000</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Mail className="h-5 w-5 text-red-900" />
              <span>hosp@nbihosp.org</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Mail className="h-5 w-5 text-red-900" />
              <span>customer.service@nbihosp.org</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
