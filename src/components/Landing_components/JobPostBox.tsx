import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export function JobPostDisplaySection() {
  const { user } = useSelector((state: RootState) => state.userData);
  return (
    <section
      className={`${
        !user ? "w-[90%] md:w-[85%]" : "w-[95%] md:w-[95%]"
      } mx-auto mt-16`}
    >
      <div className="w-full flex flex-col-reverse md:grid md:grid-cols-2 h-80 bg-[#4640DE] relative overflow-hidden">
        {/* <div className="absolute inset-0 bg-blue-500 transform rotate-45 "></div> */}
        <div className="h-full w-full flex justify-center items-center flex-col">
            <h1>Start posting job</h1>
        </div>
      </div>
    </section>
  );
}
