import { getAllCategories } from "@/redux/actions/categoryAction";
import { AppDispatch, RootState } from "@/redux/store";
import {
  ChevronDown,
  ChevronUp,
  ListFilterIcon,
  SlidersHorizontal,
} from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { CustomCheck } from "../custom/CustomeCheckbox";
import { employmentType } from "@/constants/employmentTypes";

export function FindJobFilterBar() {
  const { categories } = useSelector((state: RootState) => state.category);
  const dispatch: AppDispatch = useDispatch();
  const [expand, setIsExpand] = useState<boolean>(false);
  const [categoryFilter, setCategoryFilter] = useState<boolean>(true);
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);
  const [filterClear, setFilterClear] = useState<boolean>(false);
  const [searchParam, setSearchParam] = useSearchParams();
  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    type: "employment" | "category"
  ) => {
    const params = new URLSearchParams(searchParam);
    params.set("page", "1");
    if (type == "category") {
      let categories = params.get("category")
        ? params.get("category")!.split(",")
        : [];
      if (params.get("category")?.split(",").includes(event.target.value)) {
        categories = categories?.filter(
          (val: string) => val !== event.target.value
        );
      } else {
        categories?.push(event.target.value);
      }
      if (categories.length > 0) {
        params.set("category", String(categories?.join(",")));
      } else {
        params.delete("category");
      }
      setSearchParam(params);
    } else if (type == "employment") {
      let employment = params.get("employment")
        ? params.get("employment")!.split(",")
        : [];
      if (params.get("employment")?.split(",").includes(event.target.value)) {
        employment = employment?.filter(
          (val: string) => val !== event.target.value
        );
      } else {
        employment?.push(event.target.value);
      }
      if (employment.length > 0) {
        params.set("employment", String(employment?.join(",")));
      } else {
        params.delete("employment");
      }
      setSearchParam(params);
    }
  };
  const handleClearFilter = () => {
    const param = new URLSearchParams(searchParam);
    param.delete("location");
    param.delete("employment");
    param.delete("category");
    param.delete("search");
    setSearchParam(param);
  };
  useEffect(() => {
    const param = new URLSearchParams(searchParam);
    param.get("location");
    param.get("employment")
    param.get("category")
    param.get("search");
    if(param.get("location")||param.get("employment")||param.get("category")||param.get("search")){
      setFilterClear(true)
    }else{
      setFilterClear(false)
    }
  }, [filterClear, searchParam]);
  return (
    <aside
      className={`hidden h-full   lg:flex flex-col pr-2 transition-all duration-300 ${
        expand ? "min-w-48" : "min-w-0"
      } relative`}
    >
      <SlidersHorizontal
        className={`cursor-pointer absolute  ${
          !expand ? "-right-5 p-1 bg-background rounded-full " : "right-0 w-5"
        }  top-2`}
        onClick={() => setIsExpand(!expand)}
      />
      {expand && (
        <>
          <div className={`w-full py-2  flex flex-col gap-5`}>
            <div className="flex justify-between">
              <h2 className="text- font-bold ">Type of Employment </h2>
            </div>
            {filterClear&&(

            <button
              className="h-8 cursor-pointer w-24  gap-1  rounded-md bg-primary/75 flex items-center justify-center"
              onClick={handleClearFilter}
            >
              clear filter <ListFilterIcon className="w-4" />
            </button>
            )}
            <div className="flex flex-col gap-2">
              {employmentType.map((value) => (
                <div key={value} className="flex gap-3 items-center">
                  {/* <Checkbox className="" value={"Full time"} /> */}
                  <CustomCheck
                    value={value}
                    onChange={(e) => handleChange(e, "employment")}
                    checked={searchParam
                      .get("employment")
                      ?.split(",")
                      .includes(value)}
                  />
                  <label className="text-textPrimary">{value}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full py-2  flex flex-col gap-5">
            <div className="flex justify-between">
              <h2 className="font-bold ">Categories </h2>
              {categoryFilter ? (
                <ChevronUp
                  className="w-5"
                  onClick={() => setCategoryFilter(!categoryFilter)}
                />
              ) : (
                <>
                  <ChevronDown
                    className="w-5"
                    onClick={() => setCategoryFilter(!categoryFilter)}
                  />
                </>
              )}
            </div>
            <div className={`flex flex-col gap-2`}>
              {categories
                ?.filter((value) => value.status)
                .map((value) => {
                  return (
                    <form className="flex gap-3 items-center" key={value._id}>
                      <CustomCheck
                        value={value._id}
                        onChange={(e) => handleChange(e, "category")}
                        checked={searchParam
                          .get("category")
                          ?.split(",")
                          .includes(String(value._id))}
                      />
                      <label className="text-textPrimary">
                        {value.categoryname}
                      </label>
                    </form>
                  );
                })}
            </div>
          </div>
          {/* <div className="w-full py-2  flex flex-col gap-5">
            <div className="flex justify-between">
              <h2 className=" font-bold ">Salary range </h2>
              <ChevronUp className="w-5" />
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
          </div> */}
        </>
      )}
    </aside>
  );
}
