import { FC } from "react";
import CareerItem from "./CareerItem";

interface CareerListProps {
  jobs: {
    position: string;
    description: string;
    location: string;
    jobType: string;
    datePosted: string;
    closingDate?: string;
  }[];
}

const CareerList: FC<CareerListProps> = ({ jobs }) => {
  return (
    <div className="w-full flex items-center justify-center gap-4 mx-auto container">
      {jobs.map((job, index) => (
        <CareerItem key={index} {...job} />
      ))}
    </div>
  );
};

export default CareerList;
