
const alumni = [
  {
    name: 'Dr. Alice Wanjiru',
    title: 'Cardiologist, Nairobi Hospital',
    image: 'https://img.freepik.com/free-photo/close-up-beautiful-health-worker-portrait_23-2148814229.jpg?ga=GA1.1.177601034.1749482028&semt=ais_hybrid&w=740',
    bio: 'Class of 2012. Leading innovations in heart health across East Africa.',
  },
  {
    name: 'Prof. John Odhiambo',
    title: 'Dean, School of Medicine, Kenyatta University',
    image: 'https://img.freepik.com/free-photo/male-black-doctor-with-protective-face-mask-working-clinic-looking-camera_637285-11465.jpg?ga=GA1.1.177601034.1749482028&semt=ais_hybrid&w=740',
    bio: 'Class of 2005. Passionate educator and researcher in public health.',
  },
  {
    name: 'Dr. Grace Mutheu',
    title: 'Global Health Fellow, WHO',
    image: 'https://img.freepik.com/free-photo/close-up-doctor-wearing-coat_23-2148814227.jpg?ga=GA1.1.177601034.1749482028&semt=ais_hybrid&w=740',
    bio: 'Class of 2016. Focused on global infectious disease response.',
  },
];

export default function AlumniSection() {
  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-20">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-red-800 mb-4">Distinguished Alumni</h2>
        <p className="text-gray-600 text-lg mb-10">
          Celebrating our graduates who are transforming healthcare around the world.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {alumni.map((person, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300"
            >
              <img
                src={person.image}
                alt={person.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-red-900">{person.name}</h3>
              <p className="text-sm text-gray-500">{person.title}</p>
              <p className="mt-2 text-gray-700 text-sm">{person.bio}</p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <a
            href="/alumni/register"
            className="inline-block bg-red-800 text-white px-6 py-3 rounded-full shadow hover:bg-red-900 transition"
          >
            Join Our Alumni Network
          </a>
        </div>
      </div>
    </section>
  );
}
