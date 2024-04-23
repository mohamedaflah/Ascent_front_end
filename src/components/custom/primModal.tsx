import { ReactNode, forwardRef } from "react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTrigger,
} from "@/shadcn/ui/alert-dialog";


interface ChildProp {
  title?: string;
  children: ReactNode;
  close?: boolean;
}
export const PrimeModal = forwardRef<HTMLButtonElement, ChildProp>(
  ({ children ,title}, ref) => {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild className="">
          <button
            className=" h-full w-full flex justify-start items-center "
            ref={ref}
          >
            io
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent className="min-w-[35%]">
          <h1>{title}</h1>
          <AlertDialogDescription>{children}</AlertDialogDescription>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
);
