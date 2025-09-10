import AnimatedCounter from "@/components/Animatedcounter";
import { motion } from "framer-motion";
import { useIntlayer } from "react-intlayer";

const slideUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const Metrics = () => {
  const content = useIntlayer("about_the_hospital")
  return (
    <div className="max-w-7xl mx-[2%] md:mx-auto px-4 py-12 grid md:grid-cols-2 gap-10 items-center">
      <motion.div
        variants={slideUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <img
          src="https://cms.thenairobihosp.org/uploads/nai_hospital_1ce6949b74.jpg"
          alt="Photo of western entrance"
          className="rounded-xl shadow-md"
        />
      </motion.div>

      <motion.div
        variants={slideUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className="text-center mx-10 md:text-left"
      >
        <h2 className="text-5xl font-semibold text-red-900 mb-4 font-serif">
          {content.title}
        </h2>
        <p className="text-gray-700 mb-6">
          {content.description}
        </p>

        <div className="space-y-4">
          <motion.div
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            className="flex justify-center items-center gap-4"
          >
            <AnimatedCounter targetNumber={70} suffix="+" />
            <p className="text-gray-600">
              {content.about_stat_experience}
            </p>
          </motion.div>
          <motion.div
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
            className="border-b border-red-100 pl-4"
          />
          <motion.div
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
            className="flex items-center gap-4 justify-center"
          >
            <AnimatedCounter targetNumber={74} suffix="%" />
            <p className="text-gray-600">
              {content.about_stat_patients}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Metrics;
