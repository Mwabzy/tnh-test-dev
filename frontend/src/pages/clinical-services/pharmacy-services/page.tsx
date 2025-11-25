import Heading from '@/components/Heading';
import { Clock, ClipboardCheck, BadgeCheck, Building2, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import InsuranceSlider from '@/components/InsuranceSlider';
import ClientsSay from '@/components/ClientsSay';
import TeamSection from '@/components/TeamSection';

const Feature = ({ icon, title, description }: { icon: React.ReactNode; title: string; description?: string }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
  >
    <div className="p-3 bg-red-50 rounded-xl text-red-700 shrink-0">{icon}</div>
    <div>
      <h4 className="font-semibold text-gray-900 text-lg">{title}</h4>
      {description && <p className="text-sm text-gray-600 mt-2 leading-relaxed">{description}</p>}
    </div>
  </motion.div>
);

const PharmacyServices: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero Section */}
      <Heading
        image_url="/src/assets/services/pharmacy2.png"
        title="Quality Medicine"
        description="A patient-focused pharmacy department providing safe, timely and affordable medicines through our qualified team and rigorous quality processes."
        style="background"
      />

      <div className="container mx-auto px-4 py-12">
        {/* Modern Stats Section */}
        <div className="relative mb-24">
          <div className="absolute inset-0 bg-gradient-to-r from-red-900 to-red-800 transform skew-y-3"></div>
          <div className="relative bg-white py-12 transform -skew-y-3">
            <div className="transform skew-y-3">
              <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  {[
                    { number: "16+", label: "Pharmacy Units" },
                    { number: "24/7", label: "Service Available" },
                    { number: "100%", label: "Prescription Fill Rate" },
                    { number: "30+", label: "Expert Pharmacists" }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="text-center"
                    >
                      <p className="text-4xl font-bold text-red-900 mb-2">{stat.number}</p>
                      <p className="text-gray-600">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Introduction with Image */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
              Excellence in
              <span className="text-red-900"> Pharmaceutical Care</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              The Nairobi Hospital Pharmacy is staffed by highly qualified professionals and committed to safe, effective and affordable medication services for both inpatients and outpatients.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/contact')}
                className="px-6 py-3 bg-red-900 text-white rounded-lg hover:bg-red-800 transition-colors"
              >
                Contact Pharmacy
              </button>
              <button
                onClick={() => navigate('/pharmacy/delivery')}
                className="px-6 py-3 border-2 border-red-900 text-red-900 rounded-lg hover:bg-red-50 transition-colors"
              >
                Delivery Service
              </button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src="/src/assets/services/pharmacy1.png"
              alt="Pharmacist consulting with patient"
              className="rounded-2xl shadow-2xl w-full"
            />
            <div className="absolute -bottom-6 -left-6 bg-red-900 text-white p-4 rounded-lg shadow-lg">
              <p className="text-lg font-semibold">Expert Consultation</p>
              <p className="text-sm opacity-90">Available at all our outlets</p>
            </div>
          </motion.div>
        </div>

        {/* Core Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Feature 
            icon={<Clock className="w-6 h-6" />} 
            title="24/7 Pharmacy Services" 
            description="Continuous service availability for inpatients and urgent outpatient needs, ensuring medication access at all times." 
          />
          <Feature 
            icon={<ClipboardCheck className="w-6 h-6" />} 
            title="100% Prescription Fill" 
            description="Committed to filling all valid prescriptions, including sourcing specialized imports when needed." 
          />
          <Feature 
            icon={<BadgeCheck className="w-6 h-6" />} 
            title="Quality Assured Medicines" 
            description="All products vetted by the Medicines & Therapeutics Committee and procured from registered suppliers." 
          />
        </div>

        {/* Locations Map Section */}
        <div className="mb-24 bg-gradient-to-br from-gray-50 to-white rounded-3xl p-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Our Pharmacy Network</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                16 strategic locations across Nairobi ensuring medication accessibility
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-red-900" />
                  Main Hospital Units
                </h3>
                <div className="space-y-3">
                  {[
                    "Inpatient Pharmacy",
                    "Main Pharmacy",
                    "A&E Pharmacy",
                    "Doctors Plaza",
                    "Anderson Centre",
                    "Cancer Centre",
                    "Critical Care Unit",
                    "Theatre Pharmacies",
                    "UN-East Wing"
                  ].map((unit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-2 text-gray-600 hover:text-red-900 transition-colors"
                    >
                      <div className="w-1.5 h-1.5 bg-red-900 rounded-full"></div>
                      {unit}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative rounded-xl overflow-hidden h-[400px]"
              >
                <img
                  src="https://www.menap-smi.org/wp-content/uploads/title-banner-The-Role-of-the-Pharmacist-in-Self-Care-and-Self-Medication.jpg"
                  alt="Modern pharmacy interior"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-xl font-semibold mb-2">State-of-the-Art Facilities</h3>
                    <p className="text-sm opacity-90">Modern equipment and infrastructure at all our locations</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-red-900" />
                  Satellite Pharmacies
                </h3>
                <div className="space-y-3">
                  {[
                    "Galleria Mall (2 units)",
                    "Warwick Centre",
                    "Capital Centre",
                    "Rosslyn Riviera Mall",
                    "Southfield Mall",
                    "Kiambu Mall"
                  ].map((location, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-2 text-gray-600 hover:text-red-900 transition-colors"
                    >
                      <div className="w-1.5 h-1.5 bg-red-900 rounded-full"></div>
                      {location}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Services Grid with Images */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Comprehensive Pharmacy Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From standard prescriptions to specialized care, we provide a full range of pharmaceutical services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Prescription Services",
                description: "Quick and accurate dispensing of both local and international prescriptions",
                image: "https://parnellpharmacy.co.uk/wp-content/uploads/2023/08/private-prescriptions-1.jpg",
                features: [
                  "15-minute standard dispensing",
                  "Electronic prescription processing",
                  "Multi-language labeling",
                  "Insurance billing support"
                ]
              },
              {
                title: "Clinical Pharmacy",
                description: "Expert medication therapy management and patient counseling",
                image: "https://images.ctfassets.net/4f3rgqwzdznj/3rld1UJjhfV0sLTAQCBvuT/266143e35e8b9dc7891095b8c7b0d4bc/pharmacist_consultation_with_patient-1179644653.jpg",
                features: [
                  "Medication therapy review",
                  "Drug interaction checks",
                  "Patient education sessions",
                  "Treatment monitoring"
                ]
              },
              {
                title: "Specialty Medications",
                description: "Access to rare and specialized medications through our global network",
                image: "https://cdn.sanity.io/images/0vv8moc6/pharmacytimes/72a7d55e5a4aa645b9ff3ebedbdb84a50612ff20-7098x4781.jpg",
                features: [
                  "Rare disease medications",
                  "Biological products",
                  "Cold chain management",
                  "Import facilitation"
                ]
              },
              {
                title: "Home Delivery Service",
                description: "Convenient medication delivery service to your doorstep",
                image: "https://newagepsychiatry.com/wp-content/uploads/2022/02/Screen-Shot-2022-02-16-at-12.40.41-PM-1.png",
                features: [
                  "Same-day delivery option",
                  "Temperature-controlled transport",
                  "Real-time tracking",
                  "Contactless delivery"
                ]
              },
              {
                title: "Medication Management",
                description: "Comprehensive medication review and optimization services",
                image: "https://www.adelaidemedicalcentre.nhs.uk/Public/F83020/Image/f94c4cc8-4e3b-45c4-9141-ff6a2844917f.jpg",
                features: [
                  "Medication synchronization",
                  "Compliance packaging",
                  "Automated refill reminders",
                  "Side effect monitoring"
                ]
              },
              {
                title: "24/7 Emergency Service",
                description: "Round-the-clock access to essential medications",
                image: "https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJvYXV0aCI6eyJjbGllbnRfaWQiOiJmcm9udGlmeS1maW5kZXIifSwicGF0aCI6ImloaC1oZWFsdGhjYXJlLWJlcmhhZFwvYWNjb3VudHNcL2MzXC80MDAwNjI0XC9wcm9qZWN0c1wvMjA5XC9hc3NldHNcL2YxXC8zODY0OFwvNDRmYjlmYTBlZGJmMTk5N2MxMzRmNTllNTM1NzE5Y2QtMTY1ODMwMjcwOS5qcGcifQ:ihh-healthcare-berhad:wqBvnL1AfZeG9_D_vTmAAVOrgeuaAizUCPgVcBmzNRo?format=webp",
                features: [
                  "Critical medications access",
                  "Emergency consultations",
                  "Urgent care coordination",
                  "After-hours support"
                ]
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                    <div className="absolute bottom-0 p-4">
                      <h3 className="text-xl font-semibold text-white mb-1">{service.title}</h3>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                  <div className="space-y-2">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <ChevronRight className="w-4 h-4 text-red-900 mt-1 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quality Assurance Section with Visual Elements */}
        <div className="mb-24 bg-gradient-to-br from-red-900 to-red-800 rounded-3xl p-12 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold mb-4">Our Quality Commitment</h2>
              <p className="opacity-90 max-w-2xl mx-auto">
                We maintain the highest standards through rigorous quality control and continuous improvement
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Quality Control",
                  items: [
                    "Documented procedures",
                    "Regular audits",
                    "Staff training",
                    "Process validation"
                  ]
                },
                {
                  title: "Safety Measures",
                  items: [
                    "Supplier verification",
                    "Storage monitoring",
                    "Expiry tracking",
                    "Disposal protocols"
                  ]
                },
                {
                  title: "Patient Care",
                  items: [
                    "Medication counseling",
                    "Interaction checking",
                    "Follow-up service",
                    "Feedback system"
                  ]
                }
              ].map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
                >
                  <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
                  <div className="space-y-3">
                    {section.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center gap-2 text-sm opacity-90">
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        {item}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Patient Charter Card */}
        <div className="mb-24">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 p-8 md:p-12">
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Pharmacy Patient Charter</h2>
                
                <div className="mb-6">
                  <h3 className="font-semibold text-red-900 mb-3">Our Promise to You</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-red-900 rounded-full mt-2"></div>
                      <p>15-minute prescription processing</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-red-900 rounded-full mt-2"></div>
                      <p>Clear medication instructions</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-red-900 rounded-full mt-2"></div>
                      <p>Privacy and confidentiality</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-red-900 rounded-full mt-2"></div>
                      <p>Professional consultation</p>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-red-900 mb-3">Patient Responsibilities</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-red-900 rounded-full mt-2"></div>
                      <p>Provide accurate medical information</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-red-900 rounded-full mt-2"></div>
                      <p>Follow prescribed treatment plans</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-red-900 rounded-full mt-2"></div>
                      <p>Report any medication concerns</p>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="md:w-1/2 relative">
                <img
                  src="https://askannie.tortoisepath.com/wp-content/uploads/2024/08/The-Nairobi-Hospital-Outpatient-Centre-Rosslyn-Riviera-Mall-Nairobi-Kenya-AskAnnie-TortoisePathcom-2.jpeg"
                  alt="Pharmacist helping patient"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white/50 to-transparent md:hidden"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Statutory Requirements */}
        <div className="mb-20">
          <div className="max-w-7xl mx-auto bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 md:p-12 shadow-lg">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-serif font-bold text-gray-900">Regulatory Compliance</h2>
              <p className="text-gray-600">Meeting all statutory requirements for pharmaceutical practice</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Licensing",
                  items: ["Annual premise registration", "Staff practice licenses", "Import permits"]
                },
                {
                  title: "Quality Standards",
                  items: ["ISO compliance", "Regular audits", "Standard operating procedures"]
                },
                {
                  title: "Safety Protocols",
                  items: ["Controlled substance handling", "Waste management", "Emergency procedures"]
                }
              ].map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-xl shadow-md"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{section.title}</h3>
                  <ul className="space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2 text-gray-600">
                        <div className="w-1.5 h-1.5 bg-red-900 rounded-full mt-2"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

  {/* Clinical Team (inserted before ClientsSay) */}
  <TeamSection
    title="Pharmacy Team"
    team={[
      { name: 'Dr. Isha Anand', title: 'Chief Pharmacist', image: '/src/assets/doctorsimages/isha.png', bio: '' },
      { name: 'Dr. Kizito Mariita', title: 'Clinical Pharmacist', image: '/src/assets/doctorsimages/unknown.png', bio: '' },
      { name: 'Dr. Keiller Barasa	', title: 'Senior Pharmacist	', image: '/src/assets/doctorsimages/unknown.png', bio: '' },
      { name: 'Dr. Gathii Kariuki	', title: 'Clinical Pharmacist	', image: '/src/assets/doctorsimages/unknown.png', bio: '' },
    ]}
  />

  {/* Client Testimonials */}
  <ClientsSay
    title="What our clients say"
    testimonials={[
      { quote: 'Pharmacy staff were efficient and very helpful.', name: 'Michael K.', avatar: '/src/assets/feedback/clients.png', subtitle: 'Outpatient' },
      { quote: 'Fast prescription service and friendly pharmacists.', name: 'Aisha L.', avatar: '/src/assets/feedback/clients.png', subtitle: 'Inpatient' },
      { quote: 'Convenient home delivery and accurate dispensing.', name: 'Peter N.', avatar: '/src/assets/feedback/clients.png' , subtitle: 'Home Delivery'},
    ]}
  />

  {/* Insurance Partners */}
  <InsuranceSlider />
      </div>
    </div>
  );
};

export default PharmacyServices;
