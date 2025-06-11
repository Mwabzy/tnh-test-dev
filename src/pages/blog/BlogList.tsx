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
    title: "10 Warning Signs of a Heart Attack You Shouldn't Ignore",
    subtitle: "Early recognition could save a life—possibly your own.",
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

const bloglist = () => {
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

export default bloglist;
