import { FC } from 'react';
import Heading from '@/components/Heading';
import { Download, Star } from 'lucide-react';
import InsuranceSlider from '@/components/InsuranceSlider';
import ClientsSay from '@/components/ClientsSay';
import TeamSection from '@/components/TeamSection';

// Images
import physicalTherapyImage from '@/assets/images/care1.jpg';
import hydrotherapyImage from '@/assets/images/care2.jpg';
import occupationalTherapyImage from '@/assets/images/care3.jpg';
import speechTherapyImage from '@/assets/images/care4.jpg';

const testimonials = [
  {
    name: 'Sarah M.',
    text: 'The physiotherapy team at TNH helped me recover fully after my knee surgery. Their expertise and dedication are unmatched.',
    rating: 5,
    service: 'Physiotherapy'
  },
  {
    name: 'John K.',
    text: 'The hydrotherapy sessions made a significant difference in my recovery. The staff is professional and caring.',
    rating: 5,
    service: 'Hydrotherapy'
  },
];

const PhysicalMedicineCenter: FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Heading
        image_url="/src/assets/heroimages/physical-medicine.jpg"
        title="Physical Medicine Centre"
        description="Restoring movement, reducing pain — a world-class multidisciplinary centre."
        style="background"
      />

  <main role="main" aria-label="Physical Medicine Centre" className="pb-20">
        {/* Hero summary */}
        <section className="bg-white pt-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <p className="text-sm text-gray-500 mb-2">Clinical Services</p>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-red-900 leading-tight mb-4">Physical Medicine Centre</h1>
                <p className="text-gray-700 max-w-2xl leading-relaxed mb-6">Personalised rehabilitation care combining physiotherapy, hydrotherapy, occupational and speech therapy — supporting recovery across all ages with evidence-based treatments.</p>
                <div className="flex items-center gap-3">
                  <a href="#book" className="px-5 py-3 bg-red-900 text-white rounded-full font-medium hover:bg-red-800 transition">Book an assessment</a>
                  <a href="/docs/pmc-flyer.pdf" target="_blank" rel="noreferrer" className="px-4 py-3 border border-gray-200 rounded-full text-sm inline-flex items-center gap-2"><Download className="w-4 h-4" /> Brochure</a>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img src={physicalTherapyImage} alt="Physical Medicine Centre" className="w-full h-64 object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main content & sidebar */}
        <section className="https://www.mayoclinichealthsystem.org/-/media/national-files/images/hometown-health/2019/physical-medicine-providers-working-with-patient.jpg?sc_lang=en">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 space-y-8">
              {/* Services: alternating card layout */}
              <div className="space-y-8">
                {[{
                  title: 'Physiotherapy',
                  img: physicalTherapyImage,
                  intro: 'Movement restoration, pain management and sports rehabilitation tailored to each patient.'
                },{
                  title: 'Hydrotherapy',
                  img: hydrotherapyImage,
                  intro: 'Water-based rehabilitation for gentle strengthening and improved mobility.'
                },{
                  title: 'Occupational Therapy',
                  img: occupationalTherapyImage,
                  intro: 'Practical programmes to regain independence in daily activities.'
                },{
                  title: 'Speech & Language Therapy',
                  img: speechTherapyImage,
                  intro: 'Assessment and therapy for communication and swallowing disorders.'
                }].map((svc, idx) => (
                  <article key={svc.title} className={`grid ${idx % 2 === 0 ? 'md:grid-cols-2' : 'md:grid-cols-2 md:flex-row-reverse'} gap-6 items-center`}>
                    <div className="rounded-xl overflow-hidden shadow-md">
                      <img src={svc.img} alt={svc.title} className="w-full h-48 object-cover" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-red-900 mb-2 font-serif">{svc.title}</h3>
                      <p className="text-gray-700 mb-4">{svc.intro}</p>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 bg-red-900 rounded-full"></span> Individualised treatment plans</li>
                        <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 bg-red-900 rounded-full"></span> Multidisciplinary team approach</li>
                        <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 bg-red-900 rounded-full"></span> On-site equipment and orthotic services</li>
                      </ul>
                    </div>
                  </article>
                ))}
              </div>

              {/* Why choose us */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Why choose our centre</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-sm text-gray-700"><strong className="text-red-900">Experienced team</strong><div>Specialised therapists with multidisciplinary expertise.</div></div>
                  <div className="text-sm text-gray-700"><strong className="text-red-900">Patient-centred</strong><div>Individual goals and measurable outcomes.</div></div>
                  <div className="text-sm text-gray-700"><strong className="text-red-900">Modern facilities</strong><div>Hydrotherapy pool, orthotic lab and rehabilitation gym.</div></div>
                </div>
              </div>

              {/* Additional Services & Equipment (compact) */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h4 className="text-lg font-semibold text-red-900 mb-3">Additional Services & Equipment</h4>
                <p className="text-sm text-gray-700 mb-3">Orthopaedic device fabrication (AFOs, braces), equipment hire (wheelchairs, crutches) and home-based rehabilitation options.</p>
                <p className="text-sm text-red-900 font-medium">Note: A deposit may be required for hired items.</p>
              </div>

              {/* Testimonials */}
              <section>
                <h3 className="text-2xl font-serif font-bold text-red-900 mb-6">What patients say</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {testimonials.map((tst, i) => (
                    <blockquote key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="font-semibold">{tst.name}</p>
                          <p className="text-sm text-red-900">{tst.service}</p>
                        </div>
                        <div className="flex items-center gap-1">{Array.from({ length: tst.rating }).map((_, k) => (<Star key={k} className="w-4 h-4 text-yellow-400" />))}</div>
                      </div>
                      <p className="text-gray-700">{tst.text}</p>
                    </blockquote>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-28 space-y-4">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h5 className="font-semibold text-red-900">Book an assessment</h5>
                  <p className="text-sm text-gray-700 mt-2">Call or fill the online form to request an appointment with our multidisciplinary team.</p>
                  <div className="mt-4 flex flex-col gap-2">
                    <a href="#book" className="px-4 py-2 bg-red-900 text-white rounded-md text-center">Book now</a>
                    <a href="tel:+254703082621" className="px-4 py-2 border rounded-md text-center">Call +254 703 082 621</a>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h5 className="font-semibold text-red-900">Operating Hours</h5>
                  <ul className="text-sm text-gray-700 mt-3 space-y-1"><li>Mon - Fri: 07:00 - 20:00</li><li>Weekends: 08:00 - 19:00</li><li>Inpatient: 24 hours</li></ul>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h5 className="font-semibold text-red-900">Contact</h5>
                  <p className="text-sm text-gray-700 mt-2">Physical Medicine Centre<br/>The Nairobi Hospital, Argwings Kodhek Road, Nairobi</p>
                  <p className="text-sm text-gray-700 mt-3">Switchboard: +254 (0)20 2846 5000 / 6000<br/>Direct: +254 (0)703 082 621</p>
                </div>
              </div>
            </aside>
          </div>
        </section>

  {/* Clinical Team (inserted before ClientsSay) */}
  <TeamSection
    title="Physical Medicine Team"
    team={[
      { name: 'Dr. Grace Otieno', title: 'Clinical Lead', image: '/src/assets/images/image1.png', bio: 'Oversees multidisciplinary rehabilitation programs.' },
      { name: 'Ms. Lydia Mwikali', title: 'Senior Physiotherapist', image: '/src/assets/images/image2.png', bio: 'Specialises in orthopaedic and sports rehab.' },
      { name: 'Mr. Joseph Kariuki', title: 'Hydrotherapy Lead', image: '/src/assets/images/image3.png', bio: 'Manages hydrotherapy and aquatic rehabilitation.' },
      { name: 'Ms. Anne Wanjiru', title: 'Occupational Therapist', image: '/src/assets/images/image4.png', bio: 'Focuses on daily-living skills and adaptive equipment.' },
    ]}
  />

  {/* Client Testimonials */}
  <ClientsSay
    title="What our clients say about Physical Medicine"
    testimonials={[
      { quote: 'Rehab program helped me regain mobility.', name: 'C. Njoroge', avatar: '/src/assets/images/image1.png' },
      { quote: 'Skilled therapists and personalized plan.', name: 'L. Omondi', avatar: '/src/assets/images/image2.png' },
      { quote: 'Excellent progress tracking and support.', name: 'Z. Karanja', avatar: '/src/assets/images/image3.png' },
    ]}
  />

  {/* Insurance Partners */}
  <InsuranceSlider />
      </main>
    </div>
  );
};
export default PhysicalMedicineCenter;
