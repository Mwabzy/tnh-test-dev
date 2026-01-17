import { outpatientCenter } from "@/types";

interface Props {
  data: outpatientCenter[];
  onEdit: (center: outpatientCenter) => void;
  onDelete: (id: number) => void;
  deletingId: number | null;
}

const OutpatientCenterTable = ({
  data,
  onEdit,
  onDelete,
  deletingId,
}: Props) => {
  if (data.length === 0) {
    return <p className="text-gray-500">No centers available</p>;
  }

  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2">Name</th>
          <th className="p-2">Location</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>

      <tbody>
        {data.map((center) => (
          <tr key={center.id} className="border-t">
            <td className="p-2">{center.name}</td>
            <td className="p-2">{center.location}</td>
            <td className="p-2 flex gap-2">
              <button
                onClick={() => onEdit(center)}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => onDelete(center.id!)}
                disabled={deletingId === center.id}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                {deletingId === center.id ? "Deleting..." : "Delete"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OutpatientCenterTable;
