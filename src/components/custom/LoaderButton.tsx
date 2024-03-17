import { Button } from "@/shadcn/ui/button";
import ButtonLoading from "./ButtonLoading";
import { ReactNode } from "react";

interface ChildProp {
  children: ReactNode;
  loading: boolean;
  className?: string;
}
export const LoaderSubmitButton = ({ loading, children,className }: ChildProp) => {
  return (
    <Button
      className={`min-w-28 flex gap-3 font-semibold ${className} ${
        loading && "pointer-events-none "
      }`}
      type="submit"
    >
      {!loading ? (
        <span className="flex gap-2 items-center justify-between">
          {children}
        </span>
      ) : (
        <ButtonLoading />
      )}
    </Button>
  );
};
