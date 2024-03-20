import { FindbJobHero } from "@/components/Findjob/FindJobHero";
import { FindJobList } from "@/components/Findjob/FindJobList";
import { getAllJobs } from "@/redux/actions/jobActions";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function FindJobs() {
  const { user } = useSelector((state: RootState) => state.userData);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllJobs())
  },[dispatch]);
  return (
    <main className="w-full ">
      <FindbJobHero />
      <main
        className={`h-screen relative overflow-y-auto mt-5 ${
          !user ? "w-[90%] md:w-[85%]" : "w-[95%] md:w-[95%]"
        } mx-auto`}
      >
        <FindJobList />
      </main>
    </main>
  );
}
