import { Badge } from "@/components/ui/badge";
import { FC } from "react";

export interface Opportunity {
  opportunity: string;
  description?: string;
  location?: string;
  referenceNumber?: string;
  opportunityType: string;
  datePosted: string;
  closingDate?: string;
  fileUrl: string;
}

interface OpportunityItemProps {
  opportunity: Opportunity;
}

const formatDate = (value?: string) => {
  if (!value) return "-";
  const parts = value.split("-").map((part) => Number(part));
  if (parts.length !== 3 || parts.some((part) => Number.isNaN(part))) {
    return value;
  }
  const [year, month, day] = parts;
  const date = new Date(year, month - 1, day);
  if (Number.isNaN(date.getTime())) return value;

  const monthName = date.toLocaleString("en-US", { month: "long" });
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
          ? "rd"
          : "th";

  return `${day}${suffix} ${monthName} ${year}`;
};

const OpportunityItem: FC<OpportunityItemProps> = ({ opportunity }) => {
  const closingDate = formatDate(opportunity.closingDate);

  return (
    <tr className="border-b border-red-200">
      <td className="p-3 text-sm text-gray-800 font-medium whitespace-nowrap">
        {opportunity.referenceNumber || "-"}
      </td>
      <td className="p-3">
        <div className="font-semibold text-gray-900">
          {opportunity.opportunity}
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {opportunity.location && (
            <Badge className="bg-orange-100 text-orange-700">
              {opportunity.location}
            </Badge>
          )}
          {opportunity.opportunityType && (
            <Badge className="bg-orange-100 text-orange-700">
              {opportunity.opportunityType}
            </Badge>
          )}
        </div>
      </td>
      <td className="p-3 text-sm text-gray-800 whitespace-nowrap">
        {closingDate}
      </td>
      <td className="p-3 text-sm">
        {opportunity.fileUrl ? (
          <a
            href={opportunity.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-700 font-semibold hover:underline"
          >
            View More
          </a>
        ) : (
          <span className="text-gray-400">No file</span>
        )}
      </td>
    </tr>
  );
};

export default OpportunityItem;
