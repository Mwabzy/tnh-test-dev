import { HeroSlide } from "@/types";

type Props = {
  data: HeroSlide[];
  onEdit: (slide: HeroSlide) => void;
  onDelete: (id: number) => void;
  deletingId: number | null;
};

const HeroTable = ({ data, onEdit, onDelete, deletingId }: Props) => {
  if (!data.length) return <p>No slides found.</p>;

  const sorted = [...data].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return (
    <div className="overflow-x-auto border rounded">
      <table className="w-full text-left">
        <thead className="bg-gray-50">
          <tr className="text-sm">
            <th className="p-3">Title</th>
            <th className="p-3">Image Key</th>
            <th className="p-3">Order</th>
            <th className="p-3">Active</th>
            <th className="p-3 w-[180px]">Actions</th>
          </tr>
        </thead>

        <tbody>
          {sorted.map((s) => (
            <tr key={s.id} className="border-t">
              <td className="p-3">
                <div className="font-medium">{s.title}</div>
                <div className="text-sm text-gray-600 line-clamp-2">
                  {s.description}
                </div>
              </td>
              <td className="p-3">{s.imageKey}</td>
              <td className="p-3">{s.order ?? 0}</td>
              <td className="p-3">{s.isActive ? "Yes" : "No"}</td>
              <td className="p-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(s)}
                    className="px-3 py-1 border rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(s.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                    disabled={deletingId === s.id}
                  >
                    {deletingId === s.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HeroTable;
