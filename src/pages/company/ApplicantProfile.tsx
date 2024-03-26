import TechnologyIcon from "@/components/custom/TechIcon";
import { RootState } from "@/redux/store";
import { calculateAge } from "@/util/calculateage";
import { format } from "date-fns";
import { useSelector } from "react-redux";

export function ApplicantDetail() {
  const { job } = useSelector((state: RootState) => state.job);
  return (
    <main className="w-full h-full ">
      <div className="w-full h-10 maintxt">
        <h1 className="text-2xl font-semibold">Personal Info</h1>
      </div>
      <div className="flex flex-col gap-3 border-b  pb-8">
        <div className="grid grid-cols-2">
          <div className="flex flex-col">
            <span className="text-textPrimary text-lg">Full name</span>
            <h2 className="text-lg">
              {job?.applicantDetails.firstname} {job?.applicantDetails.lastname}
            </h2>
          </div>
          <div className="flex flex-col">
            <span className="text-textPrimary text-lg">Gender</span>
            <h2 className="company_text text-lg">Male</h2>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="flex flex-col">
            <span className="text-textPrimary text-lg">Date of Birth</span>
            <h2 className="text-lg">
              {job &&
                job.applicantDetails &&
                job.applicantDetails.dateofbirth && (
                  <>
                    {format(
                      job?.applicantDetails.dateofbirth as
                        | string
                        | number
                        | Date,
                      "PPP"
                    )}
                  </>
                )}
              <span className="text-sm ml-1 text-textPrimary">
                (
                {job &&
                  job.applicantDetails &&
                  job.applicantDetails.dateofbirth && (
                    <>{calculateAge(job.applicantDetails.dateofbirth)}</>
                  )}
                y.0)
              </span>
            </h2>
          </div>
          <div className="flex flex-col">
            <span className="text-textPrimary text-lg">Language</span>
            <h2 className="company_text text-lg">English,Malayalam</h2>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="maintxt w-full ">
            <span className="text-lg">Address</span>
            <div className="w-60">45782 Washingtone ave</div>
          </div>
        </div>
      </div>
      <div className="w-full mt-4">
        <div className="w-full h-10 maintxt">
          <h1 className="text-2xl font-semibold">Proffesional Info</h1>
        </div>
        <div className="divClass h-56 overflow-y-auto ">
          <div className="w-full mt-2">
            <span className="text-textPrimary text-lg">About me</span>
          </div>
          <div className="w-full">
            <p>
              aslkdfj Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Nemo laboriosam molestiae ratione nobis minima totam ut veritatis
              porro iste nulla modi quas perspiciatis aspernatur illum
              voluptatem autem unde consequuntur accusantium molestias commodi,
              consectetur id. Dolores perspiciatis minima iure modi natus.
            </p>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-2">
            <div className="flex flex-col">
              <span className="text-textPrimary text">Current designation</span>
              <h2 className="font-semibold">
                {job?.applicantDetails.currengDesignation}r
              </h2>
            </div>
            <div className="flex flex-col">
              <span className="text-textPrimary text">Experience in year</span>
              <h2 className="font-semibold">4 Years</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 mt-3">
            <div className="flex flex-col">
              <span className="text-textPrimary text">
                Highest Qualification Held
              </span>
              <h2 className="font-semibold">Bachelore of degree in CS</h2>
            </div>
            <div className="flex flex-col">
              <span className="text-textPrimary text">Skill set</span>
              <div className="w-full min-h-10 flex flex-wrap mt-1 gap-2">
                {job?.applicantDetails.skills?.map((value, index) => (
                  <div key={index} className="h-10 rounded-md flex items-center justify-center  text-textPrimary px-3 border gap-2">
                    <TechnologyIcon technology={value}/>{value} 
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2"></div>
        </div>
      </div>
    </main>
  );
}
