import Heading from "@/components/Heading";
import { motion } from "framer-motion";

const AccidentEmergencyServices: React.FC = () => {
  const emergencyCategories = [
    {
      id: "critical",
      title: "Critical Emergency",
      color: "bg-red-900",
      response: "Immediate",
      conditions: ["Cardiac Arrest", "Severe Trauma", "Stroke", "Severe Burns"],
    },
    {
      id: "urgent",
      title: "Urgent Care",
      color: "bg-red-800",
      response: "10-15 minutes",
      conditions: ["Chest Pain", "Fractures", "Severe Pain", "Head Injury"],
    },
    {
      id: "semi-urgent",
      title: "Semi-Urgent",
      color: "bg-yellow-600",
      response: "30-60 minutes",
      conditions: [
        "Moderate Pain",
        "Mild Trauma",
        "Dehydration",
        "Minor Burns",
      ],
    },
  ];

  // const services = [
  //   {
  //     id: 'triage',
  //     title: 'Emergency Triage',
  //     short: '24/7 rapid assessment and prioritization by experienced emergency nurses.',
  //     image: '/src/assets/images/care1.jpg',
  //     details: 'Immediate assessment and categorization of patients based on medical urgency.',
  //   },
  //   {
  //     id: 'trauma',
  //     title: 'Trauma Care',
  //     short: 'Full trauma team activation for major injuries with immediate surgical support.',
  //     image: '/src/assets/images/care2.jpg',
  //     details: 'Advanced trauma life support with dedicated trauma bays and specialist teams.',
  //   },
  //   {
  //     id: 'cardiac',
  //     title: 'Cardiac Emergency',
  //     short: 'Chest pain unit with rapid ECG and cardiac marker testing.',
  //     image: '/src/assets/images/care3.jpg',
  //     details: 'Immediate cardiac assessment and intervention capability.',
  //   },
  //   {
  //     id: 'pediatric',
  //     title: 'Pediatric Emergency',
  //     short: 'Child-friendly emergency care with specialized pediatric equipment.',
  //     image: '/src/assets/images/care4.jpg',
  //     details: 'Dedicated pediatric emergency specialists available 24/7.',
  //   },
  //   {
  //     id: 'critical',
  //     title: 'Critical Care',
  //     short: 'Resuscitation and stabilization with advanced life support.',
  //     image: '/src/assets/images/image2.jpg',
  //     details: 'Full critical care capabilities with immediate ICU access.',
  //   },
  //   {
  //     id: 'fasttrack',
  //     title: 'Fast Track Care',
  //     short: 'Rapid treatment of minor injuries and illnesses.',
  //     image: '/src/assets/images/image4.jpg',
  //     details: 'Efficient care for non-life-threatening conditions.',
  //   },
  // ];

  const testimonials = [
    {
      id: "t1",
      quote:
        "The A&E team responded incredibly fast when my son had a severe allergic reaction. Professional and reassuring throughout.",
      name: "Sarah M., Karen",
      avatar: "/src/assets/images/image1.png",
    },
    {
      id: "t2",
      quote:
        "Excellent trauma care after my accident. The team worked seamlessly together and kept my family informed.",
      name: "James O., Westlands",
      avatar: "/src/assets/doctorsImages/jorammugo.png",
    },
    {
      id: "t3",
      quote:
        "Quick, efficient service for what could have been a very stressful situation. Thank you TNH A&E!",
      name: "Amina H., Parklands",
      avatar: "/src/assets/images/image3.png",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Emergency Contact Banner */}
      <div className="bg-red-900 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <p className="font-medium">Emergency? Call Now:</p>
          <a
            href="tel:0703082640"
            className="flex items-center gap-2 bg-yellow-600 text-white px-4 py-1 rounded-full font-bold hover:bg-yellow-500 transition-colors shadow-md"
          >
            0703 082 640
          </a>
        </div>
      </div>

      <Heading
        image_url="/src/assets/heroimages/heroimage2.jpg"
        title="Accident & Emergency"
        description="24/7 emergency care with rapid response and specialist support."
        style="background"
      />

      <div className="container mx-auto px-4 -mt-10 relative z-10">
        {/* Emergency Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {emergencyCategories.map((category) => (
            <div
              key={category.id}
              className={`${category.color} bg-opacity-10 rounded-xl p-6 border border-opacity-20`}
            >
              <h3 className="font-bold text-lg mb-2">{category.title}</h3>
              <p className="text-sm mb-3">Response Time: {category.response}</p>
              <ul className="text-sm space-y-1">
                {category.conditions.map((condition, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${category.color}`}
                    />
                    {condition}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto mb-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-3xl font-serif font-bold text-red-900 mb-4">
                World-Class Emergency Care
              </h2>
              <p className="text-gray-600 mb-4">
                The Nairobi Hospital's Accident & Emergency Department provides
                comprehensive emergency medical care 24 hours a day, 365 days a
                year. Our team of emergency medicine specialists, trauma
                surgeons, and critical care nurses ensures immediate response to
                any medical emergency.
              </p>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>24/7 emergency physician coverage</li>
                <li>Rapid response trauma teams</li>
                <li>Advanced resuscitation facilities</li>
                <li>Direct access to specialist care</li>
              </ul>
            </div>
          </div>
          <div className="order-1 lg:order-2 space-y-4">
            <img
              src="https://media.istockphoto.com/id/513438317/photo/doctor-nurse-and-paramedics-wheeling-patient-on-stretcher.jpg?s=612x612&w=0&k=20&c=iagHKq8nLpWZRfUTkVqZl0m54fzyHfaDapILk74KV7Y="
              alt="Emergency response team"
              className="w-full rounded-2xl shadow-lg object-cover h-80"
            />

            {/* Quick Stats - Floating Cards */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm transform hover:-translate-y-1 transition-transform">
                <h3 className="text-3xl font-bold text-red-900">&lt;10</h3>
                <p className="text-sm text-gray-600">Min response</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm transform hover:-translate-y-1 transition-transform">
                <h3 className="text-3xl font-bold text-red-900">24/7</h3>
                <p className="text-sm text-gray-600">Care</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm transform hover:-translate-y-1 transition-transform">
                <h3 className="text-3xl font-bold text-red-900">100%</h3>
                <p className="text-sm text-gray-600">Ready</p>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Actions Grid */}
        <div className="max-w-7xl mx-auto mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-red-900 to-red-800 text-white rounded-xl p-6 col-span-2 flex flex-col justify-between min-h-[200px]">
            <h3 className="text-xl font-bold mb-4">Need Emergency Care?</h3>
            <div className="space-y-4">
              <p className="text-sm opacity-90">
                Our emergency department is ready 24/7 for immediate care
              </p>
              <a
                href="tel:0703082640"
                className="inline-block bg-yellow-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors shadow-lg"
              >
                Call Emergency Now
              </a>
            </div>
          </div>{" "}
          <div className="bg-red-50 rounded-xl p-6 shadow-sm flex flex-col justify-between hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-red-900">Find Us</h3>
            <div>
              <p className="text-sm text-gray-600 mb-3">
                Argwings Kodhek Road, Nairobi
              </p>
              <a
                href="/directions"
                className="inline-flex items-center text-yellow-600 text-sm hover:text-yellow-500"
              >
                Get Directions
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div className="bg-red-50 rounded-xl p-6 shadow-sm flex flex-col justify-between hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-red-900">Insurance</h3>
            <div>
              <p className="text-sm text-gray-600 mb-3">
                We accept all major insurance
              </p>
              <a
                href="/insurance"
                className="inline-flex items-center text-yellow-600 text-sm hover:text-yellow-500"
              >
                Learn More
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
        {/* What to Expect & When to Come */}
        <div className="max-w-7xl mx-auto mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h4 className="font-semibold text-lg mb-2">When to Visit A&E</h4>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li>Severe chest pain or difficulty breathing</li>
              <li>Severe bleeding or head injury</li>
              <li>Loss of consciousness</li>
              <li>Severe burns or scalds</li>
              <li>Suspected stroke or heart attack</li>
              <li>Severe allergic reactions</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h4 className="font-semibold text-lg mb-2">What to Bring</h4>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li>ID and insurance card if available</li>
              <li>List of current medications</li>
              <li>Relevant medical history</li>
              <li>Contact details for next of kin</li>
              <li>Recent test results if relevant</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h4 className="font-semibold text-lg mb-2">Triage Process</h4>
            <p className="text-gray-600 mb-2">
              Our triage system ensures the most urgent cases are seen first:
            </p>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li>Immediate: Life-threatening</li>
              <li>Very Urgent: 10 minutes</li>
              <li>Urgent: 1 hour</li>
              <li>Standard: 2 hours</li>
              <li>Non-urgent: 4 hours</li>
            </ul>
          </div>
        </div>

        {/* Additional info: Facilities & Transport */}
        <div className="max-w-7xl mx-auto mb-12 space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h4 className="font-semibold text-lg mb-2">Emergency Transport</h4>
            <p className="text-gray-600">
              24/7 emergency ambulance service with advanced life support
              capabilities. Our ambulances are equipped with the latest medical
              technology and staffed by experienced paramedics.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-lg mb-2">
                Emergency Facilities
              </h4>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Dedicated trauma bays</li>
                <li>Rapid access to CT and MRI</li>
                <li>Point-of-care laboratory testing</li>
                <li>Direct access to operating theatres</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2">Location & Access</h4>
              <p className="text-gray-600">
                A&E entrance on Argwings Kodhek Road. Dedicated ambulance bay
                and separate walk-in entrance. Reserved parking for emergency
                cases. Security-controlled access 24/7.
              </p>
            </div>
          </div>
        </div>

        {/* Patient testimonials */}
        <div className="max-w-7xl mx-auto mb-20">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-serif font-bold text-red-900 mb-2">
              Patient Stories
            </h3>
            <div className="w-20 h-1 bg-yellow-600 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <motion.blockquote
                key={t.id}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                className="bg-red-50 p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow"
              >
                <p className="text-gray-700 italic">"{t.quote}"</p>
                <div className="mt-4 flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 object-cover rounded-full"
                  />
                  <cite className="text-sm font-medium text-gray-900">
                    {t.name}
                  </cite>
                </div>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccidentEmergencyServices;
