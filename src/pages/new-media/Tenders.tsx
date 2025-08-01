import { FC } from "react";
import OpportunityTemplate from "./opportunity/OpportunityTemplate";

type TendersProps = {
  
};

const tendersData = [
    {
        opportunity: "PLUMBING AND DRAINAGE INSTALLATIONS",
        description: "PROPOSED RENOVATIONS AND REORGANIZATION WORKS AT THE DAY SURGERY UNIT (DSU) THEATRES",
        location: "Remote",
        opportunityType: "Tender",
        datePosted: "2023-10-01",
        closingDate: "2023-11-01",
        fileUrl: "https://cms.thenairobihosp.org/uploads/Proposed_Renovations_and_Reorganization_Works_at_the_Day_Surgery_Unit_DSU_Plumbing_and_Drainage_Installations_52bf78052a.pdf?updated_at=2025-07-30T11:23:49.920Z",
    },
    {
        opportunity: "OPERATE AND MAINTENANCE OF STEAM SYSTEM.",
        description: "REQUEST FOR PROPOSAL FOR BUILD, OPERATE AND MAINTENANCE OF STEAM SYSTEM.",
        location: "Remote",
        opportunityType: "Tender",
        datePosted: "2023-10-05",
        closingDate: "2023-11-05",
        fileUrl: "https://cms.thenairobihosp.org/uploads/Request_for_Proposal_to_Build_Operate_and_Maintenace_of_Steam_System_a9a047b796.pdf?updated_at=2025-07-30T11:25:54.650Z",
    },
      {
        opportunity: "TRAINING AND COMMISSIONING A GEL ELECTROPHORESIS MACHINE.",
        description: "SUPPLY, DELIVERY, INSTALLATION, TESTING, AND COMMISSIONING OF A GEL ELECTROPHORESIS MACHINE.",
        location: "Remote",
        opportunityType: "Tender",
        datePosted: "2023-10-05",
        closingDate: "2023-11-05",
        fileUrl: "https://cms.thenairobihosp.org/uploads/Supply_Delivery_Installation_Testing_Training_and_Commissioning_of_a_Gel_Etlectrophororis_Machine_7604f2c22f.pdf?updated_at=2025-07-18T04:49:11.957Z",
    },
    {
        opportunity: "MEDICAL GASES INSTALLATIONS.",
        description: "PROPOSED RENOVATIONS AND REORGANIZATION WORKS AT THE DAY SURGERY UNIT (DSU) THEATRES ",
        location: "Remote",
        opportunityType: "Tender",
        datePosted: "2023-10-05",
        closingDate: "2023-11-05",
        fileUrl: "https://cms.thenairobihosp.org/uploads/Proposed_Renovations_and_Reorganization_Works_at_the_Day_Surgery_Unit_DSU_Medical_Gases_Installations_5e6c69d21c.pdf?updated_at=2025-07-30T09:56:02.197Z",
    },
       {
        opportunity: "TRAINING & COMMISSIONING OF MEDICAL AIR PLANT",
        description: "SUPPLY, DELIVERY, INSTALLATION, TESTING, AND COMMISSIONING OF A MEDICAL AIR PLANT.",
        location: "Remote",
        opportunityType: "Tender",
        datePosted: "2023-10-05",
        closingDate: "2023-11-05",
        fileUrl: "https://example.com/tender2.pdf",
    },
    {
        opportunity: "REORGANIZATION WORKS AT THE DAY SURGERY UNIT (DSU) THEATRES – MAIN WORKS.",
        description: "PROPOSED RENOVATIONS AND REORGANIZATION WORKS AT THE DAY SURGERY UNIT (DSU) THEATRES.",
        location: "Remote",
        opportunityType: "Tender",
        datePosted: "2023-10-05",
        closingDate: "2023-11-05",
        fileUrl: "https://example.com/tender2.pdf",
    },
    {
        opportunity: "SECURITY SYSTEMS INSTALLATION.",
        description: "PROPOSED RENOVATIONS AND REORGANIZATION WORKS AT THE DAY SURGERY UNIT (DSU) THEATRES – SECURITY SYSTEMS INSTALLATION.",
        location: "Remote",
        opportunityType: "Tender",
        datePosted: "2023-10-05",
        closingDate: "2023-11-05",
        fileUrl: "https://example.com/tender2.pdf",

    },
    {
        opportunity: "NURSE CALL INSTALLATIONS.",
        description: "PROPOSED RENOVATIONS AND REORGANIZATION WORKS AT THE DAY SURGERY UNIT (DSU) THEATRES – NURSE CALL INSTALLATIONS.",
        location: "Remote",
        opportunityType: "Tender",
        datePosted: "2023-10-05",
        closingDate: "2023-11-05",
        fileUrl: "https://cms.thenairobihosp.org/uploads/Proposed_Renovations_and_Reorganization_Works_at_the_Day_Surgery_Unit_DSU_Lift_Installations_91da08191c.pdf?updated_at=2025-07-30T09:55:19.243Z",
    },
    {
        opportunity: "LIFT INSTALLATION.",
        description: "PROPOSED RENOVATIONS AND REORGANIZATION WORKS AT THE DAY SURGERY UNIT (DSU) THEATRES – LIFT INSTALLATION.",
        location: "Remote",
        opportunityType: "Tender",
        datePosted: "2023-10-05",
        closingDate: "2023-11-05",
        fileUrl: "https://cms.thenairobihosp.org/uploads/Proposed_Renovations_and_Reorganization_Works_at_the_Day_Surgery_Unit_DSU_Lift_Installations_91da08191c.pdf?updated_at=2025-07-30T09:55:19.243Z",
    },
    {
        opportunity: "ICT AND STRUCTURED CABLING INSTALLATIONS.",
        description: "PROPOSED RENOVATIONS AND REORGANIZATION WORKS AT THE DAY SURGERY UNIT (DSU) THEATRES – ICT AND STRUCTURED CABLING INSTALLATIONS.",
        location: "Remote",
        opportunityType: "Tender",
        datePosted: "2023-10-05",
        closingDate: "2023-11-05",
        fileUrl: "https://cms.thenairobihosp.org/uploads/Proposed_Renovations_and_Reorganization_Works_at_the_Day_Surgery_Unit_DSU_Structured_Cabling_393e064602.pdf?updated_at=2025-07-30T11:24:49.519Z",
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
            quote: "The process of working on tenders has been a transformative experience.",
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
