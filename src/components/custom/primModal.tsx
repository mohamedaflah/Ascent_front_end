import React, { ReactNode, forwardRef, useImperativeHandle } from "react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTrigger,
} from "@/shadcn/ui/alert-dialog";

interface ChildProp {
  title?: string;
  children: ReactNode;
  close?: boolean;
}
export interface PrimeModalRef {
  ref?: HTMLButtonElement | null;
  closeRef?: HTMLButtonElement | null;
}
export const PrimeModal = forwardRef<PrimeModalRef, ChildProp>(
  ({ children, title }, ref) => {
    const firstRef = React.useRef<HTMLButtonElement>(null);
    const secondRef = React.useRef<HTMLButtonElement>(null);
    useImperativeHandle(ref, () => ({
      ref: firstRef.current,
      closeRef: secondRef.current,
    }));
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild className="">
          <button
            className=" h-full w-full flex justify-start items-center "
            ref={firstRef}
          >
            io
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent className="min-w-[35%]">
          <h1>{title}</h1>
          <AlertDialogDescription>{children}</AlertDialogDescription>
          <div className="hidden">
            <AlertDialogCancel ref={secondRef} >cls</AlertDialogCancel>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
);
