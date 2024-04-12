import { useDispatch, useSelector } from "react-redux";
import { FindJobFilterBar } from "./FindJobFilterBars";
// import { JobCompanyCard } from "./JobCompanyCard";
import { AppDispatch, RootState } from "@/redux/store";
import { JobCompanyCard2 } from "./JobCard2";
import { Bookmark, CaptionsOff, MapPin, Sparkles } from "lucide-react";

import TechnologyIcon from "../custom/TechIcon";
import { useEffect } from "react";
import { getSpecificJob } from "@/redux/actions/jobActions";
import { ApplyJob } from "./ApplyJobModal";
import { Button } from "@/shadcn/ui/button";
import toast from "react-hot-toast";
import { CompleteProfile } from "../users/ProfileCompleteModal";
import NodataImage from "../../assets/undraw_not_found_re_bh2e.svg";
export function FindJobList() {
  const { jobs, job } = useSelector((state: RootState) => state.job);
  const { user } = useSelector((state: RootState) => state.userData);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if (!job) {
      dispatch(getSpecificJob(jobs?.[0]?._id ?? ""));
    }
  }, [dispatch, job, jobs]);

  return (
    <main className="w-full h-[768px] flex ">
      <FindJobFilterBar />
      <div className="w-full h-full pt-3 pl-3  flex flex-col">
        <div className="w-full flex justify-between">
          <div className="flex flex-col">
            <h1 className="maintxt text-4xl font-bold">All jobs</h1>
            <span className="text-textPrimary">
              Showing {jobs?.length} result
            </span>
          </div>
        </div>
        <div className="w-full mt-3   h-full flex gap-2">
          <div className=" w-full  lg:w-[680px]  h-full space-y-3  "> {/*xl:w-[410px] removed lg:w-[500px] removed */}
            {/* {jobs?.map((value) => (
              <JobCompanyCard2 key={value?._id} jobData={value} />
            ))} */}
            {jobs && jobs?.length > 0 ? (
              <>
                {jobs.map((value) => (
                  <JobCompanyCard2 key={value?._id} jobData={value} />
                ))}
              </>
            ) : (
              <>
                <div className="w-full min-h-36 rounded-sm border flex flex-col items-center justify-center py-6 px-6 gap-2">
                  <img src={NodataImage} className="w-full" alt="" />
                  <span>No job match with this condition</span>
                </div>
              </>
            )}
          </div>
          <div className="w-full  hidden   xl:block border rounded-[5px]  p-8 overflow-y-auto relative bg-background">
            <div className="flex w-full justify-between  h-28 bg-background z-10 ">
              <div className="   flex flex-col">
                <div className="w-full h-10 flex justify-start">
                  <h3 className="maintxt text-xl font-semibold">
                    {job?.company?.name}
                  </h3>
                </div>
                <div className="flex flex-col">
                  <h2 className="maintxt font-semibold text-2xl ">
                    {job?.jobTitle}
                  </h2>
                  <span className="maintxt text-xl">{job?.joblocation}</span>
                </div>
              </div>
              <div className="flex gap-8 h-16 items-center">
                <Bookmark className="w-8" />
                {user ? (
                  <>
                    {!job?.expired ? (
                      <>
                        {user.profileCompleted ? (
                          <ApplyJob key={job?._id} />
                        ) : (
                          <CompleteProfile />
                        )}
                      </>
                    ) : (
                      <div className="min-w-20 h-10 flex justify-center items-center  rounded-3xl px-3   py-2 gap-2 bg-green-700/15">
                        Application closed <CaptionsOff className="w-5" />
                      </div>
                    )}
                  </>
                ) : (
                  <Button
                    className={`rounded-[4px]  min-w-28 text-lg h-12 flex gap-2 `}
                    onClick={() => toast.error("Please Login first")}
                  >
                    <Sparkles />
                    Apply
                  </Button>
                )}
              </div>
            </div>
            <div>
              <div className="divClass maintxt w-full min-h-12  ">
                {job?.description}
              </div>
              <div className="divClass maintxt w-full min-h-12  mt-3">
                {job?.responsibilities}
              </div>
            </div>
            <div className="mt-8 w-full min-h-56 border-b pb-5">
              <div className="min-w-56 pl-5 ">
                <ul className="maintxt list-disc uppercase text-lg">
                  {job?.qualification?.map((value, index) => {
                    return <li key={index}>{value}</li>;
                  })}
                </ul>
              </div>
              <div className="w-full flex flex-wrap mt-3 gap-3">
                {job?.skills?.map((value, index) => {
                  return (
                    <div
                      key={index}
                      className="h-10 min-w-20 border rounded-md flex items-center justify-center p-2 gap-2"
                    >
                      <TechnologyIcon technology={value} /> {value}
                    </div>
                  );
                })}
              </div>
              <div className="maintxt w-full mt-3 text-lg flex flex-col gap-3">
                <div className="flex">
                  <h1>
                    Job Type {" : "}
                    {job?.employment}
                  </h1>
                </div>
                <div>
                  Salary {job?.salaryrange.from}₹ {" - "} {job?.salaryrange.to}₹
                </div>
                <div className="flex">
                  <h1>
                    Work location {" : "}
                    {job?.joblocation}
                  </h1>
                </div>
              </div>
              <div></div>
            </div>
            <div className="w-full min-h-40 flex flex-col gap-8 mt-3  ">
              <div className="w-full">
                <h1 className="maintxt text-2xl font-semibold">
                  Base Pay Range
                </h1>
              </div>
              <div className="w-full  border rounded-[5px] bg-backgroundAccent p-5 flex flex-col">
                <div className="w-full h-16 flex  gap-2 ">
                  <h1 className="maintxt text-2xl font-semibold text-primary">
                    ₹{job?.salaryrange.from} - ₹{job?.salaryrange.to}
                  </h1>
                  <h2 className="maintxt  text-lg mt-1">/mo (Employer est.)</h2>
                </div>
                <div className="maintxt flex w-full gap-2 text-lg">
                  <MapPin /> {job?.joblocation}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
