import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/ui/select";
import { Pen, Plus } from "lucide-react";

export function ApplicantHiringStage() {
  return (
    <main className="w-full h-full">
      <div className="maintxt w-full min-h-56 p-1 space-y-2 ">
        <div className="flex justify-between ">
          <h1 className="text-2xl font-semibold">Current stage</h1>
          <Select>
            <SelectTrigger className="w-[100px] p-2 rounded-sm text-primary font-semibold">
              <SelectValue placeholder="Rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full h-12 flex gap-2 ">
          <div className="w-28 h-full flex items-center justify-center bg-primary/10 ">
            In review
          </div>
          <div className="min-w-28 h-full flex items-center justify-center bg-primary/10 ">
            Shortlisted
          </div>
          <div className="min-w-28 h-full flex items-center justify-center bg-primary/10 ">
            Interview
          </div>
          <div className="min-w-28 h-full flex items-center justify-center bg-primary/10 ">
            Hired
          </div>
          <div className="min-w-28 h-full flex items-center justify-center bg-primary/10 ">
            Rejected
          </div>
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
