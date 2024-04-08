
import { ModeToggle } from "../them-modal-toggle";

import AdminProfile from "../../assets/IMG 3.png";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { JobPost } from "../company/JobpostModal";

const CompanyHeader = () => {
  
  const {  user,role } = useSelector((state: RootState) => state.userData);
  return (
    <header className={`w-full mx-auto sticky top-0 left-0 z-50 border-b  bg-background`}>
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center  [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <header
        className={`h-20 flex items-center justify-center  w-[95%] md:w-[95%] mx-auto`}
      >
        <div className="h-[90%] bg-transparent w-full  flex justify-between">
          <div className="flex items-center gap-4">
            <div className="md:size-16 size-14  rounded-full">
              <img
                src={!user?.icon?AdminProfile:user?.icon}
                className="md:w-full md:h-full size-14 rounded-full object-cover"
                alt=""
              />
            </div>
            <div className="flex flex-col items-start gap-2">
              <span>Company</span>
              <span className="font-bold md:text-lg">{user?.name}</span>
            </div>
          </div>

          <div className="flex items-center text-2xl gap-4 ">
            {role==="company" && (
             <JobPost/>
            )}
            <ModeToggle />
          </div>
        </div>
      </header>
    </header>
  );
};
export default CompanyHeader;
