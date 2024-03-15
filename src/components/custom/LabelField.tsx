import { FormLabel } from "@/shadcn/ui/form";
import  { ReactNode } from "react";

interface LabelFieldProps {
  children: ReactNode;
}

export const LabelField = ({ children }: LabelFieldProps) => (
  <FormLabel className="font-semibold flex justify-start">
    {children}
  </FormLabel>
);
