import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FC } from "react";

interface CareerItemProps {
  position: string;
  description: string;
  location: string;
  jobType: string;
  datePosted: string;
  closingDate?: string;
}

const CareerItem: FC<CareerItemProps> = ({
  position,
  description,
  location,
  datePosted,
  jobType,
}) => {
  return (
    <Card className="flex flex-col p-4 border border-gray-300 rounded w-full">
      <CardContent className="flex flex-col gap-2 items-start w-full ">
        <div className="flex justify-between items-center w-full">
          <h3 className="flex text-lg font-semibold font-serif">{position}</h3>
          <Badge className="bg-orange-200 flex">Date Posted: {datePosted}</Badge>
        </div>
        <p className="text-gray-600">{description}</p>
        <div className="flex gap-2">
          <Badge className="bg-orange-200">{location}</Badge>
          <Badge className="bg-orange-200">{jobType}</Badge>
        </div>
        <Button variant="link" className="px-0 font-serif text-base">Apply</Button>
      </CardContent>
    </Card>
  );
};

export default CareerItem;
