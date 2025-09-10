import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQsProps {
  faqData: FAQ[];
  imageUrl?: string;
  imageAlt?: string;
}

export default function FAQs({ faqData, imageAlt, imageUrl }: FAQsProps) {
  return (
    <section className=" w-full">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
        {/* Image */}
        {imageUrl && (
          <div className="w-full md:w-1/2">
            <img
              src={imageUrl}
              alt={imageAlt}
              className="rounded-xl shadow-md object-cover w-full h-auto"
            />
          </div>
        )}

        {/* Accordion */}
        <div className={`w-full  ${imageUrl ? "md:w-1/2" : ""}`}>
          <Accordion
            type="single"
            collapsible
            className="flex flex-col w-full gap-2"
            defaultValue="item-0"
          >
            {faqData.map((faq, index) => (
              <AccordionItem
                className="border border-red-900 px-2 rounded last:border"
                key={index}
                value={`item-${index}`}
              >
                <AccordionTrigger className=" font-serif text-red-900 text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
