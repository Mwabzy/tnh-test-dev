import { FC } from 'react';
import { motion } from 'framer-motion';
import Heading from '@/components/Heading';
import { Bed, Wifi, Phone, Star, Users, Coffee, ChevronRight } from 'lucide-react';
import InsuranceSlider from '@/components/InsuranceSlider';

const RoomsAndWards: FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Heading
        image_url="/src/assets/heroimages/rooms-wards.jpg"
        title="Rooms & Wards"
        description="Comfortable healing environment for your recovery"
        style="background"
      />

      <main role="main" className="pb-20">
        {/* Hero summary */}
        <section className="bg-white pt-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <p className="text-sm text-gray-500 mb-2">Accommodation</p>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-red-900 leading-tight mb-4">
                    World-Class Hospital Accommodation
                  </h1>
                  <p className="text-gray-700 max-w-2xl leading-relaxed mb-6">
                    We offer a range of accommodation options designed to ensure your comfort during your stay. From private suites to specialized wards, each room is equipped with modern amenities and supported by our dedicated care team.
                  </p>
                  <div className="flex items-center gap-3">
                    <a href="#room-types" className="px-5 py-3 bg-red-900 text-white rounded-full font-medium hover:bg-red-800 transition">
                      View Rooms
                    </a>
                    <a href="tel:+254703082300" className="px-4 py-3 border border-gray-200 rounded-full text-sm inline-flex items-center gap-2">
                      <Phone className="w-4 h-4" /> Room Enquiry
                    </a>
                  </div>
                </motion.div>
              </div>

              <div className="lg:col-span-5">
                <motion.div 
                  className="rounded-2xl overflow-hidden shadow-lg"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                >
                  <img 
                    src="https://cdn.prod.website-files.com/673c89b10bb03cfb1860bed1/6765f6388a3b02f842e422c0_Royal%20Suite2.webp" 
                    alt="Executive Suite" 
                    className="w-full h-64 object-cover"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Room Types */}
        <section id="room-types" className="container mx-auto px-4 mt-16">
          <motion.h2 
            className="text-2xl font-serif font-bold text-red-900 text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Room Categories
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "NORTH WING",
                image: "https://cdn.prod.website-files.com/673c89b10bb03cfb1860bed1/6765f4782c4c9a59bff5e349_Ambassador%20Suite2.webp",
                price: "Amenities and Services",
                amenities: [
                  "All rooms are ICU ready",
                  "Dedicated chef and kitchen",
                  "Extensive menu options",
                  "Smart TV with international channels",
                  "Mini refrigerator",
                  "Adjustable bed with controls",
                  "Work desk",
                  "High-speed WiFi"
                ]
              },
              {
                title: "SOUTH WING",
                image: "https://chonghua.com.ph/wp-content/uploads/2025/03/Regular-Private-Room-Mandaue-01.jpg",
                price: "Amenities & Services",
                amenities: [
                  "Comfortable private space",
                  "Private bathroom",
                  "TV with local channels",
                  "Visitor seating",
                  "WiFi access",
                  "Nurse call system",
                  "Storage cabinet",
                  "Air conditioning"
                ]
              },
              {
                title: "GENERAL WARDS",
                image: "https://www.union.org/appassets/Ward/Standard-Room/14-bedded-room/20250317/14-bedded-2.png?v=1742205047/",
                price: "Ammenities & Services",
                amenities: [
                  "Shared room (4-6 beds)",
                  "Individual curtain privacy",
                  "Shared bathroom facilities",
                  "Personal storage locker",
                  "Common TV area",
                  "Nurse station nearby",
                  "WiFi access",
                  "Air conditioning"
                ]
              }
            ].map((room, idx) => (
              <motion.div
                key={room.title}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={room.image}
                    alt={room.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{room.title}</h3>
                  <p className="text-red-900 font-medium text-sm mb-4">{room.price}</p>
                  <ul className="space-y-2">
                    {room.amenities.map((amenity, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <ChevronRight className="w-4 h-4 text-red-900 mt-1 flex-shrink-0" />
                        {amenity}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Specialized Wards */}
        <section className="container mx-auto px-4 mt-16">
          <motion.h2 
            className="text-2xl font-serif font-bold text-red-900 text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Specialized Wards
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Pediatric Ward",
                description: "Child-friendly environment with specialized care",
                features: [
                  "Colorful, welcoming atmosphere",
                  "Play area and activities",
                  "Parent accommodation facility",
                  "Specialized pediatric nursing",
                  "Child-sized equipment",
                  "24/7 monitoring"
                ]
              },
              {
                title: "Maternity Ward",
                description: "Comfortable environment for new mothers",
                features: [
                  "Private delivery rooms",
                  "Nursery facilities",
                  "Lactation support",
                  "Partner accommodation",
                  "Specialized equipment",
                  "Expert midwifery care"
                ]
              }
            ].map((ward, idx) => (
              <motion.div
                key={ward.title}
                className="bg-gray-50 rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <h3 className="text-xl font-semibold mb-2">{ward.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{ward.description}</p>
                <ul className="space-y-2">
                  {ward.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <ChevronRight className="w-4 h-4 text-red-900 mt-1" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Amenities */}
        <section className="container mx-auto px-4 mt-16">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <motion.h3 
              className="text-xl font-semibold text-red-900 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Common Amenities
            </motion.h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {[
                { icon: Wifi, label: "Free Wi-Fi" },
                { icon: Coffee, label: "Cafeteria" },
                { icon: Users, label: "Visitor Lounge" },
                { icon: Star, label: "Room Service" },
                { icon: Phone, label: "Direct Phone" },
                { icon: Bed, label: "Quality Bedding" }
              ].map((amenity, idx) => (
                <motion.div
                  key={amenity.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <amenity.icon className="w-6 h-6 mx-auto text-red-900 mb-2" />
                  <p className="text-sm text-gray-700">{amenity.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking Information */}
        <section className="container mx-auto px-4 mt-16">
          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold mb-2">Room Booking</h4>
                <p className="text-sm text-gray-700">
                  For room reservations:<br />
                  Tel: +254 (0)703 082 300<br />
                  Email: rooms@nairobihospital.org
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Insurance Coverage</h4>
                <p className="text-sm text-gray-700">
                  For insurance queries:<br />
                  Tel: +254 (0)703 082 301<br />
                  Email: insurance@nairobihospital.org
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Special Requests</h4>
                <p className="text-sm text-gray-700">
                  For special arrangements:<br />
                  Tel: +254 (0)703 082 302<br />
                  Email: special@nairobihospital.org
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Insurance Partners */}
        <InsuranceSlider />
      </main>
    </div>
  );
};

export default RoomsAndWards;