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
  id: string; // Added id property for routing
  description: string[]; // Optional property to avoid errors for other members
};

export const teamMembers: TeamMember[] = [
  {
    name: "Dr. Barcley Onyambu",
    title: "Chairman of the Board of Management",
    id: "barcley-onyambu",
    image:
      "https://cms.thenairobihosp.org/uploads/4_Dr_Barcley_Onyambu_Board_Member_49cf114418.jpg",
    description: [
      "Team members play an essential role in advancing healthcare and effective management practices across a variety of settings. Their work supports individual and organizational well-being, contributing to better outcomes in areas such as clinical services, administration, education, and research.",
      "With expertise in areas like behavioral strategies, process improvement, and program development, team members help drive innovation in healthcare delivery and organizational effectiveness. Many are involved in research that explores the integration of technology to enhance services and streamline operations.",
      "In addition to their core responsibilities, team members lead training sessions and workshops on topics such as stress reduction, workplace resilience, leadership development, and team dynamics. These efforts promote a culture of continuous improvement and support within healthcare and organizational environments.",
      "At The Nairobi Hospital, the team includes experienced professionals who collaborate to provide high-quality services and operational leadership. Their approach is rooted in empathy, strategic thinking, and evidence-based methods that empower both individuals and teams.",
      "Beyond daily operations, team members mentor emerging professionals and contribute to shaping the future of healthcare and management. They are committed to expanding access to effective tools and resources, fostering a more efficient, responsive, and inclusive system.",
    ],
  },
  {
    name: "Mr. Samson Mbuthia Kinyanjui",
    title: "Vice Chairman of the Board of Management",
    id: "samson-kinyanjui",
    image:
      "https://cms.thenairobihosp.org/uploads/9_Mr_Samson_Kinyanjui_Board_Member_ded7ccd788.jpg",
    description: [
      "Team members play an essential role in advancing healthcare and effective management practices across a variety of settings. Their work supports individual and organizational well-being, contributing to better outcomes in areas such as clinical services, administration, education, and research.",
      "With expertise in areas like behavioral strategies, process improvement, and program development, team members help drive innovation in healthcare delivery and organizational effectiveness. Many are involved in research that explores the integration of technology to enhance services and streamline operations.",
      "In addition to their core responsibilities, team members lead training sessions and workshops on topics such as stress reduction, workplace resilience, leadership development, and team dynamics. These efforts promote a culture of continuous improvement and support within healthcare and organizational environments.",
      "At The Nairobi Hospital, the team includes experienced professionals who collaborate to provide high-quality services and operational leadership. Their approach is rooted in empathy, strategic thinking, and evidence-based methods that empower both individuals and teams.",
      "Beyond daily operations, team members mentor emerging professionals and contribute to shaping the future of healthcare and management. They are committed to expanding access to effective tools and resources, fostering a more efficient, responsive, and inclusive system.",
    ],
  },
  {
    name: "Dr. Agnes Gachoki",
    title: "Chairperson, Medical Advisory Committee",
    id: "agnes-gachoki",
    image: "https://cms.thenairobihosp.org/uploads/pic2025_3521248e46.jpg",
    description: [
      "Team members play an essential role in advancing healthcare and effective management practices across a variety of settings. Their work supports individual and organizational well-being, contributing to better outcomes in areas such as clinical services, administration, education, and research.",
      "With expertise in areas like behavioral strategies, process improvement, and program development, team members help drive innovation in healthcare delivery and organizational effectiveness. Many are involved in research that explores the integration of technology to enhance services and streamline operations.",
      "In addition to their core responsibilities, team members lead training sessions and workshops on topics such as stress reduction, workplace resilience, leadership development, and team dynamics. These efforts promote a culture of continuous improvement and support within healthcare and organizational environments.",
      "At The Nairobi Hospital, the team includes experienced professionals who collaborate to provide high-quality services and operational leadership. Their approach is rooted in empathy, strategic thinking, and evidence-based methods that empower both individuals and teams.",
      "Beyond daily operations, team members mentor emerging professionals and contribute to shaping the future of healthcare and management. They are committed to expanding access to effective tools and resources, fostering a more efficient, responsive, and inclusive system.",
    ],
  },
  {
    name: "Prof. Timothy Byakika",
    id: "timothy-byakika",
    title: "Vice Chairman, Medical Advisory Committee",
    image: "https://cms.thenairobihosp.org/uploads/pic2025_3521248e46.jpg",
    description: [
      "Team members play an essential role in advancing healthcare and effective management practices across a variety of settings. Their work supports individual and organizational well-being, contributing to better outcomes in areas such as clinical services, administration, education, and research.",
      "With expertise in areas like behavioral strategies, process improvement, and program development, team members help drive innovation in healthcare delivery and organizational effectiveness. Many are involved in research that explores the integration of technology to enhance services and streamline operations.",
      "In addition to their core responsibilities, team members lead training sessions and workshops on topics such as stress reduction, workplace resilience, leadership development, and team dynamics. These efforts promote a culture of continuous improvement and support within healthcare and organizational environments.",
      "At The Nairobi Hospital, the team includes experienced professionals who collaborate to provide high-quality services and operational leadership. Their approach is rooted in empathy, strategic thinking, and evidence-based methods that empower both individuals and teams.",
      "Beyond daily operations, team members mentor emerging professionals and contribute to shaping the future of healthcare and management. They are committed to expanding access to effective tools and resources, fostering a more efficient, responsive, and inclusive system.",
    ],
  },
  {
    name: "Dr. Magdalene Muthoka, PhD",
    title: "Board Member",
    id: "magdalene-muthoka",
    image:
      "https://cms.thenairobihosp.org/uploads/3_Dr_Magdalene_Muthoka_Ph_D_Board_Member_d0770f31e5.jpg",
    description: [
      "Team members play an essential role in advancing healthcare and effective management practices across a variety of settings. Their work supports individual and organizational well-being, contributing to better outcomes in areas such as clinical services, administration, education, and research.",
      "With expertise in areas like behavioral strategies, process improvement, and program development, team members help drive innovation in healthcare delivery and organizational effectiveness. Many are involved in research that explores the integration of technology to enhance services and streamline operations.",
      "In addition to their core responsibilities, team members lead training sessions and workshops on topics such as stress reduction, workplace resilience, leadership development, and team dynamics. These efforts promote a culture of continuous improvement and support within healthcare and organizational environments.",
      "At The Nairobi Hospital, the team includes experienced professionals who collaborate to provide high-quality services and operational leadership. Their approach is rooted in empathy, strategic thinking, and evidence-based methods that empower both individuals and teams.",
      "Beyond daily operations, team members mentor emerging professionals and contribute to shaping the future of healthcare and management. They are committed to expanding access to effective tools and resources, fostering a more efficient, responsive, and inclusive system.",
    ],
  },

  {
    name: "Prof. Herman Manyora",
    id: "herman-manyora",
    title: "Board Member",
    image:
      "https://cms.thenairobihosp.org/uploads/8_Prof_Herman_Manyora_Board_Member_c0a468d2b4.jpg",
    description: [
      "Team members play an essential role in advancing healthcare and effective management practices across a variety of settings. Their work supports individual and organizational well-being, contributing to better outcomes in areas such as clinical services, administration, education, and research.",
      "With expertise in areas like behavioral strategies, process improvement, and program development, team members help drive innovation in healthcare delivery and organizational effectiveness. Many are involved in research that explores the integration of technology to enhance services and streamline operations.",
      "In addition to their core responsibilities, team members lead training sessions and workshops on topics such as stress reduction, workplace resilience, leadership development, and team dynamics. These efforts promote a culture of continuous improvement and support within healthcare and organizational environments.",
      "At The Nairobi Hospital, the team includes experienced professionals who collaborate to provide high-quality services and operational leadership. Their approach is rooted in empathy, strategic thinking, and evidence-based methods that empower both individuals and teams.",
      "Beyond daily operations, team members mentor emerging professionals and contribute to shaping the future of healthcare and management. They are committed to expanding access to effective tools and resources, fostering a more efficient, responsive, and inclusive system.",
    ],
  },
  {
    name: "Prof. John Adwok",
    title: "Board Member",
    id: "john-adwok",
    image: "https://cms.thenairobihosp.org/uploads/pic2025_3521248e46.jpg",
    description: [
      "Team members play an essential role in advancing healthcare and effective management practices across a variety of settings. Their work supports individual and organizational well-being, contributing to better outcomes in areas such as clinical services, administration, education, and research.",
      "With expertise in areas like behavioral strategies, process improvement, and program development, team members help drive innovation in healthcare delivery and organizational effectiveness. Many are involved in research that explores the integration of technology to enhance services and streamline operations.",
      "In addition to their core responsibilities, team members lead training sessions and workshops on topics such as stress reduction, workplace resilience, leadership development, and team dynamics. These efforts promote a culture of continuous improvement and support within healthcare and organizational environments.",
      "At The Nairobi Hospital, the team includes experienced professionals who collaborate to provide high-quality services and operational leadership. Their approach is rooted in empathy, strategic thinking, and evidence-based methods that empower both individuals and teams.",
      "Beyond daily operations, team members mentor emerging professionals and contribute to shaping the future of healthcare and management. They are committed to expanding access to effective tools and resources, fostering a more efficient, responsive, and inclusive system.",
    ],
  },
  {
    name: "Prof. Eng. John Mwero",
    title: "Board Member",
    id: "john-mwero",
    image:
      "https://cms.thenairobihosp.org/uploads/6_Prof_Eng_John_Mwero_Board_Member_890810fa51.jpg",
    description: [
      "Team members play an essential role in advancing healthcare and effective management practices across a variety of settings. Their work supports individual and organizational well-being, contributing to better outcomes in areas such as clinical services, administration, education, and research.",
      "With expertise in areas like behavioral strategies, process improvement, and program development, team members help drive innovation in healthcare delivery and organizational effectiveness. Many are involved in research that explores the integration of technology to enhance services and streamline operations.",
      "In addition to their core responsibilities, team members lead training sessions and workshops on topics such as stress reduction, workplace resilience, leadership development, and team dynamics. These efforts promote a culture of continuous improvement and support within healthcare and organizational environments.",
      "At The Nairobi Hospital, the team includes experienced professionals who collaborate to provide high-quality services and operational leadership. Their approach is rooted in empathy, strategic thinking, and evidence-based methods that empower both individuals and teams.",
      "Beyond daily operations, team members mentor emerging professionals and contribute to shaping the future of healthcare and management. They are committed to expanding access to effective tools and resources, fostering a more efficient, responsive, and inclusive system.",
    ],
  },
  {
    name: "Ms. Valerie Gaya",
    title: "Board Member",
    id: "valerie-gaya",
    image:
      "https://cms.thenairobihosp.org/uploads/10_Ms_Valerie_Gaya_Board_Member_e847fa8d3d.jpg",
    description: [
      "Team members play an essential role in advancing healthcare and effective management practices across a variety of settings. Their work supports individual and organizational well-being, contributing to better outcomes in areas such as clinical services, administration, education, and research.",
      "With expertise in areas like behavioral strategies, process improvement, and program development, team members help drive innovation in healthcare delivery and organizational effectiveness. Many are involved in research that explores the integration of technology to enhance services and streamline operations.",
      "In addition to their core responsibilities, team members lead training sessions and workshops on topics such as stress reduction, workplace resilience, leadership development, and team dynamics. These efforts promote a culture of continuous improvement and support within healthcare and organizational environments.",
      "At The Nairobi Hospital, the team includes experienced professionals who collaborate to provide high-quality services and operational leadership. Their approach is rooted in empathy, strategic thinking, and evidence-based methods that empower both individuals and teams.",
      "Beyond daily operations, team members mentor emerging professionals and contribute to shaping the future of healthcare and management. They are committed to expanding access to effective tools and resources, fostering a more efficient, responsive, and inclusive system.",
    ],
  },
  {
    name: "Mr. Erick Okeyo, MBS, MKIM",
    title: "Board Member",
    id: "erick-okeyo",
    image: "https://cms.thenairobihosp.org/uploads/pic2025_3521248e46.jpg",
    description: [
      "Team members play an essential role in advancing healthcare and effective management practices across a variety of settings. Their work supports individual and organizational well-being, contributing to better outcomes in areas such as clinical services, administration, education, and research.",
      "With expertise in areas like behavioral strategies, process improvement, and program development, team members help drive innovation in healthcare delivery and organizational effectiveness. Many are involved in research that explores the integration of technology to enhance services and streamline operations.",
      "In addition to their core responsibilities, team members lead training sessions and workshops on topics such as stress reduction, workplace resilience, leadership development, and team dynamics. These efforts promote a culture of continuous improvement and support within healthcare and organizational environments.",
      "At The Nairobi Hospital, the team includes experienced professionals who collaborate to provide high-quality services and operational leadership. Their approach is rooted in empathy, strategic thinking, and evidence-based methods that empower both individuals and teams.",
      "Beyond daily operations, team members mentor emerging professionals and contribute to shaping the future of healthcare and management. They are committed to expanding access to effective tools and resources, fostering a more efficient, responsive, and inclusive system.",
    ],
  },
  {
    name: "Dr. Joyce Mbedha, PhD",
    title: "Board Member",
    id: "joyce-mbedha",
    image: "https://cms.thenairobihosp.org/uploads/pic2025_3521248e46.jpg",
    description: [
      "Team members play an essential role in advancing healthcare and effective management practices across a variety of settings. Their work supports individual and organizational well-being, contributing to better outcomes in areas such as clinical services, administration, education, and research.",
      "With expertise in areas like behavioral strategies, process improvement, and program development, team members help drive innovation in healthcare delivery and organizational effectiveness. Many are involved in research that explores the integration of technology to enhance services and streamline operations.",
      "In addition to their core responsibilities, team members lead training sessions and workshops on topics such as stress reduction, workplace resilience, leadership development, and team dynamics. These efforts promote a culture of continuous improvement and support within healthcare and organizational environments.",
      "At The Nairobi Hospital, the team includes experienced professionals who collaborate to provide high-quality services and operational leadership. Their approach is rooted in empathy, strategic thinking, and evidence-based methods that empower both individuals and teams.",
      "Beyond daily operations, team members mentor emerging professionals and contribute to shaping the future of healthcare and management. They are committed to expanding access to effective tools and resources, fostering a more efficient, responsive, and inclusive system.",
    ],
  },
  {
    name: "FCPA Nguru Wachira",
    title: "Board Member",
    id: "nguru-wachira",
    image: "https://cms.thenairobihosp.org/uploads/pic2025_3521248e46.jpg",
    description: [
      "Team members play an essential role in advancing healthcare and effective management practices across a variety of settings. Their work supports individual and organizational well-being, contributing to better outcomes in areas such as clinical services, administration, education, and research.",
      "With expertise in areas like behavioral strategies, process improvement, and program development, team members help drive innovation in healthcare delivery and organizational effectiveness. Many are involved in research that explores the integration of technology to enhance services and streamline operations.",
      "In addition to their core responsibilities, team members lead training sessions and workshops on topics such as stress reduction, workplace resilience, leadership development, and team dynamics. These efforts promote a culture of continuous improvement and support within healthcare and organizational environments.",
      "At The Nairobi Hospital, the team includes experienced professionals who collaborate to provide high-quality services and operational leadership. Their approach is rooted in empathy, strategic thinking, and evidence-based methods that empower both individuals and teams.",
      "Beyond daily operations, team members mentor emerging professionals and contribute to shaping the future of healthcare and management. They are committed to expanding access to effective tools and resources, fostering a more efficient, responsive, and inclusive system.",
    ],
  },
  {
    name: "Dr. Job Obwaka",
    title: "Board Member",
    id: "job-obwaka",
    image: "https://cms.thenairobihosp.org/uploads/pic2025_3521248e46.jpg",
    description: [
      "Team members play an essential role in advancing healthcare and effective management practices across a variety of settings. Their work supports individual and organizational well-being, contributing to better outcomes in areas such as clinical services, administration, education, and research.",
      "With expertise in areas like behavioral strategies, process improvement, and program development, team members help drive innovation in healthcare delivery and organizational effectiveness. Many are involved in research that explores the integration of technology to enhance services and streamline operations.",
      "In addition to their core responsibilities, team members lead training sessions and workshops on topics such as stress reduction, workplace resilience, leadership development, and team dynamics. These efforts promote a culture of continuous improvement and support within healthcare and organizational environments.",
      "At The Nairobi Hospital, the team includes experienced professionals who collaborate to provide high-quality services and operational leadership. Their approach is rooted in empathy, strategic thinking, and evidence-based methods that empower both individuals and teams.",
      "Beyond daily operations, team members mentor emerging professionals and contribute to shaping the future of healthcare and management. They are committed to expanding access to effective tools and resources, fostering a more efficient, responsive, and inclusive system.",
    ],
  },
];

const BoardOfManagement: FC<TeamPageProps> = () => {
  return (
    <>
      {/* <NavigationTabs /> */}
      <TeamPage
        title="Board of Management"
        description="The Nairobi Hospital Board of Management is in charge of the hospital’s corporate governance and is accountable to the Kenya Hospital Association which ensures the hospital’s compliance with the law while maintaining the highest standards of corporate governance. The Nairobi Hospital Board complies with the 2/3 gender rule, with 34% female and 64% male members."
        members={teamMembers}
      />
    </>
  );
};

export default BoardOfManagement;
