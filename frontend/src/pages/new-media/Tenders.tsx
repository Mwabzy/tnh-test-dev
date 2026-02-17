import { fetchTenders } from "@/api/api";
import { FC, useEffect, useState } from "react";
import { PAGE_CONTACT_INFO } from "@/lib/contactInfo";
import { Opportunity } from "./opportunity/OpportunityItem";
import OpportunityTemplate from "./opportunity/OpportunityTemplate";

type TendersProps = {};

const Tenders: FC<TendersProps> = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);

  useEffect(() => {
    const loadTenders = async () => {
      try {
        const response = await fetchTenders();
        const items = Array.isArray(response)
          ? response
          : Array.isArray(response?.results)
            ? response.results
            : Array.isArray(response?.data)
              ? response.data
              : [];

        const mapped: Opportunity[] = items.map((item: any) => ({
          opportunity: String(item?.opportunity ?? item?.title ?? "").trim(),
          referenceNumber: item?.referenceNumber ?? item?.reference_number,
          description: String(item?.description ?? "").trim(),
          opportunityType: String(
            item?.opportunityType ?? item?.opportunity_type ?? "Tender",
          ).trim(),
          datePosted: String(item?.datePosted ?? item?.date_posted ?? "").trim(),
          closingDate: item?.closingDate ?? item?.closing_date ?? undefined,
          fileUrl: String(item?.fileUrl ?? item?.file_url ?? item?.file ?? ""),
        }));

        setOpportunities(mapped);
      } catch (error) {
        console.error("Failed to fetch tenders:", error);
        setOpportunities([]);
      }
    };

    loadTenders();
  }, []);

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
        contactInfo={PAGE_CONTACT_INFO}
        opportunities={opportunities}
      />
    </div>
  );
};

export default Tenders;
