import { Link } from "react-router";
import opcData from "@/data/opcData.json";
import HeaderText from "@/components/HeaderText";
import { useIntlayer } from "react-intlayer";

const Opc = () => {
 const content = useIntlayer("outpatient_clinics");
  return (
    <div>
      <div className="flex flex-col items-center justify-center mx-[8%] my-10">
        <HeaderText
          title={content.opctitle}
          description={content.opcdescription}
        />
      </div>

      <div className="rounded-lg p-6 md:p-10 text-center bg-grey-50 dark:border-gray-700 shadow-xl backdrop-blur-md mx-[8%] my-10 border-2 border-gray-50">
        <h2 className="text-2xl ml- md:text-3xl font-semibold mb-6 text-red-900">
         {content.ouropctitle}
        </h2>
        <div className="flex flex-col md:grid-cols-2 lg:flex-row lg:flex-wrap justify-center gap-4 text-black ">
          {opcData.map((opc) => (
            <Link
              key={opc.id}
              to={`/outpatient-center/${opc.id}`}
              className=" p-2 text-center hover:underline"
            >
              {opc.name}, {opc.location}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Opc;
