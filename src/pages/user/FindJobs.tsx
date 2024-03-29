import { FindbJobHero } from "@/components/Findjob/FindJobHero";
import { FindJobList } from "@/components/Findjob/FindJobList";
import { getAllJobs } from "@/redux/actions/jobActions";
import { AppDispatch, RootState } from "@/redux/store";
import { Button } from "@/shadcn/ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

export function FindJobs() {
  const { user } = useSelector((state: RootState) => state.userData);
  const { pages } = useSelector((state: RootState) => state.job);
  console.log("🚀 ~ FindJobs ~ pages:", pages);
  const dispatch: AppDispatch = useDispatch();
  const [searchParam, setSearchParam] = useSearchParams();
  useEffect(() => {
    dispatch(
      getAllJobs({
        page: Number(searchParam.get("page")),
        pageSize: Number(searchParam.get("pageSize")),
      })
    );
  }, [dispatch, searchParam]);
  const handleButtonClick = (num: number, from: "firstpage" | "other") => {
    const params = new URLSearchParams(searchParam);
    if (from === "other") {
      params.set(
        "page",
        (Number(params.get("page")) + num) as unknown as string
      );
    } else {
      params.set("page", Number(1) as unknown as string);
    }
    setSearchParam(params);
  };

 
  return (
    <main className="w-full  ">
      <FindbJobHero />
      <main
        className={`min-h-screen relative flex flex-col mt-5 ${
          !user ? "w-[90%] md:w-[85%]" : "w-[95%] md:w-[95%]"
        } mx-auto`}
      >
        <FindJobList />
        <div className="w-full min-h-12 mt-20 flex-col  flex items-center justify-center">
          <div className="flex items-center space-x-2 h-12">
            <Button
              variant="outline"
              className=" h-8 w-8 p-0 lg:flex"
              disabled={Number(searchParam.get("page")) === 1}
              onClick={() => handleButtonClick(0, "firstpage")}
            >
              <span className="sr-only">Go to first page</span>
              <DoubleArrowLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              disabled={Number(searchParam.get("page")) === 1}
              onClick={() => handleButtonClick(-1, "other")}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              disabled={Number(searchParam.get("page")) === pages}
              onClick={() => handleButtonClick(1, "other")}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className=" h-8 w-8 p-0 lg:flex"
              disabled={Number(searchParam.get("page")) === pages}
              onClick={() => handleButtonClick(Number(pages) - 1, "other")}
            >
              <span className="sr-only">Go to last page</span>
              <DoubleArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
          <div className="w-full h-20">

          </div>
        </div>
      </main>
    </main>
  );
}
