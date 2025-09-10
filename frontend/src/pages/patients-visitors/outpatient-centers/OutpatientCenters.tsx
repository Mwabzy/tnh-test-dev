import Heading from "@/components/Heading";
import { FC } from "react";
import OpcList from "./OutpatientCenterList";

type OutpatientCentersProps = object;

const OutpatientCenters: FC<OutpatientCentersProps> = () => {
  return (
    <div>
      <Heading
        image_url="https://cms.thenairobihosp.org/uploads/outpatient_centers_8fbeb1073c.jpg"
        style="image"
        title="Outpatient Centers"
        description="Explore our network of outpatient centers for convenient and accessible healthcare services."
      />
      <div className="flex flex-col items-center justify-center my-10">
        <OpcList />
      </div>
    </div>
  );
};

export default OutpatientCenters;
