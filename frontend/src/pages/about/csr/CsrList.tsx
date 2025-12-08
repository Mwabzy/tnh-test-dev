import Posts, { Post } from "@/components/blog/Posts";
import { motion } from "framer-motion";

const slideUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

export const blogPosts = [
  {
    id: 1,
    author: "By John Doe",
    title: "Environmental Responsibility",
    subtitle: "Sustainability & Resource Management",
    blogsubtitle: "Learn about the warning signs of a heart attack.",
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
    coverImage:
      "https://img.freepik.com/free-photo/view-anatomic-heart-model-educational-purpose-with-stethoscope_23-2149894392.jpg?uid=R173174302&ga=GA1.1.561176189.1745317904&semt=ais_hybrid&w=740",

    image:
      "https://img.freepik.com/free-photo/coronavirus-infected-elderly-man-with-heart-problems_53876-143050.jpg?uid=R173174302&ga=GA1.1.561176189.1745317904&semt=ais_hybrid&w=740",
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
      "Learn the essential purpose, preparation steps, and health benefits of a colonoscopy to detect issues early and support long-term digestive wellness.",
    shortdesc:
      "When we think of cancer screening, colonoscopy might not be the first test that comes to mind. But this simple procedure can detect early signs of colorectal cancer—often before symptoms even appear. Colon cancer is one of the most preventable yet deadly cancers when left undiagnosed. Through early detection and timely treatment, lives can be saved. Whether you're approaching the recommended screening age or supporting a loved one, understanding colonoscopy is key to proactive health care.",
    longdesc:
      "Here are the most frequently reported symptoms. Not everyone will experience all of them, and they can range in intensity.",
    category: "Health & Awareness",
    coverImage:
      "https://img.freepik.com/free-photo/pain-stomache-old-senior-asian-grandfather-patient-uniform-suffer-from-body-problem-health-ideas-concept_609648-2289.jpg?uid=R173174302&ga=GA1.1.561176189.1745317904&semt=ais_hybrid&w=740",
    image:
      "https://img.freepik.com/free-photo/dissatisfied-woman-touches-belly-suffers-from-painful-cramps-frowns-face-dressed-sportclothes_273609-33747.jpg?uid=R173174302&ga=GA1.1.561176189.1745317904&semt=ais_hybrid&w=740",
  }
  
  
  
] as Post[];

const CsrList = () => {
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
                Latest News
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
    </>
  );
};

export default CsrList;
