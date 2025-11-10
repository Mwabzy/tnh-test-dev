
import { FC } from 'react';
import { Activity, Users, Phone, Clock, MonitorSmartphone, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Heading from '@/components/Heading';

// Content arrays removed; programs and team are now defined inline to match the Critical Care layout

const PsychosocialDepartment: FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Heading
        image_url="https://ehospice.com/wp-content/uploads/2020/09/Palliative-Care-scaled.jpg"
        title="Psychosocial Services"
        description="Whole-person mental, social and spiritual support integrated with clinical care"
        style="background"
      />

      <main role="main" aria-label="Psychosocial Services" className="pb-20">
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
                  <p className="text-sm text-gray-500 mb-2">Psychosocial Care</p>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-red-900 leading-tight mb-4">
                    Compassionate Psychosocial Support
                  </h1>
                  <p className="text-gray-700 max-w-2xl leading-relaxed mb-6">
                    We support patients and families through emotional, social and practical care. From crisis management to long-term recovery, our multidisciplinary team provides tailored interventions.
                  </p>
                  <div className="flex items-center gap-3">
                    <a href="#programs" className="px-5 py-3 bg-red-900 text-white rounded-full font-medium hover:bg-red-800 transition">
                      Our Programs
                    </a>
                    <a href="tel:+254703082300" className="px-4 py-3 border border-gray-200 rounded-full text-sm inline-flex items-center gap-2">
                      <Phone className="w-4 h-4" /> Contact
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
                    src="https://www.evidencebasedmentoring.org/wp-content/uploads/2022/09/excited-cute-little-black-girl-at-child-psychologi-2022-02-15-18-49-39-utc.jpg" 
                    alt="Psychosocial team" 
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
                { value: "95%", label: "Patient satisfaction" },
                { value: "1,200+", label: "Sessions last 12 months" },
                { value: "98%", label: "Improved coping" },
                { value: "24/7", label: "On-call support" }
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

        {/* Programs / Units */}
        <section className="container mx-auto px-4 mt-16">
          <motion.h2 
            className="text-2xl font-serif font-bold text-red-900 text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Psychosocial Programs
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Counselling & Therapy", image: "https://torontopsychology.com/wp-content/uploads/2020/10/marriage-counselling-1024x683.jpg", description: "Individual, couple and group therapy tailored to patient needs.", features: ["Short-term therapy","Family meetings","Bereavement support"] },
              { title: "Trauma & Loss Support", image: "https://www.brake.org.uk/files/images/Victim-support/_large/hands-1-shutterstock_1038930250_Sudden-hands-2000.jpg?v=1645201604", description: "Timely trauma debriefing and bereavement services for families.", features: ["Psychological first aid","Trauma-informed care","Community referrals"] },
              { title: "Medical Counselling", image: "https://www.shutterstock.com/image-photo/african-female-doctor-having-heart-600nw-1563995797.jpg", description: "Support around major procedures, chronic disease and palliative care.", features: ["Pre-op counselling","Chronic illness support","Palliative care liaison"] }
            ].map((unit, idx) => (
              <motion.div
                key={unit.title}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
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
                    {unit.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <ChevronRight className="w-4 h-4 text-red-900 mt-1 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Approaches & Modalities */}
        <section className="container mx-auto px-4 mt-16">
          <div className="bg-gray-50 rounded-2xl p-8">
            <motion.h3 
              className="text-xl font-semibold text-red-900 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Therapeutic Approaches & Modalities
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[{
                title: "Evidence-Based Therapies",
                icon: Activity,
                description: "CBT, DBT and trauma-focused therapies used to guide recovery",
                features: ["Structured therapy","Outcome monitoring","Tailored care"]
              },{
                title: "Integrated Support",
                icon: Users,
                description: "Social work, spiritual care and community linkages",
                features: ["Discharge planning","Community referrals","Home support"]
              },{
                title: "Rapid Response",
                icon: MonitorSmartphone,
                description: "Timely debriefing and crisis interventions",
                features: ["On-call support","Crisis debrief","Family liaison"]
              }].map((tech, idx) => (
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
              <h3 className="text-lg font-semibold mb-4">Our Psychosocial Team</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-red-900 mt-1" />
                  Clinical Counselors
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-red-900 mt-1" />
                  Social Workers
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-red-900 mt-1" />
                  Family Support Officers
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-red-900 mt-1" />
                  Liaison Nurses
                </li>
              </ul>
            </motion.div>

            {/* Visiting Hours / Contact */}
            <motion.div
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Clock className="w-8 h-8 text-red-900 mb-4" />
              <h3 className="text-lg font-semibold mb-4">Contact & Visiting</h3>
              <div className="space-y-4 text-sm text-gray-700">
                <p><strong>Clinic Hours:</strong><br/>Mon - Fri: 8:00 AM - 5:00 PM</p>
                <p><strong>Phone:</strong><br/>Tel: +254 (0)703 082 300<br/>Email: psychosocial@hospital.org</p>
                <p className="text-red-900 font-medium">Appointments by referral or self-booking</p>
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
                <h4 className="font-semibold mb-2">Psychosocial Reception</h4>
                <p className="text-sm text-gray-700">
                  Mon - Fri: 8:00 AM - 5:00 PM<br />
                  Tel: +254 (0)703 082 300<br />
                  Email: psychosocial@hospital.org
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Family Support</h4>
                <p className="text-sm text-gray-700">
                  Support & referrals<br />
                  Tel: +254 (0)703 082 301<br />
                  Email: families@hospital.org
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Emergency Line</h4>
                <p className="text-sm text-gray-700">
                  24/7 rapid response<br />
                  Tel: +254 (0)703 082 000
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PsychosocialDepartment;
