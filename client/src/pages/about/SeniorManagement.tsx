import { FC } from "react";
import TeamPage from "./TeamPage";

type TeamPageProps = {
  title: string;
  description: string;
  members: TeamMember[];
};

type TeamMember = {
  name: string;
  id: string;
  title: string;
  image: string;
  description: string[];
};

export const teamMembers: TeamMember[] = [
  {
    name: "Mr. Felix Osano",
    id: "felix-osano",
    title: "Ag Chief Executive Officer",
    image:
      "https://cms.thenairobihosp.org/uploads/Mr_Felix_Osano_Ag_CEO_b5891a43c6.jpg",
    description: [
      "Team members play an essential role in advancing healthcare and effective management practices across a variety of settings. Their work supports individual and organizational well-being, contributing to better outcomes in areas such as clinical services, administration, education, and research.",
      "With expertise in areas like behavioral strategies, process improvement, and program development, team members help drive innovation in healthcare delivery and organizational effectiveness. Many are involved in research that explores the integration of technology to enhance services and streamline operations.",
      "In addition to their core responsibilities, team members lead training sessions and workshops on topics such as stress reduction, workplace resilience, leadership development, and team dynamics. These efforts promote a culture of continuous improvement and support within healthcare and organizational environments.",
      "At The Nairobi Hospital, the team includes experienced professionals who collaborate to provide high-quality services and operational leadership. Their approach is rooted in empathy, strategic thinking, and evidence-based methods that empower both individuals and teams.",
      "Beyond daily operations, team members mentor emerging professionals and contribute to shaping the future of healthcare and management. They are committed to expanding access to effective tools and resources, fostering a more efficient, responsive, and inclusive system.",
    ],
  },

  {
    name: "Mr Samuel Odede, OGW",
    id: "samuel-odede",
    title: "Director Medical Services & Research",
    image: "https://cms.thenairobihosp.org/uploads/Dr_Odede_2_b1effe5313.jpg",
    description: [
      "Team members play an essential role in advancing healthcare and effective management practices across a variety of settings. Their work supports individual and organizational well-being, contributing to better outcomes in areas such as clinical services, administration, education, and research.",
      "With expertise in areas like behavioral strategies, process improvement, and program development, team members help drive innovation in healthcare delivery and organizational effectiveness. Many are involved in research that explores the integration of technology to enhance services and streamline operations.",
      "In addition to their core responsibilities, team members lead training sessions and workshops on topics such as stress reduction, workplace resilience, leadership development, and team dynamics. These efforts promote a culture of continuous improvement and support within healthcare and organizational environments.",
      "At The Nairobi Hospital, the team includes experienced professionals who collaborate to provide high-quality services and operational leadership. Their approach is rooted in empathy, strategic thinking, and evidence-based methods that empower both individuals and teams.",
      "Beyond daily operations, team members mentor emerging professionals and contribute to shaping the future of healthcare and management. They are committed to expanding access to effective tools and resources, fostering a more efficient, responsive, and inclusive system.",
    ],
  },
  {
    name: "Margret Muiyoro",
    id: "margret-muiyoro",
    title: "Ag Director Nursing Services",
    image:
      "https://cms.thenairobihosp.org/uploads/1564555500151_551663a6ed.jpg",
    description: [
      "Team members play an essential role in advancing healthcare and effective management practices across a variety of settings. Their work supports individual and organizational well-being, contributing to better outcomes in areas such as clinical services, administration, education, and research.",
      "With expertise in areas like behavioral strategies, process improvement, and program development, team members help drive innovation in healthcare delivery and organizational effectiveness. Many are involved in research that explores the integration of technology to enhance services and streamline operations.",
      "In addition to their core responsibilities, team members lead training sessions and workshops on topics such as stress reduction, workplace resilience, leadership development, and team dynamics. These efforts promote a culture of continuous improvement and support within healthcare and organizational environments.",
      "At The Nairobi Hospital, the team includes experienced professionals who collaborate to provide high-quality services and operational leadership. Their approach is rooted in empathy, strategic thinking, and evidence-based methods that empower both individuals and teams.",
      "Beyond daily operations, team members mentor emerging professionals and contribute to shaping the future of healthcare and management. They are committed to expanding access to effective tools and resources, fostering a more efficient, responsive, and inclusive system.",
    ],
  },
  {
    name: "Nicodemus Odongo",
    id: "nicodemus-odongo",
    title: "Director, Strategy & Innovation",
    image: "https://cms.thenairobihosp.org/uploads/wewewewewewe_08530ced1b.png",
    description: [
      "Team members play an essential role in advancing healthcare and effective management practices across a variety of settings. Their work supports individual and organizational well-being, contributing to better outcomes in areas such as clinical services, administration, education, and research.",
      "With expertise in areas like behavioral strategies, process improvement, and program development, team members help drive innovation in healthcare delivery and organizational effectiveness. Many are involved in research that explores the integration of technology to enhance services and streamline operations.",
      "In addition to their core responsibilities, team members lead training sessions and workshops on topics such as stress reduction, workplace resilience, leadership development, and team dynamics. These efforts promote a culture of continuous improvement and support within healthcare and organizational environments.",
      "At The Nairobi Hospital, the team includes experienced professionals who collaborate to provide high-quality services and operational leadership. Their approach is rooted in empathy, strategic thinking, and evidence-based methods that empower both individuals and teams.",
      "Beyond daily operations, team members mentor emerging professionals and contribute to shaping the future of healthcare and management. They are committed to expanding access to effective tools and resources, fostering a more efficient, responsive, and inclusive system.",
    ],
  },
  {
    name: "Nicodemus Odongo",
    id: "nicodemus-odongo",
    title: "Ag. Director Supply Chain & Distribution",
    image: "https://cms.thenairobihosp.org/uploads/wewewewewewe_08530ced1b.png",
    description: [
      "Team members play an essential role in advancing healthcare and effective management practices across a variety of settings. Their work supports individual and organizational well-being, contributing to better outcomes in areas such as clinical services, administration, education, and research.",
      "With expertise in areas like behavioral strategies, process improvement, and program development, team members help drive innovation in healthcare delivery and organizational effectiveness. Many are involved in research that explores the integration of technology to enhance services and streamline operations.",
      "In addition to their core responsibilities, team members lead training sessions and workshops on topics such as stress reduction, workplace resilience, leadership development, and team dynamics. These efforts promote a culture of continuous improvement and support within healthcare and organizational environments.",
      "At The Nairobi Hospital, the team includes experienced professionals who collaborate to provide high-quality services and operational leadership. Their approach is rooted in empathy, strategic thinking, and evidence-based methods that empower both individuals and teams.",
      "Beyond daily operations, team members mentor emerging professionals and contribute to shaping the future of healthcare and management. They are committed to expanding access to effective tools and resources, fostering a more efficient, responsive, and inclusive system.",
    ],
  },
  {
    name: "William Masita",
    id: "william-masita",
    title: "Director, Finance",
    image:
      "https://cms.thenairobihosp.org/uploads/Finance_resized_431f70bc53.jpg",
    description: [
      "Team members play an essential role in advancing healthcare and effective management practices across a variety of settings. Their work supports individual and organizational well-being, contributing to better outcomes in areas such as clinical services, administration, education, and research.",
      "With expertise in areas like behavioral strategies, process improvement, and program development, team members help drive innovation in healthcare delivery and organizational effectiveness. Many are involved in research that explores the integration of technology to enhance services and streamline operations.",
      "In addition to their core responsibilities, team members lead training sessions and workshops on topics such as stress reduction, workplace resilience, leadership development, and team dynamics. These efforts promote a culture of continuous improvement and support within healthcare and organizational environments.",
      "At The Nairobi Hospital, the team includes experienced professionals who collaborate to provide high-quality services and operational leadership. Their approach is rooted in empathy, strategic thinking, and evidence-based methods that empower both individuals and teams.",
      "Beyond daily operations, team members mentor emerging professionals and contribute to shaping the future of healthcare and management. They are committed to expanding access to effective tools and resources, fostering a more efficient, responsive, and inclusive system.",
    ],
  },
  {
    name: "Dr. Magdalyne Wambui Kamande",
    id: "magdalyne-kamande",
    title: "Director, Transformation services and ICT",
    image: "https://cms.thenairobihosp.org/uploads/ICT_resized_b7588b3ff0.jpg",
    description: [
      "Team members play an essential role in advancing healthcare and effective management practices across a variety of settings. Their work supports individual and organizational well-being, contributing to better outcomes in areas such as clinical services, administration, education, and research.",
      "With expertise in areas like behavioral strategies, process improvement, and program development, team members help drive innovation in healthcare delivery and organizational effectiveness. Many are involved in research that explores the integration of technology to enhance services and streamline operations.",
      "In addition to their core responsibilities, team members lead training sessions and workshops on topics such as stress reduction, workplace resilience, leadership development, and team dynamics. These efforts promote a culture of continuous improvement and support within healthcare and organizational environments.",
      "At The Nairobi Hospital, the team includes experienced professionals who collaborate to provide high-quality services and operational leadership. Their approach is rooted in empathy, strategic thinking, and evidence-based methods that empower both individuals and teams.",
      "Beyond daily operations, team members mentor emerging professionals and contribute to shaping the future of healthcare and management. They are committed to expanding access to effective tools and resources, fostering a more efficient, responsive, and inclusive system.",
    ],
  },
  {
    name: "Gilbert Nyamweya",
    id: "gilbert-nyamweya",
    title: "Company Secretary",
    image:
      "https://cms.thenairobihosp.org/uploads/Mr_Gilbert_Nyamweya_6b9036ce5e.jpg",
    description: [
      "Team members play an essential role in advancing healthcare and effective management practices across a variety of settings. Their work supports individual and organizational well-being, contributing to better outcomes in areas such as clinical services, administration, education, and research.",
      "With expertise in areas like behavioral strategies, process improvement, and program development, team members help drive innovation in healthcare delivery and organizational effectiveness. Many are involved in research that explores the integration of technology to enhance services and streamline operations.",
      "In addition to their core responsibilities, team members lead training sessions and workshops on topics such as stress reduction, workplace resilience, leadership development, and team dynamics. These efforts promote a culture of continuous improvement and support within healthcare and organizational environments.",
      "At The Nairobi Hospital, the team includes experienced professionals who collaborate to provide high-quality services and operational leadership. Their approach is rooted in empathy, strategic thinking, and evidence-based methods that empower both individuals and teams.",
      "Beyond daily operations, team members mentor emerging professionals and contribute to shaping the future of healthcare and management. They are committed to expanding access to effective tools and resources, fostering a more efficient, responsive, and inclusive system.",
    ],
  },
  {
    name: "Dr. Margaret Sirima, PhD",
    id: "margaret-sirima",
    title: "Principal College of Health Sciences",
    image:
      "https://cms.thenairobihosp.org/uploads/Mrs_Margret_Sirima_4f4e7d6b3c.jpg",
    description: [
      "Team members play an essential role in advancing healthcare and effective management practices across a variety of settings. Their work supports individual and organizational well-being, contributing to better outcomes in areas such as clinical services, administration, education, and research.",
      "With expertise in areas like behavioral strategies, process improvement, and program development, team members help drive innovation in healthcare delivery and organizational effectiveness. Many are involved in research that explores the integration of technology to enhance services and streamline operations.",
      "In addition to their core responsibilities, team members lead training sessions and workshops on topics such as stress reduction, workplace resilience, leadership development, and team dynamics. These efforts promote a culture of continuous improvement and support within healthcare and organizational environments.",
      "At The Nairobi Hospital, the team includes experienced professionals who collaborate to provide high-quality services and operational leadership. Their approach is rooted in empathy, strategic thinking, and evidence-based methods that empower both individuals and teams.",
      "Beyond daily operations, team members mentor emerging professionals and contribute to shaping the future of healthcare and management. They are committed to expanding access to effective tools and resources, fostering a more efficient, responsive, and inclusive system.",
    ],
  },
  {
    name: "Weldon Rotich",
    id: "weldon-rotich",
    title: "Head of Internal Audit & Controls",
    image:
      "https://cms.thenairobihosp.org/uploads/Mr_Weldon_Rotich_063fe2f2c7.jpg",
    description: [
      "Team members play an essential role in advancing healthcare and effective management practices across a variety of settings. Their work supports individual and organizational well-being, contributing to better outcomes in areas such as clinical services, administration, education, and research.",
      "With expertise in areas like behavioral strategies, process improvement, and program development, team members help drive innovation in healthcare delivery and organizational effectiveness. Many are involved in research that explores the integration of technology to enhance services and streamline operations.",
      "In addition to their core responsibilities, team members lead training sessions and workshops on topics such as stress reduction, workplace resilience, leadership development, and team dynamics. These efforts promote a culture of continuous improvement and support within healthcare and organizational environments.",
      "At The Nairobi Hospital, the team includes experienced professionals who collaborate to provide high-quality services and operational leadership. Their approach is rooted in empathy, strategic thinking, and evidence-based methods that empower both individuals and teams.",
      "Beyond daily operations, team members mentor emerging professionals and contribute to shaping the future of healthcare and management. They are committed to expanding access to effective tools and resources, fostering a more efficient, responsive, and inclusive system.",
    ],
  },
  {
    name: "Antipas Nyambok",
    id: "antipas-nyambok",
    title: "Head of Operations",
    image: "https://cms.thenairobihosp.org/uploads/antipas_5785a30bf6.PNG",
    description: [
      "Team members play an essential role in advancing healthcare and effective management practices across a variety of settings. Their work supports individual and organizational well-being, contributing to better outcomes in areas such as clinical services, administration, education, and research.",
      "With expertise in areas like behavioral strategies, process improvement, and program development, team members help drive innovation in healthcare delivery and organizational effectiveness. Many are involved in research that explores the integration of technology to enhance services and streamline operations.",
      "In addition to their core responsibilities, team members lead training sessions and workshops on topics such as stress reduction, workplace resilience, leadership development, and team dynamics. These efforts promote a culture of continuous improvement and support within healthcare and organizational environments.",
      "At The Nairobi Hospital, the team includes experienced professionals who collaborate to provide high-quality services and operational leadership. Their approach is rooted in empathy, strategic thinking, and evidence-based methods that empower both individuals and teams.",
      "Beyond daily operations, team members mentor emerging professionals and contribute to shaping the future of healthcare and management. They are committed to expanding access to effective tools and resources, fostering a more efficient, responsive, and inclusive system.",
    ],
  },
  {
    name: "Major (Rtd) Guido Aido Leariwala",
    id: "aido-leariwala",
    title: "Chief Security Officer",
    image:
      "https://cms.thenairobihosp.org/uploads/placeholderimg_ba7e82b9c0.png",
    description: [
      "Team members play an essential role in advancing healthcare and effective management practices across a variety of settings. Their work supports individual and organizational well-being, contributing to better outcomes in areas such as clinical services, administration, education, and research.",
      "With expertise in areas like behavioral strategies, process improvement, and program development, team members help drive innovation in healthcare delivery and organizational effectiveness. Many are involved in research that explores the integration of technology to enhance services and streamline operations.",
      "In addition to their core responsibilities, team members lead training sessions and workshops on topics such as stress reduction, workplace resilience, leadership development, and team dynamics. These efforts promote a culture of continuous improvement and support within healthcare and organizational environments.",
      "At The Nairobi Hospital, the team includes experienced professionals who collaborate to provide high-quality services and operational leadership. Their approach is rooted in empathy, strategic thinking, and evidence-based methods that empower both individuals and teams.",
      "Beyond daily operations, team members mentor emerging professionals and contribute to shaping the future of healthcare and management. They are committed to expanding access to effective tools and resources, fostering a more efficient, responsive, and inclusive system.",
    ],
  },
  {
    name: "Trevour Adudah",
    id: "trevour-adudah",
    title: "Ag Head of Engineering",
    image: "https://cms.thenairobihosp.org/uploads/Trevour1_b2bcca5ab0.jpg",
    description: [
      "Team members play an essential role in advancing healthcare and effective management practices across a variety of settings. Their work supports individual and organizational well-being, contributing to better outcomes in areas such as clinical services, administration, education, and research.",
      "With expertise in areas like behavioral strategies, process improvement, and program development, team members help drive innovation in healthcare delivery and organizational effectiveness. Many are involved in research that explores the integration of technology to enhance services and streamline operations.",
      "In addition to their core responsibilities, team members lead training sessions and workshops on topics such as stress reduction, workplace resilience, leadership development, and team dynamics. These efforts promote a culture of continuous improvement and support within healthcare and organizational environments.",
      "At The Nairobi Hospital, the team includes experienced professionals who collaborate to provide high-quality services and operational leadership. Their approach is rooted in empathy, strategic thinking, and evidence-based methods that empower both individuals and teams.",
      "Beyond daily operations, team members mentor emerging professionals and contribute to shaping the future of healthcare and management. They are committed to expanding access to effective tools and resources, fostering a more efficient, responsive, and inclusive system.",
    ],
  },
];

const SeniorManagement: FC<TeamPageProps> = () => {
  return (
    <>
      {/* <NavigationTabs /> */}
      <TeamPage
        title="Senior Management Team"
        description="Our Senior Management Team is dedicated to providing exceptional healthcare services and operational leadership at The Nairobi Hospital. With a wealth of experience and expertise, they ensure the hospital's mission is fulfilled with integrity and excellence."
        members={teamMembers}
      />
    </>
  );
};

export default SeniorManagement;
