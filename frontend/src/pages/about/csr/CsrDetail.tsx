import React from "react";
import { Sparkles, Stethoscope } from "lucide-react";
import Heading from "@/components/Heading";

// --- MOCK DATA (Simulating fetched data from csrPosts and useParams) ---
const mockCsrItem = {
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
};

// --- Types ---
type CardProps = {
  children: React.ReactNode;
  className?: string;
  title?: string;
  dark?: boolean;
};

// --- Components ---
const BentoCard = ({
  children,
  className = "",
  title,
  dark = false,
}: CardProps) => {
  return (
    <div
      className={`
        relative overflow-hidden rounded-3xl p-6 transition-all duration-300 hover:shadow-xl
        group flex flex-col h-full
        ${
          dark
            ? "bg-slate-900 text-white"
            : "bg-white text-slate-800 border border-slate-100 shadow-lg"
        }
        ${className}
      `}
    >
      {title && (
        <div className="mb-4 flex items-center gap-2">
          <h3
            className={`text-xl font-serif ${
              dark ? "text-red-900" : "text-red-900"
            }`}
          >
            {title}
          </h3>
        </div>
      )}
      <div className="relative z-10 h-full flex flex-col">{children}</div>

      {!dark && (
        <div className="absolute top-0 right-0 -mr-16 -mt-16 h-32 w-32 rounded-full bg-slate-50 transition-transform group-hover:scale-150 duration-700 ease-in-out" />
      )}
    </div>
  );
};

// Image Card Component with actual images and dynamic gradients
const ImageCard = ({
  index,
  imageUrl,
  alt,
}: {
  index: number;
  imageUrl: string;
  alt: string;
}) => {
  const gradients = ["", "", "", ""];

  return (
    <div
      className={`relative w-full h-full min-h-[200px] overflow-hidden rounded-3xl group cursor-pointer`}
    >
      {/* Actual Image */}
      <img
        src={imageUrl}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        onError={(e) => {
          // Fallback if image fails to load
          e.currentTarget.style.display = "none";
        }}
      />

      {/* Dynamic Gradient Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${
          gradients[index % gradients.length]
        } mix-blend-multiply transition-opacity duration-300 group-hover:opacity-80`}
      />

      {/* Bottom gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      {/* Icon decoration */}
      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Sparkles size={16} />
      </div>

      {/* Bottom text - optional, remove if not needed */}
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <span className="text-white font-medium text-sm drop-shadow-lg">
          View Image
        </span>
      </div>
    </div>
  );
};

// --- CsrDetail Component ---
export default function CsrDetailMockup() {
  const csrItem = mockCsrItem;
  const heroItem = mockCsrItem;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Dynamic Hero Banner */}
      <div>
        <Heading
          image_url={heroItem.coverImage}
          title="Cooperate Social Responsibility"
          description="prioritizing initiatives that are creating measurable social impact while aligning with the company’s strategic objectives"
          style="background"
        />
      </div>

      {/* --- CONTENT SECTION: Bento Grid Integration --- */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Main Title and Intro Text (Full Width) */}
        <div className="max-w-6xl mx-auto mb-16 text-left">
          <h2 className="text-4xl font-serif text-gray-900 mb-4">
            {csrItem.title}
          </h2>
          <p className="text-xl leading-relaxed text-gray-600">
            {csrItem.shortdesc}
          </p>
        </div>

        {/* 3-Column Bento Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* 1. Extended Content Card (Ear Health / Short Desc) - Spans 2 cols */}
          <BentoCard
            className="col-span-1 md:col-span-2 min-h-[300px]"
            title="Staff Ear Health & Sleep Assessment"
          >
            <div className="flex flex-col h-full justify-between">
              <div className="space-y-3">
                <p className="text-slate-600 text-lg leading-relaxed">
                  {csrItem.shortdesc}
                </p>
              </div>
            </div>
          </BentoCard>

          {/* 2. Photo 1 (Dynamic Content) - Blue gradient */}
          <div className="col-span-1 h-full">
            <ImageCard
              index={0}
              imageUrl={csrItem.image[0]}
              alt="Staff Health Assessment"
            />
          </div>

          {/* 3. Photo 2 (Dynamic Content) - Green gradient */}
          <div className="col-span-1 h-full">
            <ImageCard
              index={1}
              imageUrl={csrItem.image[1]}
              alt="Clinical Services"
            />
          </div>

          {/* 4. Photo 3 (Dynamic Content) - Orange/Red gradient */}
          <div className="col-span-1 h-full">
            <ImageCard
              index={2}
              imageUrl={csrItem.image[2]}
              alt="Healthcare Professional"
            />
          </div>

          {/* 5. Photo 4 (Dynamic Content) - Purple gradient */}
          <div className="col-span-1 h-full">
            <ImageCard
              index={3}
              imageUrl={csrItem.image[3]}
              alt="Medical Care"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
