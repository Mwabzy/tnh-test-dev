import { FC } from "react";
import { EMAIL_STATUS_FAILED, EMAIL_STATUS_SENT } from "@/types";

interface EmailStatusBadgeProps {
  status?: string | null;
}

const STYLES: Record<string, string> = {
  [EMAIL_STATUS_SENT]: "bg-green-100 text-green-800 border-green-300",
  [EMAIL_STATUS_FAILED]: "bg-red-100 text-red-800 border-red-300",
};

const LABELS: Record<string, string> = {
  [EMAIL_STATUS_SENT]: "Email sent",
  [EMAIL_STATUS_FAILED]: "Email not sent",
};

const EmailStatusBadge: FC<EmailStatusBadgeProps> = ({ status }) => {
  if (!status) return <span className="text-gray-400">-</span>;

  // Statuses other than sent/not sent (e.g. "pending", or "pre-update" on
  // older rows) stay neutral rather than implying success or failure.
  const style = STYLES[status] ?? "bg-gray-100 text-gray-700 border-gray-300";

  return (
    <span
      className={`inline-block whitespace-nowrap rounded-full border px-3 py-1 text-xs font-semibold ${style}`}
    >
      {LABELS[status] ?? status}
    </span>
  );
};

export default EmailStatusBadge;
