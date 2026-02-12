import { Skeleton } from "@/components/ui/skeleton";

type HeadingStyle = "background" | "image" | "text";

const TextBlock = ({
  widths = ["w-full", "w-5/6", "w-4/6"],
  lineHeight = "h-4",
}: {
  widths?: string[];
  lineHeight?: string;
}) => (
  <div className="space-y-2">
    {widths.map((width, index) => (
      <Skeleton key={index} className={`${lineHeight} ${width}`} />
    ))}
  </div>
);

const SectionTitle = ({ width = "w-1/3" }: { width?: string }) => (
  <Skeleton className={`h-8 ${width}`} />
);

const CardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <Skeleton className="h-48 w-full rounded-none" />
    <div className="p-6 space-y-3">
      <Skeleton className="h-6 w-2/3" />
      <TextBlock widths={["w-full", "w-11/12", "w-5/6"]} />
      <Skeleton className="h-4 w-1/2" />
      <div className="flex flex-col sm:flex-row gap-3">
        <Skeleton className="h-9 w-32 rounded-md" />
        <Skeleton className="h-9 w-28 rounded-md" />
      </div>
    </div>
  </div>
);

export const HeadingSkeleton = ({
  style = "image",
}: {
  style?: HeadingStyle;
}) => (
  <div
    className={`flex flex-col items-center justify-center w-full h-[300px] bg-cover bg-center bg-no-repeat ${
      style === "background"
        ? "bg-red-900"
        : style === "image"
          ? "bg-gray-200"
          : "bg-white"
    }`}
  >
    <div
      className={`flex items-center justify-center w-full h-full ${
        style === "text" ? "" : "bg-black/30"
      }`}
    >
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl px-4 gap-4 md:gap-0">
        <div className="w-full md:w-[40%]">
          <Skeleton className="h-10 md:h-14 w-3/4" />
        </div>
        <div className="w-full md:w-[60%] space-y-3">
          <Skeleton className="h-4 md:h-5 w-full" />
          <Skeleton className="h-4 md:h-5 w-5/6" />
          <Skeleton className="h-4 md:h-5 w-4/6" />
        </div>
      </div>
    </div>
  </div>
);

export const ContactFormSkeleton = () => (
  <div className="max-w-7xl mx-auto p-4 w-full mt-8 flex flex-col gap-4 items-start">
    <div className="flex flex-col md:flex-row items-start justify-center gap-6 w-full">
      <div className="flex flex-col gap-4 w-full md:w-[80%] py-4">
        <Skeleton className="h-10 w-2/3" />
        <TextBlock widths={["w-full", "w-10/12", "w-9/12"]} />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
      <div className="flex flex-col gap-4 w-[95%] md:w-[50%] p-6 bg-gray-50 rounded-lg shadow-lg">
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-11 w-full" />
        <Skeleton className="h-11 w-full" />
        <Skeleton className="h-11 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-12 w-full rounded-md" />
      </div>
    </div>
  </div>
);

export const FaqSectionSkeleton = () => (
  <div className="bg-orange-200 py-20 px-8 mt-8">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
      <Skeleton className="w-full md:w-1/2 h-64 rounded-xl" />
      <div className="w-full md:w-1/2 space-y-3">
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-11/12" />
        <Skeleton className="h-6 w-10/12" />
      </div>
    </div>
  </div>
);

export const ListWithSidebarSkeleton = () => (
  <div className="py-16 px-6 flex flex-col md:flex-row justify-center max-w-7xl mx-auto gap-8">
    <aside className="w-full md:w-64 md:sticky md:top-20 mb-8 md:mb-0 space-y-6">
      <Skeleton className="h-10 w-full rounded-md" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-1/2" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 12 }).map((_, index) => (
            <Skeleton key={index} className="w-8 h-8 rounded-full" />
          ))}
        </div>
      </div>
    </aside>
    <main className="flex-1 space-y-6">
      <Skeleton className="h-4 w-1/3" />
      <div className="grid grid-cols-1 gap-8 max-w-150">
        {Array.from({ length: 3 }).map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
      <div className="flex justify-center items-center gap-3 mt-10">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-9 w-10 rounded-md" />
        ))}
      </div>
    </main>
  </div>
);

export const CardGridSkeleton = () => (
  <div className="max-w-7xl mx-auto px-4 py-12">
    <div className="flex justify-center mb-6">
      <SectionTitle width="w-1/2" />
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="border shadow-xl rounded-lg p-8 text-center"
        >
          <Skeleton className="h-10 w-10 rounded-full mx-auto mb-4" />
          <Skeleton className="h-5 w-3/4 mx-auto mb-2" />
          <Skeleton className="h-4 w-2/3 mx-auto mb-6" />
          <Skeleton className="h-10 w-2/3 mx-auto rounded-full" />
        </div>
      ))}
    </div>
  </div>
);

export const TeamPageSkeleton = () => (
  <>
    <HeadingSkeleton style="background" />
    <section className="py-12 px-4 bg-gray-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="relative bg-grey-300 rounded-lg overflow-hidden text-center p-3"
          >
            <Skeleton className="h-56 w-full rounded-lg mb-4" />
            <Skeleton className="h-5 w-2/3 mx-auto mb-2" />
            <Skeleton className="h-4 w-1/2 mx-auto" />
          </div>
        ))}
      </div>
    </section>
    <ContactFormSkeleton />
  </>
);

export const ProfileDetailSkeleton = () => (
  <div className="bg-white text-gray-800 font-sans p-6 max-w-5xl mx-auto">
    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
      <Skeleton className="w-48 h-60 rounded-xl" />
      <div className="flex-1 space-y-3">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-5 w-1/2" />
        <TextBlock widths={["w-full", "w-11/12", "w-5/6"]} />
      </div>
    </div>
  </div>
);

export const DoctorDetailSkeleton = () => (
  <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
    <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
      <div className="flex flex-col md:flex-row items-start gap-8">
        <Skeleton className="w-52 h-64 rounded-2xl" />
        <div className="flex-1 space-y-4">
          <Skeleton className="h-9 w-2/3" />
          <Skeleton className="h-5 w-1/2" />
          <TextBlock widths={["w-full", "w-11/12", "w-5/6"]} />
          <Skeleton className="h-11 w-48 rounded-lg" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-4 w-5/6" />
            ))}
          </div>
        </div>
      </div>
      <section className="mt-16 border-t border-indigo-200 pt-10 space-y-4">
        <Skeleton className="h-8 w-1/2" />
        <TextBlock widths={["w-full", "w-11/12", "w-4/6"]} />
        <TextBlock widths={["w-full", "w-10/12", "w-5/6"]} />
      </section>
      <section className="mt-12 grid md:grid-cols-3 gap-10">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="space-y-3">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
            <Skeleton className="h-4 w-3/6" />
          </div>
        ))}
      </section>
    </div>
  </div>
);

export const DetailWithSidebarSkeleton = () => (
  <>
    <section className="bg-red-900 text-white p-5 md:p-16">
      <div className="grid md:grid-cols gap-2 lg:px-36">
        <div className="flex flex-col justify-center space-y-4 max-w-xl">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-5 w-1/2" />
        </div>
      </div>
    </section>
    <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-10">
      <div className="flex-1 space-y-6">
        <div className="space-y-3">
          <Skeleton className="h-6 w-1/3" />
          <TextBlock widths={["w-full", "w-11/12", "w-5/6"]} />
        </div>
        <Skeleton className="h-6 w-1/2" />
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-6 w-full" />
          ))}
        </div>
      </div>
      <div className="w-full lg:w-[300px] bg-red-50 h-min rounded-xl p-6 shadow-md text-sm text-gray-800 space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  </>
);

export const HomeSkeleton = () => (
  <div className="w-full">
    <HeadingSkeleton style="image" />
    <section className="max-w-7xl mx-auto px-4 py-12 space-y-6">
      <SectionTitle width="w-1/4" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-6">
            <Skeleton className="h-10 w-10 rounded-full mb-4" />
            <Skeleton className="h-5 w-2/3 mb-2" />
            <TextBlock widths={["w-full", "w-5/6"]} />
          </div>
        ))}
      </div>
    </section>
    <section className="max-w-7xl mx-auto px-4 py-12 space-y-6">
      <SectionTitle width="w-1/3" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    </section>
    <section className="max-w-7xl mx-auto px-4 py-12 space-y-6">
      <SectionTitle width="w-1/4" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <Skeleton className="h-5 w-2/3 mb-3" />
            <TextBlock widths={["w-full", "w-5/6"]} />
          </div>
        ))}
      </div>
    </section>
    <section className="max-w-7xl mx-auto px-4 py-12 space-y-6">
      <SectionTitle width="w-1/4" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <Skeleton className="h-5 w-1/2 mb-3" />
            <TextBlock widths={["w-full", "w-10/12"]} />
          </div>
        ))}
      </div>
    </section>
    <section className="max-w-7xl mx-auto px-4 py-12 space-y-6">
      <SectionTitle width="w-1/4" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <Skeleton className="h-32 w-full rounded-md mb-4" />
            <Skeleton className="h-5 w-2/3 mb-2" />
            <TextBlock widths={["w-full", "w-5/6"]} />
          </div>
        ))}
      </div>
    </section>
  </div>
);

export const AboutPageSkeleton = () => (
  <>
    <HeadingSkeleton style="image" />
    <div className="bg-orange-200">
      <div className="mx-auto max-w-7xl px-4 py-8 space-y-8">
        <div className="flex justify-center">
          <Skeleton className="h-8 w-1/2" />
        </div>
        <Skeleton className="h-56 w-full rounded-lg" />
        <div className="flex flex-col md:flex-row gap-4">
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className="p-6 rounded-xl text-center bg-gray-50 w-full min-h-[200px] space-y-3"
            >
              <Skeleton className="h-10 w-10 rounded-full mx-auto" />
              <Skeleton className="h-5 w-1/2 mx-auto" />
              <TextBlock widths={["w-full", "w-11/12"]} />
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="py-8 max-w-7xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-[50%] space-y-3">
          <Skeleton className="h-8 w-2/3" />
          <TextBlock widths={["w-full", "w-11/12", "w-5/6"]} />
        </div>
        <div className="w-full md:w-[40%] bg-red-900 rounded-lg shadow-lg px-6 py-4 space-y-3">
          <Skeleton className="h-6 w-1/2 bg-white/20" />
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-4 w-5/6 bg-white/20" />
          ))}
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex flex-col items-center space-y-2">
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>
    </div>
    <ContactFormSkeleton />
  </>
);

export const ContentPageSkeleton = () => (
  <>
    <HeadingSkeleton style="image" />
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-8">
      <SectionTitle width="w-1/3" />
      <TextBlock widths={["w-full", "w-11/12", "w-5/6"]} />
      <Skeleton className="h-64 w-full rounded-xl" />
      <TextBlock widths={["w-full", "w-10/12", "w-4/6"]} />
    </div>
  </>
);

export const ClinicsPageSkeleton = () => (
  <>
    <HeadingSkeleton style="background" />
    <ListWithSidebarSkeleton />
    <ContactFormSkeleton />
    <FaqSectionSkeleton />
  </>
);

export const DoctorProfilesSkeleton = () => (
  <>
    <HeadingSkeleton style="background" />
    <ListWithSidebarSkeleton />
    <ContactFormSkeleton />
  </>
);

export const OutpatientCentersSkeleton = () => (
  <>
    <HeadingSkeleton style="image" />
    <CardGridSkeleton />
  </>
);

export const ContactPageSkeleton = () => (
  <>
    <HeadingSkeleton style="image" />
    <ContactFormSkeleton />
    <CardGridSkeleton />
    <section className="max-w-7xl mx-auto px-4 py-12 space-y-6">
      <SectionTitle width="w-1/4" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <Skeleton className="h-5 w-1/2 mb-3" />
            <TextBlock widths={["w-full", "w-10/12"]} />
          </div>
        ))}
      </div>
    </section>
  </>
);

export const OpportunityPageSkeleton = () => (
  <div>
    <HeadingSkeleton style="background" />
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col items-center justify-center my-10 space-y-4">
        <Skeleton className="h-6 w-32 rounded-full" />
        <Skeleton className="h-8 w-2/3" />
      </div>
      <div className="space-y-4 px-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 space-y-3"
          >
            <Skeleton className="h-5 w-1/2" />
            <TextBlock widths={["w-full", "w-10/12"]} />
            <Skeleton className="h-4 w-1/3" />
          </div>
        ))}
      </div>
      <section className="max-w-7xl mx-auto px-4 py-12 space-y-6">
        <SectionTitle width="w-1/4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <Skeleton className="h-5 w-1/2 mb-3" />
              <TextBlock widths={["w-full", "w-10/12"]} />
            </div>
          ))}
        </div>
      </section>
      <ContactFormSkeleton />
    </div>
  </div>
);

export const ContactUsSkeleton = () => (
  <section className="relative min-h-screen bg-gray-50 flex flex-col items-center py-16 px-6">
    <HeadingSkeleton style="image" />
    <div className="text-center mt-8 mb-8 space-y-3">
      <Skeleton className="h-8 w-1/3 mx-auto" />
      <Skeleton className="h-4 w-2/3 mx-auto" />
      <Skeleton className="h-4 w-3/4 mx-auto" />
    </div>
    <div className="max-w-6xl w-full mb-8 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="relative flex items-start gap-4 p-5 rounded-2xl bg-white/80 shadow-sm border border-gray-100"
          >
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-5 w-2/3" />
              <TextBlock widths={["w-full", "w-10/12"]} />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="grid lg:grid-cols-2 gap-10 max-w-6xl w-full px-4">
      <div className="bg-white rounded-2xl shadow-md p-8 space-y-4">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-11 w-full" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Skeleton className="h-11 w-full" />
          <Skeleton className="h-11 w-full" />
        </div>
        <Skeleton className="h-11 w-full" />
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-12 w-full rounded-full" />
      </div>
      <div className="space-y-8">
        <div className="bg-white rounded-2xl shadow-md p-8 space-y-4">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <Skeleton className="h-72 w-full rounded-2xl" />
      </div>
    </div>
  </section>
);

export const BookingPageSkeleton = () => (
  <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="text-center space-y-3">
        <Skeleton className="h-8 w-2/3 mx-auto" />
        <Skeleton className="h-4 w-1/2 mx-auto" />
      </div>
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <Skeleton className="h-10 w-full" />
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-6 w-full" />
          ))}
        </div>
      </div>
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <Skeleton className="h-6 w-2/3" />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-14 w-full rounded-md" />
          ))}
        </div>
      </div>
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <Skeleton className="h-6 w-1/2" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-11 w-full" />
          <Skeleton className="h-11 w-full" />
        </div>
        <Skeleton className="h-11 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  </div>
);

export const BookingCalendarSkeleton = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50 py-12 px-4">
    <div className="max-w-6xl mx-auto space-y-10">
      <div className="space-y-3">
        <Skeleton className="h-9 w-1/2" />
        <Skeleton className="h-5 w-2/3" />
      </div>
      <div className="flex gap-4 items-center justify-between max-w-2xl">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <Skeleton className="w-14 h-14 rounded-full" />
            <Skeleton className="h-3 w-16 mt-2" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-11 w-full" />
            <Skeleton className="h-11 w-full" />
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
            <Skeleton className="h-5 w-1/2" />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="h-12 w-full rounded-md" />
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-md space-y-3">
            <Skeleton className="h-6 w-2/3" />
            <TextBlock widths={["w-full", "w-10/12"]} />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md space-y-3">
            <Skeleton className="h-6 w-1/2" />
            <TextBlock widths={["w-full", "w-10/12"]} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const ClinicListingSkeleton = () => (
  <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div className="w-full mx-auto space-y-8">
      <Skeleton className="h-8 w-1/2 mx-auto" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white shadow rounded-lg p-6">
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="bg-white shadow rounded-lg p-6 h-[500px] space-y-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-16 w-full" />
            ))}
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <Skeleton className="h-[550px] w-full rounded-md" />
        </div>
      </div>
    </div>
  </div>
);

export const BlogListSkeleton = () => (
  <section className="px-6 py-12 max-w-7xl mx-auto space-y-8">
    <div className="space-y-2">
      <Skeleton className="h-8 w-1/3" />
      <Skeleton className="h-5 w-2/3" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6">
          <Skeleton className="h-40 w-full rounded-md mb-4" />
          <Skeleton className="h-5 w-2/3 mb-2" />
          <TextBlock widths={["w-full", "w-10/12"]} />
        </div>
      ))}
    </div>
  </section>
);

export const BlogDetailSkeleton = () => (
  <div>
    <div className="relative h-[40vh] bg-gray-200 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 space-y-4">
        <Skeleton className="h-6 w-40 rounded-full" />
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-5 w-1/3" />
      </div>
    </div>
    <div className="max-w-3xl md:max-w-6xl mx-auto px-4 py-16 space-y-12">
      <div className="space-y-3">
        <Skeleton className="h-7 w-1/2" />
        <TextBlock widths={["w-full", "w-11/12", "w-5/6"]} />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-6 w-1/3" />
        <TextBlock widths={["w-full", "w-10/12", "w-4/6"]} />
      </div>
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <Skeleton className="h-56 w-full rounded-xl" />
        <div className="space-y-3">
          <Skeleton className="h-6 w-2/3" />
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-4 w-full" />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export const CollegePageSkeleton = () => (
  <>
    <HeadingSkeleton style="image" />
    <div className="bg-white py-9 px-4 mx-[10%] md:px-10 lg:px-24 space-y-8">
      <div className="space-y-2">
        <Skeleton className="h-8 w-1/3" />
        <TextBlock widths={["w-full", "w-11/12", "w-5/6"]} />
      </div>
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row md:items-center bg-gray-50 rounded-2xl shadow-sm overflow-hidden"
          >
            <Skeleton className="md:w-1/3 h-48 md:h-full" />
            <div className="md:w-2/3 p-6 space-y-3">
              <Skeleton className="h-6 w-2/3" />
              <TextBlock widths={["w-full", "w-11/12"]} />
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="border-2 max-w-7xl shadow-xl my-8 mx-4 p-4 rounded-md md:mx-auto">
      <ContactFormSkeleton />
    </div>
  </>
);

export const DashboardSkeleton = () => (
  <div className="p-6 space-y-6">
    <Skeleton className="h-8 w-1/3" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton key={index} className="h-24 w-full rounded-lg" />
      ))}
    </div>
    <div className="bg-white rounded-lg shadow-md p-4 space-y-3">
      <Skeleton className="h-5 w-1/4" />
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton key={index} className="h-10 w-full" />
      ))}
    </div>
  </div>
);

export const ServiceDetailSkeleton = () => (
  <>
    <HeadingSkeleton style="image" />
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-6">
      <SectionTitle width="w-1/3" />
      <TextBlock widths={["w-full", "w-11/12", "w-5/6"]} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <Skeleton className="h-6 w-2/3 mb-3" />
            <TextBlock widths={["w-full", "w-10/12"]} />
          </div>
        ))}
      </div>
    </div>
  </>
);
