import Heading from "@/components/Heading";
//import { Landmark,SquareLibrary,Microscope,Hotel,BusFront,Medal,Hospital  } from 'lucide-react'; 
import { Download } from 'lucide-react';


import { ReactNode } from "react";

interface FacilityProps {
  title: string;
  description: string;
  icon: ReactNode;
}
const historyData = [
  {
    
    title: "LECTURE HALLS",
    description:
      "Our lecture halls are spacious enough to maintain COVID-19 physical distancing protocols. For teaching, we use mounted projectors.",
    image:
      "https://kampusville.com/wp-content/uploads/2024/03/Cicely-McDonell-College-of-Health-Sciences.jpg",
  },
   {
    
    title: "SKILLS LABORATORY",
    description:
      "Our labs are equipped with state-of-the-art equipment for students to practice their nursing skills before going to the wards. Various organizations use our labs for practical skill training and examinations.",
    image:
      "https://kampusville.com/wp-content/uploads/2024/03/Cicely-McDonell-College-of-Health-Sciences.jpg",
  },
   {
    
    title: "LIBRARY",
    description:
      "The library is furnished with print and online resources that can be accessed on campus or off-campus through the MYLOFT (My Library On Fingertips) platform. The library collection also includes inspirational resources.",
    image:
      "https://kampusville.com/wp-content/uploads/2024/03/Cicely-McDonell-College-of-Health-Sciences.jpg",
      openingHours:["Monday - Friday: 8am - 5pm", "Saturday: 8am - 1pm", "Sunday and Public Holidays: Closed"],
  },
   {
    
    title: "HOSTELS",
    description:
      "The college has spacious rooms, reading tables and TV lounges. We offer in-house laundry services at a subsidized cost.",
    image:
      "https://kampusville.com/wp-content/uploads/2024/03/Cicely-McDonell-College-of-Health-Sciences.jpg",
  },
  {
    
    title: "CLINICAL PLACEMENTS",
    description:
      "Students are assigned to The Nairobi Hospital including the Outpatient Centers, Kenyatta National Hospital, Mathari Teaching & Referral Hospital and Nairobi County health centers.",
    image:
      "https://victormatara.com/wp-content/uploads/2021/09/Nairobi-Hospital-School-of-Nursing-Fees-Structure.jpeg",
  },
  {
    
    title: "COLLEGE BUSES",
    description:
      "There are two college buses that offer students convenient transportation to external clinical locations and external co-curricular activities.",
    image: "https://pbs.twimg.com/media/F_w6HHfWgAAKvn7.jpg:large",
  },
   {
    
    title: "CO-CURRICULAR ACTIVITIES",
    description:
      "The Students participate in Intercollege Activities, Pool Table Games, Table Tennis, Badminton, Chess, Monopoly and Jenga Classic. We also have religious fellowship groups.",
    image:
      "https://kampusville.com/wp-content/uploads/2024/03/Cicely-McDonell-College-of-Health-Sciences.jpg",
  },
];

const Facilitiesdownloads = () => {
  return (
      <><Heading
      image_url="https://lh3.googleusercontent.com/aida-public/AB6AXuBCBXUN1JxBmGMt8j6gJYC7YdQjw94pMuRi4rHhD-ruDxkZ5WVj7Da-q34shVdYoC0FvSgUFRU3hAyjy7uaSvsYrtZvR3S5plT67Y7c7USNMfg-qW7PCuhvGXktJWWWNg5MenYv3lW8rNRtUudE6iXkLwq9YnPURXb-f1J6Mrnk2uoBUqQ9Hj4YGucKbOmR9eMRWqcTvmsxt70nahOEjx-8PXEMjxq37qSUL-rZfDi6wRKx00r7LZMOqALWasn4JIrww1Y8bB9w7Auf"
      title="College of Health Sciences"
      description="Facilities Overview "
      style="image" /><div className="bg-gray-50 text-gray-800 p-6 md:p-12 ">
          {/* <section className="grid md:grid-cols-2 gap-8">
            <Facility
              title="Lecture Halls"
              description="Our lecture halls are spacious enough to maintain COVID-19 physical distancing protocols. For teaching, we use mounted projectors." 
                 icon={<Landmark className="w-5 h-5 text-indigo-700" />}
              />
            
            <Facility
              title="Skills Laboratory"
              description="Our labs are equipped with state-of-the-art equipment for students to practice their nursing skills before going to the wards. Various organizations use our labs for practical skill training and examinations."
               icon={<Microscope className="w-5 h-5 text-indigo-700" />}
              />
            <Facility
              title="Library"
              description="The library is furnished with print and online resources that can be accessed on campus or off-campus through the MYLOFT (My Library On Fingertips) platform. The library collection also includes inspirational resources." 
               icon={<SquareLibrary className="w-5 h-5 text-indigo-700" />}
              />
              
            <Facility
              title="Hostels"
              description="The college has spacious rooms, reading tables and TV lounges. We offer in-house laundry services at a subsidized cost."
               icon={<Hotel className="w-5 h-5 text-indigo-700" />}
              />
            
            <Facility
              title="Clinical Placements"
              description="Students are assigned to The Nairobi Hospital including the Outpatient Centers, Kenyatta National Hospital, Mathari Teaching & Referral Hospital and Nairobi County health centers." 
               icon={< Hospital  className="w-5 h-5 text-indigo-700" />}
            
            />
            <Facility
              title="College Buses"
              description="There are two college buses that offer students convenient transportation to external clinical locations and external co-curricular activities." 
               icon={<BusFront className="w-5 h-5 text-indigo-700" />}
             
             />
            <Facility
              title="Co-Curricular Activities"
              description="The Students participate in Intercollege Activities, Pool Table Games, Table Tennis, Badminton, Chess, Monopoly and Jenga Classic. We also have religious fellowship groups." 
               icon={<Medal className="w-5 h-5 text-indigo-700" />}
           
            />
          </section>  */}

            <div className="bg-white py-9 px-4 mx-[10%] md:px-10 lg:px-24">
        <div className="text-center mb-16 pl-5 flex flex-col items-center">
          <h1 className="text-4xl text-left font-bold text-red-700 mb-2 mt-4 font-serif">
            FACILITIES
          </h1>
          <p className="text-gray-700 max-w-5xl text-left mb-2">
            Cicely McDonell College of Health Sciences, established in 1956, is
            dedicated to providing top-tier nursing education and training
            healthcare professionals committed to excellence and compassionate
            care.
          </p>
        </div>
          <div className="space-y-12 ">
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
              <div className="md:w-2/3 p-8 w-lg">
                <h3 className="text-xl font-semibold text-red-900 font-serif">
                  {item.title}{" "}
                
                </h3>
                <p className="mt-2 text-gray-600 text-sm md:text-base">
                  {item.description}
                </p>
              </div>

              <div>
                {item.openingHours && (
                  <div className="mt-2 text-gray-600 text-sm md:text-base">
                    <strong>Opening Hours:</strong>
                   
                      {item.openingHours.map((hour, idx) => (
                         <ul className="list-disc list-inside space-y-1">
                        <li key={idx}>{hour}</li>
                        </ul>
                      ))}
                    
                  </div>
                )}

              </div>
            </div>

          ))}
        </div>
      </div>

          <section className="mt-12">

            <h2 className="text-2xl font-semibold text-red-900 mb-4">
              Opening Hours
            </h2>
             <div className="mb-8 shadow-lg rounded-lg p-6 bg-white">
              <h3 className="text-md font-semibold mb-4 text-red-900">
                Program Details
              </h3>
              <ul className="text-sm space-y-2">
                <li className="grid grid-cols-2 border-b py-2">
                  <span>Lecture Halls</span>
                  <span className="text-gray-700">
                     <ul className="list-disc list-inside space-y-1 text align-middle">
                       <li>Monday - Friday: 8am - 5pm</li>
                       <li>Saturday: 8am - 1pm</li>
                        <li>Sunday and Public Holidays: Closed</li>
                    </ul>
                    
                  </span>
                </li>

                <li className="grid grid-cols-2 border-b py-2">
                  <span>Skills Laboratory</span>
                  <span className="text-gray-700">
                      <ul className="list-disc list-inside space-y-1 text align-middle">
                       <li>Monday - Friday: 8am - 5pm</li>
                       <li>Saturday: 8am - 1pm</li>
                        <li>Sunday and Public Holidays: Closed</li>
                    </ul>
                    Twice a year in April & September
                  </span>
                </li>
                <li className="grid grid-cols-2 border-b py-2">
                  <span>Library</span>
                  <span className="text-gray-700">
                      <ul className="list-disc list-inside space-y-1 text align-middle">
                       <li>Monday - Friday: 8am - 5pm</li>
                       <li>Saturday: 8am - 1pm</li>
                        <li>Sunday and Public Holidays: Closed</li>
                    </ul>
                    40 students per intake
                    </span>
                </li>
                <li className="grid grid-cols-2 border-b py-2">
                  <span>Hostels</span>
                  <span className="text-gray-700">
                      <ul className="list-disc list-inside space-y-1 text align-middle">
                       <li>Monday - Friday: 8am - 5pm</li>
                       <li>Saturday: 8am - 1pm</li>
                        <li>Sunday and Public Holidays: Closed</li>
                    </ul>
                    Ksh 199,000
                    </span>
                  </li>
                 <li className="grid grid-cols-2 border-b py-2">
                  <span>Clinical Placements</span>
                  <span className="text-gray-700">
                      <ul className="list-disc list-inside space-y-1 text align-middle">
                       <li>Monday - Friday: 8am - 5pm</li>
                       <li>Saturday: 8am - 1pm</li>
                        <li>Sunday and Public Holidays: Closed</li>
                    </ul>
                    Twice a year in April & September
                  </span>
                </li>
                 <li className="grid grid-cols-2 border-b py-2">
                  <span>College Buses</span>
                  <span className="text-gray-700">
                     <ul className="list-disc list-inside space-y-1 text align-middle">
                       <li>Monday - Friday: 8am - 5pm</li>
                       <li>Saturday: 8am - 1pm</li>
                        <li>Sunday and Public Holidays: Closed</li>
                    </ul>
                    Twice a year in April & September
                  </span>
                </li>
                 <li className="grid grid-cols-2 border-b py-2">
                  <span>Co-Curricular Activities</span>
                  <span className="text-gray-700">
                      <ul className="list-disc list-inside space-y-1 text align-middle">
                       <li>Monday - Friday: 8am - 5pm</li>
                       <li>Saturday: 8am - 1pm</li>
                        <li>Sunday and Public Holidays: Closed</li>
                    </ul>
                    Twice a year in April & September
                  </span>
                </li>
              </ul>
            </div>
          </section>
       
          <section className="flex flex-col items-center mt-12 gap-4 text-center">
            <h2 className="text-2xl text-center font-semibold text-red-900 mb-4">
              Downloads
            </h2>
            <div className="flex gap-8 text-gray-800">
              <span>
                <a href="#" className="hover:underline">
                  College Brochure
                </a>
              </span>
              <span>
                <a href="#" className="hover:underline">
                  College Application Form
                </a>
              </span>
              <span>
                <a href="#" className="hover:underline">
                  Graduation Books
                </a>
              </span>
              <span>
                <a href="#" className="hover:underline">
                  Service Charter
                </a>
              </span>
            </div>
          </section>
          
        </div>
      </>
  );
};
// const Facility: React.FC<FacilityProps> = ({ icon, title, description,  }) => (
//   <div className="bg-white rounded-xl shadow-xl p-6">
//     <div className="flex items-center space-x-2 mb-3">
//       {icon}
//       <h3 className="text-xl font-bold text-red-900">{title}</h3>
//     </div>
//     <p className="text-gray-700">{description}</p>
//   </div>
// );


export default Facilitiesdownloads;
