

const facilitiesdownloads = () => {
  return (
    <div className="bg-gray-50 text-gray-800 p-6 md:p-12">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-indigo-700 mb-2">College of Health Sciences</h1>
        <p className="text-xl text-gray-600">Facilities Overview</p>
      </header>

      <section className="grid md:grid-cols-2 gap-8">
        <Facility
          title="Lecture Halls"
          description="Our lecture halls are spacious enough to maintain COVID-19 physical distancing protocols. For teaching, we use mounted projectors."
        />
        <Facility
          title="Skills Laboratory"
          description="Our labs are equipped with state-of-the-art equipment for students to practice their nursing skills before going to the wards. Various organizations use our labs for practical skill training and examinations."
        />
        <Facility
          title="Library"
          description="The library is furnished with print and online resources that can be accessed on campus or off-campus through the MYLOFT (My Library On Fingertips) platform. The library collection also includes inspirational resources."
        />
        <Facility
          title="Hostels"
          description="The college has spacious rooms, reading tables and TV lounges. We offer in-house laundry services at a subsidized cost."
        />
        <Facility
          title="Clinical Placements"
          description="Students are assigned to The Nairobi Hospital including the Outpatient Centers, Kenyatta National Hospital, Mathari Teaching & Referral Hospital and Nairobi County health centers."
        />
        <Facility
          title="College Buses"
          description="There are two college buses that offer students convenient transportation to external clinical locations and external co-curricular activities."
        />
        <Facility
          title="Co-Curricular Activities"
          description="The Students participate in Intercollege Activities, Pool Table Games, Table Tennis, Badminton, Chess, Monopoly and Jenga Classic. We also have religious fellowship groups."
        />
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Opening Hours</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Monday - Friday: 8am - 5pm</li>
          <li>Saturday: 8am - 1pm</li>
          <li>Sunday and Public Holidays: Closed</li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Downloads</h2>
        <ul className="list-disc list-inside space-y-1 text-blue-600">
          <li><a href="#" className="hover:underline">College Brochure</a></li>
          <li><a href="#" className="hover:underline">College Application Form</a></li>
          <li><a href="#" className="hover:underline">Graduation Books</a></li>
          <li><a href="#" className="hover:underline">Service Charter</a></li>
        </ul>
      </section>
    </div>
  );
};

const Facility = ({title, description }) => (
  <div className="bg-white rounded-xl shadow p-6">
    <h3 className="text-xl font-bold mb-2 text-indigo-700">{title}</h3>
    <p className="text-gray-700">{description}</p>
  </div>
  )
}

export default facilitiesdownloads