import { useState, useEffect } from "react";
import TeamMembersTable from "./TeamMembersTable";
import TeamMemberForm from "./TeamMemberForm";
import { TeamMember } from "@/types";
import {
  fetchTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from "@/api/api";
import toast from "react-hot-toast";

const BoardManagement = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    async function loadMembers() {
      setLoading(true);
      try {
        const data = await fetchTeamMembers();
        setMembers(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Error loading team members");
      } finally {
        setLoading(false);
      }
    }
    loadMembers();
  }, []);

  const handleAdd = () => {
    setEditingMember(null);
    setShowForm(true);
  };

  const handleSave = async (member: TeamMember) => {
    try {
      if (editingMember) {
        const updated = await updateTeamMember(member.id, member);
        setMembers((prev) =>
          prev.map((m) => (m.id === updated.id ? updated : m))
        );
      } else {
        const created = await createTeamMember(member);
        setMembers((prev) => [...prev, created]);
      }

      setShowForm(false);
      setEditingMember(null);
      toast.success("Team member saved successfully!");
    } catch (err: any) {
      toast.error(`Error saving member: ${err.message}`);
    }
  };

  const handleDeleteClick = (id: string) => setDeleteConfirmId(id);

  const confirmDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      setDeletingId(deleteConfirmId);
      await deleteTeamMember(deleteConfirmId);
      setMembers((prev) => prev.filter((m) => m.id !== deleteConfirmId));
      setDeleteConfirmId(null);
      toast.success("Deleted successfully!");
    } catch (err: any) {
      toast.error(`Error deleting member: ${err.message}`);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Team Members</h1>
        {!showForm && !loading && (
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Add Member
          </button>
        )}
      </div>

      {loading ? (
        <p>Loading Team Members...</p>
      ) : error ? (
        <p className="text-red-500 mb-4">{error}</p>
      ) : showForm ? (
        <>
          <h2 className="text-xl font-bold mb-4">
            {editingMember ? "Edit Member" : "Add Member"}
          </h2>
          <TeamMemberForm
            initialData={editingMember}
            onSave={handleSave}
            onCancel={() => setShowForm(false)}
          />
        </>
      ) : (
        <TeamMembersTable
          data={members}
          onEdit={(member) => {
            setEditingMember(member);
            setShowForm(true);
          }}
          onDelete={handleDeleteClick}
          deletingId={deletingId}
        />
      )}

      {/* Delete Modal */}
      {deleteConfirmId &&
        (() => {
          const member = members.find((m) => m.id === deleteConfirmId);
          return (
            <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
              <div className="bg-white p-6 rounded shadow-lg w-80">
                <p className="text-lg mb-4">
                  Are you sure you want to delete{" "}
                  <strong>{member?.name}</strong>?
                </p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setDeleteConfirmId(null)}
                    className="px-4 py-2 border rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded"
                  >
                    {deletingId ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          );
        })()}
    </div>
  );
};

export default BoardManagement;
