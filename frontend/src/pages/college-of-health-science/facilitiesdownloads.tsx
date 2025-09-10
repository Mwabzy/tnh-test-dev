import Heading from "@/components/Heading";
//import { Landmark,SquareLibrary,Microscope,Hotel,BusFront,Medal,Hospital  } from 'lucide-react';
import { Download } from "lucide-react";

const facilitiesData = [
  {
    title: "LECTURE HALLS",
    description:
      "Our lecture halls are spacious enough to maintain COVID-19 physical distancing protocols. For teaching, we use mounted projectors.",
    image:
      "https://img.freepik.com/free-photo/view-modern-classroom-school_23-2150911437.jpg?ga=GA1.1.1264584285.1750757605&semt=ais_items_boosted&w=740",
    openingHours: [
      "Monday - Friday: 8am - 5pm",
      "Saturday: 8am - 1pm",
      "Sundays: Closed",
      "Public Holidays: Closed",
    ],
  },
  {
    title: "SKILLS LABORATORY",
    description:
      "Our labs are equipped with state-of-the-art equipment for students to practice their nursing skills before going to the wards. Various organizations use our labs for practical skill training and examinations.",
    image:
      "https://img.freepik.com/free-photo/african-american-woman-scientist-holding-test-tube-laboratory_839833-8926.jpg?ga=GA1.1.1264584285.1750757605&semt=ais_items_boosted&w=740",
    openingHours: [
      "Monday - Friday: 8am - 5pm",
      "Saturday: 8am - 1pm",
      "Sundays: Closed",
      "Public Holidays: Closed",
    ],
  },
  {
    title: "LIBRARY",
    description:
      "The library is furnished with print and online resources that can be accessed on campus or off-campus through the MYLOFT (My Library On Fingertips) platform. The library collection also includes inspirational resources.",
    image:
      "https://img.freepik.com/free-photo/young-student-working-assignment_23-2149257185.jpg?ga=GA1.1.1264584285.1750757605&semt=ais_items_boosted&w=740",
    openingHours: [
      "Monday - Friday: 8am - 5pm",
      "Saturday: 8am - 1pm",
      "Sundays: Closed",
      "Public Holidays: Closed",
    ],
  },
  {
    title: "HOSTELS",
    description:
      "The college has spacious rooms, reading tables and TV lounges. We offer in-house laundry services at a subsidized cost.",
    image:
      "https://img.freepik.com/free-photo/front-view-young-friends-hostel_23-2150598851.jpg?ga=GA1.1.1264584285.1750757605&semt=ais_items_boosted&w=740",
    openingHours: ["Specified by the matron."],
  },
  {
    title: "CLINICAL PLACEMENTS",
    description:
      "Students are assigned to The Nairobi Hospital including the Outpatient Centers, Kenyatta National Hospital, Mathari Teaching & Referral Hospital and Nairobi County health centers.",
    image:
      "https://victormatara.com/wp-content/uploads/2021/09/Nairobi-Hospital-School-of-Nursing-Fees-Structure.jpeg",
    openingHours: ["January - April", "May - August", "September - December"],
  },
  {
    title: "COLLEGE BUSES",
    description:
      "There are two college buses that offer students convenient transportation to external clinical locations and external co-curricular activities.",
    image:
      "https://img.freepik.com/premium-photo/portrait-happy-young-african-american-travel-man-with-bag-getting-off-bus_33839-15702.jpg?ga=GA1.1.1264584285.1750757605&semt=ais_items_boosted&w=740",
    openingHours: ["N/A"],
  },
  {
    title: "CO-CURRICULAR ACTIVITIES",
    description:
      "The Students participate in Intercollege Activities, Pool Table Games, Table Tennis, Badminton, Chess, Monopoly and Jenga Classic. We also have religious fellowship groups.",
    image:
      "https://img.freepik.com/free-photo/people-spending-time-together-experiencing-time-expansion_23-2151338321.jpg?ga=GA1.1.1264584285.1750757605&semt=ais_items_boosted&w=740",
    openingHours: ["Wednesdays: 5pm - 7pm"],
  },
];

const downloads = [
  {
    title: "College Brochure",
    file: "https://cms.thenairobihosp.org/uploads/College_of_Health_Sciences_Brochure_1_ff54436d35.pdf?updated_at=2024-07-30T12:59:27.797Z",
  },
  {
    title: "College Application Form",
    file: "https://cms.thenairobihosp.org/uploads/APPLICATION_FORM_REVISED_SEPT_2022_9e06fac6a9.pdf?updated_at=2022-09-20T09:55:23.875Z",
  },
  {
    title: "Graduation Books",
    file: "https://azsnsgdevsa.blob.core.windows.net/dev/NHPROJECT/GRADUATION-BOOK-CLASS-OF-2020.pdf",
  },
  {
    title: "Service Charter",
    file: "https://cms.thenairobihosp.org/uploads/School_of_Nursing_Service_Delivery_Charter_2024_final_A_582fcb15c7.PDF?updated_at=2024-08-21T11:13:48.677Z",
  },
];

const Facilitiesdownloads = () => {
  return (
    <>
      <Heading
        image_url="https://lh3.googleusercontent.com/aida-public/AB6AXuBCBXUN1JxBmGMt8j6gJYC7YdQjw94pMuRi4rHhD-ruDxkZ5WVj7Da-q34shVdYoC0FvSgUFRU3hAyjy7uaSvsYrtZvR3S5plT67Y7c7USNMfg-qW7PCuhvGXktJWWWNg5MenYv3lW8rNRtUudE6iXkLwq9YnPURXb-f1J6Mrnk2uoBUqQ9Hj4YGucKbOmR9eMRWqcTvmsxt70nahOEjx-8PXEMjxq37qSUL-rZfDi6wRKx00r7LZMOqALWasn4JIrww1Y8bB9w7Auf"
        title="College of Health Sciences"
        description="Facilities Overview "
        style="image"
      />
      <div className="bg-gray-50 text-gray-800  md:p-12 ">
        <div className="bg-white py-9 px-4 mx-[10%] md:px-10 lg:px-24">
          <div className="text-center mb-16 pl-5 flex flex-col items-center">
            <h1 className="text-4xl text-left font-bold text-red-800 mb-2 mt-4 font-serif">
              FACILITIES
            </h1>
            <p className="text-gray-700 max-w-5xl text-left mb-2">
              Cicely McDowell College of Health Sciences provides modern
              classrooms, clinical skills labs, on-campus housing and
              recreational facilities. Students gain hands-on experience through
              clinical placements at The Nairobi Hospital and partner centers,
              supported by accreditation and financial aid options.
            </p>
          </div>
          <div className="space-y-12 ">
            {facilitiesData.map((item, index) => (
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
                <div className="md:w-1/3 ml-3 p-4">
                  <h3 className="text-xl font-semibold text-red-900 font-serif">
                    {item.title}{" "}
                  </h3>
                  <p className="mt-2 text-gray-600 text-sm md:text-base">
                    {item.description}
                  </p>
                </div>

                <div className="ml-3 pl-4 mb-4">
                  {item.openingHours && (
                    <div className="mt-2 text-gray-600 text-sm md:text-base">
                      <strong>Timings:</strong>

                      {item.openingHours.map((time, idx) => (
                        <ul className="list-disc list-inside space-y-1">
                          <li key={idx}>{time}</li>
                        </ul>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <section className="flex flex-col items-center mt-12 gap-4 text-center">
          <h2 className="text-3xl font-semibold text-red-900 mb-4">
            Downloads
          </h2>
          <div className="flex flex-col md:flex-row gap-8 text-gray-800">
            {downloads.map((item, index) => (
              <a
                key={index}
                href={item.file}
                target="_blank"
                //download
                className="flex items-center gap-2 hover:bg-yellow-500 hover:text-white cursor-pointer border-2 rounded-2xl border-red-900 p-2"
              >
                <span className="text-lg">{item.title}</span>
                <Download />
              </a>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Facilitiesdownloads;
