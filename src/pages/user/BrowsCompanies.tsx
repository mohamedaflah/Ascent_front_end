import { FindbJobHero } from "@/components/Findjob/FindJobHero";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import Imge from "@/assets/IMG 3.png";
export const BrowsCompanies = () => {
  const { user } = useSelector((state: RootState) => state.userData);
  return (
    <main className="w-full min-h-screen pb-5">
      <FindbJobHero
        label="dream companies"
        underlineLength="70"
        highliteText="Find the dream companies you dream work for"
      />
      <section
        className={`${
          !user ? "w-[90%] md:w-[85%]" : "w-[95%] md:w-[95%]"
        } mx-auto mt-24`}
      >
        <div className="w-full flex flex-col justify-start items-start  ">
          <h1 className="maintxt font-semibold text-3xl w-full">
            Recommended Companies
          </h1>
          <h3 className="maintxt text-textPrimary">
            Based on your profile, company preferences, and recent activity
          </h3>
        </div>
        <div className="w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid xl:grid-cols-5 mt-5 gap-y-5">
          <div className="flex justify-center">
            <div className="w-64 p-5 h-64 border rounded-sm">
              <div className="w-full flex justify-between">
                <img src={Imge} className="h-16 w-16 object-cover " alt="" />
                <div className="flex gap-2 h-7 rounded-md  items-center px-4 bg-primary/10 ">
                  3 jobs
                </div>
              </div>
              <div className="w-full mt-1">
                <h2 className="maintxt font-semibold text-lg">Nomad</h2>
              </div>
              <div className="divClass line-clamp-4">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam
                tenetur consequatur dolore vitae perferendis quibusdam ad animi
                necessitatibus dolorum totam!
              </div>
              <div className="w-full mt-3">
                <span className="px-4 py-1 rounded-2xl border-2 border-yellow-300 text-yellow-300 min-w-20">
                  Business service
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
