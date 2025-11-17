import { FC } from 'react';
import { motion } from 'framer-motion';
import Heading from '@/components/Heading';
import { Users} from 'lucide-react';
import InsuranceSlider from '@/components/InsuranceSlider';
import ClientsSay from '@/components/ClientsSay';
import TeamSection from '@/components/TeamSection';

const InternationalPatients: FC = () => {
  const benefits = [
    { title: 'Concierge Service', desc: 'Visa, travel, and logistics support for international patients.' },
    { title: 'Language Support', desc: 'Multi-lingual coordinators and cultural liaison services.' },
    { title: 'Coordinated Care', desc: 'Fast-track appointments and seamless clinical pathways.' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Heading image_url="/src/assets/heroimages/international.jpg" title="International Patients" description="Global-standard care with dedicated international patient services." style="background" />

      <div className="py-16 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-red-900 mb-4">Care for Patients from Around the World</h2>
          <p className="text-gray-600">A concierge approach to ensure a safe, comfortable and coordinated visit for international patients.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((b) => (
            <motion.div key={b.title} className="bg-white rounded-2xl p-6 shadow-md" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-yellow-50 text-red-900 rounded-xl"><Users className="w-6 h-6" /></div>
                <h3 className="font-semibold text-gray-900">{b.title}</h3>
              </div>
              <p className="text-gray-600 text-sm">{b.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a className="inline-block px-6 py-3 bg-yellow-50 text-red-900 rounded-lg">Contact International Office</a>
        </div>

  {/* Clinical Team (inserted before ClientsSay) */}
  <TeamSection
    title="International Patient Care Team"
    team={[
      { name: 'Ms. Claire Bennett', title: 'International Patient Coordinator', image: '/src/assets/images/image1.png', bio: 'Leads logistics and patient concierge services.' },
      { name: 'Dr. Michael Oduor', title: 'Consultant Physician', image: '/src/assets/images/image2.png', bio: 'Clinical lead for international referrals.' },
      { name: 'Ms. Aisha Mohamed', title: 'Language Liaison', image: '/src/assets/images/image3.png', bio: 'Provides multi-lingual coordination and support.' },
      { name: 'Mr. Daniel Kimani', title: 'Patient Services Manager', image: '/src/assets/images/image4.png', bio: 'Oversees billing, visas and travel assistance.' },
    ]}
  />

  {/* Client Testimonials */}
  <ClientsSay
    title="What international patients say"
    testimonials={[
      { quote: 'Seamless coordination from booking to treatment.', name: 'A. Smith', avatar: '/src/assets/images/image1.png', subtitle: 'International Patient' },
      { quote: 'Excellent support and clear communication throughout.', name: 'M. Rodriguez', avatar: '/src/assets/images/image2.png' },
      { quote: 'Highly professional and accommodating team.', name: 'L. Patel', avatar: '/src/assets/images/image3.png' },
    ]}
  />

  {/* Insurance Partners */}
  <InsuranceSlider />
      </div>
    </div>
  );
};

export default InternationalPatients;
