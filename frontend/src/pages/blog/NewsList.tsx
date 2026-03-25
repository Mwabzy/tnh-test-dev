import Posts from "@/components/blog/Posts";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  fetchCorporateDocuments,
  fetchInterviews,
  fetchPublicStatements,
} from "@/api/api";
import { CorporateDocument, Interview, PublicStatement } from "@/types";

const slideUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const toEmbedUrl = (url: string) => {
  if (!url) return "";
  if (url.includes("youtube.com/embed/")) return url;

  const shortMatch = url.match(/youtu\.be\/([^?&#/]+)/);
  const watchMatch = url.match(/v=([^&#]+)/);
  const embedMatch = url.match(/embed\/([^?&#/]+)/);
  const shortsMatch = url.match(/shorts\/([^?&#/]+)/);

  const videoId =
    embedMatch?.[1] || watchMatch?.[1] || shortMatch?.[1] || shortsMatch?.[1];

  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
};

const NewsList = () => {
  const [showAllStatements, setShowAllStatements] = useState(false);
  const [showAllDocuments, setShowAllDocuments] = useState(false);
  const [statements, setStatements] = useState<PublicStatement[]>([]);
  const [documents, setDocuments] = useState<CorporateDocument[]>([]);
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loadingSections, setLoadingSections] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const interviewsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadSections = async () => {
      try {
        setLoadingSections(true);
        const [statementsData, documentsData, interviewsData] =
          await Promise.all([
            fetchPublicStatements(),
            fetchCorporateDocuments(),
            fetchInterviews(),
          ]);

        if (!isMounted) return;
        setStatements(statementsData);
        setDocuments(documentsData);
        setInterviews(interviewsData);
        setLoadError(null);
      } catch (err) {
        if (!isMounted) return;
        setLoadError("Unable to load updates right now.");
      } finally {
        if (isMounted) {
          setLoadingSections(false);
        }
      }
    };

    loadSections();
    return () => {
      isMounted = false;
    };
  }, []);

  const publishedStatements = statements.filter(
    (item) => item.isPublished !== false,
  );
  const publishedDocuments = documents.filter(
    (item) => item.isPublished !== false,
  );
  const publishedInterviews = interviews.filter(
    (item) => item.isPublished !== false,
  );

  const visibleStatements = showAllStatements
    ? publishedStatements
    : publishedStatements.slice(0, 6);

  const visibleDocuments = showAllDocuments
    ? publishedDocuments
    : publishedDocuments.slice(0, 6);

  const scrollInterviews = (direction: "left" | "right") => {
    if (!interviewsRef.current) return;
    const { clientWidth } = interviewsRef.current;
    const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
    interviewsRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <>
      <section className="px-6 py-12 max-w-7xl mx-auto">
        <motion.div
          variants={slideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                News Articles
              </h2>
              <p className="text-2xl md:text-gray-600 mt-2">
                Stay informed about the latest news around The Nairobi Hospital.
              </p>
            </div>
          </div>

          <div className="">
            <Posts group="NEWS" />
          </div>
        </motion.div>
      </section>

      <section className="px-6 py-12 max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Public Statements
          </h2>
        </div>

        {loadError && (
          <p className="text-sm text-red-600 mb-4">{loadError}</p>
        )}

        {loadingSections ? (
          <p className="text-sm text-gray-500">Loading statements...</p>
        ) : visibleStatements.length === 0 ? (
          <p className="text-sm text-gray-500">No public statements yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleStatements.map((item) => (
              <div
                key={item.id}
                className="rounded-xl bg-[#F7EFEF] p-5 shadow-sm flex flex-col gap-4"
              >
                <p className="text-sm font-semibold text-red-900">
                  {item.title}
                </p>
                {item.fileUrl ? (
                  <a
                    href={item.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-fit inline-flex items-center gap-2 rounded-full bg-[#B86A14] px-4 py-2 text-sm font-semibold text-white"
                  >
                    View
                  </a>
                ) : (
                  <span className="w-fit inline-flex items-center gap-2 rounded-full bg-[#B86A14]/60 px-4 py-2 text-sm font-semibold text-white">
                    View
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {publishedStatements.length > 6 && (
          <div className="mt-8">
            <button
              type="button"
              onClick={() => setShowAllStatements((prev) => !prev)}
              className="inline-flex items-center gap-2 text-red-900 font-semibold hover:underline"
            >
              {showAllStatements ? "View less" : "View more"}
              {!showAllStatements && <span aria-hidden>-&gt;</span>}
            </button>
          </div>
        )}
      </section>

      <section className="px-6 py-12 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Interviews
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollInterviews("left")}
              className="h-10 w-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
              aria-label="Previous interviews"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollInterviews("right")}
              className="h-10 w-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
              aria-label="Next interviews"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {loadingSections ? (
          <p className="text-sm text-gray-500">Loading interviews...</p>
        ) : publishedInterviews.length === 0 ? (
          <p className="text-sm text-gray-500">No interviews yet.</p>
        ) : (
          <div
            ref={interviewsRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2"
          >
            {publishedInterviews.map((video) => (
              <div
                key={video.id}
                className="snap-start w-full sm:w-[60%] md:w-[48%] lg:w-[32%] flex-shrink-0"
              >
                <div className="aspect-video rounded-xl overflow-hidden shadow-md bg-black">
                  <iframe
                    src={toEmbedUrl(video.videoUrl)}
                    title={video.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <p className="mt-3 text-sm font-semibold text-red-900">
                  {video.title}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="px-6 py-12 max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Corporate Documents
          </h2>
        </div>

        {loadingSections ? (
          <p className="text-sm text-gray-500">Loading documents...</p>
        ) : visibleDocuments.length === 0 ? (
          <p className="text-sm text-gray-500">No corporate documents yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleDocuments.map((item) => (
              <div
                key={item.id}
                className="rounded-xl bg-[#F7EFEF] p-5 shadow-sm flex flex-col gap-4"
              >
                <p className="text-sm font-semibold text-red-900">
                  {item.title}
                </p>
                {item.fileUrl ? (
                  <a
                    href={item.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-fit inline-flex items-center gap-2 rounded-full bg-[#B86A14] px-4 py-2 text-sm font-semibold text-white"
                  >
                    View
                  </a>
                ) : (
                  <span className="w-fit inline-flex items-center gap-2 rounded-full bg-[#B86A14]/60 px-4 py-2 text-sm font-semibold text-white">
                    View
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {publishedDocuments.length > 6 && (
          <div className="mt-8">
            <button
              type="button"
              onClick={() => setShowAllDocuments((prev) => !prev)}
              className="inline-flex items-center gap-2 text-red-900 font-semibold hover:underline"
            >
              {showAllDocuments ? "View less" : "View more"}
              {!showAllDocuments && <span aria-hidden>-&gt;</span>}
            </button>
          </div>
        )}
      </section>
    </>
  );
};

export default NewsList;
