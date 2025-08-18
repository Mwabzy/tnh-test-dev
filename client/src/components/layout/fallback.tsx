import { Skeleton } from "@/components/ui/skeleton";
import { FC } from "react";

type FallbackProps = object;

const Fallback: FC<FallbackProps> = () => {
  return (
    <div className="flex flex-col flex-1 gap-4 p-4 pt-0">
      <div className="grid gap-4 auto-rows-min md:grid-cols-3">
        <Skeleton className="aspect-video rounded-xl bg-muted/50" />
        <Skeleton className="aspect-video rounded-xl bg-muted/50" />
        <Skeleton className="aspect-video rounded-xl bg-muted/50" />
      </div>
      <Skeleton className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </div>
  );
};

export default Fallback;
