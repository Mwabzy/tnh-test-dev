
import Heading from '@/components/Heading'

const MedicalTourism = () => {
  return (
    <div>
        <Heading  image_url="https://cms.thenairobihosp.org/uploads/laundry_services_2d4f1b8c3a.jpg"
        style="image"
        title="Medical Tourism Services"
        description=  "We offer comprehensive medical tourism services to ensure a seamless experience for our international patients." />
       
        <section className="px-6 mt-16 md:px-16 py-12 bg-white text-[#0A0A23]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
          <div className="flex-1 text-gray-600 space-y-4">
            <h1 className="mt-3 text-4xl md:text-5xl font-extrabold leading-tight">
           The Nairobi Hospital International Desk
            </h1>
            <p>
              The Nairobi Hospital is the leading tertiary private hospital in East and Central Africa. It is the destination of choice among international patients looking to receive treatment in this region. Up to 20% of our patients are foreign nationals.
              TNH is located in the city of Nairobi and offers comprehensive general practice and specialist services complemented with advanced medical technology and great customer care. We cater for complex procedures e.g. neurovascular interventional procedures, targeted cancer treatments, specialized orthopaedic surgeries, kidney transplants, and minimal access surgery among others. We offer the latest in medical expertise and technology alongside warm and friendly services focused on our patients’ needs.
            </p>
            <p>
             We provide team-based care especially to patients with multiple medical conditions. A team specialist diagnoses and treats patients efficiently, avoiding high costs incurred through repeat and unnecessary consultations and examinations.
            </p>
          </div>

          <div className="flex-1 ml-15">
            <p className="text-md font-semibold text-red-900 uppercase">
              Patient Services
            </p>

            <h1 className="text-lg mt-2 mb-2 font-semibold">
              The services we offer include:{" "}
            </h1>

            <ul className="list-disc list-outside space-y-1 text-gray-700">
              <li>Medical enquiries and appointments – recommend and schedule an appointment with the appropriate specialists.</li>
                <li>Arrangement for accommodation in Nairobi.</li>
  <li>Medical evacuation and repatriation.</li>
  <li>Medical translation and interpreter services.</li>
  <li>Hospital admission and discharges.</li>
  <li>Airport meetings and transfer services.</li>
  <li>Visa application and extension.</li>
  <li>Travel planning and visitor information.</li>
  <li>Secretarial support services.</li>
  <li>Concierge services – currency exchange, car rental, etc.</li>
  <li>Insurance and billing services.</li>
            </ul>

            <h1 className="text-lg mt-5 font-semibold">
             Financial Services:{" "}
            </h1>
            <h2 className='mt-2 mb-4'>We have direct payment contracts with various international insurances. A dedicated team of international account representatives guide patients and families, and furnish them with the required financial details before, during and after their visit to TNH.</h2>
            <ul className="list-disc list-outside space-y-1 text-gray-700">
              <li>Information about deposits and payment
Cost estimates </li>
              <li>Cost updates of medical services</li>
            </ul>
          </div>
        </div>

      </section>
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:space-x-12 space-y-16 md:space-y-0">
          {/* Left Content */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-xl md:text-3xl font-extrabold text-[#0A0A23] leading-snug">
              Language Services <br />
            </h2>

            <p className="text-gray-600 text-lg mt-6 max-w-3xl">
             Interpreters are available at no cost to facilitate communication between our staff and patients whose primary language is not English. The interpreters can attend appointments, translate patient education materials and offer other assistance as required. Patients requiring these services ought to request for an interpreter while booking an appointment.
            </p>

           <h2 className="text-xl md:text-3xl font-extrabold text-[#0A0A23] leading-snug">Efficient Scheduling</h2>

            <p className="text-gray-600 text-lg mt-6 max-w-3xl">
             Whenever possible, TNH doctors provide both diagnosis and treatment in the same visit. Diagnostic test results may be reported to patients one to two days after testing is completed. Scheduled appointments, tests, physician consultations and treatment may be conducted in a compressed amount of time to allow international patients less time away from home, fewer expenses and more efficient use of their and their family members’ time.
            </p>
          </div>

          {/* Right Content */}
          <div className="flex-1 text-left">
            <h2 className="text-xl md:text-3xl font-extrabold text-[#0A0A23] leading-snug">
              Our Partners
            </h2>

            <p className="text-gray-600 mt-6 max-w-3xl">
              We are proud to partner with a variety of organizations to provide
              the best laundry services possible. Our partners include:
            </p>

            <ul className="list-disc list-inside text-lg text-gray-600 mt-6 max-w-3xl">
              <li>Hotels</li>
              <li>Apartments</li>
              <li>Guest Houses</li>
              <li>Commercial Laundries</li>
              <li>Hospitals</li>
              <li>Nursing Homes</li>
              <li>Private Clinics</li>
              <li>Walk-ins / Individuals / Staff</li>
              <li>Spas / Salons / Beauty Parlors</li>
            </ul>

            <p className="text-gray-600 mt-6 max-w-3xl">
              How it works: You drop it! We clean it! You pick it! <br />
              The Outcome: “We present You” <br />
              Rates: Our rates are very competitive in the market.
            </p>
          </div>
        </div>
      </section>

    
        
    </div>
  )
}

export default MedicalTourism