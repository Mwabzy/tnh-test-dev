import { FC } from 'react';
import { motion } from 'framer-motion';
import Heading from '@/components/Heading';
import { Heart, Clock, Phone, Users, Home, Flower2, ChevronRight } from 'lucide-react';

const PalliativeCare: FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Heading
        image_url="/src/assets/heroimages/palliative-care.jpg"
        title="Palliative Care"
        description="Compassionate care for quality of life"
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
                  <p className="text-sm text-gray-500 mb-2">Support & Care</p>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-red-900 leading-tight mb-4">
                    Comprehensive Palliative Care Services
                  </h1>
                  <p className="text-gray-700 max-w-2xl leading-relaxed mb-6">
                    Our palliative care team provides specialized medical care focused on providing relief from the symptoms, pain, and stress of serious illness. We work to improve quality of life for both patients and their families.
                  </p>
                  <div className="flex items-center gap-3">
                    <a href="#services" className="px-5 py-3 bg-red-900 text-white rounded-full font-medium hover:bg-red-800 transition">
                      Our Services
                    </a>
                    <a href="tel:+254703082300" className="px-4 py-3 border border-gray-200 rounded-full text-sm inline-flex items-center gap-2">
                      <Phone className="w-4 h-4" /> Contact Us
                    </a>
                  </div>
                </motion.div>
              </div>

              {/* Added Image */}
              <div className="lg:col-span-5">
                <motion.div 
                  className="rounded-2xl overflow-hidden shadow-lg"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                >
                  <img 
                    src="/src/assets/images/palliative-care-team.jpg" 
                    alt="Palliative Care Team" 
                    className="w-full h-[400px] object-cover"
                  />
                </motion.div>
              </div>

              <div className="lg:col-span-5">
                <motion.div 
                  className="bg-gray-50 rounded-2xl p-6"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-lg font-semibold mb-4">Service Hours</h2>
                  <div className="space-y-4 text-sm">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-red-900" />
                      <div>
                        <p className="font-medium">Inpatient Care</p>
                        <p className="text-gray-600">24/7 Service</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Home className="w-5 h-5 text-red-900" />
                      <div>
                        <p className="font-medium">Home Care</p>
                        <p className="text-gray-600">Mon - Sat: 8:00 AM - 6:00 PM</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Services */}
        <section id="services" className="container mx-auto px-4 mt-16">
          <motion.h2 
            className="text-2xl font-serif font-bold text-red-900 text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Comprehensive Care Services
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Pain Management",
                icon: Heart,
                description: "Expert pain control and symptom management",
                services: [
                  "Pain assessment",
                  "Medication management",
                  "Non-pharmacological approaches",
                  "Regular monitoring",
                  "Breakthrough pain control",
                  "Side effect management"
                ]
              },
              {
                title: "Emotional Support",
                icon: Flower2,
                description: "Comprehensive psychological and spiritual care",
                services: [
                  "Counseling services",
                  "Spiritual support",
                  "Family support groups",
                  "Grief counseling",
                  "Art therapy",
                  "Music therapy"
                ]
              },
              {
                title: "Home Care Services",
                icon: Home,
                description: "Professional care in the comfort of home",
                services: [
                  "Regular home visits",
                  "Family education",
                  "Medication delivery",
                  "Equipment provision",
                  "Care coordination",
                  "Emergency support"
                ]
              }
            ].map((service, idx) => (
              <motion.div
                key={service.title}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <service.icon className="w-8 h-8 text-red-900 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.services.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <ChevronRight className="w-4 h-4 text-red-900 mt-1 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Support Programs */}
        <section className="container mx-auto px-4 mt-16">
          <div className="bg-gray-50 rounded-2xl p-8">
            <motion.h3 
              className="text-xl font-semibold text-red-900 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Support Programs
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Family Support",
                  features: [
                    "Caregiver training",
                    "Respite care",
                    "Support groups",
                    "Resource navigation"
                  ]
                },
                {
                  title: "Wellness Programs",
                  features: [
                    "Relaxation therapy",
                    "Meditation sessions",
                    "Exercise classes",
                    "Nutritional support"
                  ]
                },
                {
                  title: "Bereavement Support",
                  features: [
                    "Grief counseling",
                    "Memorial services",
                    "Support groups",
                    "Resource library"
                  ]
                },
                {
                  title: "Education Programs",
                  features: [
                    "Patient education",
                    "Family workshops",
                    "Community outreach",
                    "Resource materials"
                  ]
                }
              ].map((program, idx) => (
                <motion.div
                  key={program.title}
                  className="bg-white p-6 rounded-xl shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <h4 className="font-semibold mb-3">{program.title}</h4>
                  <ul className="space-y-2">
                    {program.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <ChevronRight className="w-4 h-4 text-red-900 mt-1 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Care Team */}
        <section className="container mx-auto px-4 mt-16">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-xl font-semibold text-red-900 mb-6">Our Care Team</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <Users className="w-8 h-8 text-red-900 mb-4" />
                <h4 className="font-semibold mb-2">Medical Team</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-red-900" />
                    Palliative Care Physicians
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-red-900" />
                    Specialized Nurses
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-red-900" />
                    Pain Specialists
                  </li>
                </ul>
              </div>
              <div>
                <Heart className="w-8 h-8 text-red-900 mb-4" />
                <h4 className="font-semibold mb-2">Support Team</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
              {/* Added Image */}
              <div className="lg:col-span-5">
                <motion.div 
                  className="rounded-2xl overflow-hidden shadow-lg"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                >
                  <img 
                    src="/src/assets/images/palliative-care-team.jpg" 
                    alt="Palliative Care Team" 
                    className="w-full h-[400px] object-cover"
                  />
                </motion.div>
              </div>
                    <ChevronRight className="w-4 h-4 text-red-900" />
                    Counselors
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-red-900" />
                    Social Workers
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-red-900" />
                    Chaplains
                  </li>
                </ul>
              </div>
              <div>
                <Flower2 className="w-8 h-8 text-red-900 mb-4" />
                <h4 className="font-semibold mb-2">Additional Support</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-red-900" />
                    Physiotherapists
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-red-900" />
                    Occupational Therapists
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-red-900" />
                    Nutritionists
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="container mx-auto px-4 mt-16">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-xl font-semibold text-red-900 mb-6">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Palliative Care Unit</h4>
                <p className="text-sm text-gray-700">
                  24/7 Service<br />
                  Tel: +254 (0)703 082 320<br />
                  Email: palliative@nairobihospital.org
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Home Care Services</h4>
                <p className="text-sm text-gray-700">
                  Mon - Sat: 8:00 AM - 6:00 PM<br />
                  Tel: +254 (0)703 082 321<br />
                  Email: homecare@nairobihospital.org
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Support Services</h4>
                <p className="text-sm text-gray-700">
                  Mon - Fri: 8:00 AM - 5:00 PM<br />
                  Tel: +254 (0)703 082 322<br />
                  Email: support@nairobihospital.org
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PalliativeCare;