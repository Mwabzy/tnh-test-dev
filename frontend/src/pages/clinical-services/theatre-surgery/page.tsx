import { FC } from 'react';
import { motion } from 'framer-motion';
import Heading from '@/components/Heading';
import { Stethoscope, Clock, Phone, ClipboardCheck, HeartPulse, ChevronRight } from 'lucide-react';
import InsuranceSlider from '@/components/InsuranceSlider';
import ClientsSay from '@/components/ClientsSay';
import TeamSection from '@/components/TeamSection';

const TheatreAndSurgery: FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Heading
        image_url="/src/assets/heroimages/surgery.jpg"
        title="Theatre & Surgery"
        description="State-of-the-art surgical facilities and expert care"
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
                  <p className="text-sm text-gray-500 mb-2">Surgical Excellence</p>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-red-900 leading-tight mb-4">
                    Advanced Surgical Services
                  </h1>
                  <p className="text-gray-700 max-w-2xl leading-relaxed mb-6">
                    Our modern surgical facilities are equipped with the latest technology and staffed by highly skilled surgical teams. We provide comprehensive surgical care across multiple specialties, ensuring the best possible outcomes for our patients.
                  </p>
                  <div className="flex items-center gap-3">
                    <a href="#services" className="px-5 py-3 bg-red-900 text-white rounded-full font-medium hover:bg-red-800 transition">
                      Our Services
                    </a>
                    <a href="tel:+254703082300" className="px-4 py-3 border border-gray-200 rounded-full text-sm inline-flex items-center gap-2">
                      <Phone className="w-4 h-4" /> Surgery Enquiry
                    </a>
                  </div>
                </motion.div>
              </div>

              <div className="lg:col-span-5">
                <motion.div 
                  className="bg-gray-50 rounded-2xl p-6"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-lg font-semibold mb-4">Theatre Complex</h2>
                  <div className="space-y-4 text-sm">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-red-900" />
                      <div>
                        <p className="font-medium">Operating Hours</p>
                        <p className="text-gray-600">24/7 Emergency Surgery</p>
                        <p className="text-gray-600">Elective Surgery: Mon-Fri 7AM-6PM</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-red-900" />
                      <div>
                        <p className="font-medium">Contact</p>
                        <p className="text-gray-600">Tel: +254 (0)703 082 300</p>
                      </div>
                    </div>
                  </div>
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
                { value: "12+", label: "Operating Theatres" },
                { value: "50+", label: "Surgical Specialists" },
                { value: "5000+", label: "Annual Surgeries" },
                { value: "99%", label: "Success Rate" }
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

        {/* Surgical Services */}
        <section id="services" className="container mx-auto px-4 mt-16">
          <motion.h2 
            className="text-2xl font-serif font-bold text-red-900 text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Surgical Services
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "General Surgery",
                description: "Comprehensive surgical procedures including abdominal, breast, and endocrine surgery.",
                procedures: [
                  "Laparoscopic Surgery",
                  "Hernia Repair",
                  "Appendectomy",
                  "Gallbladder Surgery",
                  "Breast Surgery",
                  "Thyroid Surgery"
                ]
              },
              {
                title: "Orthopedic Surgery",
                description: "Advanced procedures for bone, joint, and muscle conditions.",
                procedures: [
                  "Joint Replacement",
                  "Spine Surgery",
                  "Sports Injuries",
                  "Fracture Repair",
                  "Arthroscopic Surgery",
                  "Hand Surgery"
                ]
              },
              {
                title: "Cardiac Surgery",
                description: "State-of-the-art heart and vascular procedures.",
                procedures: [
                  "Coronary Bypass",
                  "Heart Valve Surgery",
                  "Aortic Surgery",
                  "Minimally Invasive Surgery",
                  "Cardiac Ablation",
                  "Pacemaker Implantation"
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
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.procedures.map((procedure, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <ChevronRight className="w-4 h-4 text-red-900 mt-1 flex-shrink-0" />
                      {procedure}
                    </li>
                  ))}
                </ul>
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
              Surgical Technology
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Robotic Surgery",
                  icon: Stethoscope,
                  features: [
                    "Da Vinci Surgical System",
                    "3D HD Visualization",
                    "Precise Control",
                    "Minimally Invasive"
                  ]
                },
                {
                  title: "Advanced Imaging",
                  icon: HeartPulse,
                  features: [
                    "3D Surgical Navigation",
                    "Intraoperative Imaging",
                    "Real-time Monitoring",
                    "High-Resolution Displays"
                  ]
                },
                {
                  title: "Monitoring Systems",
                  icon: ClipboardCheck,
                  features: [
                    "Advanced Vital Monitoring",
                    "Anesthesia Integration",
                    "Real-time Data Analysis",
                    "Emergency Response Systems"
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
                  <h4 className="font-semibold mb-3">{tech.title}</h4>
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

        {/* Surgical Team */}
        <section className="container mx-auto px-4 mt-16">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-xl font-semibold text-red-900 mb-6">Our Surgical Team</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Surgeons</h4>
                <p className="text-sm text-gray-700 mb-4">
                  Highly skilled specialists across multiple surgical disciplines with extensive experience in complex procedures.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Anesthesiologists</h4>
                <p className="text-sm text-gray-700 mb-4">
                  Expert team providing safe and effective anesthesia care and pain management.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Theatre Nurses</h4>
                <p className="text-sm text-gray-700 mb-4">
                  Specialized nursing staff trained in perioperative care and surgical assistance.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Support Staff</h4>
                <p className="text-sm text-gray-700 mb-4">
                  Dedicated technicians, sterile processing team, and support personnel.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="container mx-auto px-4 mt-16">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-xl font-semibold text-red-900 mb-6">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Surgery Scheduling</h4>
                <p className="text-sm text-gray-700">
                  Mon - Fri: 8:00 AM - 5:00 PM<br />
                  Tel: +254 (0)703 082 300<br />
                  Email: surgery@nairobihospital.org
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Emergency Surgery</h4>
                <p className="text-sm text-gray-700">
                  24/7 Service<br />
                  Tel: +254 (0)703 082 000<br />
                  Email: emergency@nairobihospital.org
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Pre-Surgery Consultation</h4>
                <p className="text-sm text-gray-700">
                  Mon - Fri: 9:00 AM - 4:00 PM<br />
                  Tel: +254 (0)703 082 301<br />
                  Email: presurgery@nairobihospital.org
                </p>
              </div>
            </div>
          </div>
        </section>

  {/* Clinical Team (inserted before ClientsSay) */}
        <TeamSection
          title="Surgical Team"
          team={[
            { name: 'Prof. John Kihara', title: 'Lead Surgeon', image: '/src/assets/images/image1.png', bio: 'Renowned surgeon across multiple specialties.' },
            { name: 'Dr. Faith Naliaka', title: 'Chief Anaesthesiologist', image: '/src/assets/images/image2.png', bio: 'Leads anaesthesia and perioperative care.' },
            { name: 'Ms. Susan Wanyoike', title: 'Theatre Nursing Lead', image: '/src/assets/images/image3.png', bio: 'Coordinates theatre nursing and sterile processes.' },
            { name: 'Mr. Paul Mwangi', title: 'Theatre Technician', image: '/src/assets/images/image4.png', bio: 'Ensures equipment and instrument readiness.' },
          ]}
        />

        {/* Client Testimonials */}
        <ClientsSay
          title="What our clients say about Theatre & Surgery"
          testimonials={[
            { quote: 'Highly skilled surgeons and a supportive perioperative team.', name: 'J. Kihara', avatar: '/src/assets/images/image1.png' },
            { quote: 'Excellent anaesthesia care and quick recovery support.', name: 'F. Naliaka', avatar: '/src/assets/images/image2.png' },
            { quote: 'Well-coordinated care from pre-op to discharge.', name: 'S. Wanyoike', avatar: '/src/assets/images/image3.png' },
          ]}
        />

  {/* Insurance Partners */}
  <InsuranceSlider />
      </main>
    </div>
  );
};

export default TheatreAndSurgery;