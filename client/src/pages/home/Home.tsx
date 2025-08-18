import { FC } from "react";
import Hero from "./hero";
import Opc from "./opc";
import Features from "./features";
import InsuranceSlider from "./InsuranceSlider";
import ServicesSection from "./ServicesSection";
import Metrics from "./Metrics";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import Blogpost from "@/components/blogpost";

type HomeProps = object;

const Home: FC<HomeProps> = () => {
  return (
    <>
      <Hero />
      <Features />
      <Metrics />
      <ServicesSection />
      <Opc />
      <TestimonialCarousel
        testimonials={[
          {
            name: "Cate Nyambura",
            title: "Patient",
            image: "https://lh3.googleusercontent.com/a-/ALV-UjUOuxfWm6fzqbcmzhp-1rAs8wv4NgfJ9ixm-gRj-wXmHkqFPz-EMg=w72-h72-p-rp-mo-ba8-br100",
            quote:
             `Great and excellent service. Took less than an hour to get admitted along with the mandatory COVID test. I was admitted in the Presidential St. Michael Suite and the nurses were attentive, supportive with the best service. Discharge was seamless and everything was sorted easily and the wait staff was very prompt.`,
          },
          {
            name: "Jimmy Wanyangu",
            title: "Patient",
            image:
              "https://lh3.googleusercontent.com/a-/ALV-UjW3GTYCl5luQDf88tAC-0e8kklmblsInt5VAmbW7JWEfXQoLNs=w72-h72-p-rp-mo-ba3-br100",
            quote: `Good customer service,location is perfect within the Hospital's vicinity. Interior decor is superb especially the concrete planters on each table.
Most institutions have workers who do not understand courtesy but Nairobi hospital understands importance of courtesy right from the gate I am really impressed !`,
          },
        ]}
      />
      <Blogpost />
      <InsuranceSlider />
    </>
  );
};

export default Home;
