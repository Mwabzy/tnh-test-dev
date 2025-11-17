import Heading from '@/components/Heading';
import { motion } from 'framer-motion';
import { 
  FlaskConical, 
  Droplets, 
  Bug, 
  ShieldPlus, 
  Dna, 
  Microscope,
  ClipboardCheck,
  Clock,
  BadgeCheck,
  Users,
  Building2
} from 'lucide-react';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import testimonials from '@/data/testimonials.json';
import { useNavigate } from 'react-router';
import InsuranceSlider from '@/components/InsuranceSlider';
import ClientsSay from '@/components/ClientsSay';
import TeamSection from '@/components/TeamSection';

interface LabServiceProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  benefits?: string[];
}

const LabService: React.FC<LabServiceProps> = ({ title, description, icon, benefits }) => (
  <motion.div
    whileHover={{ y: -8, transition: { duration: 0.2 } }}
    className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
  >
    <div className="flex items-center space-x-4 mb-6">
      <div className="p-3 bg-red-50 rounded-xl group-hover:bg-red-100 transition-colors duration-300">
        <div className="text-red-900 transform group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-red-900 transition-colors duration-300">{title}</h3>
    </div>
    <p className="text-gray-600 leading-relaxed mb-6">{description}</p>
    {benefits && benefits.length > 0 && (
      <ul className="space-y-3">
        {benefits.map((benefit, index) => (
          <motion.li
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            viewport={{ once: true }}
            key={index}
            className="flex items-start space-x-3 text-gray-600"
          >
            <div className="flex-shrink-0 w-2 h-2 bg-red-900 rounded-full mt-2 group-hover:scale-125 transition-transform duration-300"></div>
            <span className="text-sm group-hover:text-gray-900 transition-colors duration-300">{benefit}</span>
          </motion.li>
        ))}
      </ul>
    )}
  </motion.div>
);

const Feature = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-red-50/50 transition-colors duration-300">
    <div className="p-4 bg-red-50 rounded-full mb-4 shadow-md group-hover:bg-red-100 transition-colors duration-300">
      {icon}
    </div>
    <h4 className="text-lg font-semibold mb-3 font-serif text-gray-900">{title}</h4>
    <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
  </div>
);

const LaboratoryServices = () => {
  const navigate = useNavigate();
  
  return (
    <div>
      
      <Heading
        image_url= 'https://abes.ca/wp-content/uploads/2020/04/what-does-a-medical-laboratory-assistant-do.jpg'
        title="Laboratory Services"
        description="One of the best equipped and staffed laboratories in the region, offering specialized tests with ISO 15189 accreditation."
        style="background"
      />

      <div className="container mx-auto px-4 py-12">

      {/* Overview Section */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
                Excellence in Laboratory Services
                <div className="mt-4 w-20 h-1 bg-red-900 mx-auto"></div>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column - Stats and Highlights */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="prose prose-lg max-w-none">
                    <h3 className="text-2xl font-serif font-bold text-red-900 mb-4">Leading Healthcare Excellence</h3>
                    <p className="text-lg leading-relaxed text-gray-700">
                      The Nairobi Hospital Laboratory stands as a beacon of diagnostic excellence, powered by cutting-edge technology and guided by internationally recognized standards.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6 mt-8">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-red-900 mb-2">30+</div>
                      <div className="text-gray-600">Years of Excellence</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-red-900 mb-2">1200+</div>
                      <div className="text-gray-600">Tests Per Hour</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-red-50 rounded-xl p-6 group hover:bg-red-100 transition-all duration-300"
                  >
                    <BadgeCheck className="w-8 h-8 text-red-900 mb-3 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="font-semibold text-gray-900 mb-1">ISO 15189</h3>
                    <p className="text-gray-600">Accredited Facility</p>
                  </motion.div>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-red-50 rounded-xl p-6 group hover:bg-red-100 transition-all duration-300"
                  >
                    <Users className="w-8 h-8 text-red-900 mb-3 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="font-semibold text-gray-900 mb-1">Expert Team</h3>
                    <p className="text-gray-600">24/7 Available</p>
                  </motion.div>
                </div>
              </motion.div>

              {/* Right Column - Network Map */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-red-900 to-red-800 rounded-2xl p-8 shadow-xl text-white"
              >
                <h3 className="text-2xl font-serif font-bold mb-6 flex items-center gap-2">
                  <Building2 className="w-6 h-6" />
                  Our Laboratory Network
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: "Doctors' Plaza Lab", location: "Main Hospital" },
                    { name: "Upper Hill Medical", location: "UHMC Building" },
                    { name: "Warwick Centre", location: "Gigiri" },
                    { name: "Galleria Branch", location: "Galleria Mall" },
                    { name: "Southfield Lab", location: "Mombasa Road" },
                    { name: "Capital Centre", location: "Mombasa Road" },
                    { name: "Kiambu Lab", location: "Kiambu Mall" },
                    { name: "Rosslyn Lab", location: "Runda" }
                  ].map((lab, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: 10, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.2, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="group bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-all duration-300"
                    >
                      <p className="font-medium text-yellow-500">{lab.name}</p>
                      <p className="text-sm text-gray-300">{lab.location}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              Why Choose Our Laboratory?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience excellence in diagnostic testing with our state-of-the-art facilities and expert team
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Feature
                icon={<ClipboardCheck className="w-6 h-6 text-red-900" />}
                title="Accredited Testing"
                description="ISO certified laboratory with international quality standards and accreditations"
              />
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Feature
                icon={<Clock className="w-6 h-6 text-red-900" />}
                title="Quick Turnaround"
                description="Fast and efficient processing with most results available within 24 hours"
              />
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Feature
                icon={<BadgeCheck className="w-6 h-6 text-red-900" />}
                title="Expert Analysis"
                description="Experienced pathologists and technologists ensuring accurate results"
              />
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Feature
                icon={<Users className="w-6 h-6 text-red-900" />}
                title="Patient-Centric"
                description="Comfortable collection centers with minimal waiting times"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Featured Services */}
      <div className="bg-gradient-to-br from-red-900 to-red-800 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              Featured Laboratory Services
              <div className="mt-4 w-20 h-1 bg-yellow-500 mx-auto"></div>
            </h2>
            <p className="text-gray-100 mt-6">
              Experience our premium laboratory services designed for your convenience and care
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Mobile Phlebotomy */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden shadow-lg bg-white group"
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXcc30JcXHfX6sN6c2GAYxerXl1fmi_TZUaQ&s"
                  alt="Mobile Phlebotomy"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Mobile Phlebotomy</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Professional blood collection service in the comfort of your home or office
                </p>
                <button onClick={() => navigate('/book-test')} className="mt-6 text-red-900 hover:text-red-700 text-sm font-medium flex items-center">
                  Book Now <span className="ml-2">→</span>
                </button>
              </div>
            </motion.div>

            {/* Referral Center */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden shadow-lg bg-white group"
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src="https://sicweb.com/media/com_rsseo/images/webp/2593d33a32bcfbec3e24ed9ae79f423b.webp"
                  alt="Referral Center"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Referral Center</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Specialized testing services for healthcare providers and medical facilities
                </p>
                <button onClick={() => navigate('/referral-program')} className="mt-6 text-red-900 hover:text-red-700 text-sm font-medium flex items-center">
                  Contact Us <span className="ml-2">→</span>
                </button>
              </div>
            </motion.div>

            {/* Express Results */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden shadow-lg bg-white group"
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src="https://i0.wp.com/www.andalab.net/wp-content/uploads/2021/08/laboratory-06.03_146-scaled.jpg?fit=1024%2C683&ssl=1"
                  alt="Express Results"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Express Results</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Fast-track testing service with same-day results for urgent cases
                </p>
                <button onClick={() => navigate('/express-service')} className="mt-6 text-red-900 hover:text-red-700 text-sm font-medium flex items-center">
                  Contact Us <span className="ml-2">→</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="bg-gradient-to-br from-gray-50 to-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              Specialized Laboratory Departments
              <div className="mt-4 w-20 h-1 bg-red-900 mx-auto"></div>
            </h2>
            <p className="text-gray-600 mt-6 text-lg">
              Our comprehensive laboratory is divided into specialized departments, each equipped with state-of-the-art technology and expert staff.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <LabService
            title="Hematology"
            description="Advanced blood analysis and specialized hematological testing."
            icon={<Droplets className="w-6 h-6 text-red-900" />}
            benefits={[
              "Flow Cytometry for AML/ALL and CLL",
              "Philadelphia Chromosome (BCR-ABL) Testing",
              "Thrombophilia Screening",
              "Hemoglobin Electrophoresis",
              "Apheresis Platelets Collection"
            ]}
          />
          <LabService
            title="Biochemistry & Special Chemistry"
            description="Ultra-modern analyzers performing over 1200 tests per hour."
            icon={<FlaskConical className="w-6 h-6 text-red-900" />}
            benefits={[
              "Alinity ci automated analysis",
              "Cobas Pro integrated system",
              "Endocrinology testing",
              "Therapeutic drug monitoring",
              "Cardiac biomarkers"
            ]}
          />
          <LabService
            title="Immunology"
            description="Latest technology for autoimmune antibody testing."
            icon={<ShieldPlus className="w-6 h-6 text-red-900" />}
            benefits={[
              "Anti-nuclear antibody test (ANA)",
              "Extractable Nuclear Antigen (ENA)",
              "Phospholipid syndrome profile",
              "Myositis antibody panel",
              "Liver auto-antibody tests"
            ]}
          />
          <LabService
            title="Histopathology & Cytopathology"
            description="Specialized diagnostic services with expert pathologists."
            icon={<Microscope className="w-6 h-6 text-red-900" />}
            benefits={[
              "Routine biopsies diagnosis",
              "Pap smears and fluid cytology",
              "Fine Needle Aspirations (FNA)",
              "Immunohistochemistry",
              "HPV DNA testing"
            ]}
          />
          <LabService
            title="Microbiology"
            description="Rapid identification of pathogenic micro-organisms."
            icon={<Bug className="w-6 h-6 text-red-900" />}
            benefits={[
              "MALDI-TOF biotyper analysis",
              "Antimicrobial susceptibility testing",
              "Multiplex PCR testing",
              "Blood culture analysis",
              "TB testing with GeneXpert"
            ]}
          />
          <LabService
            title="Molecular Diagnostics"
            description="Advanced genetic and molecular testing capabilities."
            icon={<Dna className="w-6 h-6 text-red-900" />}
            benefits={[
              "SARS-CoV-2 PCR testing",
              "Viral load quantification",
              "HPV PCR testing",
              "Automated nucleic acid extraction",
              "Real-time PCR analysis"
            ]}
          />
        </div>
        </div>
      </div>


      {/* Expert Team */}
      <div className="bg-gradient-to-br from-gray-50 to-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <div className="inline-block">
              <div className="relative">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                  Meet Our Expert Team
                  <div className="mt-4 w-20 h-1 bg-red-900 mx-auto"></div>
                </h2>
              </div>
            </div>
            <p className="text-gray-600 mt-6">
              Our dedicated team of pathologists and laboratory professionals ensure the highest quality of diagnostic services.
            </p>
          </motion.div>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-center items-start">
              {[
                {
                  name: "Dr. Rahul Zode",
                  title: "Chief Pathologist, MBChB, MMed",
                  image: "https://atlt.foventa.africa/wp-content/uploads/2024/09/Picture1-683x1024.jpg",
                  description: "Clinical pathology leader with 20+ years' experience in diagnostic medicine"
                },
                {
                  name: "Dr. Sarah Kamau",
                  title: "Molecular Pathologist, PhD",
                  image: "https://thumbs.dreamstime.com/b/medical-lab-technician-pretty-working-32450895.jpg",
                  description: "Specialist in molecular diagnostics and genomics"
                },
                {
                  name: "Dr. Francis Ndungu",
                  title: "Clinical Biochemist, MSc",
                  image: "https://thumbs.dreamstime.com/b/african-american-man-male-doctor-27757329.jpg",
                  description: "Expert in clinical chemistry, assay validation and QA/QC"
                }
              ].map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ y: -6, boxShadow: '0 10px 30px rgba(0,0,0,0.12)' }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-transform duration-300"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-red-900 text-sm font-medium mb-2">{member.title}</p>
                    <p className="text-sm text-gray-600">{member.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <TestimonialCarousel testimonials={testimonials} />

      {/* Accreditation Section (Split Design) */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-stretch bg-white rounded-3xl overflow-hidden shadow-2xl">
              {/* Left Panel - KENAS */}
              <div className="md:w-1/3 bg-gradient-to-br from-red-900 to-red-800 p-8 flex flex-col justify-center items-center text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  <div className="w-28 h-28 bg-white/10 backdrop-blur-sm rounded-2xl p-4 mx-auto">
                    <img 
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF-6Xgv0PsLCvWMwn47DwFpBRJPjPBhIR5GA&s"
                      alt="KENAS"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-white text-xl font-bold">KENAS</h3>
                  <p className="text-white/80 text-sm">Primary Accreditation</p>
                </motion.div>
              </div>

              {/* Right Panel - Other Accreditations */}
              <div className="md:w-2/3 p-8">
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8 text-center md:text-left">
                  Additional Accreditations
                </h2>
                <div className="grid grid-cols-3 gap-6">
                  {[
                    {
                      name: "ISO 15189:2012",
                      logo: "https://digitalwaysolutions.com/img/15189.png"
                    },
                    {
                      name: "IAF",
                      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/International_Accreditation_Forum_Logo.svg/1200px-International_Accreditation_Forum_Logo.svg.png"
                    },
                    {
                      name: "ILAC",
                      logo: "https://ilac.org/wp-content/themes/ilac/images/ilac_logo.png"
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      viewport={{ once: true }}
                      className="group text-center"
                    >
                      <div className="w-20 h-20 mx-auto bg-gray-50 rounded-xl p-4 mb-3
                        transform transition-all duration-300 group-hover:shadow-lg">
                        <img src={item.logo} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                      <p className="text-gray-600 text-sm font-medium group-hover:text-red-900 
                        transition-colors duration-300">{item.name}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  {/* Clinical Team (inserted before ClientsSay) */}
  <TeamSection
    title="Our Laboratory Team"
    team={[
      { name: 'Dr. Rahul Zode', title: 'Chief Pathologist', image: '/src/assets/images/image1.png', bio: 'Leads diagnostic and molecular services.' },
      { name: 'Dr. Sarah Kamau', title: 'Molecular Pathologist', image: '/src/assets/images/image2.png', bio: 'Specialist in molecular diagnostics.' },
      { name: 'Mr. Samuel Otieno', title: 'Lab Operations Manager', image: '/src/assets/images/image3.png', bio: 'Oversees lab workflows and QA.' },
      { name: 'Ms. Grace Njeri', title: 'Senior Biomedical Scientist', image: '/src/assets/images/image4.png', bio: 'Expert in automated assay management.' },
    ]}
  />

  {/* Client Testimonials */}
  <ClientsSay
    title="What our clients say about Laboratory Services"
    testimonials={[
      { quote: 'Accurate results and quick turnaround.', name: 'N. Wanjiru', avatar: '/src/assets/images/image1.png' },
      { quote: 'Professional phlebotomy team and clear reporting.', name: 'J. Mwangi', avatar: '/src/assets/images/image2.png' },
      { quote: 'Convenient sample collection and reliable follow-up.', name: 'L. Otieno', avatar: '/src/assets/images/image3.png' },
    ]}
  />

  <InsuranceSlider />
      </div>
    </div>
  );
};

export default LaboratoryServices;