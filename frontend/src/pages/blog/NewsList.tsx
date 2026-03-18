import Posts, { Post } from "@/components/blog/Posts";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slideUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

export const blogPosts = [
  {
    id: 1,
    isFeatured: true,
    author: "By John Doe",
    title: "10 Warning Signs of a Heart Attack You Shouldn't Ignore",
    subtitle: "Early recognition could save a life—possibly your own.",
    // blogsubtitle: "Learn about the warning signs of a heart attack.",
    description: "Learn how cognitive biases affect decision-making.",
    shortdesc: `When we think of a heart attack, we often picture someone clutching
            their chest in pain. But in reality, heart attack symptoms can be
            far more subtle—and they vary significantly between men and women.
            Heart disease remains the leading cause of death worldwide, but with
            early detection and immediate action, many lives can be saved.
            Whether you're reading this for yourself, a loved one, or a patient,
            understanding the warning signs of a heart attack is crucial.`,
    longdesc: `A heart attack doesn’t always start with a dramatic collapse or sharp chest pain—in fact, many begin with subtle symptoms that are easy to dismiss. Recognizing these warning signs early can make the difference between life and death. Common indicators include chest discomfort, shortness of breath, nausea, pain in the arms or jaw, cold sweats, and extreme fatigue. These symptoms may vary between men and women, with women more likely to experience back pain, indigestion, or overwhelming tiredness. If you or someone near you is experiencing multiple symptoms—especially if they come on suddenly—don’t wait. Call emergency services immediately. Fast action saves lives.`,
    category: "Health & Awareness",
    date: "December 5, 2024",
    coverImage:
      "https://img.freepik.com/free-photo/view-anatomic-heart-model-educational-purpose-with-stethoscope_23-2149894392.jpg?uid=R173174302&ga=GA1.1.561176189.1745317904&semt=ais_hybrid&w=740",

    image:
      "https://mma.prnewswire.com/media/930108/Frost_Sullivan_Operating_Room_Healthcare.jpg?p=facebook",
  },
  {
    id: 2,
    author: "By Gareth Bale",
    title: "Understanding Diabetes: Symptoms, Causes, and Management Tips",
    subtitle: "Early recognition could save a life—possibly your own.",
    blogsubtitle:
      "Explore the key strategies to manage diabetes and improve quality of life.",
    description:
      "Discover the core principles, mental benefits, and practical techniques of mindfulness to enhance focus, reduce stress, and improve overall well-being.",
    shortdesc:
      "When we think of diabetes, we often imagine high blood sugar and insulin injections. But the reality is more complex—and the warning signs can be subtle. Diabetes affects millions globally and is a leading cause of serious complications if left unmanaged. With early recognition and the right lifestyle changes or treatments, individuals can live long, healthy lives. Whether you're newly diagnosed, at risk, or supporting someone who is, understanding diabetes is the first step toward effective care.",
    longdesc:
      "Diabetes is a chronic condition that affects how your body processes blood sugar (glucose). Early detection and management are crucial to prevent complications such as nerve damage, kidney failure, and cardiovascular disease. This article breaks down the common symptoms of diabetes, explores contributing factors, and provides practical tips for day-to-day management. Whether you’re newly diagnosed or seeking to support a loved one, this guide offers valuable insights for a healthier future.Here are the most frequently reported symptoms. Not everyone will experience all of them, and they can range in intensity.",
    category: "Health & Awareness",
    coverImage:
      "https://img.freepik.com/free-photo/high-angle-woman-checking-glucose-levels_23-2150775247.jpg?uid=R173174302&ga=GA1.1.561176189.1745317904&semt=ais_hybrid&w=740",
    image:
      "https://img.freepik.com/free-photo/high-angle-diabetic-woman-checking-her-glucose-level_23-2150775197.jpg?uid=R173174302&ga=GA1.1.561176189.1745317904&semt=ais_hybrid&w=740",
  },
  {
    id: 3,
    author: "By Emmanuel M.",
    title: "What to Expect During a Colonoscopy",
    subtitle: "Early recognition could save a life—possibly your own.",
    blogsubtitle:
      "Early detection saves lives—especially when it comes to colon cancer.",
    description:
      "Learn the essential purpose, preparation steps, and health benefits of a colonoscopy to detect issues early.",
    shortdesc:
      "When we think of cancer screening, colonoscopy might not be the first test that comes to mind. But this simple procedure can detect early signs of colorectal cancer—often before symptoms even appear. Colon cancer is one of the most preventable yet deadly cancers when left undiagnosed. Through early detection and timely treatment, lives can be saved. Whether you're approaching the recommended screening age or supporting a loved one, understanding colonoscopy is key to proactive health care.",
    longdesc:
      "Here are the most frequently reported symptoms. Not everyone will experience all of them, and they can range in intensity.",
    category: "Health & Awareness",
    coverImage:
      "https://img.freepik.com/free-photo/pain-stomache-old-senior-asian-grandfather-patient-uniform-suffer-from-body-problem-health-ideas-concept_609648-2289.jpg?uid=R173174302&ga=GA1.1.561176189.1745317904&semt=ais_hybrid&w=740",
    image:
      "https://img.freepik.com/free-photo/dissatisfied-woman-touches-belly-suffers-from-painful-cramps-frowns-face-dressed-sportclothes_273609-33747.jpg?uid=R173174302&ga=GA1.1.561176189.1745317904&semt=ais_hybrid&w=740",
  },
  {
    id: 4,
    author: "Ian",
    title: "Flu vs. COVID-19 vs. RSV: What’s the Difference?",
    subtitle: "Early recognition could save a life—possibly your own.",
    blogsubtitle: "Knowledge is protection—stay informed to stay safe.",
    description: "Flu vs. COVID-19 vs. RSV: What’s the Difference?",
    shortdesc:
      "COVID-19 changed the world seemingly overnight, disrupting daily life and challenging global healthcare systems. But beyond the headlines and misinformation, understanding how the virus spreads and what symptoms to look out for remains crucial. With new variants still emerging, prevention and early detection are key to controlling outbreaks and protecting vulnerable populations. Whether you're seeking guidance for yourself, your family, or your community, staying informed is your first line of defense.",
    longdesc:
      "COVID-19 is a highly contagious respiratory illness caused by the SARS-CoV-2 virus. It spreads primarily through respiratory droplets and can cause a range of symptoms—from mild fatigue to severe respiratory failure. While most people recover without complications, older adults and those with underlying health conditions are at higher risk. This article provides a clear overview of the common symptoms, how the virus spreads, current prevention recommendations (including vaccination), and what to do if you or someone close to you tests positive.",
    category: "Medical News & Updates",
    coverImage:
      "https://img.freepik.com/free-photo/3d-interior-supermarket-with-empty-shelves-covid-19-virus-cells_1048-12466.jpg?uid=R173174302&ga=GA1.1.561176189.1745317904&semt=ais_hybrid&w=740",
    image:
      "https://img.freepik.com/free-photo/man-looking-his-covid-test_23-2149141935.jpg?uid=R173174302&ga=GA1.1.561176189.1745317904&semt=ais_hybrid&w=740",
  },
  {
    id: 5,
    author: "By Ganacho",
    title: "How Jane Beat Breast Cancer with the Help of Our Oncology Team",
    subtitle: "Early recognition could save a life—possibly your own.",
    blogsubtitle: "Early detection saves lives—know the signs, know your risk",
    description: "Discover effective mindfulness practices.",
    shortdesc:
      "Breast cancer is one of the most common cancers affecting women worldwide, yet many cases are treatable when caught early. The signs can be subtle—a lump, skin changes, or unusual discharge—and often go unnoticed without regular screening. Knowing what to look for and understanding your personal risk can make a life-saving difference. Whether you're doing self-exams or considering a mammogram, being informed is the first step in protecting your health.",
    longdesc:
      "Breast cancer develops when abnormal cells in the breast grow uncontrollably. It can affect both women and, more rarely, men. Risk factors include age, family history, genetic mutations (such as BRCA1/2), and lifestyle choices. While not all breast changes mean cancer, it’s essential to pay attention to symptoms such as lumps, nipple changes, skin dimpling, or swelling. This article explains how breast cancer forms, outlines key risk factors, and highlights the importance of early detection methods such as mammograms, ultrasounds, and self-exams",
    category: "Patient Stories and Testimonials",
    coverImage:
      "https://img.freepik.com/premium-photo/woman-she-have-pink-breast-cancer-awareness-ribbon-chest-she-hold-breast-by-hand_143683-632.jpg?uid=R173174302&ga=GA1.1.561176189.1745317904&semt=ais_hybrid&w=740",
    image:
      "https://img.freepik.com/free-photo/smiling-woman-with-red-flower_1187-1255.jpg?uid=R173174302&ga=GA1.1.561176189.1745317904&semt=ais_hybrid&w=740",
  },
  {
    id: 6,
    author: "By Antonio Rodriges",
    title: "How to Manage Stress with Mindfulness Techniques",
    subtitle: "Early recognition could save a life—possibly your own.",
    blogsubtitle: "Find calm in the chaos—your mind deserves peace.",
    description: "Discover effective mindfulness practices.",
    shortdesc:
      "In today’s fast-paced world, stress is almost unavoidable—but how we respond to it makes all the difference. Mindfulness offers a powerful, science-backed way to calm the mind, reduce anxiety, and stay grounded in the present. Whether it’s through breathing exercises, guided meditation, or mindful movement, these techniques help build resilience and emotional balance. If you're feeling overwhelmed or simply seeking a healthier state of mind, mindfulness is a great place to start.",
    longdesc:
      "Stress affects us physically, emotionally, and mentally. Over time, chronic stress can lead to burnout, anxiety, high blood pressure, and weakened immunity. Mindfulness is the practice of paying full attention to the present moment—without judgment. It helps slow racing thoughts, increase awareness, and regulate emotional responses. This guide introduces mindfulness basics and shares practical techniques such as body scans, mindful breathing, meditation, and journaling. Whether you're new to mindfulness or looking to deepen your practice, these tools can help you manage stress more effectively and live more fully.",
    category: "Wellness & Prevention",
    image:
      "https://img.freepik.com/free-photo/stressed-woman-touching-his-head_53876-137698.jpg?uid=R173174302&ga=GA1.1.561176189.1745317904&semt=ais_hybrid&w=740",
  },
] as Post[];

const publicStatements = [
  { id: 1, title: "TNH News Letter" },
  { id: 2, title: "Old Mutual General Insurance Kenya Suspension Lift" },
  { id: 3, title: "First Assurance Suspension Lift" },
  { id: 4, title: "Position Statement" },
  { id: 5, title: "TNH Privacy Notice" },
  { id: 6, title: "Notification of New Chairman" },
  { id: 7, title: "Changes in Senior Leadership" },
  { id: 8, title: "Announcement of Election of Board Members" },
  { id: 9, title: "Annual General Meeting Poll Results Announcement 2024" },
  { id: 10, title: "Kenya Hospital Association AGM Voting Results 2024" },
  { id: 11, title: "Notice of Annual General Meeting for the Year 2024" },
  { id: 12, title: "Notification of the Date for the Conduct of AGM 2024" },
];

const corporateDocuments = [
  { id: 1, title: "Corporate Governance Charter" },
  { id: 2, title: "Strategic Plan Highlights 2024–2028" },
  { id: 3, title: "Annual Report 2024" },
  { id: 4, title: "Quality & Safety Policy" },
  { id: 5, title: "Sustainability Report 2024" },
  { id: 6, title: "Code of Conduct" },
  { id: 7, title: "Procurement Policy" },
  { id: 8, title: "Risk Management Framework" },
  { id: 9, title: "Patient Rights & Responsibilities" },
  { id: 10, title: "Data Protection & Privacy Policy" },
  { id: 11, title: "Corporate Social Responsibility Report" },
  { id: 12, title: "Board Committee Terms of Reference" },
];

const interviewVideos = [
  {
    id: 1,
    title: "Interview 1",
    url: "https://www.youtube.com/embed/ysz5S6PUM-U",
  },
  {
    id: 2,
    title: "Interview 2",
    url: "https://www.youtube.com/embed/tgbNymZ7vqY",
  },
  {
    id: 3,
    title: "Interview 3",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 4,
    title: "Interview 4",
    url: "https://www.youtube.com/embed/aqz-KE-bpKQ",
  },
  {
    id: 5,
    title: "Interview 5",
    url: "https://www.youtube.com/embed/oUFJJNQGwhk",
  },
];

const newslist = () => {
  const [showAllStatements, setShowAllStatements] = useState(false);
  const [showAllDocuments, setShowAllDocuments] = useState(false);
  const interviewsRef = useRef<HTMLDivElement | null>(null);

  const visibleStatements = showAllStatements
    ? publicStatements
    : publicStatements.slice(0, 6);

  const visibleDocuments = showAllDocuments
    ? corporateDocuments
    : corporateDocuments.slice(0, 6);

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
            <Posts posts={blogPosts} />
          </div>
        </motion.div>
      </section>

      <section className="px-6 py-12 max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Public Statements
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleStatements.map((item) => (
            <div
              key={item.id}
              className="rounded-xl bg-[#F7EFEF] p-5 shadow-sm flex flex-col gap-4"
            >
              <p className="text-sm font-semibold text-red-900">{item.title}</p>
              <button
                type="button"
                className="w-fit inline-flex items-center gap-2 rounded-full bg-[#B86A14] px-4 py-2 text-sm font-semibold text-white"
              >
                View
              </button>
            </div>
          ))}
        </div>

        {publicStatements.length > 6 && (
          <div className="mt-8">
            <button
              type="button"
              onClick={() => setShowAllStatements((prev) => !prev)}
              className="inline-flex items-center gap-2 text-red-900 font-semibold hover:underline"
            >
              {showAllStatements ? "View less" : "View more"}
              {!showAllStatements && <span aria-hidden>→</span>}
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

        <div
          ref={interviewsRef}
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2"
        >
          {interviewVideos.map((video) => (
            <div
              key={video.id}
              className="snap-start w-full sm:w-[60%] md:w-[48%] lg:w-[32%] flex-shrink-0"
            >
              <div className="aspect-video rounded-xl overflow-hidden shadow-md bg-black">
                <iframe
                  src={video.url}
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
      </section>

      <section className="px-6 py-12 max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Corporate Documents
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleDocuments.map((item) => (
            <div
              key={item.id}
              className="rounded-xl bg-[#F7EFEF] p-5 shadow-sm flex flex-col gap-4"
            >
              <p className="text-sm font-semibold text-red-900">{item.title}</p>
              <button
                type="button"
                className="w-fit inline-flex items-center gap-2 rounded-full bg-[#B86A14] px-4 py-2 text-sm font-semibold text-white"
              >
                View
              </button>
            </div>
          ))}
        </div>

        {corporateDocuments.length > 6 && (
          <div className="mt-8">
            <button
              type="button"
              onClick={() => setShowAllDocuments((prev) => !prev)}
              className="inline-flex items-center gap-2 text-red-900 font-semibold hover:underline"
            >
              {showAllDocuments ? "View less" : "View more"}
              {!showAllDocuments && <span aria-hidden>→</span>}
            </button>
          </div>
        )}
      </section>
    </>
  );
};

export default newslist;
