// import { teamMembers } from "./SeniorManagement";
import { useParams } from "react-router";
import { FC, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DOMPurify from "dompurify";
import { addClassesToDescription } from "@/components/services/utilities";
import type { AppDispatch, RootState } from "@/store";
import {
  fetchTeamMemberEntry,
  fetchTeamMembersList,
} from "@/store/teamMembersSlice";

// export interface TeamMember {
//   id: string;
//   name: string;
//   title: string;
//   image: string;
//   description: string[];
// }

type TeamMember = {
  id: string;
  name: string;
  role: string;
  image: string;
  description: string;
  group: string;
};

interface MemberPageProps {
  teamMembers: TeamMember[];
}

const MemberPage: FC<MemberPageProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const { members, loading, initialized } = useSelector(
    (state: RootState) => state.teamMembers,
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!initialized && !loading) {
      void dispatch(fetchTeamMembersList());
    }
  }, [dispatch, initialized, loading]);

  useEffect(() => {
    if (!id) return;
    const existing = members.find((person) => person.id === id);
    if (!existing) {
      void dispatch(fetchTeamMemberEntry(id))
        .unwrap()
        .then(() => setError(null))
        .catch(() => setError("Error loading team member"));
    } else {
      setError(null);
    }
  }, [dispatch, id, members]);

  const user = useMemo(
    () => members.find((person) => person.id === id),
    [id, members],
  );

  return (
    <>
      <div className="bg-white text-gray-800 font-sans p-6 max-w-5xl mx-auto">
        {loading && !user ? (
          <p>Loading...</p>
        ) : error || !user ? (
          <p className="text-red-600">{error || "Member not found."}</p>
        ) : (
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
                  <p className="text-lg text-gray-600 mt-2">{user.role}</p>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        addClassesToDescription(user.description) ?? "",
                      ),
                    }}
                    className="mt-4 prose prose-gray max-w-xl text-gray-700 leading-relaxed prose-ul:list-disc prose-ol:list-decimal prose-ul:pl-6 prose-ol:pl-6"
                  ></div>

                  {/* <div className="mt-4">
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
                  </div> */}

                  {/* <div className="mt-4 flex space-x-4 text-xl text-gray-600">
                    <a href="#">
                      <i className="fab fa-facebook-square hover:text-blue-600"></i>
                    </a>
                    <a href="#">
                      <i className="fab fa-instagram hover:text-pink-500"></i>
                    </a>
                    <a href="#">
                      <i className="fab fa-linkedin hover:text-blue-700"></i>
                    </a>
                  </div> */}
                </div>
              </div>

              {/* <div className="mt-12">
                <h2 className="text-3xl font-semibold text-gray-900 mb-4">
                  About {user.name}
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  {user.description.slice(1).map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div> */}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MemberPage;
