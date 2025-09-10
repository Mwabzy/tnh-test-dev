import { FC } from "react";
import OpportunityTemplate from "./opportunity/OpportunityTemplate";

type TendersProps = {};

const tendersData = [
  {
    opportunity: "PLUMBING AND DRAINAGE INSTALLATIONS",
    description:
      "PROPOSED RENOVATIONS AND REORGANIZATION WORKS AT THE DAY SURGERY UNIT (DSU) THEATRES",
    location: "Remote",
    opportunityType: "Tender",
    datePosted: "2023-10-01",
    closingDate: "2025-08-07",
    fileUrl:
      "https://cms.thenairobihosp.org/uploads/Proposed_Renovations_and_Reorganization_Works_at_the_Day_Surgery_Unit_DSU_Plumbing_and_Drainage_Installations_52bf78052a.pdf?updated_at=2025-07-30T11:23:49.920Z",
  },
  {
    opportunity: "OPERATE AND MAINTENANCE OF STEAM SYSTEM.",
    description:
      "REQUEST FOR PROPOSAL FOR BUILD, OPERATE AND MAINTENANCE OF STEAM SYSTEM.",
    location: "Remote",
    opportunityType: "Tender",
    datePosted: "2023-10-05",
    closingDate: "2025-08-07",
    fileUrl:
      "https://cms.thenairobihosp.org/uploads/Request_for_Proposal_to_Build_Operate_and_Maintenace_of_Steam_System_a9a047b796.pdf?updated_at=2025-07-30T11:25:54.650Z",
  },
  {
    opportunity: "TRAINING AND COMMISSIONING A GEL ELECTROPHORESIS MACHINE.",
    description:
      "SUPPLY, DELIVERY, INSTALLATION, TESTING, AND COMMISSIONING OF A GEL ELECTROPHORESIS MACHINE.",
    location: "Remote",
    opportunityType: "Tender",
    datePosted: "2023-10-05",
    closingDate: "2025-07-31",
    fileUrl:
      "https://cms.thenairobihosp.org/uploads/Supply_Delivery_Installation_Testing_Training_and_Commissioning_of_a_Gel_Etlectrophororis_Machine_7604f2c22f.pdf?updated_at=2025-07-18T04:49:11.957Z",
  },
  {
    opportunity: "MEDICAL GASES INSTALLATIONS.",
    description:
      "PROPOSED RENOVATIONS AND REORGANIZATION WORKS AT THE DAY SURGERY UNIT (DSU) THEATRES ",
    location: "Remote",
    opportunityType: "Tender",
    datePosted: "2023-10-05",
    closingDate: "2025-08-07",
    fileUrl:
      "https://cms.thenairobihosp.org/uploads/Proposed_Renovations_and_Reorganization_Works_at_the_Day_Surgery_Unit_DSU_Medical_Gases_Installations_5e6c69d21c.pdf?updated_at=2025-07-30T09:56:02.197Z",
  },
  {
    opportunity: "TRAINING & COMMISSIONING OF MEDICAL AIR PLANT",
    description:
      "SUPPLY, DELIVERY, INSTALLATION, TESTING, AND COMMISSIONING OF A MEDICAL AIR PLANT.",
    location: "Remote",
    opportunityType: "Tender",
    datePosted: "2023-10-05",
    closingDate: "2025-07-31",
    fileUrl:
      "https://cms.thenairobihosp.org/uploads/Supply_Delivery_Installation_Training_and_Commissioning_of_Medical_Air_Plant_947daafb77.pdf?updated_at=2025-07-18T06:11:43.882Z",
  },
  {
    opportunity:
      "REORGANIZATION WORKS AT THE DAY SURGERY UNIT (DSU) THEATRES – MAIN WORKS.",
    description:
      "PROPOSED RENOVATIONS AND REORGANIZATION WORKS AT THE DAY SURGERY UNIT (DSU) THEATRES.",
    location: "Remote",
    opportunityType: "Tender",
    datePosted: "2023-10-05",
    closingDate: "2025-08-07",
    fileUrl:
      "https://cms.thenairobihosp.org/uploads/Proposed_Renovations_and_Reorganization_Works_at_the_Day_Surgery_Unit_DSU_Theatres_Main_Works_e398b118b5.pdf?updated_at=2025-07-30T11:25:21.508Z",
  },
  {
    opportunity: "SECURITY SYSTEMS INSTALLATION.",
    description:
      "PROPOSED RENOVATIONS AND REORGANIZATION WORKS AT THE DAY SURGERY UNIT (DSU) THEATRES – SECURITY SYSTEMS INSTALLATION.",
    location: "Remote",
    opportunityType: "Tender",
    datePosted: "2023-10-05",
    closingDate: "2023-11-05",
    fileUrl:
      "https://cms.thenairobihosp.org/uploads/Proposed_Renovations_and_Reorganization_Works_at_the_Day_Surgery_Unit_DSU_Security_Systems_Installations_e4badb14d4.pdf?updated_at=2025-07-30T11:24:21.935Z",
  },
  {
    opportunity: "NURSE CALL INSTALLATIONS.",
    description:
      "PROPOSED RENOVATIONS AND REORGANIZATION WORKS AT THE DAY SURGERY UNIT (DSU) THEATRES – NURSE CALL INSTALLATIONS.",
    location: "Remote",
    opportunityType: "Tender",
    datePosted: "2023-10-05",
    closingDate: "2025-08-07",
    fileUrl:
      "https://cms.thenairobihosp.org/uploads/Proposed_Renovations_and_Reorganization_Works_at_the_Day_Surgery_Unit_DSU_Nurse_Call_Installations_583ecbb93a.pdf?updated_at=2025-07-30T11:23:22.549Z",
  },
  {
    opportunity: "LIFT INSTALLATION.",
    description:
      "PROPOSED RENOVATIONS AND REORGANIZATION WORKS AT THE DAY SURGERY UNIT (DSU) THEATRES – LIFT INSTALLATION.",
    location: "Remote",
    opportunityType: "Tender",
    datePosted: "2023-10-05",
    closingDate: "2025-08-07",
    fileUrl:
      "https://cms.thenairobihosp.org/uploads/Proposed_Renovations_and_Reorganization_Works_at_the_Day_Surgery_Unit_DSU_Lift_Installations_91da08191c.pdf?updated_at=2025-07-30T09:55:19.243Z",
  },
  {
    opportunity: "ICT AND STRUCTURED CABLING INSTALLATIONS.",
    description:
      "PROPOSED RENOVATIONS AND REORGANIZATION WORKS AT THE DAY SURGERY UNIT (DSU) THEATRES – ICT AND STRUCTURED CABLING INSTALLATIONS.",
    location: "Remote",
    opportunityType: "Tender",
    datePosted: "2023-10-05",
    closingDate: "2025-08-07",
    fileUrl:
      "https://cms.thenairobihosp.org/uploads/Proposed_Renovations_and_Reorganization_Works_at_the_Day_Surgery_Unit_DSU_Structured_Cabling_393e064602.pdf?updated_at=2025-07-30T11:24:49.519Z",
  },
  {
    opportunity:
      "PROPOSED RENOVATIONS AND REORGANIZATION WORKS AT THE DAY SURGERY UNIT (DSU) THEATRES – HVAC..",
    description:
      "PROPOSED RENOVATIONS AND REORGANIZATION WORKS AT THE DAY SURGERY UNIT (DSU) THEATRES – HVAC INSTALLATIONS.",
    location: "Remote",
    opportunityType: "Tender",
    datePosted: "2023-10-05",
    closingDate: "2025-08-07",
    fileUrl:
      "https://cms.thenairobihosp.org/uploads/Proposed_Renovations_and_Reorganization_Works_at_the_Day_Surgery_Unit_DSU_HVAC_Installations_38ff091927.pdf?updated_at=2025-07-30T09:54:30.815Z",
  },
  {
    opportunity: "GENERAL ELECTRICAL INSTALLATIONS.",
    description:
      "PROPOSED RENOVATIONS AND REORGANIZATION WORKS AT THE DAY SURGERY UNIT (DSU) THEATRES – ELECTRICAL INSTALLATIONS.",
    location: "Remote",
    opportunityType: "Tender",
    datePosted: "2023-10-05",
    closingDate: "2025-08-07",
    fileUrl:
      "https://cms.thenairobihosp.org/uploads/Proposed_Renovations_and_Reorganization_Works_at_the_Day_Surgery_Unit_DSU_General_Electrical_Installations_0f9466671f.pdf?updated_at=2025-07-30T09:53:59.789Z",
  },
  {
    opportunity: "ELECTRICAL SUBSTATION WORKS.",
    description:
      "PROPOSED RENOVATIONS AND REORGANIZATION WORKS AT THE DAY SURGERY UNIT (DSU) THEATRES",
    location: "Remote",
    opportunityType: "Tender",
    datePosted: "2023-10-05",
    closingDate: "2025-08-07",
    fileUrl:
      "https://cms.thenairobihosp.org/uploads/Proposed_Renovations_and_Reorganization_Works_at_the_Day_Surgery_Unit_DSU_Electrical_Sub_Station_Installations_609d2ab3f6.pdf?updated_at=2025-07-30T09:44:29.852Z",
  },
  {
    opportunity:
      "CONDUCTING BASELINE SURVEY FOR OCCUPATIONAL MEDICAL EXAMINATIONS RE-TENDER",
    description:
      "REQUEST FOR PROPOSAL FOR CONDUCTING BASELINE SURVEY FOR OCCUPATIONAL MEDICAL EXAMINATIONS RE-TENDER",
    location: "Remote",
    opportunityType: "Tender",
    datePosted: "2023-10-05",
    closingDate: "2025-07-31",
    fileUrl:
      "https://cms.thenairobihosp.org/uploads/CONDUCTING_BASELINE_SURVEY_FOR_OCCUPATIONAL_MEDICAL_EXAMINATIONS_RE_TENDER_697f6a2b76.pdf?updated_at=2025-07-18T06:52:09.617Z",
  },
  {
    opportunity: "COMMISSIONING AND MAINTENANCE OF LAPAROSCOPIC TOWER",
    description:
      "SUPPLY, DELIVERY, INSTALLATION, TESTING, TRAINING, AND COMMISSIONING OF A LAPAROSCOPIC TOWER.",
    location: "Remote",
    opportunityType: "Tender",
    datePosted: "2023-10-05",
    closingDate: "2025-07-31",
    fileUrl:
      "https://cms.thenairobihosp.org/uploads/Supply_Delivery_Installation_Testing_Training_Commissioning_and_Maintenance_of_Laparoscopic_Tower_6b6451f0f7.pdf?updated_at=2025-07-18T10:08:42.389Z",
  },
  {
    opportunity:
      "SUPPLY, DELIVERY, INSTALLATION, TESTING, TRAINING AND COMMISSIONING OF A DIGITAL X-RAY MACHINE",
    description:
      "SUPPLY, DELIVERY, INSTALLATION, TESTING, TRAINING AND COMMISSIONING OF A DIGITAL X-RAY MACHINE.",
    location: "Remote",
    opportunityType: "Tender",
    datePosted: "2023-10-05",
    closingDate: "2025-07-31",
    fileUrl:
      "https://cms.thenairobihosp.org/uploads/Supply_Delivery_Installation_Testing_Training_and_Commissioning_of_a_Digital_X_Ray_Machine_2c8f0b1d5e.pdf?updated_at=2025-07-18T10:09:59.646Z",
  },
  {
    opportunity:
      "MAINTENANCE OF HD VIDEO COLPOSCOPE WITH IMAGE MANAGEMENT SYSTEM",
    description:
      "SUPPLY, DELIVERY, INSTALLATION, TESTING, TRAINING, COMMISSIONING AND MAINTENANCE OF HD VIDEO COLPOSCOPE WITH IMAGE MANAGEMENT SYSTEM",
    location: "Remote",
    opportunityType: "Tender",
    datePosted: "2023-10-05",
    closingDate: "2025-07-31",
    fileUrl:
      "https://cms.thenairobihosp.org/uploads/Supply_Delivery_Installation_Testing_Training_Commissioning_and_Maintenance_of_HD_Video_Colposcope_with_Image_Management_System_d7e6076f04.pdf?updated_at=2025-07-18T10:09:41.676Z",
  },
  {
    opportunity: "ADDENDUM NOTICE",
    description: "ADDENDUM NOTICE",
    location: "Remote",
    opportunityType: "Tender",
    datePosted: "2023-10-05",
    closingDate: "2025-08-07",
    fileUrl:
      "https://cms.thenairobihosp.org/uploads/ADDENDUM_NOTICE_472c8c014e.pdf?updated_at=2025-07-30T11:26:22.505Z",
  },
];

const Tenders: FC<TendersProps> = () => {
  return (
    <div>
      <OpportunityTemplate
        title="Opportunities for Tenders"
        description="Find exciting tender opportunities with us."
        testimonials={[
          {
            name: "Jane Doe",
            title: "Software Engineer",
            quote:
              "The process of working on tenders has been a transformative experience.",
            image: "https://example.com/jane.jpg",
          },
          {
            name: "John Smith",
            title: "Product Manager",
            quote: "The team is incredibly supportive and innovative.",
            image: "https://example.com/john.jpg",
          },
        ]}
        contactInfo={{
          emails: [{ type: "general", address: "" }],
          phone: "123-456-7890",
        }}
        opportunities={tendersData}
      />
    </div>
  );
};

export default Tenders;
