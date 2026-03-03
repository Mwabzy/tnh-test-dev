import type { ComponentProps } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type RegenerateTranslationsButtonProps = Omit<
  ComponentProps<typeof Button>,
  "children" | "type"
> & {
  isLoading?: boolean;
};

const RegenerateTranslationsButton = ({
  className,
  disabled,
  isLoading = false,
  ...props
}: RegenerateTranslationsButtonProps) => (
  <Button
    type="button"
    variant="outline"
    disabled={disabled || isLoading}
    className={cn(
      "h-auto rounded-md border-blue-300 bg-white px-5 py-3 text-base font-medium text-blue-700 shadow-none hover:bg-blue-50 hover:text-blue-700",
      "disabled:border-gray-300 disabled:bg-white disabled:text-gray-400",
      className,
    )}
    {...props}
  >
    {isLoading ? "Regenerating translations..." : "Regenerate all translations"}
  </Button>
);

export default RegenerateTranslationsButton;
