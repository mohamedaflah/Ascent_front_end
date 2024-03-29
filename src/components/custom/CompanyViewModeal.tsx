import { AlertDialogFooter, AlertDialogHeader } from "@/shadcn/ui/alert-dialog";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shadcn/ui/alert-dialog";
import { Eye, MoveLeftIcon, MoveRightIcon, X } from "lucide-react";

import { useEffect, useState } from "react";
import { Company } from "@/types/oneCompanyType";
import { CompanyModalFirstPage } from "./CompanyViewMoalFirstPage";
import { CompanyModalSecondPage } from "./CompanyModalSecondPage";

interface ChildProp {
  companyData: Company;
}
export function CompanyViewModal({ companyData }: ChildProp) {
  const [companyProfile, setCompany] = useState<Company>();
  const [secondPage, setSecondPage] = useState<boolean>(false);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setCompany(companyData);
  }, []);
  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full flex justify-start  h-9 items-center font-semibold  ">
        <Eye className="w-5" />
      </AlertDialogTrigger>
      <AlertDialogContent className="min-w-[90%] sm:min-w-[60%] md:min-w-[45%] lg:min-w-[42%] overflow-hidden ">
        <AlertDialogHeader>
          <div className="flex justify-between items-center">
            <AlertDialogTitle>{companyProfile?.name} profile</AlertDialogTitle>
            <AlertDialogCancel className="border-none p-0 w-5 hover:bg-transparent">
              <X />
            </AlertDialogCancel>
          </div>
          <div className="w-full">
            {!secondPage ? (
              <CompanyModalFirstPage companyData={companyProfile as Company} />
            ) : (
              <CompanyModalSecondPage companyData={companyProfile as Company} />
            )}
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div>
            <button
              className=" px-5 py-2 rounded-2xl bg-backgroundAccent animate-pulse hover:border"
              onClick={() => setSecondPage(!secondPage as boolean)}
            >
              {!secondPage ? <MoveRightIcon /> : <MoveLeftIcon />}
            </button>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
