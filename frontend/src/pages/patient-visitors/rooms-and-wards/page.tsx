import { FC } from 'react';
import { motion } from 'framer-motion';
import Heading from '@/components/Heading';
import { Wifi, Coffee, Tv, Users, Phone, Bed, Shield, Star } from 'lucide-react';

const RoomsAndWards: FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Heading
        image_url="/src/assets/heroimages/rooms-wards.jpg"
        title="Rooms & Wards"
        description="World-class accommodation for your comfort and recovery"
        style="background"
      />

      <main role="main" aria-label="Rooms and Wards" className="pb-20">
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
                  <p className="text-sm text-gray-500 mb-2">Patient Accommodation</p>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-red-900 leading-tight mb-4">
                    Comfortable and Modern Patient Rooms
                  </h1>
                  <p className="text-gray-700 max-w-2xl leading-relaxed mb-6">
                    Experience world-class comfort in our modern patient rooms and specialized wards. Each space is designed to promote healing and ensure the highest standards of medical care and patient comfort.
                  </p>
                  <div className="flex items-center gap-3">
                    <a href="#room-types" className="px-5 py-3 bg-red-900 text-white rounded-full font-medium hover:bg-red-800 transition">
                      View Room Types
                    </a>
                    <a href="tel:+254703082622" className="px-4 py-3 border border-gray-200 rounded-full text-sm inline-flex items-center gap-2">
                      <Phone className="w-4 h-4" /> Room Enquiries
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
                    src="https://karenhospital.org/wp-content/uploads/2019/10/Executive-Suit.jpg" 
                    alt="Private Room" 
                    className="w-full h-64 object-cover"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Room Types */}
        <section className="container mx-auto px-4 mt-16">
          <motion.h2 
            className="text-2xl font-serif font-bold text-red-900 text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Accommodation Options
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Presidential Suite",
                image: "https://cdn.prod.website-files.com/673c89b10bb03cfb1860bed1/6765f6388a3b02f842e422c0_Royal%20Suite2.webp",
                description: "Ultimate luxury with separate living area and premium amenities.",
                features: [
                  "Private balcony",
                  "Living room area",
                  "Executive dining",
                  "Visitor accommodation",
                  "Premium entertainment",
                  "Concierge service"
                ]
              },
              {
                title: "Executive Rooms",
                image: "https://karenhospital.org/wp-content/uploads/2019/10/Executive-Suit.jpg",
                description: "Spacious private rooms with enhanced comfort features.",
                features: [
                  "Private bathroom",
                  "Visitor sofa bed",
                  "Smart TV",
                  "Mini refrigerator",
                  "Work desk",
                  "City views"
                ]
              },
              {
                title: "Private Rooms",
                image: "/src/assets/images/private-room.jpg",
                description: "Comfortable single-occupancy rooms for privacy and rest.",
                features: [
                  "En-suite bathroom",
                  "Visitor chair",
                  "Television",
                  "Storage space",
                  "Reading light",
                  "Nurse call system"
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
                  <p className="text-gray-600 text-sm mb-4">{room.description}</p>
                  <ul className="space-y-2">
                    {room.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <Star className="w-4 h-4 text-red-900 mt-1 flex-shrink-0" />
                        {feature}
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
            Specialized Care Units
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Intensive Care Unit (ICU)",
                description: "State-of-the-art critical care unit with advanced monitoring systems.",
                features: [
                  "24/7 specialized care",
                  "Advanced life support",
                  "Individual monitoring",
                  "Family support area"
                ]
              },
              {
                title: "High Dependency Unit (HDU)",
                description: "Intermediate care facility for patients requiring close monitoring.",
                features: [
                  "Continuous monitoring",
                  "Specialized nursing",
                  "Step-down care",
                  "Recovery support"
                ]
              },
              {
                title: "Pediatric Ward",
                description: "Child-friendly environment with specialized pediatric care.",
                features: [
                  "Child-sized equipment",
                  "Play area",
                  "Parent accommodation",
                  "Pediatric nurses"
                ]
              },
              {
                title: "Maternity Ward",
                description: "Comfortable and private spaces for new mothers and babies.",
                features: [
                  "Labor rooms",
                  "Recovery suites",
                  "Nursery facilities",
                  "Lactation support"
                ]
              }
            ].map((ward, idx) => (
              <motion.div
                key={ward.title}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <h3 className="text-xl font-semibold mb-3">{ward.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{ward.description}</p>
                <ul className="space-y-2">
                  {ward.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <Shield className="w-4 h-4 text-red-900 mt-1 flex-shrink-0" />
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
          <div className="bg-gray-50 rounded-2xl p-8">
            <motion.h3 
              className="text-xl font-semibold text-red-900 mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Standard Amenities
            </motion.h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Wifi, label: "High-speed WiFi" },
                { icon: Tv, label: "Smart TV" },
                { icon: Coffee, label: "Dining Service" },
                { icon: Users, label: "Visitor Area" },
                { icon: Bed, label: "Adjustable Bed" },
                { icon: Shield, label: "24/7 Security" },
                { icon: Star, label: "Room Service" },
                { icon: Phone, label: "Direct Phone Line" }
              ].map((amenity, idx) => (
                <motion.div
                  key={amenity.label}
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <amenity.icon className="w-8 h-8 text-red-900 mb-2" />
                  <span className="text-sm text-gray-700">{amenity.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact & Booking */}
        <section className="container mx-auto px-4 mt-16">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold text-red-900 mb-2">Room Enquiries</h4>
                <p className="text-sm text-gray-700">
                  Contact our accommodation team for availability and bookings.<br />
                  Tel: +254 (0)703 082 000<br />
                  Email: rooms@nairobihospital.org
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-red-900 mb-2">Insurance Coverage</h4>
                <p className="text-sm text-gray-700">
                  We work with all major insurance providers. Contact our financial counselors for details about coverage and room options.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-red-900 mb-2">Virtual Tour</h4>
                <p className="text-sm text-gray-700">
                  Take a virtual tour of our rooms and facilities. Schedule a viewing with our patient relations team.
                </p>
                <a href="#virtual-tour" className="text-red-900 text-sm font-medium mt-2 inline-block">
                  Start virtual tour →
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default RoomsAndWards;