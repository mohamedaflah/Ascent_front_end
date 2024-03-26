import { applicationStatus } from "@/constants/applicationStatus";
import { RootState } from "@/redux/store";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/ui/select";
import { Applicant, Job } from "@/types/types.jobReducer";
import { Pen, Plus } from "lucide-react";
import { useSelector } from "react-redux";
import { ShortListModal } from "./Applications/ShortlistModal";
import { useRef } from "react";
import { SelectingModal } from "./Applications/SelectingModal";
import { InterviewModal } from "./Applications/IntreviewModal";
import { RejectModal } from "./Applications/RejectModal";

export function ApplicantHiringStage() {
  const { job }: { job: Applicant } = useSelector(
    (state: RootState) => state.job
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) as unknown as Job | Applicant | any;

  const shortListBtnRef = useRef<HTMLButtonElement>(null);
  const selectButtonRef = useRef<HTMLButtonElement>(null);
  const interviewButton = useRef<HTMLButtonElement>(null);
  const rejectedwButton = useRef<HTMLButtonElement>(null);
  const handleStatusChange = (
    value: "Shortlisted" | "Interview" | "Rejected" | "Selected"
  ) => {
    if (value === "Shortlisted") {
      shortListBtnRef.current?.click();
    } else if (value == "Selected") {
      selectButtonRef.current?.click();
    } else if (value == "Interview") {
      interviewButton.current?.click();
    } else if (value === "Rejected") {
      rejectedwButton.current?.click();
    }
  };
  return (
    <main className="w-full h-full">
      <div className="hidden">
        <ShortListModal ref={shortListBtnRef} />
        <SelectingModal ref={selectButtonRef} />
        <InterviewModal ref={interviewButton} />
        <RejectModal ref={rejectedwButton} />
      </div>
      <div className="maintxt w-full min-h-56 p-1 space-y-2 ">
        <div className="flex justify-between ">
          <h1 className="text-2xl font-semibold">Current stage</h1>
          <Select onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[170px] p-2 rounded-sm ">
              <SelectValue placeholder="Selecte Hiring stage" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="text-primary bg-primary/5 m-3">
                  Stages
                </SelectLabel>

                <SelectItem className="cursor-pointer" value="Shortlisted">
                  Shortlisted
                </SelectItem>
                <SelectItem className="cursor-pointer" value="Interview">
                  Interview
                </SelectItem>
                <SelectItem className="cursor-pointer" value="Rejected">
                  Rejected
                </SelectItem>
                <SelectItem className="cursor-pointer" value="Selected">
                  Selected
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full h-12 flex gap-2 ">
          {applicationStatus.map((value, index) => (
            <div
              key={index}
              className={`w-28 h-10 flex items-center justify-center  ${
                index !== 0 && "-skew-x-12"
              } ${
                value === job?.applicants?.hiringstage
                  ? "bg-primary text-white"
                  : "bg-primary/10"
              } `}
            >
              {value}
            </div>
          ))}
        </div>
        <div className="w-full">
          <div className="w-full mt-2">
            <h3 className="font-semibold text-lg">Stage Info</h3>
          </div>
          <div className="w-full flex flex-col">
            <span className="text-textPrimary">Interview date</span>
            <h3>Mar 31 2020</h3>
          </div>
        </div>
      </div>
      <div className="min-h-80 w-full overflow-y-auto p-1 space-y-3">
        <div className="w-full h-12 flex justify-between">
          <h2 className="text-lg font-semibold">Interview List</h2>
          <div className="min-w-36 h-12 flex items-center justify-center gap-2 text-primary bg-primary/5 px-3">
            <Plus /> Add Schedule intreview
          </div>
        </div>
        <div className="w-full">
          <div className="w-full h-28 ">
            <div className="w-full">Tomorrow - 10 july 2024</div>
            <div className="h-24 py-2  space-y-2">
              <div className="w-full h-full border flex items-center justify-between px-5">
                <div className=" flex flex-col gap-2">
                  <h4 className="font-semibold">10:00 AM - 11:30 AM</h4>
                  <span>Online Interview</span>
                </div>
                <div className=" flex flex-col gap-2">
                  <h4 className="font-semibold">Type of review</h4>
                  <span>Written test</span>
                </div>
                <div className=" flex items-center justify-center h-12 min-w-28 gap-2 px-3 bg-primary/5 text-primary">
                  <Pen className="w-5" /> Add feedback
                </div>
                {/* <div className=" flex items-center justify-center h-12 w-12 rounded-full mr-3">
                    <div className="py-2 px-4 border rounded-full">
                    Pending
                    </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
