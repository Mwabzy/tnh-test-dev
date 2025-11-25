import { FC } from 'react';
import { motion } from 'framer-motion';
import Heading from '@/components/Heading';
import { ClipboardCheck, Shield, ChartBar, Microscope, BookOpen, Users2, ChevronRight } from 'lucide-react';
import InsuranceSlider from '@/components/InsuranceSlider';
import ClientsSay from '@/components/ClientsSay';
import TeamSection from '@/components/TeamSection';

const InfectionControl: FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Heading
        image_url="/src/assets/heroimages/infection-control.jpg"
        title="Quality & Infection Control"
        description="Ensuring patient safety through rigorous standards"
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
                  <p className="text-sm text-gray-500 mb-2">Quality Assurance</p>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-red-900 leading-tight mb-4">
                    Continuous Quality Improvement & Infection Control
                  </h1>
                  <p className="text-gray-700 max-w-2xl leading-relaxed mb-6">
                    Our dedicated CQI and Infection Control teams work tirelessly to maintain the highest standards of patient care and safety. Through continuous monitoring, education, and implementation of best practices, we ensure optimal healthcare outcomes.
                  </p>
                </motion.div>
              </div>

              <div className="lg:col-span-5">
                <motion.div 
                  className="bg-gray-50 rounded-2xl p-6"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-lg font-semibold mb-4">Key Achievements</h2>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-red-900" />
                      <div>
                        <p className="font-medium">JCI Accreditation</p>
                        <p className="text-gray-600">International quality standards certification</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <ChartBar className="w-5 h-5 text-red-900" />
                      <div>
                        <p className="font-medium">Low Infection Rates</p>
                        <p className="text-gray-600">Below international benchmarks</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Quality Programs */}
        <section className="container mx-auto px-4 mt-16">
          <motion.h2 
            className="text-2xl font-serif font-bold text-red-900 text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Quality Improvement Programs
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Clinical Audit Program",
                icon: ClipboardCheck,
                description: "Regular monitoring and evaluation of clinical practices",
                features: [
                  "Systematic review of care",
                  "Performance benchmarking",
                  "Outcome analysis",
                  "Continuous feedback",
                  "Action plan implementation",
                  "Regular follow-up"
                ]
              },
              {
                title: "Infection Prevention",
                icon: Shield,
                description: "Comprehensive infection control measures",
                features: [
                  "Hand hygiene program",
                  "Sterilization protocols",
                  "Environmental cleaning",
                  "Isolation procedures",
                  "Staff training",
                  "Surveillance systems"
                ]
              },
              {
                title: "Quality Metrics",
                icon: ChartBar,
                description: "Data-driven quality assessment",
                features: [
                  "Patient satisfaction",
                  "Clinical outcomes",
                  "Safety indicators",
                  "Process efficiency",
                  "Resource utilization",
                  "Compliance rates"
                ]
              }
            ].map((program, idx) => (
              <motion.div
                key={program.title}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <program.icon className="w-8 h-8 text-red-900 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{program.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{program.description}</p>
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
        </section>

        {/* Infection Control Measures */}
        <section className="container mx-auto px-4 mt-16">
          <div className="bg-gray-50 rounded-2xl p-8">
            <motion.h3 
              className="text-xl font-semibold text-red-900 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Key Control Measures
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Hand Hygiene",
                  icon: Shield,
                  measures: [
                    "WHO 5 moments",
                    "Regular audits",
                    "Training programs",
                    "Compliance monitoring"
                  ]
                },
                {
                  title: "Environmental Cleaning",
                  icon: Microscope,
                  measures: [
                    "Standard protocols",
                    "Regular schedules",
                    "Quality checks",
                    "Special area procedures"
                  ]
                },
                {
                  title: "Staff Education",
                  icon: BookOpen,
                  measures: [
                    "Regular training",
                    "Updates on guidelines",
                    "Competency assessment",
                    "Best practice sharing"
                  ]
                },
                {
                  title: "Surveillance",
                  icon: ChartBar,
                  measures: [
                    "Infection tracking",
                    "Data analysis",
                    "Trend monitoring",
                    "Outbreak prevention"
                  ]
                }
              ].map((measure, idx) => (
                <motion.div
                  key={measure.title}
                  className="bg-white p-6 rounded-xl shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <measure.icon className="w-8 h-8 text-red-900 mb-4" />
                  <h4 className="font-semibold mb-3">{measure.title}</h4>
                  <ul className="space-y-2">
                    {measure.measures.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <ChevronRight className="w-4 h-4 text-red-900 mt-1 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Quality Team */}
        <section className="container mx-auto px-4 mt-16">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-xl font-semibold text-red-900 mb-6">Our Quality Team</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <Users2 className="w-8 h-8 text-red-900 mb-4" />
                <h4 className="font-semibold mb-2">Quality Department</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-red-900" />
                    Quality Manager
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-red-900" />
                    Clinical Auditors
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-red-900" />
                    Process Improvement Specialists
                  </li>
                </ul>
              </div>
              <div>
                <Shield className="w-8 h-8 text-red-900 mb-4" />
                <h4 className="font-semibold mb-2">Infection Control Team</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-red-900" />
                    Infection Control Practitioners
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-red-900" />
                    Microbiologists
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-red-900" />
                    Link Nurses
                  </li>
                </ul>
              </div>
              <div>
                <ClipboardCheck className="w-8 h-8 text-red-900 mb-4" />
                <h4 className="font-semibold mb-2">Support Services</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-red-900" />
                    Environmental Services
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-red-900" />
                    Sterile Processing
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-red-900" />
                    Training Coordinators
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
                <h4 className="font-semibold mb-2">Quality Department</h4>
                <p className="text-sm text-gray-700">
                  Mon - Fri: 8:00 AM - 5:00 PM<br />
                  Tel: +254 (0)703 082 310<br />
                  Email: quality@nairobihospital.org
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Infection Control</h4>
                <p className="text-sm text-gray-700">
                  24/7 Service<br />
                  Tel: +254 (0)703 082 311<br />
                  Email: infection.control@nairobihospital.org
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Training & Education</h4>
                <p className="text-sm text-gray-700">
                  Mon - Fri: 9:00 AM - 4:00 PM<br />
                  Tel: +254 (0)703 082 312<br />
                  Email: quality.training@nairobihospital.org
                </p>
              </div>
            </div>
          </div>
        </section>

  {/* Client Testimonials */}
        {/* Clinical Team (inserted before ClientsSay) */}
        <TeamSection
          title="Quality & Infection Control Team"
          team={[
            { name: 'Dr. Victor Kilonzo', title: 'Head of Infection Control', image: '/src/assets/doctorsImages/unknown.png', bio: '' },
            { name: 'Ms. Hannah Muthoni', title: 'Quality Manager', image: '/src/assets/doctorsImages/unknown.png', bio: '' },
            { name: 'Dr. George Otieno', title: 'Microbiologist', image: '/src/assets/doctorsImages/unknown.png', bio: '' },
            { name: 'Ms. Grace Wairimu', title: 'Training Coordinator', image: '/src/assets/doctorsImages/unknown.png', bio: '' },
          ]}
        />

        <ClientsSay
          title="What our clients say about Infection Control"
          testimonials={[
            { quote: 'Strict adherence to safety protocols made me feel safe.', name: 'V. Kilonzo', avatar: '/src/assets/feedback/clients.png' },
            { quote: 'Professional sterilization and hygiene practices.', name: 'H. Muthoni', avatar: '/src/assets/feedback/clients.png' },
            { quote: 'Clear information on infection prevention at discharge.', name: 'G. Otieno', avatar: '/src/assets/feedback/clients.png' },
          ]}
        />

  {/* Insurance Partners */}
  <InsuranceSlider />
      </main>
    </div>
  );
};

export default InfectionControl;