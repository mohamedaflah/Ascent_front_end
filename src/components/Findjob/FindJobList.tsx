import { FindJobFilterBar } from "./FindJobFilterBars";
import { JobCompanyCard } from "./JobCompanyCard";

export function FindJobList() {
  return (
    <main className="w-full h-full flex mt-3">
      <FindJobFilterBar />
      <div className="w-full h-full pt-3 pl-3">
        <div className="w-full flex justify-between">
          <div className="flex flex-col">
            <h1 className="maintxt text-4xl font-bold">All jobs</h1>
            <span className="text-textPrimary">Showing 90 result</span>
          </div>
        </div>
          <div className="w-full mt-3  space-y-3 overflow-y-auto">
            <JobCompanyCard/>
            <JobCompanyCard/>
            <JobCompanyCard/>
            <JobCompanyCard/>
            <JobCompanyCard/>
          </div>
      </div>
    </main>
  );
}
