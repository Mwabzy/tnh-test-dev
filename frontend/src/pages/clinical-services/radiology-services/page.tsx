import Heading from '@/components/Heading';
import { motion } from 'framer-motion';
import InsuranceSlider from '@/components/InsuranceSlider';
import ClientsSay from '@/components/ClientsSay';
import TeamSection from '@/components/TeamSection';

const RadiologyServices: React.FC = () => {
  const services = [
    {
      id: 'xray',
      title: 'X‑ray & Fluoroscopy',
      short: 'Routine and emergency x‑rays, portable services and fluoroscopic studies (HSG, Barium, MCU).',
      image: 'https://images.medicinenet.com/images/article/main_image/what-is-the-difference-between-fluoroscopy-and-radiography.jpg?output-quality=75',
      details: `Routine & emergency radiography at Main Hospital and OPCs. Portable services and centralised reporting.`,
    },
    {
      id: 'mri',
      title: 'Magnetic Resonance Imaging (MRI)',
      short: 'Two 3T MRI units for neuro, body and MSK imaging plus advanced MRI procedures.',
      image: 'https://cdn.wchn.sa.gov.au/assets/resized/images/WCH/children/medical-imaging/43619/mri-feature-2_W720_H448.jpg',
      details: `Two 3T machines. Services include MR spectroscopy, cardiac MRI, MR angiography and neuronavigation support.`,
    },
    {
      id: 'ct',
      title: 'Computed Tomography (CT)',
      short: '128/64‑slice CT scanners for cross‑sectional, trauma and angiographic studies.',
      image: 'https://img.lb.wbmdstatic.com/vim/live/webmd/consumer_assets/site_images/article_thumbnails/BigBead/ct_scan_bigbead/1800x1200_ct_scan_machine_bigbead.jpg?resize=750px:*&output-quality=75',
      details: `Whole‑body cross‑sectional imaging, virtual colonoscopy, bronchoscopy and specialised angiography.`,
    },
    {
      id: 'ultrasound',
      title: 'Ultrasound & Echo',
      short: 'Multiple suites, portable point‑of‑care, 4D obstetric scans, Doppler and elastography.',
      image: 'https://jshearthealth.ie/app/uploads/2022/04/02_hero_echo.jpeg',
      details: `Portable services for inpatients, echocardiography to support cardiology and cath lab, plus 4D obstetric imaging.`,
    },
    {
      id: 'interventional',
      title: 'Interventional Radiology',
      short: 'Image‑guided biopsies, drainages, stents, embolisation and gastrostomy placements.',
      image: 'https://www.itnonline.com/sites/default/files/field/image/Cath_Lab_Interventional_radiology_Tumor_Embolization_Philips-Azurion-Picture-3%20copy.jpg',
      details: `Precision procedures under CT/US/fluoroscopy guidance: biopsies, drainages, stents and embolisation.`,
    },
    {
      id: 'breast',
      title: 'Breast Imaging',
      short: 'Digital mammography, high‑resolution ultrasound and image‑guided biopsy.',
      image: 'https://www.aku.edu/mcea/radiology/PublishingImages/breast-imaging.jpg',
      details: `Screening and diagnostic mammography, targeted ultrasound and biopsy for detected lesions.`,
    },
  ];

  const testimonials = [
    {
      id: 't1',
      quote: 'Quick, professional service — my CT results were ready the same day and the staff were reassuring.',
      name: 'Jane K., Nairobi',
      avatar: '/src/assets/images/image1.png',
    },
    {
      id: 't2',
      quote: 'The MRI team were patient and explained everything. Excellent care for my elderly parent.',
      name: 'Samuel O., Mombasa',
      avatar: '/src/assets/doctorsImages/samuelowuor.png',
    },
    {
      id: 't3',
      quote: 'Booking was straightforward and the radiologist called to explain the findings clearly.',
      name: 'Amina B., Kisumu',
      avatar: '/src/assets/images/image3.png',
    },
  ];

  return (
    <div>
      <Heading
        image_url="https://www.payette.com/wp-content/uploads/2018/12/mgh-mri-room-1024x627.jpg"
        title="Radiology Services"
        description="State‑of‑the‑art imaging for accurate diagnosis and patient care."
        style="background"
      />

      <div className="container mx-auto px-4 py-10">
        {/* About section */}
        <div className="max-w-7xl mx-auto mb-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">About Our Radiology Department</h2>
            <p className="text-gray-600 mb-4">The Nairobi Hospital Radiology Department combines advanced imaging technology with experienced radiologists and a modern RIS/PACS infrastructure to deliver fast, accurate diagnostic information and therapeutic procedures.</p>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li>Integrated RIS & PACS for rapid image access and reporting</li>
              <li>Comprehensive services: X‑ray, CT, MRI, Ultrasound, DEXA, Mammography</li>
              <li>Interventional radiology and image‑guided therapies</li>
              <li>24/7 inpatient imaging and scheduled outpatient services</li>
            </ul>
          </div>
          <div className="order-1 lg:order-2">
            <img src="https://www.payette.com/wp-content/uploads/2018/12/mgh-mri-room-1024x627.jpg" alt="Radiology team" className="w-full rounded-2xl shadow-lg object-cover h-80" />
          </div>
        </div>

        {/* Services structured grid (modern, world-class style) */}
        <section className="max-w-7xl mx-auto mb-12">
          <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100 p-6 shadow-inner">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
              <div>
                <h3 className="text-2xl font-serif font-bold text-gray-900">Our Services</h3>
                <p className="text-gray-600 mt-2 max-w-xl">We provide comprehensive diagnostic and interventional imaging with fast reporting and subspecialist support. Click a service to learn more or call to book.</p>
              </div>
              <div className="hidden md:flex items-center gap-4">
                <span className="text-sm text-gray-600">Need help choosing?</span>
                <a href="tel:0703082640" className="px-4 py-2 bg-red-900 text-white rounded-md text-sm">Call Radiology</a>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s, i) => (
                <motion.article
                  key={s.id}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ delay: i * 0.05, type: 'spring', stiffness: 120 }}
                  viewport={{ once: true }}
                  className="group bg-white rounded-xl p-4 shadow-sm hover:shadow-2xl transform-gpu transition-transform duration-300 flex flex-col justify-between"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-20 h-20 rounded-md overflow-hidden bg-gray-50 ring-1 ring-gray-100">
                      <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{s.title}</h4>
                      <p className="text-sm text-gray-600 mt-2">{s.short}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <a aria-label={`Book appointment for ${s.title}`} href="tel:0703082640" className="inline-block px-4 py-2 bg-red-900 text-white rounded-md text-sm">Book Appointment</a>
                    <span className="text-xs text-gray-500">Fast reporting · Expert radiologists</span>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* How to book & prep (world-class details) */}
        <div className="max-w-7xl mx-auto mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h4 className="font-semibold text-lg mb-2">How to Book</h4>
            <ol className="list-decimal pl-5 text-gray-600 space-y-2">
              <li>Call our Radiology desk: <a href="tel:0703082640" className="text-red-900 underline">0703 082 640</a> (24/7 inpatient support).</li>
              <li>Use our online booking portal: <a href="/book" className="text-red-900 underline">Book an appointment</a> for scheduled scans.</li>
              <li>Bring your referral, previous images, and relevant labs (e.g., renal function for contrast studies).</li>
            </ol>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h4 className="font-semibold text-lg mb-2">Preparing for Your Scan</h4>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li>CT with contrast: fasting 4–6 hours; bring recent renal function tests.</li>
              <li>MRI: remove metal objects; inform us of implants, pacemakers, or pregnancy.</li>
              <li>Ultrasound: follow modality-specific instructions (e.g., full bladder for pelvic ultrasound).</li>
              <li>For paediatric patients: bring comfort items and a caregiver; sedation services are available if required.</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h4 className="font-semibold text-lg mb-2">Reporting & Turnaround</h4>
            <p className="text-gray-600 mb-2">We prioritise rapid, accurate reporting with subspecialist review:</p>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li>Stat/urgent CT & MRI: report within 1–4 hours</li>
              <li>Routine CT/MRI: preliminary within 24 hours, final report within 48 hours</li>
              <li>X‑rays & ultrasound: typically within 24 hours</li>
              <li>Interventional procedures: post‑procedure summary and imaging shared same day</li>
            </ul>
          </div>
        </div>

        {/* Additional world-class info: Safety, Technology, Locations */}
        <div className="max-w-7xl mx-auto mb-12 space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h4 className="font-semibold text-lg mb-2">Patient Safety & Radiation Dose</h4>
            <p className="text-gray-600">We follow ALARA (As Low As Reasonably Achievable) principles. Dose optimisation, shielding and paediatric protocols are standard. All contrast procedures include screening for allergies and renal function checks when indicated.</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-lg mb-2">Technology & Quality</h4>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>3T MRI scanners with advanced sequences and cardiac MR capability</li>
                <li>128/64‑slice CT with dose‑reduction software and CT angiography</li>
                <li>Digital mammography with tomosynthesis and 3D post‑processing</li>
                <li>Integrated RIS/PACS and structured reporting for consistent, shareable results</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2">Locations & Hours</h4>
              <p className="text-gray-600">Main Hospital Radiology — 24/7 inpatient imaging. Outpatient Radiology (OPC) — Mon–Fri 08:00–17:00; Sat 08:00–13:00. Please call before arrival for weekend appointments.</p>
            </div>
          </div>
        </div>



        {/* Clinical Team (inserted before ClientsSay) */}
  <TeamSection
    title="Meet the Radiology Team"
    team={[
      { name: 'Dr. Mary Onyinkwa', title: 'Chief Radiologist', image: '/src/assets/doctorsImages/onyinknwa.png', bio: '' },
      { name: 'Martin I. Kamanda', title: 'Radiology Manager', image: '/src/assets/doctorsimages/mkamanda.png', bio: '' },
      { name: 'Francis Alila', title: 'Team Leader', image: '/src/assets/doctorsimages/unknown.png', bio: '' },
      { name: 'Charles Mwaniki', title: 'Team Leader', image: '/src/assets/doctorsimages/unknown.png', bio: '' },
    ]}
  />

  {/* Client Testimonials */}
  <ClientsSay
    title="What our clients say"
    testimonials={[
      { quote: 'Quick imaging and timely reports that helped my care plan.', name: 'L. Wambui', avatar: '/src/assets/feedback/clients.png' },
      { quote: 'Friendly radiographers and clear explanations.', name: 'D. Kamau', avatar: '/src/assets/feedback/clients.png' },
      { quote: 'Easy booking and fast turnaround for scans.', name: 'O. Mutiso', avatar: '/src/assets/feedback/clients.png' },
    ]}
  />

  {/* Insurance Partners */}
  <InsuranceSlider />
      </div>
    </div>
  );
};

export default RadiologyServices;
