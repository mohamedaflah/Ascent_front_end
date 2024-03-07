import { RiMenu3Fill } from "react-icons/ri";
import { ModeToggle } from "../them-modal-toggle";

import AdminProfile from "../../assets/IMG 3.png";
import { Button } from "@/shadcn/ui/button";
import { Plus } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
const CompanyHeader = () => {
  const { status, user } = useSelector((state: RootState) => state.userData);
  return (
    <header className={`w-full mx-auto sticky top-0 left-0 z-10 border-b`}>
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center  [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <header
        className={`h-20 flex items-center justify-center  "w-[95%] md:w-[95%] mx-auto`}
      >
        <div className="h-[90%] bg-transparent w-full  flex justify-between">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16  rounded-full">
              <img
                src={AdminProfile}
                className="w-full h-full rounded-full"
                alt=""
              />
            </div>
            <div className="flex flex-col items-start gap-2">
              <span>Company</span>
              <span className="font-bold text-lg">{user?.name}</span>
            </div>
          </div>

          <div className="flex items-center text-2xl gap-4 ">
            {status && (
              <Button
                className="rounded-sm "
                disabled={
                  status === "Pending" ||
                  status == "Rejected" ||
                  user.approvelStatus.status == "Rejected" ||
                  user.approvelStatus.status == "Pending"
                }
              >
                <Plus /> Post job
              </Button>
            )}
            <ModeToggle />
            <RiMenu3Fill className="md:hidden" />
          </div>
        </div>
      </header>
    </header>
  );
};
export default CompanyHeader;
