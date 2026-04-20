import { FC, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useIntlayer } from "react-intlayer";
import TeamPage from "./TeamPage";
import type { AppDispatch, RootState } from "@/store";
import { fetchTeamMembersList } from "@/store/teamMembersSlice";

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
  const dispatch = useDispatch<AppDispatch>();
  const content = useIntlayer("aboutTeamPages");
  const group = "SM";
  const { members: allMembers, loading, initialized } = useSelector(
    (state: RootState) => state.teamMembers,
  );

  const sortByOrder = (list: TeamMember[]) =>
    [...list].sort((a, b) => {
      const orderA = a.order ?? 0;
      const orderB = b.order ?? 0;
      if (orderA !== orderB) return orderA - orderB;
      return a.id.localeCompare(b.id);
    });

  useEffect(() => {
    if (!initialized && !loading) {
      void dispatch(fetchTeamMembersList());
    }
  }, [dispatch, initialized, loading]);

  const members = useMemo(
    () => sortByOrder(allMembers.filter((m) => m.group === group)),
    [allMembers],
  );

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
