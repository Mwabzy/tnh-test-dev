import Heading from "@/components/Heading";
import React, { useEffect, useState } from "react";
import { useIntlayer } from "react-intlayer";

// Main History Section
const History: React.FC = () => {
  const content = useIntlayer("historySection");
  return (
    <>
      <Heading
        image_url="https://cms.thenairobihosp.org/uploads/who_we_are_8fbeb1073c.jpg"
        style="image"
        title={content.title[0]?.value ?? ""}
        description={content.historydescription[0]?.value ?? ""}
      />

      <section className="bg-gray-50 py-12 px-4">
        <div>
          <div className="max-w-7xl mx-auto bg-white  rounded-lg shadow-lg p-4 mb-7">
            <div className="flex flex-col md:flex-row gap-4 item-center">
              <div>
                <img
                  src="https://cms.thenairobihosp.org/uploads/key_milestones_2133f54e6e.jpg"
                  alt="Milestone Visual"
                  className="rounded-md shadow"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-2xl font-semibold text-red-900 font-serif mb-2">
                  {content.milestonetitle}
                </h3>
                <p className="text-gray-600 text-lg mb-4">
                  {content.milestoneDescription}
                </p>
                <MilestoneCarousel />
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-red-900 mb-6 text-center">
              {content.richHistorytitle}
            </h1>
            <p>{content.richHistorydescription}</p>
          </div>
          <div className="flex justify-between items-center my-11 max-w-7xl mx-auto flex-col md:flex-row">
            <div className="w-full md:w-[50%]">
              <h1 className="text-4xl font-medium font-serif text-left text-red-900">
                {content.timelinetitle}
              </h1>
              <p className="text-gray-700 text-sm leading-relaxed mt-4">
                {content.timelineDescription}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center w-full md:w-[40%] bg-red-900 rounded-lg shadow-lg px-6 py-4 text-white mt-8 md:mt-0">
              <div className="p-4">
                <h2 className="text-2xl font-medium font-serif mb-4">
                  {content.historyFirsttittle}
                </h2>
                <p className=" mb-4 text-sm">
                  {content.historyFirstDescription}
                </p>
                <ul className="text-gray-200 text-sm space-y-2 list-disc list-item">
                  <li>{content.history1}</li>
                  <li>{content.history2}</li>
                  <li>{content.history3}</li>
                  <li>{content.history4}</li>
                  <li>{content.history5}</li>
                  <li>{content.history6}</li>
                  <li>{content.history7}</li>
                  <li>{content.history8}</li>
                  <li>{content.history9}</li>
                  <li>{content.history10}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// Milestone Carousel Component
const MilestoneCarousel: React.FC = () => {
  const milestones = [
    "1974: We performed the first Kidney transplant in Africa",
    "1981: First private hospital in East Africa to establish a Cardiac Unit",
    "1992: Launched the first Cancer Treatment Centre in the region",
    "2000: Introduced the first digital radiology system in Kenya",
    "2015: Pioneered robotic surgery in private healthcare",
    "2022: Opened the most advanced private ICU in East Africa",
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % milestones.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [milestones.length]);

  return (
    <div className="">
      <div className="border-l-4 border-red-900 pl-4 text-red-900 font-semibold text-lg transition-all duration-500 ease-in-out min-h-[48px] flex items-center">
        {milestones[current]}
      </div>

      <div className="mt-4 flex space-x-2">
        {milestones.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              current === index ? "bg-red-700" : "bg-gray-300"
            }`}
            aria-label={`Go to milestone ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default History;
