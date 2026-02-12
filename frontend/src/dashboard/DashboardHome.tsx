import { useState, useEffect } from "react";
import { fetchClinicalServices, fetchDoctors } from "@/api/api";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardHome = () => {
  const [serviceCount, setServiceCount] = useState(0);
  const [doctorCount, setDoctorCount] = useState(0);
  const [isLoadingCounts, setIsLoadingCounts] = useState(true);

  useEffect(() => {
    const loadCounts = async () => {
      try {
        setIsLoadingCounts(true);
        const [servicesRes, doctorsRes] = await Promise.all([
          fetchClinicalServices(),
          fetchDoctors(),
        ]);

        const servicesList = Array.isArray(servicesRes)
          ? servicesRes
          : (servicesRes?.results ?? servicesRes?.data ?? []);
        const doctorsList = Array.isArray(doctorsRes)
          ? doctorsRes
          : (doctorsRes?.results ?? doctorsRes?.data ?? []);

        setServiceCount(servicesList.length);
        setDoctorCount(doctorsList.length);
      } catch (error) {
        console.error("Error loading dashboard counts:", error);
        setServiceCount(0);
        setDoctorCount(0);
      } finally {
        setIsLoadingCounts(false);
      }
    };

    loadCounts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/dashboard/auth";
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold font-serif mb-6">
          Welcome to the Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="px-4 cursor-pointer bg-red-300 text-white font-serif rounded-md"
        >
          Log Out
        </button>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-serif font-semibold">
            Clinical Services
          </h2>
          <div className="text-4xl mt-4">
            {isLoadingCounts ? (
              <Skeleton className="h-10 w-16" />
            ) : (
              serviceCount
            )}
          </div>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-serif font-semibold">Doctors</h2>
          <div className="text-4xl mt-4">
            {isLoadingCounts ? (
              <Skeleton className="h-10 w-16" />
            ) : (
              doctorCount
            )}
          </div>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-serif font-semibold">Pending Updates</h2>
          <p className="text-4xl mt-4">0</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
