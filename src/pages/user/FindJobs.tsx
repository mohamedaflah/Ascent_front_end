import { FindbJobHero } from "@/components/Findjob/FindJobHero";
import { FindJobList } from "@/components/Findjob/FindJobList";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export function FindJobs() {
  const { user } = useSelector((state: RootState) => state.userData);
  return (
    <main className="w-full ">
      <FindbJobHero />
      <main
        className={`h-screen relative overflow-y-auto ${
          !user ? "w-[90%] md:w-[85%]" : "w-[95%] md:w-[95%]"
        } mx-auto`}
      >
        <FindJobList/>
      </main>
    </main>
  );
}
