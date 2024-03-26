import { getAllCategories } from "@/redux/actions/categoryAction";
import { AppDispatch, RootState } from "@/redux/store";
import { Checkbox } from "@/shadcn/ui/checkbox";
import { ChevronUp, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function FindJobFilterBar() {
  const { categories } = useSelector((state: RootState) => state.category);
  const dispatch: AppDispatch = useDispatch();
  const [expand, setIsExpand] = useState<boolean>(false);
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);
  return (
    <aside
      className={`hidden h-full   lg:flex flex-col pr-2 transition-all duration-300 ${
        expand ? "min-w-56" : "min-w-0"
      } relative`}
    >
      <SlidersHorizontal
        className={`cursor-pointer absolute ${!expand?"-right-5 p-1 bg-background rounded-full":"right-0"}  top-2`}
        onClick={() => setIsExpand(!expand)}
      />
      {expand && (
        <>
          <div className={`w-full py-2  flex flex-col gap-5`}>
            <div className="flex justify-between">
              <h2 className="text-lg font-bold ">Type of Employment </h2>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex gap-5 items-center">
                <Checkbox className="" />
                <label className="text-textPrimary">Full time</label>
              </div>
              <div className="flex gap-5 items-center">
                <Checkbox />
                <label className="text-textPrimary">Full time</label>
              </div>
              <div className="flex gap-5 items-center">
                <Checkbox />
                <label className="text-textPrimary">Full time</label>
              </div>
              <div className="flex gap-5 items-center">
                <Checkbox />
                <label className="text-textPrimary">Full time</label>
              </div>
              <div className="flex gap-5 items-center">
                <Checkbox />
                <label className="text-textPrimary">Full time</label>
              </div>
              <div className="flex gap-5 items-center">
                <Checkbox />
                <label className="text-textPrimary">Full time</label>
              </div>
            </div>
          </div>
          <div className="w-full py-2  flex flex-col gap-5">
            <div className="flex justify-between">
              <h2 className="text-lg font-bold ">Categories </h2>
              <ChevronUp />
            </div>
            <div className="flex flex-col gap-4">
              {categories?.map((value) => {
                return (
                  <div className="flex gap-5 items-center" key={value._id}>
                    <Checkbox />
                    <label className="text-textPrimary">
                      {value.categoryname}
                    </label>
                  </div>
                );
              })}
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
                <label className="text-textPrimary">Full time</label>
              </div>
              <div className="flex gap-5 items-center">
                <Checkbox />
                <label className="text-textPrimary">Full time</label>
              </div>
              <div className="flex gap-5 items-center">
                <Checkbox />
                <label className="text-textPrimary">Full time</label>
              </div>
              <div className="flex gap-5 items-center">
                <Checkbox />
                <label className="text-textPrimary">Full time</label>
              </div>
              <div className="flex gap-5 items-center">
                <Checkbox />
                <label className="text-textPrimary">Full time</label>
              </div>
              <div className="flex gap-5 items-center">
                <Checkbox />
                <label className="text-textPrimary">Full time</label>
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
                <label className="text-textPrimary">Full time</label>
              </div>
              <div className="flex gap-5 items-center">
                <Checkbox />
                <label className="text-textPrimary">Full time</label>
              </div>
              <div className="flex gap-5 items-center">
                <Checkbox />
                <label className="text-textPrimary">Full time</label>
              </div>
              <div className="flex gap-5 items-center">
                <Checkbox />
                <label className="text-textPrimary">Full time</label>
              </div>
              <div className="flex gap-5 items-center">
                <Checkbox />
                <label className="text-textPrimary">Full time</label>
              </div>
              <div className="flex gap-5 items-center">
                <Checkbox />
                <label className="text-textPrimary">Full time</label>
              </div>
            </div>
          </div>
        </>
      )}
    </aside>
  );
}
