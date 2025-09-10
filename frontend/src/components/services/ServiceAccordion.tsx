import { useState } from "react";

// Accordion Component for FAQs
const ServiceAccordion: React.FC<{ faqs: { question: string; answer: string }[] }> = ({
  faqs,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="border rounded-lg shadow-sm bg-white px-6 py-2">
          <button
            className="w-full text-left py-3 flex justify-between items-center"
            onClick={() => toggleAccordion(index)}
            aria-expanded={openIndex === index}
            aria-controls={`faq-${index}`}
          >
            <span className="font-medium">{faq.question}</span>
            <span className="text-gray-500 text-lg">{openIndex === index ? "-" : "+"}</span>
          </button>
          {openIndex === index && (
            <div id={`faq-${index}`} className="pb-3 text-gray-600">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ServiceAccordion;