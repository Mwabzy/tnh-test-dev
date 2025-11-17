import { FC } from 'react';
import { motion } from 'framer-motion';
import Heading from '@/components/Heading';
import { Heart, Activity, Users, Phone, Clock, MonitorSmartphone, ChevronRight } from 'lucide-react';
import InsuranceSlider from '@/components/InsuranceSlider';
import ClientsSay from '@/components/ClientsSay';
import TeamSection from '@/components/TeamSection';

const CriticalCare: FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Heading
        image_url="/src/assets/heroimages/critical-care.jpg"
        title="Critical Care Services"
        description="Advanced intensive care with cutting-edge technology"
        style="background"
      />

      <main role="main" aria-label="Critical Care Services" className="pb-20">
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
                  <p className="text-sm text-gray-500 mb-2">Intensive Care</p>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-red-900 leading-tight mb-4">
                    State-of-the-Art Critical Care Units
                  </h1>
                  <p className="text-gray-700 max-w-2xl leading-relaxed mb-6">
                    Our critical care units provide the highest level of care for critically ill patients. Equipped with advanced technology and staffed by specialized medical professionals, we ensure 24/7 comprehensive intensive care.
                  </p>
                  <div className="flex items-center gap-3">
                    <a href="#facilities" className="px-5 py-3 bg-red-900 text-white rounded-full font-medium hover:bg-red-800 transition">
                      Our Facilities
                    </a>
                    <a href="tel:+254703082622" className="px-4 py-3 border border-gray-200 rounded-full text-sm inline-flex items-center gap-2">
                      <Phone className="w-4 h-4" /> Emergency Contact
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
                    src="https://media.post.rvohealth.io/wp-content/uploads/2021/01/INTENSIVE-CARE-UNIT-1200x628-facebook-1200x628.jpg" 
                    alt="ICU Unit" 
                    className="w-full h-64 object-cover"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-gray-50 py-12 mt-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: "30+", label: "ICU Beds" },
                { value: "24/7", label: "Specialist Care" },
                { value: "15+", label: "Critical Care Specialists" },
                { value: "98%", label: "Recovery Rate" }
              ].map((stat, idx) => (
                <motion.div 
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="text-3xl font-bold text-red-900 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Critical Care Units */}
        <section className="container mx-auto px-4 mt-16">
          <motion.h2 
            className="text-2xl font-serif font-bold text-red-900 text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Critical Care Units
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Intensive Care Unit (ICU)",
                image: "https://res.cloudinary.com/jerrick/image/upload/c_scale,f_jpg,q_auto/64216df7edb7fe001d95d46e.jpg",
                description: "Advanced intensive care for critically ill patients requiring comprehensive support.",
                features: [
                  "Advanced life support systems",
                  "24/7 intensive monitoring",
                  "Specialized medical staff",
                  "State-of-the-art equipment",
                  "Individual patient pods",
                  "Infection control protocols"
                ]
              },
              {
                title: "HDU (High Dependancy Unit)",
                image: "https://assets.clevelandclinic.org/transform/LargeFeatureImage/fea29e05-f4e8-4247-8d6d-dee01b5083ff/intensive-care-unit-1303165249",
                description: "Specialized care for patients with severe cardiac conditions.",
                features: [
                  "Cardiac monitoring systems",
                  "Intervention capabilities",
                  "Heart failure management",
                  "Post-cardiac surgery care",
                  "Telemetry monitoring",
                  "Cardiac specialists"
                ]
              },
              {
                title: "Pediatric ICU",
                image: "https://www.aksigenivf.com/assets/images/blog/blog75.jpg",
                description: "Dedicated intensive care for children requiring critical care.",
                features: [
                  "Child-specific equipment",
                  "Pediatric specialists",
                  "Family-centered care",
                  "Child-friendly environment",
                  "Specialized monitoring",
                  "Parent accommodation"
                ]
              }
            ].map((unit, idx) => (
              <motion.div
                key={unit.title}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={unit.image}
                    alt={unit.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{unit.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{unit.description}</p>
                  <ul className="space-y-2">
                    {unit.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <ChevronRight className="w-4 h-4 text-red-900 mt-1 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Advanced Technology */}
        <section className="container mx-auto px-4 mt-16">
          <div className="bg-gray-50 rounded-2xl p-8">
            <motion.h3 
              className="text-xl font-semibold text-red-900 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Advanced Medical Technology
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Patient Monitoring",
                  icon: MonitorSmartphone,
                  description: "Advanced monitoring systems for continuous patient observation",
                  features: [
                    "Real-time vital monitoring",
                    "Early warning systems",
                    "Trend analysis",
                    "Remote monitoring capabilities"
                  ]
                },
                {
                  title: "Life Support Systems",
                  icon: Heart,
                  description: "State-of-the-art life support equipment",
                  features: [
                    "Advanced ventilators",
                    "ECMO capabilities",
                    "Dialysis systems",
                    "Specialized cardiac support"
                  ]
                },
                {
                  title: "Point-of-Care Testing",
                  icon: Activity,
                  description: "Rapid diagnostic capabilities at bedside",
                  features: [
                    "Blood gas analysis",
                    "Rapid diagnostics",
                    "Immediate results",
                    "Treatment monitoring"
                  ]
                }
              ].map((tech, idx) => (
                <motion.div
                  key={tech.title}
                  className="bg-white p-6 rounded-xl shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <tech.icon className="w-8 h-8 text-red-900 mb-4" />
                  <h4 className="font-semibold mb-2">{tech.title}</h4>
                  <p className="text-sm text-gray-600 mb-4">{tech.description}</p>
                  <ul className="space-y-2">
                    {tech.features.map((feature, i) => (
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

        {/* Team & Support */}
        <section className="container mx-auto px-4 mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Medical Team */}
            <motion.div
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Users className="w-8 h-8 text-red-900 mb-4" />
              <h3 className="text-lg font-semibold mb-4">Our Critical Care Team</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-red-900 mt-1" />
                  Intensive Care Specialists
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-red-900 mt-1" />
                  Critical Care Nurses
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-red-900 mt-1" />
                  Respiratory Therapists
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-red-900 mt-1" />
                  Physiotherapists
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-red-900 mt-1" />
                  Clinical Pharmacists
                </li>
              </ul>
            </motion.div>

            {/* Visiting Hours */}
            <motion.div
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Clock className="w-8 h-8 text-red-900 mb-4" />
              <h3 className="text-lg font-semibold mb-4">Visiting Information</h3>
              <div className="space-y-4 text-sm text-gray-700">
                <p><strong>ICU Visiting Hours:</strong><br/>11:00 AM - 12:00 PM<br/>4:00 PM - 5:00 PM</p>
                <p><strong>Family Updates:</strong><br/>Doctors round: 8:00 AM - 10:00 AM<br/>Evening update: 6:00 PM</p>
                <p className="text-red-900 font-medium">
                  Special arrangements can be made for immediate family members
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact & Support */}
        <section className="container mx-auto px-4 mt-16">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-xl font-semibold text-red-900 mb-6">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-2">ICU Reception</h4>
                <p className="text-sm text-gray-700">
                  24/7 Access<br />
                  Tel: +254 (0)703 082 300<br />
                  Email: icu@nairobihospital.org
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Family Support</h4>
                <p className="text-sm text-gray-700">
                  Mon - Fri: 8:00 AM - 5:00 PM<br />
                  Tel: +254 (0)703 082 301<br />
                  Email: icusupport@nairobihospital.org
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Emergency Transfers</h4>
                <p className="text-sm text-gray-700">
                  24/7 Emergency Line<br />
                  Tel: +254 (0)703 082 000<br />
                  Email: criticalcare@nairobihospital.org
                </p>
              </div>
            </div>
          </div>
        </section>

  {/* Client Testimonials */}
        {/* Clinical Team (inserted before ClientsSay) */}
        <TeamSection
          title="Critical Care Team"
          team={[
            { name: 'Dr. Rebecca Njoro', title: 'Head of Critical Care', image: '/src/assets/images/image1.png', bio: 'Clinical lead for ICU services and critical care policy.' },
            { name: 'Dr. Samuel Awuor', title: 'Intensivist', image: '/src/assets/images/image2.png', bio: 'Specialist in multi-organ support and critical illness.' },
            { name: 'Ms. Mercy Mburu', title: 'Critical Care Nurse Lead', image: '/src/assets/images/image3.png', bio: 'Coordinates nursing teams and sedation protocols.' },
            { name: 'Mr. Tom Ochieng', title: 'Respiratory Therapist', image: '/src/assets/images/image4.png', bio: 'Expert in ventilatory support and airway management.' },
          ]}
        />

        <ClientsSay
          title="What our clients say about Critical Care"
          testimonials={[
            { quote: 'Exceptional ICU team, highly skilled and attentive.', name: 'R. Njoro', avatar: '/src/assets/images/image1.png' },
            { quote: 'Our family was kept informed and cared for.', name: 'S. Awuor', avatar: '/src/assets/images/image2.png' },
            { quote: 'Life-saving interventions with great professionalism.', name: 'T. Mburu', avatar: '/src/assets/images/image3.png' },
          ]}
        />

  {/* Insurance Partners */}
  <InsuranceSlider />
      </main>
    </div>
  );
};

export default CriticalCare;