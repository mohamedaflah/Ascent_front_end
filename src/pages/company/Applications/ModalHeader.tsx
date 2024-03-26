import { AlertDialogCancel, AlertDialogTitle } from "@/shadcn/ui/alert-dialog";
import { X } from "lucide-react";
import { ReactNode } from "react";

interface ChildProp {
  children: ReactNode;
}
export function ModalHeader({ children }: ChildProp) {
  return (
    <div className="flex justify-between items-center">
      <AlertDialogTitle>{children}</AlertDialogTitle>
      <AlertDialogCancel className="p-0 bg-transparent border-none">
        <X className="w-5" />
      </AlertDialogCancel>
    </div>
  );
}
