import { FC } from "react";
import { matchPath, useLocation } from "react-router";
import {
  AboutPageSkeleton,
  BlogDetailSkeleton,
  BlogListSkeleton,
  BookingCalendarSkeleton,
  BookingPageSkeleton,
  ClinicsPageSkeleton,
  CollegePageSkeleton,
  ContactPageSkeleton,
  ContactUsSkeleton,
  ContentPageSkeleton,
  DashboardSkeleton,
  DetailWithSidebarSkeleton,
  DoctorDetailSkeleton,
  DoctorProfilesSkeleton,
  HomeSkeleton,
  ListWithSidebarSkeleton,
  OutpatientCentersSkeleton,
  OpportunityPageSkeleton,
  ProfileDetailSkeleton,
  ServiceDetailSkeleton,
  TeamPageSkeleton,
  ClinicListingSkeleton,
} from "./page-skeletons";

type FallbackProps = object;

const Fallback: FC<FallbackProps> = () => {
  const { pathname } = useLocation();

  const isMatch = (pattern: string, end: boolean = false) =>
    matchPath({ path: pattern, end }, pathname);

  if (pathname === "/") return <HomeSkeleton />;

  if (pathname.startsWith("/dashboard")) return <DashboardSkeleton />;

  if (pathname.startsWith("/booking-calendar"))
    return <BookingCalendarSkeleton />;
  if (pathname.startsWith("/booking")) return <BookingPageSkeleton />;

  if (pathname.startsWith("/contact-us")) return <ContactUsSkeleton />;
  if (pathname.startsWith("/contact")) return <ContactPageSkeleton />;

  if (pathname.startsWith("/doctor-details")) return <DoctorDetailSkeleton />;
  if (pathname.startsWith("/doctor-profiles"))
    return <DoctorProfilesSkeleton />;

  if (pathname.startsWith("/member-page")) return <ProfileDetailSkeleton />;

  if (pathname.startsWith("/service-detail")) return <ServiceDetailSkeleton />;

  if (pathname.startsWith("/anderson-list")) return <ListWithSidebarSkeleton />;
  if (pathname.startsWith("/anderson-services")) return <ClinicsPageSkeleton />;
  if (pathname.startsWith("/clinical-services")) return <ClinicsPageSkeleton />;

  if (pathname.startsWith("/outpatient-center/"))
    return <DetailWithSidebarSkeleton />;
  if (pathname.startsWith("/outpatient-centers"))
    return <OutpatientCentersSkeleton />;
  if (pathname.startsWith("/outpatient-clinics"))
    return <ClinicListingSkeleton />;

  if (pathname.startsWith("/news/careers")) return <OpportunityPageSkeleton />;
  if (pathname.startsWith("/news/tenders")) return <OpportunityPageSkeleton />;
  if (isMatch("/news/:id")) return <BlogDetailSkeleton />;
  if (pathname.startsWith("/news")) return <BlogListSkeleton />;

  if (isMatch("/blog/:id")) return <BlogDetailSkeleton />;
  if (pathname.startsWith("/blogs")) return <BlogListSkeleton />;

  if (isMatch("/events-announcements/:id")) return <BlogDetailSkeleton />;
  if (pathname.startsWith("/events-announcements"))
    return <BlogListSkeleton />;

  if (isMatch("/csr-detail/:id")) return <BlogDetailSkeleton />;
  if (pathname.startsWith("/about/csr")) return <BlogListSkeleton />;

  if (pathname.startsWith("/college/")) return <CollegePageSkeleton />;

  if (
    pathname.startsWith("/about-us/board-of") ||
    pathname.startsWith("/about-us/senior-management")
  )
    return <TeamPageSkeleton />;
  if (
    pathname.startsWith("/about-us/history") ||
    pathname.startsWith("/about-us/accreditation-certification")
  )
    return <ContentPageSkeleton />;
  if (pathname.startsWith("/about-us")) return <AboutPageSkeleton />;

  if (pathname.startsWith("/inpatient/")) return <ContentPageSkeleton />;

  if (
    pathname.startsWith("/admission-charges") ||
    pathname.startsWith("/parking-transport") ||
    pathname.startsWith("/medical-tourism") ||
    pathname.startsWith("/laundry-services") ||
    pathname.startsWith("/high-critical-care") ||
    pathname.startsWith("/convention-center") ||
    pathname.startsWith("/rooms-and-wards") ||
    pathname.startsWith("/clinical-faqs")
  )
    return <ContentPageSkeleton />;

  return <ContentPageSkeleton />;
};

export default Fallback;
