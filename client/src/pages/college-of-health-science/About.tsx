import ContactForm from "@/components/ContactForm";
import Heading from "@/components/Heading";

const historyData = [
  {
    year: "1956",
    title: "Founding of the College",
    description:
      "Founded by the Kenya Hospital Association, the college is named after Sister Cicely McDonell, who made an immense contribution to the welfare and health of Kenyans. She set high professional standards in all her work and spent most of her life doing Maternity Nursing in Nairobi.",
    image:
      "https://kampusville.com/wp-content/uploads/2024/03/Cicely-McDonell-College-of-Health-Sciences.jpg",
  },
  {
    year: "1962",
    title: "First African Students Admitted",
    description:
      "Initially, the college admitted only five white students. In 1962, African student nurses were first enrolled, marking a turning point in inclusive training.",
    image:
      "https://victormatara.com/wp-content/uploads/2021/09/Nairobi-Hospital-School-of-Nursing-Fees-Structure.jpeg",
  },
  {
    year: "Today",
    title: "Modern Accreditation",
    description:
      "The College is accredited by the Nursing Council of Kenya (NCK) and the Technical and Vocational Education and Training Authority (TVETA) for the highest standards in Nursing. Students from East Africa, West Africa and South Africa all train at the college with its current population at 282 students. Upon successful completion of the course and passing an interview, students are eligible for employment at The Nairobi Hospital.",
    image: "https://pbs.twimg.com/media/F_w6HHfWgAAKvn7.jpg:large",
  },
];

export default function AboutCollege() {
  return (
    <>
      <Heading
        image_url="https://lh3.googleusercontent.com/aida-public/AB6AXuBCBXUN1JxBmGMt8j6gJYC7YdQjw94pMuRi4rHhD-ruDxkZ5WVj7Da-q34shVdYoC0FvSgUFRU3hAyjy7uaSvsYrtZvR3S5plT67Y7c7USNMfg-qW7PCuhvGXktJWWWNg5MenYv3lW8rNRtUudE6iXkLwq9YnPURXb-f1J6Mrnk2uoBUqQ9Hj4YGucKbOmR9eMRWqcTvmsxt70nahOEjx-8PXEMjxq37qSUL-rZfDi6wRKx00r7LZMOqALWasn4JIrww1Y8bB9w7Auf"
        title="About the College"
        description=" Inspiring generations of healthcare professionals since 1956."
        style="image"
      />
      <div className="bg-white py-9 px-4 mx-[10%] md:px-10 lg:px-24">
        <div className="text-center mb-16 pl-5 flex flex-col items-center">
          <h1 className="text-4xl text-left font-bold text-red-700 mb-2 mt-4 font-serif">
            Our History
          </h1>
          <p className="text-gray-700 max-w-5xl text-left mb-2">
            Cicely McDonell College of Health Sciences, established in 1956, is
            dedicated to providing top-tier nursing education and training
            healthcare professionals committed to excellence and compassionate
            care.
          </p>
        </div>

        <div className="space-y-12">
          {historyData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row md:items-center bg-gray-50 rounded-2xl shadow-sm overflow-hidden"
            >
              <div className="md:w-1/3 h-64 md:h-full">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-2/3 p-6">
                <h3 className="text-xl font-semibold text-red-900 font-serif">
                  {item.title}{" "}
                  <span className="text-sm text-gray-500">({item.year})</span>
                </h3>
                <p className="mt-2 text-gray-600 text-sm md:text-base">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="border-2 max-w-7xl shadow-xl my-8 mx-4 p-4 rounded-md md:mx-auto text-gray-800">
        <ContactForm contactInfo={{ phone: "+254 703 082 000" }} title={"Have any enquiries?"}  />
      </div>
    </>
  );
}
