import { FC } from 'react';
import { motion } from 'framer-motion';
import Heading from '@/components/Heading';
import { ClipboardCheck, FileText, CreditCard, Phone, Clock, ArrowRight } from 'lucide-react';

const AdmissionProcess: FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Heading
        image_url="/src/assets/heroimages/admission.jpg"
        title="Admission Process"
        description="Streamlined admission experience at The Nairobi Hospital"
        style="background"
      />

      <main role="main" aria-label="Admission Process" className="pb-20">
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
                  <p className="text-sm text-gray-500 mb-2">Patient Admissions</p>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-red-900 leading-tight mb-4">
                    Simple and Efficient Admission Process
                  </h1>
                  <p className="text-gray-700 max-w-2xl leading-relaxed mb-6">
                    We've streamlined our admission process to ensure a smooth and comfortable experience for all patients. Our dedicated admissions team is available 24/7 to guide you through each step.
                  </p>
                  <div className="flex items-center gap-3">
                    <a href="#pre-admission" className="px-5 py-3 bg-red-900 text-white rounded-full font-medium hover:bg-red-800 transition">
                      Start Pre-admission
                    </a>
                    <a href="tel:+254703082622" className="px-4 py-3 border border-gray-200 rounded-full text-sm inline-flex items-center gap-2">
                      <Phone className="w-4 h-4" /> Contact Admissions
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
                    src="/src/assets/images/admission-desk.jpg" 
                    alt="Admission Process" 
                    className="w-full h-64 object-cover"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="container mx-auto px-4 mt-16">
          <motion.h2 
            className="text-2xl font-serif font-bold text-red-900 text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Your Admission Journey
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: ClipboardCheck,
                title: "Pre-admission",
                description: "Complete pre-admission forms online or in person. Submit required documents and medical history.",
                steps: [
                  "Fill pre-admission form",
                  "Provide medical history",
                  "Submit insurance information"
                ]
              },
              {
                icon: FileText,
                title: "Documentation",
                description: "Prepare necessary documents for a smooth admission process.",
                steps: [
                  "Government ID",
                  "Insurance cards",
                  "Medical reports",
                  "Referral letters if any"
                ]
              },
              {
                icon: CreditCard,
                title: "Financial Clearance",
                description: "Complete financial arrangements and insurance verification.",
                steps: [
                  "Insurance verification",
                  "Cost estimates",
                  "Payment arrangements",
                  "Deposit requirements"
                ]
              }
            ].map((step, idx) => (
              <motion.div
                key={step.title}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <step.icon className="w-10 h-10 text-red-900 mb-4" />
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600 mb-4">{step.description}</p>
                <ul className="space-y-2">
                  {step.steps.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <ArrowRight className="w-4 h-4 text-red-900 mt-1 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* What to Bring */}
        <section className="container mx-auto px-4 mt-16">
          <div className="bg-gray-50 rounded-2xl p-8">
            <motion.h3 
              className="text-xl font-semibold text-red-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              What to Bring
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  category: "Documents",
                  items: [
                    "Government-issued ID",
                    "Insurance cards",
                    "Medical records",
                    "List of current medications"
                  ]
                },
                {
                  category: "Personal Items",
                  items: [
                    "Comfortable clothing",
                    "Personal toiletries",
                    "Mobile phone and charger",
                    "Reading materials"
                  ]
                },
                {
                  category: "Medical Items",
                  items: [
                    "Current medications",
                    "Medical devices if any",
                    "Eyeglasses/contact lenses",
                    "Mobility aids if needed"
                  ]
                }
              ].map((category, idx) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <h4 className="font-semibold mb-3">{category.category}</h4>
                  <ul className="space-y-2">
                    {category.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <ArrowRight className="w-4 h-4 text-red-900 mt-1 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Important Information */}
        <section className="container mx-auto px-4 mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Visiting Hours */}
            <motion.div
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Clock className="w-8 h-8 text-red-900 mb-4" />
              <h3 className="text-lg font-semibold mb-4">Visiting Hours</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p>General Wards: 11:00 AM - 8:00 PM</p>
                <p>Critical Care: 11:00 AM - 12:00 PM & 4:00 PM - 5:00 PM</p>
                <p>Maternity: 10:00 AM - 8:00 PM</p>
                <p className="text-red-900 font-medium mt-4">
                  *Special arrangements can be made for immediate family members
                </p>
              </div>
            </motion.div>

            {/* Insurance */}
            <motion.div
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <CreditCard className="w-8 h-8 text-red-900 mb-4" />
              <h3 className="text-lg font-semibold mb-4">Insurance & Payment</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p>We accept all major insurance providers</p>
                <p>Pre-authorization required for most procedures</p>
                <p>Various payment options available</p>
                <a href="#insurance-list" className="text-red-900 font-medium mt-4 inline-block">
                  View accepted insurance providers →
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact & Support */}
        <section className="container mx-auto px-4 mt-16">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-xl font-semibold text-red-900 mb-6">Need Assistance?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Admissions Office</h4>
                <p className="text-sm text-gray-700">
                  24/7 Support<br />
                  Tel: +254 (0)703 082 000<br />
                  Email: admissions@nairobihospital.org
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Insurance Desk</h4>
                <p className="text-sm text-gray-700">
                  Mon - Fri: 8:00 AM - 5:00 PM<br />
                  Tel: +254 (0)703 082 100<br />
                  Email: insurance@nairobihospital.org
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Patient Relations</h4>
                <p className="text-sm text-gray-700">
                  Mon - Fri: 8:00 AM - 5:00 PM<br />
                  Tel: +254 (0)703 082 200<br />
                  Email: patientcare@nairobihospital.org
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdmissionProcess;