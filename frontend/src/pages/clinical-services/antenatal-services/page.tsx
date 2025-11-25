import { FC } from 'react';
import Heading from '@/components/Heading';
import { Phone } from 'lucide-react';

const AntenatalServices: FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Heading
        image_url="/src/assets/heroimages/antenatal.jpg"
        title="Antenatal Services"
        description="Comprehensive antenatal care for mothers and babies"
        style="background"
      />

      <main className="pb-20">
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Antenatal Care</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Our antenatal services provide personalised care for expectant mothers throughout pregnancy. We offer regular check-ups, screening, nutrition counselling and access to specialist obstetric care when required.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-semibold mb-2">Routine Antenatal Visits</h3>
                <p className="text-sm text-gray-600">Scheduled visits to monitor mother and baby, including blood tests, urine tests and blood pressure monitoring.</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-semibold mb-2">Ultrasound & Screening</h3>
                <p className="text-sm text-gray-600">High-resolution ultrasound and prenatal screening to check fetal growth and development.</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-semibold mb-2">Nutrition & Education</h3>
                <p className="text-sm text-gray-600">Counselling on nutrition, exercise and birth preparation classes for mothers and partners.</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-semibold mb-2">High-Risk Pregnancy Care</h3>
                <p className="text-sm text-gray-600">Multidisciplinary management for high-risk pregnancies with access to specialists and advanced monitoring.</p>
              </div>
            </div>

            <div className="mt-8">
              <a href="tel:+254703082000" className="inline-flex items-center gap-3 bg-red-900 text-white py-3 px-5 rounded-lg hover:bg-red-800 transition">
                <Phone className="w-4 h-4" />
                Contact Antenatal Unit
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AntenatalServices;
