import { Checkbox } from "@/shadcn/ui/checkbox";
import { ChevronUp } from "lucide-react";

export function FindJobFilterBar() {
  return (
    <aside className="hidden h-full min-w-80  lg:flex flex-col pr-2">
      <div className="w-full py-2  flex flex-col gap-5">
        <div className="flex justify-between">
          <h2 className="text-lg font-bold ">Type of Employment </h2>
          <ChevronUp />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-5 items-center">
            <Checkbox />
            <label className="text-textPrimary">
              Full time
            </label>
          </div>
          <div className="flex gap-5 items-center">
            <Checkbox />
            <label className="text-textPrimary">
              Full time
            </label>
          </div>
          <div className="flex gap-5 items-center">
            <Checkbox />
            <label className="text-textPrimary">
              Full time
            </label>
          </div>
          <div className="flex gap-5 items-center">
            <Checkbox />
            <label className="text-textPrimary">
              Full time
            </label>
          </div>
          <div className="flex gap-5 items-center">
            <Checkbox />
            <label className="text-textPrimary">
              Full time
            </label>
          </div>
          <div className="flex gap-5 items-center">
            <Checkbox />
            <label className="text-textPrimary">
              Full time
            </label>
          </div>
        </div>
      </div>
      <div className="w-full py-2  flex flex-col gap-5">
        <div className="flex justify-between">
          <h2 className="text-lg font-bold ">Categoris </h2>
          <ChevronUp />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-5 items-center">
            <Checkbox />
            <label className="text-textPrimary">
              Full time
            </label>
          </div>
          <div className="flex gap-5 items-center">
            <Checkbox />
            <label className="text-textPrimary">
              Full time
            </label>
          </div>
          <div className="flex gap-5 items-center">
            <Checkbox />
            <label className="text-textPrimary">
              Full time
            </label>
          </div>
          <div className="flex gap-5 items-center">
            <Checkbox />
            <label className="text-textPrimary">
              Full time
            </label>
          </div>
          <div className="flex gap-5 items-center">
            <Checkbox />
            <label className="text-textPrimary">
              Full time
            </label>
          </div>
          <div className="flex gap-5 items-center">
            <Checkbox />
            <label className="text-textPrimary">
              Full time
            </label>
          </div>
        </div>
      </div>
      <div className="w-full py-2  flex flex-col gap-5">
        <div className="flex justify-between">
          <h2 className="text-lg font-bold ">Job level </h2>
          <ChevronUp />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-5 items-center">
            <Checkbox />
            <label className="text-textPrimary">
              Full time
            </label>
          </div>
          <div className="flex gap-5 items-center">
            <Checkbox />
            <label className="text-textPrimary">
              Full time
            </label>
          </div>
          <div className="flex gap-5 items-center">
            <Checkbox />
            <label className="text-textPrimary">
              Full time
            </label>
          </div>
          <div className="flex gap-5 items-center">
            <Checkbox />
            <label className="text-textPrimary">
              Full time
            </label>
          </div>
          <div className="flex gap-5 items-center">
            <Checkbox />
            <label className="text-textPrimary">
              Full time
            </label>
          </div>
          <div className="flex gap-5 items-center">
            <Checkbox />
            <label className="text-textPrimary">
              Full time
            </label>
          </div>
        </div>
      </div>
      <div className="w-full py-2  flex flex-col gap-5">
        <div className="flex justify-between">
          <h2 className="text-lg font-bold ">Salary range </h2>
          <ChevronUp />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-5 items-center">
            <Checkbox />
            <label className="text-textPrimary">
              Full time
            </label>
          </div>
          <div className="flex gap-5 items-center">
            <Checkbox />
            <label className="text-textPrimary">
              Full time
            </label>
          </div>
          <div className="flex gap-5 items-center">
            <Checkbox />
            <label className="text-textPrimary">
              Full time
            </label>
          </div>
          <div className="flex gap-5 items-center">
            <Checkbox />
            <label className="text-textPrimary">
              Full time
            </label>
          </div>
          <div className="flex gap-5 items-center">
            <Checkbox />
            <label className="text-textPrimary">
              Full time
            </label>
          </div>
          <div className="flex gap-5 items-center">
            <Checkbox />
            <label className="text-textPrimary">
              Full time
            </label>
          </div>
        </div>
      </div>
    </aside>
  );
}
