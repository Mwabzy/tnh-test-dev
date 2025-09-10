import Heading from "@/components/Heading";

const Accreditation = () => {
  return (
    <>
      <Heading
        image_url="https://cms.thenairobihosp.org/uploads/Accreditation_8fbeb1073c.jpg"
        style="image"
        title="Accreditation"
        description="The Nairobi Hospital is a non-profit organization that is leading in medical expertise and service provision, with deservedly earned recognition throughout East Africa and beyond as an advanced diagnostic, treatment and referral centre."
      />
      <div className="grid md:grid-cols-2 gap-6 mb-27 mt-17 max-w-7xl mx-10 lg:mx-auto ">
        <div className="p-6 border rounded-xl text-center bg-red-50  dark:border-gray-700 shadow-2xl                                                                                                        ">
          <div className="flex items-center justify-center">
            <img
              className="max-h-24 rounded-2xl"
              src="https://media.licdn.com/dms/image/v2/D4D0BAQEo-bns7AD0OA/company-logo_200_200/company-logo_200_200/0/1704787530822/kenas__kenya_accreditation_service_logo?e=2147483647&v=beta&t=0sQFULHDxrKJDxdOUgezSfipBn6En3gjqTJZTqvt0j4"
              alt=""
            />
          </div>
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            Kenya Accreditation Service
          </h3>
          <p className="text-gray-700 text-sm">
            <ul>
              <li> ISO 15189: 2012 Quality & Laboratory Competence</li>
              <li>
                {" "}
                Scope covers all lab tests performed at The Nairobi Hospital
              </li>
            </ul>
          </p>
        </div>
        <div className="p-6 border rounded-xl text-center bg-red-50  dark:border-gray-700 shadow-2xl">
          <div className="flex items-center justify-center">
            <img
              className="max-h-24 rounded-2xl"
              src="https://seeklogo.com/images/K/kebs-logo-1223512494-seeklogo.com.png"
              alt=""
            />
          </div>
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            Kenya Bureau of Standards
          </h3>
          <p className="text-gray-700 text-sm">
            <ul className="gap-8">
              <li>ISO 9001:2015 Quality Management System (QMS)</li>
              <li>Scope covers main Hospital and the Outpatient Centres</li>
              <li>ISO 14001:2015 Environmental Management System (EMS)</li>
              <li>Scope covers main Hospital and the Outpatient Centres</li>
              <li>ISO 22000:2018 Food Safety Management System (FSMS)</li>
              <li>
                Scope covers procurement of food items, food production and food
                service
              </li>
            </ul>
          </p>
        </div>
      </div>
    </>
  );
};

export default Accreditation;
