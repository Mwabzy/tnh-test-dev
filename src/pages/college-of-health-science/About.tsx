import React from "react";

const historyData = [
  {
    year: "1956",
    title: "Founding of the College",
    description:
      "Founded by the Kenya Hospital Association, the college is named after Sister Cicely McDonell, who made an immense contribution to the welfare and health of Kenyans.",
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
      "The college is accredited by NCK and TVETA. Students from across Africa are trained here. The college hosts 282 students and provides a path to employment at The Nairobi Hospital.",
    image: "https://pbs.twimg.com/media/F_w6HHfWgAAKvn7.jpg:large",
  },
];

export default function AboutCollege() {
  return (
    <div className="bg-white py-9 px-4 md:px-10 lg:px-24">
      <div className="@container">
        <div className="@[480px]:p-4">
          <div
            className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-lg items-center justify-center p-4"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuBCBXUN1JxBmGMt8j6gJYC7YdQjw94pMuRi4rHhD-ruDxkZ5WVj7Da-q34shVdYoC0FvSgUFRU3hAyjy7uaSvsYrtZvR3S5plT67Y7c7USNMfg-qW7PCuhvGXktJWWWNg5MenYv3lW8rNRtUudE6iXkLwq9YnPURXb-f1J6Mrnk2uoBUqQ9Hj4YGucKbOmR9eMRWqcTvmsxt70nahOEjx-8PXEMjxq37qSUL-rZfDi6wRKx00r7LZMOqALWasn4JIrww1Y8bB9w7Auf')",
            }}
          >
            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-white text-4xl font-black py-1.5 leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                About Cicely McDonell College <br />
                Of Health Sciences
              </h1>
              <h2 className="text-white text-sm font-normal py-1.5 leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                Cicely McDonell College of Health Sciences, established in 1956,
                is dedicated to providing top-tier nursing education and <br />
                training healthcare professionals committed to excellence and
                compassionate care.
              </h2>
            </div>
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-red-900 text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]">
              <span className="truncate">Explore Our Campus</span>
            </button>
          </div>
        </div>
      </div>

      <div className="text-center mb-16 pl-5">
        <h1 className="text-4xl text-left font-bold text-gray-700 mb-2 mt-4">
          Our History
        </h1>
        <p className="text-gray-700 max-w-2xl text-left font-bold mb-2">
          Inspiring generations of healthcare professionals since 1956
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
              <h3 className="text-xl font-semibold text-gray-900">
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
  );
}
