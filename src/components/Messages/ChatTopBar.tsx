import defaultProfile from "@/assets/IMG 3.png";
import { RootState } from "@/redux/store";
import { Company } from "@/types/oneCompanyType";
import { User } from "@/types/types.user";
import { Star } from "lucide-react";
import { FaEllipsisV } from "react-icons/fa";
import { TiPinOutline } from "react-icons/ti";
import { useSelector } from "react-redux";
export function ChatTopbar() {
  const { selectedUser } = useSelector((state: RootState) => state.chats);
  const { role } = useSelector((state: RootState) => state.userData);
  type CompanyUser = Company & { role: "company" };
  type RegularUser = User & { role: "user" | "admin" };

  // Type assertion to assert the type of selectedUser
  const companyUser = selectedUser as CompanyUser;
  const regularUser = selectedUser as RegularUser;
  return (
    <div className="w-full h-full  flex">
      <div className="flex gap-3 w-[95%] mx-auto justify-between">
        <div className="flex gap-3">
          <div className="h-14 w-14  overflow-hidden flex items-center justify-center">
            <img
              src={
                role === "company"
                  ? regularUser.icon
                    ? regularUser.icon
                    : defaultProfile
                  : companyUser.icon
                  ? companyUser.icon
                  : defaultProfile
              }
              className="w-full h-full object-cover rounded-full"
              alt=""
            />
          </div>
          <div className="h-14 flex flex-col gap-1">
            <span className="maintxt font-semibold text-lg">
              {role === "company" ? regularUser?.firstname : companyUser?.name}
            </span>
            <span>
            {role=="user"?`Recruiter at ${companyUser?.name}`:"user"}
            </span>
          </div>
        </div>
        <div className="h-full flex items-center gap-5 text-textPrimary ">
          <TiPinOutline className="text-2xl" />
          <Star className="w-5" />
          <FaEllipsisV />
        </div>
      </div>
    </div>
  );
}
