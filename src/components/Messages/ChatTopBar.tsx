import defaultProfile from "@/assets/IMG 3.png";
import { Star } from "lucide-react";
import { FaEllipsisV } from "react-icons/fa";
import { TiPinOutline } from "react-icons/ti";
export function ChatTopbar() {
  return (
    <div className="w-full h-full  flex">
      <div className="flex gap-3 w-[95%] mx-auto justify-between">
        <div className="flex gap-3">
          <div className="h-14 w-14  overflow-hidden flex items-center justify-center">
            <img
              src={defaultProfile}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
          <div className="h-14 flex flex-col gap-1">
            <span className="maintxt font-semibold text-lg">
              Mohammed Aflah
            </span>
            <span>Recruiter at Nomad</span>
          </div>
        </div>
        <div className="h-full flex items-center gap-5 text-textPrimary ">
          <TiPinOutline className="text-2xl"/>
          <Star className="w-5" />
          <FaEllipsisV />
        </div>
      </div>
    </div>
  );
}
