import { useState, useEffect } from "react";
import { mockClinicalServices } from "./clinicalDummyData";

const DashboardHome = () => {
  const [serviceCount, setServiceCount] = useState(0);

  useEffect(() => {
    setServiceCount(mockClinicalServices.length);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome to the Dashboard</h1>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold">Clinical Services</h2>
          <p className="text-4xl mt-4">{serviceCount}</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold">Doctors</h2>
          <p className="text-4xl mt-4">12</p> {/* example static number */}
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold">Pending Updates</h2>
          <p className="text-4xl mt-4">3</p> {/* example static number */}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
