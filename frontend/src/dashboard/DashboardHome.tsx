import { useState, useEffect } from "react";
import { mockClinicalServices } from "./pages/clinical-services/clinics/clinicalDummyData";

const DashboardHome = () => {
  const [serviceCount, setServiceCount] = useState(0);

  useEffect(() => {
    setServiceCount(mockClinicalServices.length);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
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
          className="px-4 py-2 bg-green-600 text-white font-serif rounded-md"
        >
          Log Out
        </button>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-serif font-semibold">
            Clinical Services
          </h2>
          <p className="text-4xl mt-4">{serviceCount}</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-serif font-semibold">Doctors</h2>
          <p className="text-4xl mt-4">12</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-serif font-semibold">Pending Updates</h2>
          <p className="text-4xl mt-4">3</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
