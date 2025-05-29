import { teamMembers } from "./SeniorManagement";
import { useParams } from "react-router";

// export interface TeamMember {
//   id: string;
//   name: string;
//   title: string;
//   image: string;
//   description: string[];
// }

// interface MemberPageProps {
//   teamMembers: TeamMember[];
// }

const MemberPage = () => {
  const { id } = useParams();

  const user = teamMembers.find((person) => person.id === id)!;

  return (
    <>
      <div className="bg-white text-gray-800 font-sans p-6 max-w-5xl mx-auto">
        {user && (
          <>
            <div>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-48 h-60 object-cover rounded-xl shadow-md"
                />
                <div className="flex-1">
                  <h1 className="text-4xl font-bold text-gray-900">
                    {user.name}
                  </h1>
                  <p className="text-lg text-gray-600 mt-2">{user.title}</p>
                  <p className="mt-4 text-gray-700 max-w-xl">
                    {user.description[0]}
                  </p>

                  <div className="mt-4">
                    <p>
                      <span className="font-semibold">Email:</span>{" "}
                      <a
                        href="mailto:emilysmith@example.com"
                        className="text-blue-600 font-medium"
                      >
                        hi@nbihosp.org
                      </a>
                    </p>
                    <p>
                      <span className="font-semibold">Phone:</span>{" "}
                      <a
                        href="tel:+22001110206"
                        className="text-blue-600 font-medium"
                      >
                        020 0000000
                      </a>
                    </p>
                  </div>

                  <div className="mt-4 flex space-x-4 text-xl text-gray-600">
                    <a href="#">
                      <i className="fab fa-facebook-square hover:text-blue-600"></i>
                    </a>
                    <a href="#">
                      <i className="fab fa-instagram hover:text-pink-500"></i>
                    </a>
                    <a href="#">
                      <i className="fab fa-linkedin hover:text-blue-700"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h2 className="text-3xl font-semibold text-gray-900 mb-4">
                  About {user.name}
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  {user.description.slice(1).map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MemberPage;
