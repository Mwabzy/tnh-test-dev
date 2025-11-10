import { FC } from 'react';
import Heading from '@/components/Heading';
import { Download, Heart, Activity, Clock, Award, ShieldCheck, ChevronRight } from 'lucide-react';
import InsuranceSlider from '@/components/InsuranceSlider';

const CathLabServices: FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Heading
        image_url="/src/assets/heroimages/cathlab.jpg"
        title="Cardiac Catheterization Laboratory"
        description="State-of-the-art cardiac diagnostics and interventional procedures"
        style="background"
      />

      <main role="main" aria-label="Cath Lab Services" className="pb-20">
        {/* Hero summary */}
        <section className="bg-white pt-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <p className="text-sm text-gray-500 mb-2">Advanced Cardiac Care</p>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-red-900 leading-tight mb-4">
                  State-of-the-Art Cardiac Catheterization Laboratory
                </h1>
                <p className="text-gray-700 max-w-2xl leading-relaxed mb-6">
                  Our cutting-edge Cardiac Catheterization Laboratory combines advanced technology with expert care to provide precise diagnostics and innovative interventional procedures. Experience world-class cardiac care with our team of renowned specialists.
                </p>
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
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src="/src/assets/images/cath-lab-hero.jpg" 
                    alt="Modern Cath Lab Facility" 
                    className="w-full h-64 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-gray-50 py-12 mt-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-900 mb-2">99%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-900 mb-2">24/7</div>
                <div className="text-sm text-gray-600">Emergency Care</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-900 mb-2">5000+</div>
                <div className="text-sm text-gray-600">Procedures Yearly</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-900 mb-2">15+</div>
                <div className="text-sm text-gray-600">Specialist Physicians</div>
              </div>
            </div>
          </div>
        </section>

        {/* Main content & sidebar */}
        <section className="container mx-auto px-4 mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 space-y-8">
              {/* Key Services */}
              <div className="space-y-8">
                <h2 className="text-2xl font-serif font-bold text-red-900">Advanced Cardiac Procedures</h2>
                
                {[{
                  title: 'Diagnostic Cardiac Catheterization',
                  image: '/src/assets/images/diagnostic-cath.jpg',
                  description: 'High-precision imaging and pressure measurements to evaluate heart function and coronary arteries.',
                  features: [
                    'Coronary angiography',
                    'Left heart catheterization',
                    'Right heart catheterization',
                    'Advanced cardiac imaging'
                  ]
                }, {
                  title: 'Interventional Procedures',
                  image: '/src/assets/images/intervention.jpg',
                  description: 'State-of-the-art interventional procedures to treat various cardiac conditions.',
                  features: [
                    'Coronary angioplasty (PCI)',
                    'Stent placement',
                    'Complex coronary interventions',
                    'Structural heart interventions'
                  ]
                }, {
                  title: 'Electrophysiology Studies',
                  image: '/src/assets/images/ep-study.jpg',
                  description: 'Advanced diagnostic and therapeutic procedures for heart rhythm disorders.',
                  features: [
                    'Cardiac mapping',
                    'Ablation procedures',
                    'Device implantation',
                    'Rhythm management'
                  ]
                }].map((service, idx) => (
                  <article key={service.title} className={`grid ${idx % 2 === 0 ? 'md:grid-cols-2' : 'md:grid-cols-2 md:flex-row-reverse'} gap-6 items-center`}>
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
                  </article>
                ))}
              </div>

              {/* Technology Showcase */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-xl font-semibold text-red-900 mb-4">Cutting-Edge Technology</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <img 
                      src="/src/assets/images/cath-lab-tech.jpg" 
                      alt="Advanced Imaging Systems" 
                      className="rounded-xl w-full h-48 object-cover mb-4"
                    />
                    <h4 className="font-semibold mb-2">Advanced Imaging Systems</h4>
                    <p className="text-sm text-gray-700">
                      Latest generation imaging technology providing exceptional clarity and precision for complex procedures.
                    </p>
                  </div>
                  <div>
                    <img 
                      src="/src/assets/images/cath-lab-monitoring.jpg" 
                      alt="Patient Monitoring" 
                      className="rounded-xl w-full h-48 object-cover mb-4"
                    />
                    <h4 className="font-semibold mb-2">Advanced Monitoring</h4>
                    <p className="text-sm text-gray-700">
                      Real-time 3D cardiac mapping and comprehensive hemodynamic monitoring systems.
                    </p>
                  </div>
                </div>
              </div>

              {/* Why Choose Us */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <Award className="w-8 h-8 text-red-900 mb-3" />
                  <h4 className="font-semibold mb-2">Expert Team</h4>
                  <p className="text-sm text-gray-700">
                    Internationally trained interventional cardiologists and specialized cardiac care team.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <ShieldCheck className="w-8 h-8 text-red-900 mb-3" />
                  <h4 className="font-semibold mb-2">Safety First</h4>
                  <p className="text-sm text-gray-700">
                    Advanced safety protocols and continuous monitoring during procedures.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <Heart className="w-8 h-8 text-red-900 mb-3" />
                  <h4 className="font-semibold mb-2">Patient Care</h4>
                  <p className="text-sm text-gray-700">
                    Comprehensive care with focus on patient comfort and recovery.
                  </p>
                </div>
              </div>

              {/* Patient Journey */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-red-900 mb-4">Your Journey at Our Cath Lab</h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-900">1</div>
                    <div>
                      <h4 className="font-semibold mb-1">Initial Consultation</h4>
                      <p className="text-sm text-gray-700">Comprehensive evaluation and procedure planning with our cardiac team.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-900">2</div>
                    <div>
                      <h4 className="font-semibold mb-1">Pre-Procedure</h4>
                      <p className="text-sm text-gray-700">Detailed preparation instructions and pre-procedure testing if required.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-900">3</div>
                    <div>
                      <h4 className="font-semibold mb-1">Procedure</h4>
                      <p className="text-sm text-gray-700">State-of-the-art procedure with expert team and advanced monitoring.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-900">4</div>
                    <div>
                      <h4 className="font-semibold mb-1">Recovery & Follow-up</h4>
                      <p className="text-sm text-gray-700">Dedicated recovery care and comprehensive follow-up plan.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-28 space-y-4">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h5 className="font-semibold text-red-900">Schedule a Consultation</h5>
                  <p className="text-sm text-gray-700 mt-2">
                    Speak with our cardiac specialists about your heart health concerns.
                  </p>
                  <div className="mt-4 flex flex-col gap-2">
                    <a href="#consultation" className="px-4 py-2 bg-red-900 text-white rounded-md text-center">
                      Book Consultation
                    </a>
                    <a href="tel:+254703082622" className="px-4 py-2 border rounded-md text-center">
                      Call +254 703 082 622
                    </a>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
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
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h5 className="font-semibold text-red-900">Insurance Coverage</h5>
                  <p className="text-sm text-gray-700 mt-2">
                    We work with major insurance providers. Contact our financial counselors for coverage details.
                  </p>
                  <ul className="mt-3 text-sm text-gray-700 space-y-1">
                    <li>• Pre-authorization assistance</li>
                    <li>• Financial counseling</li>
                    <li>• Payment plans available</li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
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
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* Insurance Partners */}
        <InsuranceSlider />
      </main>
    </div>
  );
};

export default CathLabServices;