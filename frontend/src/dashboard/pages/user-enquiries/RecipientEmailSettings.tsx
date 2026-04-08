import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  fetchRecipientEmailSettings,
  updateRecipientEmailSetting,
} from "@/api/api";
import {
  RecipientEmailSetting,
  USER_ENQUIRY_CATEGORIES,
} from "@/types";
import { USER_ENQUIRY_RECIPIENT_MAP } from "@/config/userEnquiries";

const RecipientEmailSettingsPage = () => {
  const [settings, setSettings] = useState<RecipientEmailSetting[]>([]);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [savingCategory, setSavingCategory] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadSettings() {
      setLoading(true);
      try {
        const data = await fetchRecipientEmailSettings();
        const normalized = USER_ENQUIRY_CATEGORIES.map((category) => {
          const existing = data.find(
            (item: RecipientEmailSetting) => item.category === category,
          );
          return (
            existing ?? {
              id: category,
              category,
              email: USER_ENQUIRY_RECIPIENT_MAP[category],
              createdAt: "",
              updatedAt: "",
            }
          );
        });
        setSettings(normalized);
        setDrafts(
          Object.fromEntries(
            normalized.map((item) => [item.category, item.email]),
          ),
        );
        setError(null);
      } catch (err) {
        console.error("Error loading recipient email settings:", err);
        setError("Error loading recipient email settings.");
      } finally {
        setLoading(false);
      }
    }

    loadSettings();
  }, []);

  const handleSave = async (setting: RecipientEmailSetting) => {
    const nextEmail = (drafts[setting.category] ?? "").trim();
    if (!nextEmail) {
      toast.error("Email address is required.");
      return;
    }

    setSavingCategory(setting.category);
    try {
      const updated = await updateRecipientEmailSetting(setting.id, {
        email: nextEmail,
      });
      setSettings((prev) =>
        prev.map((item) => (item.category === updated.category ? updated : item)),
      );
      setDrafts((prev) => ({ ...prev, [updated.category]: updated.email }));
      toast.success(`${setting.category} recipient updated.`);
    } catch (err) {
      console.error("Error updating recipient email:", err);
      toast.error("Failed to update recipient email.");
    } finally {
      setSavingCategory(null);
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Recipient Emails</h1>
      </div>

      {loading ? (
        <p>Loading recipient email settings...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="bg-white shadow rounded-lg p-6 space-y-4">
          {settings.map((setting) => (
            <div
              key={setting.category}
              className="grid grid-cols-1 md:grid-cols-[220px_1fr_140px] gap-4 items-end border-b pb-4 last:border-b-0"
            >
              <div>
                <label className="font-medium block mb-1">Category</label>
                <input
                  type="text"
                  className="border p-2 w-full bg-gray-100"
                  value={setting.category}
                  readOnly
                />
              </div>
              <div>
                <label className="font-medium block mb-1">Recipient Email</label>
                <input
                  type="email"
                  className="border p-2 w-full"
                  value={drafts[setting.category] ?? ""}
                  onChange={(e) =>
                    setDrafts((prev) => ({
                      ...prev,
                      [setting.category]: e.target.value,
                    }))
                  }
                />
              </div>
              <button
                type="button"
                onClick={() => handleSave(setting)}
                disabled={savingCategory === setting.category}
                className="px-4 py-2 rounded text-white bg-green-600 disabled:bg-gray-400"
              >
                {savingCategory === setting.category ? "Saving..." : "Save"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipientEmailSettingsPage;
