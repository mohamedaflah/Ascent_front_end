import defaultProfile from "@/assets/IMG 3.png";
import { createOneTwoOneChat } from "@/redux/actions/chatActions";

import { AppDispatch, RootState } from "@/redux/store";
import { Company } from "@/types/oneCompanyType";
import { User } from "@/types/types.user";
import { useDispatch, useSelector } from "react-redux";

interface ChildProp {
  className?: string;
  companyData?: Company;
}
export function CompanyCard({ className, companyData }: ChildProp) {
  const dispatch: AppDispatch = useDispatch();
  const {
    user,
    role,
  }: { user: User; role: "company" | "user" | "admin" | null } = useSelector(
    (state: RootState) => state.userData
  );
  const {typingUsers}=useSelector((state:RootState)=>state.chats)
  const handleCreateChat = async (id: string) => {
    await dispatch(
      createOneTwoOneChat({
        firstId: String(user?._id),
        secondId: id,
        role: String(role),
      })
    );
  };
  return (
    <div
      className={`w-full h-20  p-3 ${className} hover:bg-backgroundAccent cursor-pointer`}
      onClick={() => handleCreateChat(String(companyData?._id))}
    >
      <div className="w-full h-full  grid grid-cols-10 items-center">
        <div className="col-span-2 sm:col-span-3 md:col-span-2 h-full ">
          <div className="h-full w-14  overflow-hidden flex items-center justify-center">
            <img
              src={companyData?.icon ? companyData?.icon : defaultProfile}
              className="w-12 h-12 rounded-full object-cover"
              alt=""
            />
          </div>
        </div>
        <div className="col-span-8 sm:col-span-7 md:col-span-8 flex flex-col gap-2 ">
          <div className="flex justify-between">
            {/* company_text */}
            <span className="maintxt  text-[15px] flex gap-3 line-clamp-1 font-semibold items-center">
              {companyData?.name}
              <div className="w-[4px] h-[4px] rounded-full  bg-primary"></div>
            </span>
            <span className="maintxt text-textPrimary">12 mins ago</span>
          </div>
          <div className="maintxt w-full line-clamp-1 text-textPrimary/100">
            <span>
            {typingUsers?.includes(String(companyData?._id)) ? (
                <>
                <span className="text-green-400">typing...</span>
                </>
              ) : (
                <>We want to invite you for a quick interview</>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
