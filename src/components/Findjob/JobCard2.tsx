import { Job } from "@/types/types.jobReducer";

import { useEffect, useState } from "react";
import { Bookmark, Sparkles } from "lucide-react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { BsBookmarkStarFill } from "react-icons/bs";
import { getSpecificJob } from "@/redux/actions/jobActions";
import { saveNewJob } from "@/redux/actions/userActions";
interface ChildProp {
  jobData: Job;
}
export function JobCompanyCard2({ jobData }: ChildProp) {
  const [job, setJob] = useState<Job>();
  useEffect(() => {
    setJob(jobData);
  }, [jobData]);
  const dispatch: AppDispatch = useDispatch();
  const { job: jobDetail } = useSelector((state: RootState) => state.job);
  const { user } = useSelector((state: RootState) => state.userData);
  const hadleClick = (id: string) => {
    dispatch(getSpecificJob(id));
  };
  
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSaveJob = (e:any,jobId: string,type:"add"|"delete") => {
    // e.stopPropegation()
    dispatch(saveNewJob({ userId: user?._id, jobId: jobId, type: type }))
  };
//   useEffect(()=>{
// alert(`OPPIOPKlm _ ${job?._id} ${savedJobs.includes(job?._id)} ${user?.savedJobs.includes(String(job?._id))}`)
//   },[savedJobs])
  return (
    <div
      className={`w-full min-h-36 border  flex justify-center items-center  transition-all duration-500 cursor-pointer rounded-[5px] ${
        jobDetail?._id == job?._id
          ? "bg-backgroundAccent"
          : "hover:bg-backgroundAccent/55"
      }`}
      onClick={() => hadleClick(job?._id ?? "")}
    >
      <div className="w-[95%] h-[80%] flex justify-between">
        <div className="flex items-start w-20  ">
          <img
            src={job?.company?.icon}
            alt=""
            className=" size-8  object-cover rounded-full "
          />
        </div>
        <div className="w-full flex flex-col  gap-1 ">
          <div>
            <h1 className="maintxt text-sm  ">{job?.company?.name}</h1>
          </div>
          <div className="flex gap-4 ">
            <div>
              <h2 className="company_text font-semibold text-lg">
                {job?.jobTitle}
              </h2>
            </div>
          </div>
          <div className="maintxt flex gap-1">
            {/* <MapPin className="w-4 text-textPrimary" /> */}
            {job?.joblocation}
          </div>
          <div>
            <h1 className="maintxt">
              INR {job?.salaryrange.from} - {job?.salaryrange.to} (Employ st)
            </h1>
          </div>
        </div>
        <div className="w-60 flex flex-col items-end  gap-2  justify-between">
          <div
          >
            {!user?.savedJobs.includes(String(job?._id))? (
              <Bookmark
                className="w-5"
                onClick={(e) => handleSaveJob(e,String(job?._id),"add")}
              />
            ) : (
              <BsBookmarkStarFill className="text-lg" onClick={(e) => handleSaveJob(e,String(job?._id),"delete")} />
            )}
          </div>
          <div className="maintxt text-green-600 flex gap-1 items-center">
            <Sparkles className="w-4" />
            <span>Easy Apply</span>
          </div>
        </div>
      </div>
    </div>
  );
}
