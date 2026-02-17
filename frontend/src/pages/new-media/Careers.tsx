import { fetchJobListings } from "@/api/api";
import OpportunityTemplate from "./opportunity/OpportunityTemplate";
import { FC, useEffect, useState } from "react";
import { PAGE_CONTACT_INFO } from "@/lib/contactInfo";
import { Opportunity } from "./opportunity/OpportunityItem";

type CareersProps = {};

const Careers: FC<CareersProps> = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);

  useEffect(() => {
    const loadCareers = async () => {
      try {
        const response = await fetchJobListings();
        const items = Array.isArray(response)
          ? response
          : Array.isArray(response?.results)
            ? response.results
            : Array.isArray(response?.data)
              ? response.data
              : [];

        const mapped: Opportunity[] = items.map((item: any) => ({
          opportunity: String(item?.opportunity ?? item?.title ?? "").trim(),
          description: String(item?.description ?? "").trim(),
          location: item?.location ? String(item.location).trim() : undefined,
          opportunityType: String(
            item?.opportunityType ?? item?.opportunity_type ?? "Career",
          ).trim(),
          datePosted: String(item?.datePosted ?? item?.date_posted ?? "").trim(),
          closingDate: item?.closingDate ?? item?.closing_date ?? undefined,
          fileUrl: String(item?.fileUrl ?? item?.file_url ?? item?.file ?? ""),
        }));

        setOpportunities(mapped);
      } catch (error) {
        console.error("Failed to fetch careers:", error);
        setOpportunities([]);
      }
    };

    loadCareers();
  }, []);

  return (
    <div>
      <OpportunityTemplate
        title="Join Our Team"
        description="Explore exciting career opportunities with us."
        testimonials={[
          {
            name: "Jane Doe",
            title: "Software Engineer",
            quote: "Working here has been a transformative experience.",
            image:
              "https://www.freepik.com/free-psd/happy-woman-dancing-isolated_269178755.htm#fromView=search&page=1&position=11&uuid=4341da1b-d692-4ffc-88ff-f2b7a82b674c&query=peoplee.jpg",
          },
          {
            name: "John Smith",
            title: "Product Manager",
            quote: "The team is incredibly supportive and innovative.",
            image:
              "https://www.freepik.com/free-photo/portrait-smart-professional-african-american-man-standing-with-hands-crossed-chest-confident-pose_16080284.htm#fromView=search&page=1&position=10&uuid=4341da1b-d692-4ffc-88ff-f2b7a82b674c&query=people",
          },
        ]}
        contactInfo={PAGE_CONTACT_INFO}
        opportunities={opportunities}
      />
    </div>
  );
};

export default Careers;
