import React from 'react';
import doctorsData from '@/data/doctors.json';
import { Link } from 'react-router';

const DoctorProfiles: React.FC = () => {
  const doctors = (doctorsData || []).slice();

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Doctor Profiles</h1>
      <p className="text-gray-600 mb-6">List of consultants at The Nairobi Hospital (Anderson Specialty highlighted).</p>
      <ul className="space-y-3">
        {doctors.map((d: any, idx: number) => (
          <li key={idx} className="p-3 bg-white border border-gray-100 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-gray-900">{d.title} {d.name}</div>
                <div className="text-sm text-gray-600">{d.specialization} — {d.clinicDepartment || d.location}</div>
              </div>
              <div className="ml-4">
                <Link to={`/doctorbooking?name=${encodeURIComponent(d.name)}`} className="text-red-900 font-medium">Book / View →</Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorProfiles;
