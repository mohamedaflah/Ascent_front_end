import { Company } from "@/types/oneCompanyType";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";
import { Briefcase, Globe, MapPin, MapPinned, Slack } from "lucide-react";
import { FaIndustry, FaLinkedin } from "react-icons/fa";
import TechnologyIcon from "./TechIcon";
import { useEffect, useState } from "react";

interface ChildProp {
  companyData: Company;
}
export function CompanyModalFirstPage({companyData}:ChildProp) {
    const [companyProfile,setCompanyProfile]=useState<Company>()
    useEffect(()=>{
        setCompanyProfile(companyData)
    },[])
  return (
    <AlertDialogDescription className="flex flex-col gap-3">
      <div className="w-full   relative flex items-center rounded-lg flex-col">
        <div className="h-32 w-32 rounded-3xl border absolute left-3 bottom-6 bg-[#6913D8] flex items-center justify-normal overflow-hidden">
          <img src={companyProfile?.icon} className="h-full" alt="" />
        </div>
        <div className="h-36  w-full rounded-md overflow-hidden">
          <img
            src={companyProfile?.coverImage}
            className="w-full object-cover h-full"
            alt=""
          />
        </div>
        <div className="h-24  w-full flex justify-between">
          <div className="w-48"></div>
          <div className="h-full w-full  flex flex-col">
            <div className="w-full">
              <h1 className="text-2xl font-semibold">{companyProfile?.name}</h1>
            </div>
            <div className="w-full flex py-1 gap-2 justify-between pl-1">
              <div className="flex  items-center gap-2 h-10">
                <FaIndustry /> {companyProfile?.industry}
              </div>
              <div className="flex  items-center gap-1 h-10">
                <MapPin /> Indonesia ,Jakartha
              </div>
              <div className="flex items-center gap-1 h-10">
                <Briefcase /> Onsite
              </div>
              <a
                className="text-2xl flex items-center gap-1 h-10 justify-end cursor-pointer hover:text-blue-800"
                href={companyProfile?.LinkedInLink}
              >
                <FaLinkedin />
              </a>
              <a
                href={companyProfile?.website}
                className="text-2xl flex items-center gap-1 h-10 justify-end cursor-pointer hover:text-blue-800"
              >
                <Globe />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="divClass w-full min-h-16 flex flex-wrap line-clamp-4 break-words ">
        <p>{companyProfile?.description}</p>
      </div>
      <div className="flex items-center gap-3 mt-2">
        <Slack /> Tech stacks
      </div>
      <div className="w-full min-h-12 flex flex-wrap gap-2">
        {companyProfile?.techStack?.map((stacks) => (
          <div
            key={stacks}
            className=" h-10 border flex items-center justify-between px-3 rounded-md gap-2 "
          >
            <TechnologyIcon technology={stacks} />
            {stacks}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3 mt-2">
        <MapPinned /> Locations
      </div>
      <div className="w-full min-h-12 flex flex-wrap gap-2">
        {companyProfile?.locations?.map((stacks) => (
          <div
            key={stacks}
            className=" h-10 border flex items-center justify-between px-3 rounded-md gap-2 "
          >
            <MapPin />
            {stacks}
          </div>
        ))}
      </div>
    </AlertDialogDescription>
  );
}
