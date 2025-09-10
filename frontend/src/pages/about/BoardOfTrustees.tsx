
import { FC } from "react";
import TeamPage from "./TeamPage";

type TeamPageProps = {
  title: string;
  description: string;
  members: TeamMember[];
};

type TeamMember = {
  name: string;
  title: string;
  image: string;
  id: string;
  description?: string[];
};

export const teamMembers: TeamMember[] = [
  {
    name: "Prof. Githu Muigai",
    title: "Trustee Member",
    id: "githu-muigai",
    image:
      "https://cms.thenairobihosp.org/uploads/Prof_Githu_Muigai_Senior_Counsel_63b852fa65.png",
    description: [
      "Team members play an essential role in advancing healthcare and effective management practices across a variety of settings. Their work supports individual and organizational well-being, contributing to better outcomes in areas such as clinical services, administration, education, and research.",
      "With expertise in areas like behavioral strategies, process improvement, and program development, team members help drive innovation in healthcare delivery and organizational effectiveness. Many are involved in research that explores the integration of technology to enhance services and streamline operations.",
      "In addition to their core responsibilities, team members lead training sessions and workshops on topics such as stress reduction, workplace resilience, leadership development, and team dynamics. These efforts promote a culture of continuous improvement and support within healthcare and organizational environments.",
      "At The Nairobi Hospital, the team includes experienced professionals who collaborate to provide high-quality services and operational leadership. Their approach is rooted in empathy, strategic thinking, and evidence-based methods that empower both individuals and teams.",
      "Beyond daily operations, team members mentor emerging professionals and contribute to shaping the future of healthcare and management. They are committed to expanding access to effective tools and resources, fostering a more efficient, responsive, and inclusive system.",
    ],
  },
  {
    name: "Dr. Richard Baraza",
    title: "Trustee Member",
    id: "richard-baraza",
    image:
      "https://cms.thenairobihosp.org/uploads/Dr_Richard_Baraza_Consultant_General_Surgeon_4400eb3fcb.png",
    description: [
      "Team members play an essential role in advancing healthcare and effective management practices across a variety of settings. Their work supports individual and organizational well-being, contributing to better outcomes in areas such as clinical services, administration, education, and research.",
      "With expertise in areas like behavioral strategies, process improvement, and program development, team members help drive innovation in healthcare delivery and organizational effectiveness. Many are involved in research that explores the integration of technology to enhance services and streamline operations.",
      "In addition to their core responsibilities, team members lead training sessions and workshops on topics such as stress reduction, workplace resilience, leadership development, and team dynamics. These efforts promote a culture of continuous improvement and support within healthcare and organizational environments.",
      "At The Nairobi Hospital, the team includes experienced professionals who collaborate to provide high-quality services and operational leadership. Their approach is rooted in empathy, strategic thinking, and evidence-based methods that empower both individuals and teams.",
      "Beyond daily operations, team members mentor emerging professionals and contribute to shaping the future of healthcare and management. They are committed to expanding access to effective tools and resources, fostering a more efficient, responsive, and inclusive system.",
    ],
  },
  {
    name: "Dr. Jane Nyakang'o",
    title: "Trustee Member",
    id: "jane-nyakango",
    image:
      "https://cms.thenairobihosp.org/uploads/Dr_Jane_Nyakang_o_Environmental_and_Social_Safeguards_Specialist_f5801dcbe5.png",
    description: [
      "Team members play an essential role in advancing healthcare and effective management practices across a variety of settings. Their work supports individual and organizational well-being, contributing to better outcomes in areas such as clinical services, administration, education, and research.",
      "With expertise in areas like behavioral strategies, process improvement, and program development, team members help drive innovation in healthcare delivery and organizational effectiveness. Many are involved in research that explores the integration of technology to enhance services and streamline operations.",
      "In addition to their core responsibilities, team members lead training sessions and workshops on topics such as stress reduction, workplace resilience, leadership development, and team dynamics. These efforts promote a culture of continuous improvement and support within healthcare and organizational environments.",
      "At The Nairobi Hospital, the team includes experienced professionals who collaborate to provide high-quality services and operational leadership. Their approach is rooted in empathy, strategic thinking, and evidence-based methods that empower both individuals and teams.",
      "Beyond daily operations, team members mentor emerging professionals and contribute to shaping the future of healthcare and management. They are committed to expanding access to effective tools and resources, fostering a more efficient, responsive, and inclusive system.",
    ],
  },
  {
    name: "Mrs. Cecilia Ngalyuka",
    title: "Trustee Member",
    id: "cecilia-ngalyuka",
    image: "https://cms.thenairobihosp.org/uploads/gladwell_bcb00de3c7.jpg",
    description: [
      "Team members play an essential role in advancing healthcare and effective management practices across a variety of settings. Their work supports individual and organizational well-being, contributing to better outcomes in areas such as clinical services, administration, education, and research.",
      "With expertise in areas like behavioral strategies, process improvement, and program development, team members help drive innovation in healthcare delivery and organizational effectiveness. Many are involved in research that explores the integration of technology to enhance services and streamline operations.",
      "In addition to their core responsibilities, team members lead training sessions and workshops on topics such as stress reduction, workplace resilience, leadership development, and team dynamics. These efforts promote a culture of continuous improvement and support within healthcare and organizational environments.",
      "At The Nairobi Hospital, the team includes experienced professionals who collaborate to provide high-quality services and operational leadership. Their approach is rooted in empathy, strategic thinking, and evidence-based methods that empower both individuals and teams.",
      "Beyond daily operations, team members mentor emerging professionals and contribute to shaping the future of healthcare and management. They are committed to expanding access to effective tools and resources, fostering a more efficient, responsive, and inclusive system.",
    ],
  },
  {
    name: "Dr. Meshach Ong'uti",
    title: "Trustee Member",
    id: "meshach-onguti",
    image:
      "https://cms.thenairobihosp.org/uploads/Dr_Meshach_Onguti_Consultant_Specialist_Reconstructive_Maxillofacial_and_Craniofacial_Surgeon_82ee2f698a.jpg",
    description: [
      "Team members play an essential role in advancing healthcare and effective management practices across a variety of settings. Their work supports individual and organizational well-being, contributing to better outcomes in areas such as clinical services, administration, education, and research.",
      "With expertise in areas like behavioral strategies, process improvement, and program development, team members help drive innovation in healthcare delivery and organizational effectiveness. Many are involved in research that explores the integration of technology to enhance services and streamline operations.",
      "In addition to their core responsibilities, team members lead training sessions and workshops on topics such as stress reduction, workplace resilience, leadership development, and team dynamics. These efforts promote a culture of continuous improvement and support within healthcare and organizational environments.",
      "At The Nairobi Hospital, the team includes experienced professionals who collaborate to provide high-quality services and operational leadership. Their approach is rooted in empathy, strategic thinking, and evidence-based methods that empower both individuals and teams.",
      "Beyond daily operations, team members mentor emerging professionals and contribute to shaping the future of healthcare and management. They are committed to expanding access to effective tools and resources, fostering a more efficient, responsive, and inclusive system.",
    ],
  },
  {
    name: "Prof. Donald Orinda",
    title: "Trustee Member",
    id: "donald-orinda",
    image:
      "https://cms.thenairobihosp.org/uploads/Prof_Donald_Orinda_Professor_of_Clinical_and_Chemical_Pathology_e7c18d2780.jpg",
    description: [
      "Team members play an essential role in advancing healthcare and effective management practices across a variety of settings. Their work supports individual and organizational well-being, contributing to better outcomes in areas such as clinical services, administration, education, and research.",
      "With expertise in areas like behavioral strategies, process improvement, and program development, team members help drive innovation in healthcare delivery and organizational effectiveness. Many are involved in research that explores the integration of technology to enhance services and streamline operations.",
      "In addition to their core responsibilities, team members lead training sessions and workshops on topics such as stress reduction, workplace resilience, leadership development, and team dynamics. These efforts promote a culture of continuous improvement and support within healthcare and organizational environments.",
      "At The Nairobi Hospital, the team includes experienced professionals who collaborate to provide high-quality services and operational leadership. Their approach is rooted in empathy, strategic thinking, and evidence-based methods that empower both individuals and teams.",
      "Beyond daily operations, team members mentor emerging professionals and contribute to shaping the future of healthcare and management. They are committed to expanding access to effective tools and resources, fostering a more efficient, responsive, and inclusive system.",
    ],
  },
];

const BoardOfTrustees: FC<TeamPageProps> = () => {
  return (
    <>
      {/* <NavigationTabs /> */}
      <TeamPage
        title="Board of Trustees"
        description=""
        members={teamMembers}
      />
    </>
  );
};

export default BoardOfTrustees;
