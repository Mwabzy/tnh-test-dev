import { FC, useState, useEffect } from "react";
import { useIntlayer } from "react-intlayer";
import TeamPage from "./TeamPage";
import { fetchTeamMembers } from "@/api/api";

type TeamPageProps = {
  title: string;
  description: string;
  members: TeamMember[];
};

// type TeamMember = {
//   name: string;
//   id: string;
//   title: string;
//   image: string;
//   description: string[];
// };

type TeamMember = {
  id: string;
  name: string;
  role: string;
  image: string;
  description: string;
  group: string;
  order?: number;
};


const SeniorManagement: FC<TeamPageProps> = () => {
  const content = useIntlayer("aboutTeamPages");
  const group = "SM";
  const [_loading, setLoading] = useState(true);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [_error, setError] = useState<string | null>(null);

  const sortByOrder = (list: TeamMember[]) =>
    [...list].sort((a, b) => {
      const orderA = a.order ?? 0;
      const orderB = b.order ?? 0;
      if (orderA !== orderB) return orderA - orderB;
      return a.id.localeCompare(b.id);
    });

  useEffect(() => {
    async function loadMembers() {
      setLoading(true);
      try {
        const data: TeamMember[] = await fetchTeamMembers();
        const filtered = data.filter((m: TeamMember) => m.group === group);
        setMembers(sortByOrder(filtered));
        setError(null);
      } catch (err: any) {
        setError(err.message || "Error loading team members");
      } finally {
        setLoading(false);
      }
    }
    loadMembers();
  }, [group]);

  return (
    <>
      {/* <NavigationTabs /> */}
      <TeamPage
        title={content.seniorManagementTitle[0]?.value ?? ""}
        description={content.seniorManagementDescription[0]?.value ?? ""}
        members={members}
      />
    </>
  );
};

export default SeniorManagement;
