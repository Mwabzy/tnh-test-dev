import { FC } from 'react';
import Heading from '@/components/Heading';
import { Download, Star } from 'lucide-react';
import InsuranceSlider from '@/components/InsuranceSlider';
import ClientsSay from '@/components/ClientsSay';
import TeamSection from '@/components/TeamSection';

// Images - you'll need to replace these with actual images
import clinicalPsychologyImage from '@/assets/images/care1.jpg';
import counselingImage from '@/assets/images/care2.jpg';
import therapyImage from '@/assets/images/care3.jpg';
import supportImage from '@/assets/images/care4.jpg';

const testimonials = [
  {
    name: 'Mary W.',
    text: 'The counseling services at TNH helped me cope with my diagnosis. The psychologists are compassionate and professional.',
    rating: 5,
    service: 'Clinical Psychology'
  },
  {
    name: 'David L.',
    text: 'The group therapy sessions were invaluable during my recovery journey. I found strength and support here.',
    rating: 5,
    service: 'Group Therapy'
  },
];

const PsychosocialDepartment: FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Heading
        image_url="/src/assets/heroimages/psychosocial.jpg"
        title="Psychosocial Services"
        description="Supporting mental health and wellbeing — a world-class multidisciplinary centre."
        style="background"
      />

      <main role="main" aria-label="Psychosocial Services" className="pb-20">
        {/* Hero summary */}
        <section className="bg-white pt-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <p className="text-sm text-gray-500 mb-2">Clinical Services</p>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-red-900 leading-tight mb-4">Psychosocial Services</h1>
                <p className="text-gray-700 max-w-2xl leading-relaxed mb-6">Comprehensive mental health support combining clinical psychology, counseling, and therapeutic interventions — empowering patients and families through evidence-based care.</p>
                <div className="flex items-center gap-3">
                  <a href="#book" className="px-5 py-3 bg-red-900 text-white rounded-full font-medium hover:bg-red-800 transition">Book an assessment</a>
                  <a href="/docs/psychosocial-flyer.pdf" target="_blank" rel="noreferrer" className="px-4 py-3 border border-gray-200 rounded-full text-sm inline-flex items-center gap-2"><Download className="w-4 h-4" /> Brochure</a>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img src={clinicalPsychologyImage} alt="Psychosocial Services" className="w-full h-64 object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main content & sidebar */}
        <section className="container mx-auto px-4 mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 space-y-8">
              {/* Services: alternating card layout */}
              <div className="space-y-8">
                {[{
                  title: 'Clinical Psychology',
                  img: clinicalPsychologyImage,
                  intro: 'Professional assessment and evidence-based interventions for mental health concerns.'
                },{
                  title: 'Counseling Services',
                  img: counselingImage,
                  intro: 'Individual and family counseling supporting emotional wellbeing and coping strategies.'
                },{
                  title: 'Group Therapy',
                  img: therapyImage,
                  intro: 'Structured group sessions for shared experiences and mutual support.'
                },{
                  title: 'Support Programs',
                  img: supportImage,
                  intro: 'Specialized support services for patients and families facing health challenges.'
                }].map((svc, idx) => (
                  <article key={svc.title} className={`grid ${idx % 2 === 0 ? 'md:grid-cols-2' : 'md:grid-cols-2 md:flex-row-reverse'} gap-6 items-center`}>
                    <div className="rounded-xl overflow-hidden shadow-md">
                      <img src={svc.img} alt={svc.title} className="w-full h-48 object-cover" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-red-900 mb-2 font-serif">{svc.title}</h3>
                      <p className="text-gray-700 mb-4">{svc.intro}</p>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 bg-red-900 rounded-full"></span> Personalised treatment plans</li>
                        <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 bg-red-900 rounded-full"></span> Licensed mental health professionals</li>
                        <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 bg-red-900 rounded-full"></span> Evidence-based approaches</li>
                      </ul>
                    </div>
                  </article>
                ))}
              </div>

              {/* Why choose us */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Why choose our centre</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-sm text-gray-700"><strong className="text-red-900">Experienced team</strong><div>Licensed psychologists and therapists.</div></div>
                  <div className="text-sm text-gray-700"><strong className="text-red-900">Patient-centred</strong><div>Individual goals and treatment plans.</div></div>
                  <div className="text-sm text-gray-700"><strong className="text-red-900">Modern facilities</strong><div>Private therapy rooms and group spaces.</div></div>
                </div>
              </div>

              {/* Additional Services */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h4 className="text-lg font-semibold text-red-900 mb-3">Additional Services & Support</h4>
                <p className="text-sm text-gray-700 mb-3">Crisis intervention, mindfulness training, stress management workshops, and specialized support for medical conditions.</p>
                <p className="text-sm text-red-900 font-medium">Note: Some services may require referral from your healthcare provider.</p>
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
                  <p className="text-sm text-gray-700 mt-2">Call or fill the online form to request an appointment with our mental health team.</p>
                  <div className="mt-4 flex flex-col gap-2">
                    <a href="#book" className="px-4 py-2 bg-red-900 text-white rounded-md text-center">Book now</a>
                    <a href="tel:+254703082622" className="px-4 py-2 border rounded-md text-center">Call +254 703 082 622</a>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h5 className="font-semibold text-red-900">Operating Hours</h5>
                  <ul className="text-sm text-gray-700 mt-3 space-y-1">
                    <li>Mon - Fri: 08:00 - 17:00</li>
                    <li>Weekends: By appointment</li>
                    <li>Crisis support: 24 hours</li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h5 className="font-semibold text-red-900">Contact</h5>
                  <p className="text-sm text-gray-700 mt-2">Psychosocial Services<br/>The Nairobi Hospital, Argwings Kodhek Road, Nairobi</p>
                  <p className="text-sm text-gray-700 mt-3">Switchboard: +254 (0)20 2846 5000 / 6000<br/>Direct: +254 (0)703 082 622</p>
                </div>
              </div>
            </aside>
          </div>
        </section>

  {/* Clinical Team (inserted before ClientsSay) */}
  <TeamSection
    title="Psychosocial Care Team"
    team={[
      { name: 'Dr. Mary Wanjiru', title: 'Clinical Psychologist', image: '/src/assets/images/image1.png', bio: 'Leads clinical psychology services and therapy programs.' },
      { name: 'Ms. Faith Njeri', title: 'Senior Counselor', image: '/src/assets/images/image2.png', bio: 'Experienced in individual and family counseling.' },
      { name: 'Dr. Paul Kiptoo', title: 'Psychiatrist', image: '/src/assets/images/image3.png', bio: 'Provides medical management for complex cases.' },
      { name: 'Ms. Jane Mwangi', title: 'Group Therapy Lead', image: '/src/assets/images/image4.png', bio: 'Facilitates therapeutic groups and workshops.' },
    ]}
  />

  {/* Client Testimonials */}
  <ClientsSay
    title="What our clients say about Psychosocial Services"
    testimonials={[
      { quote: 'Compassionate counseling that helped me cope.', name: 'A. Mburu', avatar: '/src/assets/images/image1.png' },
      { quote: 'Therapists were professional and understanding.', name: 'E. Mutheu', avatar: '/src/assets/images/image2.png' },
      { quote: 'Great support groups and resources.', name: 'S. Kilonzo', avatar: '/src/assets/images/image3.png' },
    ]}
  />

        {/* Insurance Partners */}
        <InsuranceSlider />
      </main>
    </div>
  );
};

export default PsychosocialDepartment;