import { IconLeft } from "react-day-picker";
import HeaderPic from "../../../assets/Header_Photo.svg";
import { Mail, MessageSquareText, Phone, Star } from "lucide-react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { useEffect } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getOneApplicant } from "@/redux/actions/jobActions";
import TimeAgo from "@/components/custom/LiveTime";
import { Applicant, Job } from "@/types/types.jobReducer";
import { formatDateAndTime } from "@/util/formateDate";
export function ApplicantLayout() {
  const { jobId, applicantId } = useParams();
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getOneApplicant({
        jobId: String(jobId),
        applicantId: String(applicantId),
      })
    );
  }, [applicantId, dispatch, jobId]);
  const { job }: { job: Applicant } = useSelector(
    (state: RootState) => state.job
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) as unknown as Job | Applicant | any;
  return (
    <main className="w-full min-h-screen pb-5 ">
      <section className="mx-auto w-[95%] h-full  ">
        <div className="w-full h-20 flex items-center ">
          <div className="maintxt flex gap-3 text-2xl items-center ">
            <IconLeft />
            Applicant Details
          </div>
        </div>
        <div className="w-full h-full flex flex-col lg:flex-row gap-5 ">
          <div className="min-w-96   flex flex-col border pt-5 px-5 ">
            <div className="w-full flex flex-col gap-4 ">
              <div className="flex min-h-28 gap-4 ">
                <div className="w-28 h-28 rounded-full ">
                  <img
                    src={
                      job?.applicantDetails.icon
                        ? job?.applicantDetails.icon
                        : HeaderPic
                    }
                    className="h-full w-full object-cover rounded-full"
                    alt=""
                  />
                </div>
                <div className="h-28 flex flex-col justify-between py-1">
                  <div>
                    <h1 className="maintxt text-3xl font-semibold">
                      {job?.applicantDetails?.firstname}{" "}
                      {job?.applicantDetails?.lastname}
                    </h1>
                  </div>
                  <div>
                    <h2 className="text-textPrimary ">
                      {job?.applicantDetails.currengDesignation}
                    </h2>
                  </div>
                  <div className="flex gap-2">
                    <Star className="w-5" /> 4.0
                  </div>
                </div>
              </div>
              <div className="w-full min-h-28 p-3 bg-primary/5 rounded-md ">
                <div className="h-9 w-full border-b flex justify-between">
                  <span>Applied jobs</span>
                  <span className="text-textPrimary flex gap-2">
                    
                    {job?.applicants && job?.applicants.appliedDate && <>
                      {formatDateAndTime(job?.applicants.appliedDate).date}
                    </>}
                    {job?.applicants && job?.applicants.appliedDate && (
                      <TimeAgo timestamp={job?.applicants.appliedDate} />
                    )}
                  </span>
                </div>
                <div className="w-full flex flex-col pt-2">
                  <div>
                    <h2 className="text-lg font-semibold">{job?.jobTitle}</h2>
                  </div>
                  <div className="flex text-textPrimar items-center gap-3">
                    <h4>{job?.category}</h4>
                    <span className="w-[4px] h-[4px] block bg-textPrimary rounded-full"></span>
                    <h4>{job?.employment}</h4>
                  </div>
                </div>
              </div>
              <div className="w-full min-h-20 p-3 flex flex-col gap-3 bg-primary/5 rounded-md">
                <div className="maintxt w-full flex justify-between b">
                  <span>Stage</span>
                  <div className="flex gap-2 items-center">
                    <span className={`w-[8px] h-[8px] block  ${job?.applicants?.hiringstage=="Rejected"?"bg-red-500":"bg-primary"} rounded-full`}></span>
                    {job?.applicants?.hiringstage}
                  </div>
                </div>
                <div>
                  <div className="w-full flex gap-1 bg-background">
                    {job?.applicants?.hiringstage === "Inreview" && (
                      <div className="h-2 w-20 bg-primary"></div>
                    )}
                    {job?.applicants?.hiringstage === "Shortlisted" && (
                      <>
                        <div className="h-2 w-20 bg-primary"></div>
                        <div className="h-2 w-20 bg-primary"></div>
                      </>
                    )}
                    {job?.applicants?.hiringstage === "Interview" && (
                      <>
                        <div className="h-2 w-20 bg-primary"></div>
                        <div className="h-2 w-20 bg-primary"></div>
                        <div className="h-2 w-20 bg-primary"></div>
                      </>
                    )}
                    {job?.applicants?.hiringstage === "Selected" && (
                      <>
                        <div className="h-2 w-20 bg-primary"></div>
                        <div className="h-2 w-20 bg-primary"></div>
                        <div className="h-2 w-20 bg-primary"></div>
                        <div className="h-2 w-20 bg-primary"></div>
                      </>
                    )}
                  </div>
                </div>
                <div className="mt-3 flex justify-between  ">
                  <div className="h-12 w-64 border flex items-center justify-center text-primary font-bold">
                    Shedule Interview
                  </div>
                  <div className="h-12 w-12 flex items-center justify-center border">
                    <MessageSquareText />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full p-3 min-h-56 mt-5 border-t">
              <div className="maintxt">
                <h1 className="text-2xl font-semibold">Contact </h1>
              </div>
              <div className="flex flex-col text-textPrimary mt-2 gap-3">
                <div className="w-full flex-col gap-2 ">
                  <div className="w-full flex gap-2">
                    <Mail className="w-5" />
                    Email
                  </div>
                  <div className="pl-7">{job?.applicantDetails.email}</div>
                </div>
                <div className="w-full flex-col ">
                  <div className="w-full flex gap-2">
                    <Phone className="w-5" />
                    Phone
                  </div>
                  <div className="pl-7">
                    {job?.applicantDetails?.phonenumber}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-full border transition-all duration-400">
            <div className="w-full h-16 border-b flex py-3 px-5 items-center gap-5">
              <NavLink
                to={"profile"}
                className={`applicant text-textPrimary font-semibold transition-all duration-700`}
              >
                Applicant profile
              </NavLink>
              <NavLink
                to={"resume"}
                className={`applicant text-textPrimary font-semibold transition-all duration-700`}
              >
                Resume
              </NavLink>
              <NavLink
                to={"hiringstage"}
                className={`applicant text-textPrimary font-semibold transition-all duration-700`}
              >
                Hiring stage
              </NavLink>
            </div>
            <div className="p-4">
              <Outlet />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
