// import svgImag1 from '../../assets/JobHeroImage1.svg
import { MapPin, SearchIcon } from "lucide-react";
import primaryLine from "../../assets/line.svg";
import { Input } from "@/shadcn/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/ui/select";
// import { SelectLabel } from "@radix-ui/react-select";
import { Button } from "@/shadcn/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useSearchParams } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { locationsInIndia } from "@/constants/locations";
import { getAllcompaniesforchat } from "@/redux/actions/chatActions";
// import { useSearchParams } from "react-router-dom";

interface ChildPrope {
  label?: string;
  underlineLength?: string;
  highliteText?: string;
}
export function FindbJobHero({
  label,
  underlineLength,
  highliteText,
}: ChildPrope) {
  const [searchParam, setSearchParam] = useSearchParams();
  const { user } = useSelector((state: RootState) => state.userData);
  const [searchVal, setSearchVal] = useState<string>("");
  useEffect(() => {
    const searchValue = new URLSearchParams(window.location.search).get(
      "search"
    );
    if (searchValue) {
      setSearchVal(searchValue);
    }
  }, []);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    const param = new URLSearchParams(searchParam);
    const name = param.get("search");
    dispatch(getAllcompaniesforchat({ type: "user", query: `name=${name}` }));
  }, [dispatch, searchParam]);
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchVal(event.target.value);
    setValuetoSearchBox(event.target.value);
  };
  const handleLocationChange = (location: string) => {
    location;
    const param = new URLSearchParams(searchParam);
    param.set("location", location);
    setSearchParam(param);
  };
  const setValuetoSearchBox = (value: string) => {
    const param = new URLSearchParams(searchParam);
    param.set("search", value);
    param.set("page", "1");
    setTimeout(() => {
      setSearchParam(param);
    }, 1000);
  };

  return (
    <section className="w-full min-h-96  bg-accenting flex flex-col gap-4 p-5 md:p-0">
      <div className="w-full h-52  flex justify-center items-end">
        <div className="flex flex-col ">
          <div className="maintxt text-center text-6xl md:text-4xl lg:text-6xl font-bold leading-tight md:text-left">
            Find your{" "}
            <span className="text-primary">{!label ? "dream job" : label}</span>
          </div>
          <div className=" flex justify-end  ">
            <img
              src={primaryLine}
              alt=""
              className={`w-${!underlineLength ? "64" : underlineLength}`}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <p className="company_text text-textPrimary  font-semibold text-center">
          {!highliteText
            ? "Explore new career opportunities at top companies like HubSpot, Nike,and Dropbox. Find your next success story and unlock your potential today!"
            : highliteText}
        </p>
      </div>
      <div className="w-full flex justify-center items-center flex-col">
        <div
          className={`${
            !user ? "w-[90%] md:w-[85%]" : "w-[95%] md:w-[95%]"
          } h-28 bg-white dark:bg-backgroundAccent rounded-sm flex justify-center items-center`}
        >
          <div className="md:h-16 w-[95%]  grid grid-cols-2 gap-5 ">
            <div className="border-r  flex justify-start items-end ">
              <div className="h-10 w-[80%]  flex justify-between items-center">
                <SearchIcon />
                <Input
                  type="search"
                  onChange={handleSearchChange}
                  value={searchVal}
                  placeholder="companies"
                  className="bg-transparent outline-none  focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-l-0 border-t-0 rounded-none border-r-0 border-b-1 border-b-gray-300"
                />
              </div>
            </div>
            <div className=" flex justify-center items-end gap-5">
              <div className="h-10 w-[80%]  flex justify-between items-center">
                <MapPin />

                <Select onValueChange={handleLocationChange}>
                  <SelectTrigger className="w-full bg-transparent  focus:ring-0 focus:ring-offset-0   outline-none  focus-visible:ring-0 focus-visible:ring-offset-0 border-l-0 border-t-0 rounded-none border-r-0 border-b-1 border-b-gray-300">
                    <SelectValue placeholder="select location" />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    <SelectGroup>
                      {locationsInIndia.map((locatoin) => (
                        <SelectItem value={locatoin}>{locatoin}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Button className="rounded-none md:w-28 font-semibold ">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${
            !user ? "w-[90%] md:w-[85%]" : "w-[95%] md:w-[95%]"
          }  text-textPrimary mt-3`}
        >
          <p>Popular : UI Designer, UX Researcher, Android, Admin</p>
        </div>
      </div>
    </section>
  );
}
