import { useState } from "react";
import toast from "react-hot-toast";
import RichTextEditor from "@/components/RichTextEditor";
import { clinicalFaq } from "@/types/clinicalServices";

interface Props {
  initialData?: clinicalFaq | null;
  onSave: (payload: clinicalFaq) => Promise<void>;
  onCancel: () => void;
}

const requiredMark = <span className="text-red-600">*</span>;

const clinicalFaqForm: React.FC<Props> = ({
  initialData,
  onSave,
  onCancel,
}) => {
  const [question, setQuestion] = useState(initialData?.question ?? "");
  const [answer, setAnswer] = useState(initialData?.answer ?? "");

  const [questionTranslations, setQuestionTranslations] = useState({
    fr: initialData?.question_fr ?? "",
    es: initialData?.question_es ?? "",
    zh: initialData?.question_zh ?? "",
    ru: initialData?.question_ru ?? "",
  });

  const [answerTranslations, setAnswerTranslations] = useState({
    fr: initialData?.answer_fr ?? "",
    es: initialData?.answer_es ?? "",
    zh: initialData?.answer_zh ?? "",
    ru: initialData?.answer_ru ?? "",
  });

  const [openTranslations, setOpenTranslations] = useState<
    "question" | "answer" | null
  >(null);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ question?: string; answer?: string }>(
    {},
  );
  const validate = () => {
    const errs: typeof errors = {};
    if (!question.trim()) errs.question = "Question is required";
    if (!answer.trim()) errs.answer = "Answer is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix form errors.");
      return;
    }

    const payload: clinicalFaq = {
      question,
      answer,
      question_fr: questionTranslations.fr,
      question_es: questionTranslations.es,
      question_zh: questionTranslations.zh,
      question_ru: questionTranslations.ru,
      answer_fr: answerTranslations.fr,
      answer_es: answerTranslations.es,
      answer_zh: answerTranslations.zh,
      answer_ru: answerTranslations.ru,
    };

    setLoading(true);
    try {
      await onSave(payload);
      toast.success("FAQ saved successfully");
    } catch {
      toast.error("Failed to save FAQ");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Question */}
      <div>
        <label className="font-semibold">Question {requiredMark}</label>
        <input
          type="text"
          className="border p-2 w-full"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        {errors.question && (
          <p className="text-red-600 text-sm">{errors.question}</p>
        )}

        <button
          type="button"
          className="text-blue-600 text-sm underline mt-1"
          onClick={() =>
            setOpenTranslations(
              openTranslations === "question" ? null : "question",
            )
          }
        >
          {openTranslations === "question"
            ? "Hide Translations"
            : "Show Question Translations"}
        </button>

        {openTranslations === "question" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
            {(["fr", "es", "zh", "ru"] as const).map((lang) => (
              <input
                key={lang}
                type="text"
                placeholder={`Question (${lang})`}
                className="border p-2"
                value={questionTranslations[lang]}
                onChange={(e) =>
                  setQuestionTranslations((prev) => ({
                    ...prev,
                    [lang]: e.target.value,
                  }))
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* Answer */}
      <div>
        <label className="font-semibold">Answer {requiredMark}</label>
        <RichTextEditor
          value={answer}
          onChange={(html) => setAnswer(html)}
          placeholder="Enter answer..."
          minHeight="150px"
        />
        {errors.answer && (
          <p className="text-red-600 text-sm">{errors.answer}</p>
        )}

        <button
          type="button"
          className="text-blue-600 text-sm underline mt-1"
          onClick={() =>
            setOpenTranslations(openTranslations === "answer" ? null : "answer")
          }
        >
          {openTranslations === "answer"
            ? "Hide Translations"
            : "Show Answer Translations"}
        </button>

        {openTranslations === "answer" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
            {(["fr", "es", "zh", "ru"] as const).map((lang) => (
              <RichTextEditor
                key={lang}
                value={answerTranslations[lang]}
                onChange={(html) =>
                  setAnswerTranslations((prev) => ({
                    ...prev,
                    [lang]: html,
                  }))
                }
                placeholder={`Answer (${lang})`}
                minHeight="120px"
              />
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded"
          disabled={loading}
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-green-600"
          }`}
        >
          {loading ? "Saving..." : "Save FAQ"}
        </button>
      </div>
    </form>
  );
};

export default clinicalFaqForm;
