import profileImage from "@/assets/IMG 3.png";
import { RootState } from "@/redux/store";
import { Company } from "@/types/oneCompanyType";
import { User } from "@/types/types.user";
import { useSelector } from "react-redux";
export function ChatIntro() {

  const { selectedUser } = useSelector((state: RootState) => state.chats);
  const { role } = useSelector((state: RootState) => state.userData);
  type CompanyUser = Company & { role: "company" };
  type RegularUser = User & { role: "user" | "admin" };
  

  // Type assertion to assert the type of selectedUser
  const companyUser = selectedUser as CompanyUser;
  const regularUser = selectedUser as RegularUser;
  return (
    <div className="flex flex-col items-center ">
      <div className="w-full h-16 flex justify-center">
        <img
          src={ role === "company"
          ? regularUser.icon
            ? regularUser.icon
            : profileImage
          : companyUser.icon
          ? companyUser.icon
          : profileImage}
          className="h-16 w-16 object-cover rounded-full"
          alt=""
        />
      </div>
      <div className="flex justify-center">
        <span className="maintxt text-lg font-semibold">{role==="company"?regularUser.firstname:companyUser.name}</span>
      </div>
      <div className="flex justify-center text-textPrimary">
        <span className="maintxt ">
          {role==="user"?`Recruiter at ${companyUser?.name}`:"Recruiter at Nomad"}
          </span>
      </div>
      <div className="flex justify-center text-textPrimary">
        <span className="maintxt ">
          This is the very beginning of your direct message with Jan Mayer
        </span>
      </div>
    </div>
  );
}
