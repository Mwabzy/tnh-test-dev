import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Link } from "react-router";

import Pagination from "@/components/ui/pagination";
import capital from "@/assets/opc_images/capital.jpg";
import anderson from "@/assets/opc_images/anderson.jpg";

import warwick from "@/assets/opc_images/warwick.png";
import rosslyn from "@/assets/opc_images/rosslyn.jpeg";


const clinics = [
  {
    id: 1,
    title: "ENT Clinic",
    description:
      "We specialize in the diagnosis and treatment of conditions of your ear, nose, and throat including allergies, COPD, facial tumours, and sinus infections.",
    imageUrl: rosslyn,
    location: "Roslyn Riviera OPC",

  },
  {
    id: 2,
    title: "Renal Clinic",
    description:
      "Our team is dedicated to kidney health through advanced nephrology treatments, dialysis support, and multidisciplinary care.",
    imageUrl: warwick,
        location: "Warwick OPC",

  },
  {
    id: 3,
    title: "Gynaecology Clinic",
    description:
      "With specialists experienced in women’s healthcare, offering expert support in reproductive health, pregnancy, and hormone management.",
    imageUrl: capital,
        location: "Capital Center OPC",
  },
  {
    id: 4,
    title: "Speech Therapy Clinic",
    description:
      "We specialize in the assessment and treatment of speech, language, and swallowing disorders in both children and adults.",
   imageUrl: rosslyn,
    location: "Roslyn Riviera OPC",
  },
  {
    id: 5,
    title: "Cancer Center",
    description:
      "We offer comprehensive screening, diagnosis, and treatment services, utilizing leading-edge technology for optimal patient care.",
   imageUrl: anderson,
location: "Anderson Speciality",

  },
];

const locations = [
  "Main Hospital",
  "Anderson Specialty",
  "Capital Center OPC",
  "Galleria OPC",
  "Kiambu OPC",
  "Roslyn Riviera OPC",
  "South Field OPC",
  "Warwick OPC",
];

const MedicalDepartment = () => {
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  const handleLocationToggle = (loc: string) => {
    setSelectedLocations((prev) =>
      prev.includes(loc)
        ? prev.filter((l) => l !== loc)
        : [...prev, loc]
    );
  };

  const resetFilters = () => {
    setSearch("");
    setSpecialty("");
    setSelectedLocations([]);
    setSelectedLetter(null);
  };

  const filteredClinics = clinics.filter((clinic) => {
    const matchesSearch = clinic.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesLetter =
      !selectedLetter || clinic.title.startsWith(selectedLetter);

    const matchesSpecialty =
    !specialty ||
    clinic.title.toLowerCase().includes(specialty.toLowerCase()) ||
    clinic.description.toLowerCase().includes(specialty.toLowerCase());

    const matchesLocation =
    selectedLocations.length === 0 ||
    selectedLocations.some((loc) =>
      clinic.location?.toLowerCase().includes(loc.toLowerCase())
    );

    return matchesSearch && matchesLetter  && matchesSpecialty && matchesLocation;
  });

  return (
    <div className="flex flex-col md:flex-row max-w-7xl mx-auto py-10 px-4 md:px-8 gap-8">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-1/4 space-y-6">
        
        <Button
          variant="outline"
          className="border-red-900 text-red-900 hover:bg-red-50 w-fit"
          onClick={resetFilters}
        >
          Reset all filters
        </Button>

        <div>
          <h2 className="text-sm text-gray-700 uppercase mt-6 mb-2">
            Narrow your search
          </h2>
          <hr className="border-gray-300 mb-3" />

          <div className="space-y-4">
            {/* Specialty */}
            <div>
              <h3 className="font-medium text-gray-800 mb-2">By Specialty</h3>
              <input
                type="text"
                placeholder="Search specialty..."
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-600 outline-none"
              />
            </div>

            {/* Location */}
            <div>
              <h3 className="font-medium text-gray-800 mb-2">By location</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {locations.map((loc) => (
                  <li key={loc} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedLocations.includes(loc)}
                      onChange={() => handleLocationToggle(loc)}
                      className="accent-red-900"
                    />
                    <span>{loc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Alphabet Filter */}
            <div>
              <h3 className="font-medium text-gray-800 mb-3">
                Filter Specialty Clinic by First Letter
              </h3>
              <div className="grid grid-cols-6 gap-2">
                {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
                  <button
                    key={letter}
                    onClick={() =>
                      setSelectedLetter(letter === selectedLetter ? null : letter)
                    }
                    className={`w-8 h-8 rounded-full border text-sm font-medium ${
                      letter === selectedLetter
                        ? "bg-red-900 text-white"
                        : "border-red-900 text-red-900 hover:bg-red-50"
                    }`}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="w-full md:w-3/4 space-y-8">
        {filteredClinics.map((clinic) => (
          <motion.div
            key={clinic.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="overflow-hidden border rounded-2xl shadow-sm">
              <img
                src={clinic.imageUrl}
                alt={clinic.title}
                className="w-full h-56 object-cover"
              />
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold font-serif text-red-900 mb-2">
                  {clinic.title}
                </h3>
                <p className="text-gray-700 font-sans text-sm leading-relaxed mb-4">
                  {clinic.description}
                </p>
                <div className="flex gap-3">

                  <Link to="/booking">
                  <Button variant="outline" className="text-red-900 border-red-900">
                    Book Appointment
                  </Button>
                  </Link>
                  
                  <Link to="/booking">
                  <Button className="bg-yellow-600  hover:bg-red-900  text-white">
                    Find a Doctor
                  </Button>
                  </Link>
                  


                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
        {/* Pagination */}
        <Pagination totalPages={3} currentPage={1} onPageChange={() => {}} />
        
      </main>
    </div>
  );
};

export default MedicalDepartment;
