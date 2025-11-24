import { FC } from 'react';
import { motion } from 'framer-motion';
import Heading from '@/components/Heading';
import { Download, Heart, Activity, Clock, Award, ShieldCheck, ChevronRight } from 'lucide-react';
import InsuranceSlider from '@/components/InsuranceSlider';
import ClientsSay from '@/components/ClientsSay';
import TeamSection from '@/components/TeamSection';

const CathLabServices: FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Heading
        image_url="/src/assets/heroimages/cath-lab.jpg"
        title="Cath Lab"
        description="Advanced diagnostic imaging and minimally invasive cardiac procedures"
        style="background"
      />

      <main role="main" aria-label="Cath Lab Services" className="pb-20">
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
                  <p className="text-sm text-gray-500 mb-2">Specialized Cardiac Care</p>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-red-900 leading-tight mb-4">
                    Advanced Cardiac Catheterization Laboratory
                  </h1>
                  <p className="text-gray-700 max-w-2xl leading-relaxed mb-6">
                    Our state-of-the-art Cath Lab is a specialized facility equipped with advanced imaging technology where our expert cardiologists perform minimally invasive procedures to diagnose and treat heart conditions. Using real-time X-ray imaging (fluoroscopy), our team can visualize arteries and heart chambers to provide precise, effective treatments.</p>
                  <div className="flex items-center gap-3">
                    <a href="#consultation" className="px-5 py-3 bg-red-900 text-white rounded-full font-medium hover:bg-red-800 transition">
                      Schedule Consultation
                    </a>
                    <a 
                      href="/docs/cath-lab-guide.pdf" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="px-4 py-3 border border-gray-200 rounded-full text-sm inline-flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" /> Patient Guide
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
                    src="https://mahaveerhospital.org/wp-content/uploads/2024/07/cath-lab-1.jpg" 
                    alt="Modern Cath Lab Facility" 
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
                { value: "24/7", label: "Emergency Response" },
                { value: "3", label: "Cath Lab Suites" },
                { value: "4000+", label: "Annual Procedures" },
                { value: "10+", label: "Interventional Specialists" }
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

        {/* Main content & sidebar */}
        <section className="container mx-auto px-4 mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 space-y-8">
              {/* Key Services */}
              <div className="space-y-8">
                <motion.h2 
                  className="text-2xl font-serif font-bold text-red-900"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  Our Cath Lab Services
                </motion.h2>
                
                {[{
                  title: 'Diagnostic Procedures',
                  image: 'https://dims.healthgrades.com/dims3/MMH/b906fc5/2147483647/strip/true/crop/5616x2948+0+398/resize/1200x630!/quality/75/?url=https%3A%2F%2Fucmscdn.healthgrades.com%2F6d%2Fd3%2Fc92f23de456ea3386e2c82f226fd%2Fgettyimages-147426963-rf-hg.jpg',
                  description: 'Using advanced imaging equipment, we examine blood vessels and heart chambers to diagnose cardiovascular conditions.',
                  features: [
                    'Coronary angiography to check for blocked arteries',
                    'Heart chamber pressure measurements',
                    'Blood flow studies',
                    'Valve function assessment'
                  ]
                }, {
                  title: 'Interventional Cardiology',
                  image: 'https://cdn.castleconnolly.com/dims4/default/bd81e87/2147483647/strip/true/crop/1000x563+0+0/resize/840x473!/quality/90/?url=http%3A%2F%2Fcastle-connolly-brightspot.s3.us-east-1.amazonaws.com%2F0a%2F94%2Fa600d4c34fd1bd5b477ff42ff8af%2Fpillar-interventional-cardiology-23-1200x675.jpg',
                  description: 'Minimally invasive procedures to treat heart conditions without the need for open surgery.',
                  features: [
                    'Balloon angioplasty to open blocked arteries',
                    'Stent placement for maintaining blood flow',
                    'Valve repair procedures',
                    'Treatment for structural heart defects'
                  ]
                }, {
                  title: 'Emergency Cardiac Care',
                  image: 'https://artemiscardiac.com/blog/6800f9b53016b1415%20x%20541_Cardiac%20Emergency%20Guide%20Symptoms,%20Risk%20Factors%20&%20Prevention%20Tips.jpg',
                  description: 'Round-the-clock emergency services for acute cardiac conditions.',
                  features: [
                    'Emergency angioplasty for heart attacks',
                    'Immediate cardiac assessment',
                    'Rapid intervention capabilities',
                    'Critical care coordination'
                  ]
                }].map((service, idx) => (
                  <motion.article 
                    key={service.title} 
                    className={`grid ${idx % 2 === 0 ? 'md:grid-cols-2' : 'md:grid-cols-2 md:flex-row-reverse'} gap-6 items-center`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <div className="rounded-xl overflow-hidden shadow-md">
                      <img src={service.image} alt={service.title} className="w-full h-48 object-cover" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-red-900 mb-2 font-serif">{service.title}</h3>
                      <p className="text-gray-700 mb-4">{service.description}</p>
                      <ul className="text-sm text-gray-700 space-y-2">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 text-red-900 mt-1" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.article>
                ))}
              </div>

              {/* Why Choose Us */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  {
                    icon: Award,
                    title: "Advanced Technology",
                    desc: "State-of-the-art imaging systems providing real-time visualization during procedures."
                  },
                  {
                    icon: ShieldCheck,
                    title: "Expert Team",
                    desc: "Skilled interventional cardiologists and specialized cardiac care nurses."
                  },
                  {
                    icon: Heart,
                    title: "Comprehensive Care",
                    desc: "Full range of diagnostic and therapeutic cardiac procedures in one facility."
                  }
                ].map((item, idx) => (
                  <motion.div 
                    key={item.title}
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <item.icon className="w-8 h-8 text-red-900 mb-3" />
                    <h4 className="font-semibold mb-2">{item.title}</h4>
                    <p className="text-sm text-gray-700">{item.desc}</p>
                  </motion.div>
                ))}
              </div>

              {/* Patient Journey */}
              <motion.div 
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold text-red-900 mb-4">Your Journey at Our Cath Lab</h3>
                <div className="space-y-4">
                  {[
                    {
                      step: 1,
                      title: "Initial Consultation",
                      desc: "Comprehensive evaluation and procedure planning with our cardiac team."
                    },
                    {
                      step: 2,
                      title: "Pre-Procedure",
                      desc: "Detailed preparation instructions and pre-procedure testing if required."
                    },
                    {
                      step: 3,
                      title: "Procedure",
                      desc: "State-of-the-art procedure with expert team and advanced monitoring."
                    },
                    {
                      step: 4,
                      title: "Recovery & Follow-up",
                      desc: "Dedicated recovery care and comprehensive follow-up plan."
                    }
                  ].map(item => (
                    <div key={item.step} className="flex gap-4">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-900">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{item.title}</h4>
                        <p className="text-sm text-gray-700">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-28 space-y-4">
                {/* Consultation Card */}
                <motion.div 
                  className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h5 className="font-semibold text-red-900">Schedule a Procedure</h5>
                  <p className="text-sm text-gray-700 mt-2">
                    Speak with our cardiac specialists about your heart health concerns.
                  </p>
                  <div className="mt-4 flex flex-col gap-2">
                    <a href="#consultation" className="px-4 py-2 bg-red-900 text-white rounded-md text-center">
                      Book Procedure
                    </a>
                    <a href="tel:+254703082622" className="px-4 py-2 border rounded-md text-center">
                      Call +254 703 082 622
                    </a>
                  </div>
                </motion.div>

                {/* Emergency Care */}
                <motion.div 
                  className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <h5 className="font-semibold text-red-900">Emergency Care</h5>
                  <div className="flex items-center gap-2 mt-3 text-sm text-gray-700">
                    <Clock className="w-4 h-4 text-red-900" />
                    24/7 Emergency Cardiac Care
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-700">
                    <Activity className="w-4 h-4 text-red-900" />
                    Rapid Response Team
                  </div>
                  <p className="text-sm text-red-900 font-medium mt-3">
                    Emergency: +254 (0)20 2845 000
                  </p>
                </motion.div>

                {/* Location & Contact */}
                <motion.div 
                  className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <h5 className="font-semibold text-red-900">Location & Contact</h5>
                  <p className="text-sm text-gray-700 mt-2">
                    Cardiac Catheterization Laboratory<br/>
                    The Nairobi Hospital<br/>
                    Argwings Kodhek Road, Nairobi
                  </p>
                  <p className="text-sm text-gray-700 mt-3">
                    Appointments: +254 (0)703 082 622<br/>
                    Email: cathlab@nairobihospital.org
                  </p>
                </motion.div>
              </div>
            </aside>
          </div>
        </section>

  {/* Clinical Team (inserted before ClientsSay) */}
  <TeamSection
    title="Cath Lab Team"
    team={[
      { name: 'Dr. Mary Onyinkwa', title: 'Chief Radiologist', image: '/src/assets/doctorsimages/onyinknwa.png', bio: '' },
      { name: 'Martin I. Kamanda', title: 'Radiology Manager', image: '/src/assets/doctorsimages/mkamanda.png', bio: '' },
      { name: 'Elizabeth Oloo', title: 'Charge Nurse', image: '/src/assets/doctorsimages/unknown.png', bio: '' },
      { name: 'Haron Ogola', title: 'Team Leader', image: '/src/assets/doctorsimages/unknown.png', bio: '' },
    ]}
  />

  {/* Client Testimonials */}
  <ClientsSay
    title="What our clients say"
    testimonials={[
      { quote: 'Timely procedures with excellent follow-up care.', name: 'P. Njoroge', avatar: '/src/assets/feedback/clients.png' },
      { quote: 'Skilled team and reassuring environment.', name: 'S. Wekesa', avatar: '/src/assets/feedback/clients.png' },
      { quote: 'Efficient scheduling and clear communication.', name: 'M. Kariuki', avatar: '/src/assets/feedback/clients.png' },
    ]}
  />

        {/* Insurance Partners */}
        <InsuranceSlider />
      </main>
    </div>
  );
};

export default CathLabServices;
