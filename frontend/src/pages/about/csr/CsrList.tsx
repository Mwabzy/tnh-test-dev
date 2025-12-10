import { motion } from "framer-motion";
import { FC } from "react";
import { Link } from "react-router";

const slideUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

export type CsrTypes = {
  id: number;
  author: string;
  title: string;
  subtitle: string;
  blogsubtitle: string;
  description: string;
  shortdesc: string;
  longdesc: string;
  coverImage: string;
  image: string[];
};

interface CsrProps {
  posts: CsrTypes[];
}

export const csrPosts = [
  {
    id: 1,
    coverImage:
      "https://images.pexels.com/photos/5206940/pexels-photo-5206940.jpeg",
    blogsubtitle:
      "The Critical Importance of Staff Ear Health and Sleep Assessment",
    author: "Dr. Jane Doe, Head of Research",
    title: "Comprehensive Well-being: Beyond the Physical",
    shortdesc:
      "When we think of a heart attack, we often picture someone clutching their chest in pain. But in reality, heart attack symptoms can be far more subtle—and they vary significantly between men and women. Our staff program focuses on early detection, wellness education, and proactive intervention.",
    longdesc:
      "Strong professional relationships are the bedrock of an effective clinical environment. Dynamics within a team directly impact patient care quality and staff burnout rates. This section explores strategies for fostering open communication, mutual respect, and collaborative problem-solving to enhance our internal dynamics and overall productivity, ensuring long-term success.",
    image: [
      "https://media.licdn.com/dms/image/v2/D4D22AQHDyc3fDYf4fQ/feedshare-shrink_800/feedshare-shrink_800/0/1710427125536?e=2147483647&v=beta&t=0PHcH1TNsnREokrdIB_FLRT0ucuUvDqecRWh-0U6rNw",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEPYSTrw5FVjTZMlTr1vI86U_JN_6Y26MmA&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPREqzYdlCzqJ28w8jxbGzPq0KvjSU22XkCw&s",
      "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 2,
    author: "By Gareth Bale",
    title: "Successful ENT Medical Camp at St. Francis ACK Karen",
    subtitle: "Early recognition could save a life—possibly your own.",
    blogsubtitle:
      "Explore the key strategies to manage diabetes and improve quality of life.",
    description:
      "Our medical team held a free ENT outreach camp at St. Francis ACK Karen, providing essential screenings, medical advice, and referrals.",
    shortdesc:
      "When we think of diabetes, we often imagine high blood sugar and insulin injections. But the reality is more complex—and the warning signs can be subtle. Diabetes affects millions globally and is a leading cause of serious complications if left unmanaged. With early recognition and the right lifestyle changes or treatments, individuals can live long, healthy lives. Whether you're newly diagnosed, at risk, or supporting someone who is, understanding diabetes is the first step toward effective care.",
    longdesc:
      "Diabetes is a chronic condition that affects how your body processes blood sugar (glucose). Early detection and management are crucial to prevent complications such as nerve damage, kidney failure, and cardiovascular disease. This article breaks down the common symptoms of diabetes, explores contributing factors, and provides practical tips for day-to-day management. Whether you’re newly diagnosed or seeking to support a loved one, this guide offers valuable insights for a healthier future.Here are the most frequently reported symptoms. Not everyone will experience all of them, and they can range in intensity.",

    coverImage:
      "https://img.freepik.com/free-photo/high-angle-woman-checking-glucose-levels_23-2150775247.jpg?uid=R173174302&ga=GA1.1.561176189.1745317904&semt=ais_hybrid&w=740",
    image: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3d2KIthFgHbg-XCQd-6eH3Jkzj7veGhVsrg&s",
    ],
  },
  {
    id: 3,
    author: "By Emmanuel M.",
    title: "Hearing & Wellness Screening at Local Primary Schools",
    subtitle: "Early recognition could save a life—possibly your own.",
    blogsubtitle:
      "Early detection saves lives—especially when it comes to colon cancer.",
    description:
      "Our team visited nearby primary schools to offer free hearing assessments and general wellness checks for learners.",
    shortdesc:
      "When we think of cancer screening, colonoscopy might not be the first test that comes to mind. But this simple procedure can detect early signs of colorectal cancer—often before symptoms even appear. Colon cancer is one of the most preventable yet deadly cancers when left undiagnosed. Through early detection and timely treatment, lives can be saved. Whether you're approaching the recommended screening age or supporting a loved one, understanding colonoscopy is key to proactive health care.",
    longdesc:
      "Here are the most frequently reported symptoms. Not everyone will experience all of them, and they can range in intensity.",

    coverImage:
      "https://www.freepik.com/free-photo/nosy-curiosity-ear-young-interesting_1046402.htm#fromView=search&page=1&position=1&uuid=9075ed19-3ba3-4ba3-8a81-42120d9da060&query=Ear",
    image: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgzxe_TZOGoAys8S81lwxWOsDHqGOYsBSfiw&s",
    ],
  },
] as CsrTypes[];

const CsrList: FC<CsrProps> = () => {
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
                Corporate Social Responsibility (CSR)
              </h2>
              <p className="text-2xl md:text-gray-600 mt-2">
                Our commitment is to positively impact society beyond its core
                business operations.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 w-full">
            {csrPosts.map((post) => (
              <div
                key={post.id}
                className="rounded-lg overflow-hidden shadow hover:shadow-md transition"
              >
                <img
                  src={post.image[0]}
                  alt={post.title}
                  className="w-full h-56 rounded-lg transform transition duration-300 hover:scale-105 hover:brightness-90 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800 mt-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mt-2 text-sm">
                    {post.description}
                  </p>
                  <Link
                    to={`/csr-detail/${post.id}`}
                    className="inline-flex items-center text-red-900 font-medium mt-4 hover:underline"
                  >
                    Read More <span className="ml-1 ">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default CsrList;
