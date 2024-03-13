import { Company } from "@/types/oneCompanyType";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";

import { format } from "date-fns";
import { useEffect, useState } from "react";
interface ChildProp {
  companyData: Company;
}

export function CompanyModalSecondPage({ companyData }: ChildProp) {
  const [companyProfile, setCompanyProfile] = useState<Company>();
  useEffect(() => {
    setCompanyProfile(companyData);
  }, [companyData]);
  const getFormattedDate = (dateString?: string): string => {
    if (!dateString) return 'Date not available';

    const date = new Date(dateString);
    // Check if the date is valid
    if (isNaN(date.getTime())) return 'Invalid date';

    return format(date, 'PPP');
  };
  return (
    <AlertDialogDescription className="flex flex-col gap-3">
      <div className="w-full  flex justify-between items-start">
        <div className="min-w-32 h-10 rounded-md border flex items-center justify-center p-3">
          Founded At {"  :  "}{" "}
          {getFormattedDate(String(companyProfile?.foundedDate))}
        </div>
        {/* <h1 className="font-bold text-2xl">Certificate</h1> */}
        <div className="min-w-32 h-10 rounded-md border flex items-center justify-center p-3">
          Registration id {"  :  "} {companyProfile?.registrationId}{" "} 
        </div>
      </div>
      <div className="pdf-container h-full min-h-96 border rounded-md">
        <iframe
          src={companyProfile?.certificate}
          className="w-full h-full"
        ></iframe>
      </div>
    </AlertDialogDescription>
  );
}
