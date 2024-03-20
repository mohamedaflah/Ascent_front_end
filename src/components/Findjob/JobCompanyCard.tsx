import { Job } from "@/types/types.jobReducer";
// import Image from "../../assets/IMG 3.png";
import { Button } from "@/shadcn/ui/button";
import { useEffect, useState } from "react";
import {  MapPin } from "lucide-react";
interface ChildProp {
  jobData: Job;
}
export function JobCompanyCard({ jobData }: ChildProp) {
  const [job, setJob] = useState<Job>();
  useEffect(() => {
    setJob(jobData);
  }, [jobData]);
  return (
    <div className="w-full h-36 border  flex justify-center items-center hover:bg-backgroundAccent transition-all duration-500 cursor-pointer">
      <div className="w-[95%] h-[80%] flex justify-between">
        <div className="flex items-start w-44  ">
          <img
            src={job?.company?.icon}
            alt=""
            className="h-16  sm:h-20 sm:w-20 object-cover rounded-full "
          />
        </div>
        <div className="w-full flex flex-col justify-between">
          <div>
            <h1 className="text-lg md:text-2xl font-semibold">
              {job?.jobTitle}
            </h1>
          </div>
          <div className="flex gap-4">
            {/* <div className="flex gap-1">
                <Building2 className="w-5 text-textPrimary"/>
              <h3 className="text-textPrimary">{job?.company?.name}</h3>
            </div> */}
            <div className="flex gap-1">
              <MapPin className="w-5 text-textPrimary"/><h3 className="text-textPrimary">{job?.joblocation}</h3>
            </div>
          </div>
          <div className="flex gap-2 md:gap-5">
            <div className="min-w-20 md:w-28 h-8 rounded-full flex items-center justify-center p-2  border-[1px] border-green-500 text-green-500">
              {/* Full time */}
              {job?.employment}
            </div>
            <div className="h-full w-[1px] dark:bg-backgroundAccent bg-textPrimary/15" />
            <div className="min-w-20 md:min-w-28 h-8 rounded-full flex items-center justify-center p-2  border-[1px] border-yellow-500 text-yellow-500">
              {job?.category}
            </div>
            <div className="min-w-20 md:min-w-28 h-8 rounded-full flex items-center justify-center p-2  border-[1px] border-blue-500 text-blue-500">
              Design
            </div>
          </div>
        </div>
        <div className="w-60 flex flex-col items-center  gap-2 justify-center">
          <Button className="rounded-none md:w-32 w-28">Apply</Button>
          <div className="bg-gray-300 h-2 md:w-32 w-28">
            <div className="h-full w-[60%] bg-green-600" />
          </div>
          <div className="flex tex-sm">
            <span className="font-semibold">
              {job?.vacancies.filled} applied{" "}
            </span>{" "}
            <span> of {job?.vacancies.available}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
