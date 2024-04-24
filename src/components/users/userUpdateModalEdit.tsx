import { ReactNode, forwardRef } from "react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/shadcn/ui/alert-dialog";
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import { Edit, Plus, X } from "lucide-react";

interface ChildProp {
  editType?: "white" | "blue" | "button" | "plus";
  children: ReactNode;
  close?: boolean;
  title?: string;
}
export const UserUpdateModalEdit = forwardRef<HTMLButtonElement, ChildProp>(
  ({ children, title, editType }, ref) => {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild className="cursor-pointer">
          {editType == "white" ? (
            <div className="absolute right-2 top-2 text-white p-3">
              <Edit className="w-6" />
            </div>
          ) : editType == "button" ? (
            <button className="h-10 min-w-36 p-2 border border-primary flex justify-center items-center gap-2 rounded-[2px] text-primary">
              Edit profile
            </button>
          ) : editType === "plus" ? (
            <div className="h-10 w-10 flex justify-center items-center border text-primary">
              <Plus className="w-5" />
            </div>
          ) : (
            <div className="h-10 w-10 flex justify-center items-center border text-primary">
              <Edit className="w-5" />
            </div>
          )}
        </AlertDialogTrigger>
        <AlertDialogContent className="min-w-[35%]">
          <AlertDialogHeader className="space-y-2">
            <div className="flex justify-between items-center">
              <AlertDialogTitle>{title}</AlertDialogTitle>
              <AlertDialogCancel
                ref={ref}
                className="m-0 p-0 bg-transparent hover:bg-transparent border-none"
              >
                <X className="w-5" />
              </AlertDialogCancel>
            </div>
            <AlertDialogDescription>{children}</AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
);
