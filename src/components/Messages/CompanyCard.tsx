import defaultProfile from "@/assets/IMG 3.png";
import { createOneTwoOneChat } from "@/redux/actions/chatActions";

import { AppDispatch, RootState } from "@/redux/store";
import { Company } from "@/types/oneCompanyType";
import { User } from "@/types/types.user";
import { useDispatch, useSelector } from "react-redux";
import { MessageCount } from "./MessageCountShow";
import { FileText, Headphones, Image, Video } from "lucide-react";
import TimeAgo from "../custom/LiveTime";
import { selecteOneUserforChat } from "@/redux/reducers/chatReducer";

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
  const { typingUsers } = useSelector((state: RootState) => state.chats);
  const handleCreateChat = async (id: string,selectedUserRole:"users"|"companies") => {
    dispatch(selecteOneUserforChat({role:selectedUserRole,userId:id}))
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
      className={`w-full h-20  p-3 ${className} hover:bg-backgroundAccent cursor-pointer `}
      onClick={() => handleCreateChat(String(companyData?._id),"companies")}
    >
      <div className="w-full h-full  grid grid-cols-10 items-center relative">
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
            <span className="maintxt text-textPrimary">
              {companyData?.lastMessage && companyData.lastMessage.createdAt ? (
                <>
                  <TimeAgo timestamp={companyData.lastMessage.createdAt} />
                </>
              ) : (
                "few mins ago"
              )}
            </span>
          </div>
          <div className="maintxt w-full line-clamp-1 text-textPrimary/100">
            <span>
              {typingUsers?.includes(String(companyData?._id)) ? (
                <>
                  <span className="text-green-400">typing...</span>
                </>
              ) : (
                <span>
                  {companyData?.lastMessage?.content.content ? (
                    companyData.lastMessage.content.type === "text" ? (
                      companyData.lastMessage?.content.content
                    ) : companyData.lastMessage.content.type === "image" ? (
                      <span className="flex gap-1 items-center">
                        <Image className="text-sm w-4" /> Image{" "}
                      </span>
                    ) : companyData.lastMessage.content.type === "audio" ? (
                      <span className="flex gap-1 items-center">
                        <Headphones className="text-sm w-4" /> Audio{" "}
                      </span>
                    ) : companyData.lastMessage.content.type === "video" ? (
                      <span className="flex gap-1 items-center">
                        <Video className="text-sm w-4" /> Video{" "}
                      </span>
                    ) : companyData.lastMessage.content.type === "doc" ? (
                      <span className="flex gap-1 items-center">
                        <FileText className="text-sm w-4" /> Document{" "}
                      </span>
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                </span>
              )}
            </span>
          </div>
        </div>
        <MessageCount>
          {companyData?.messageCount && companyData?.messageCount > 0
            ? companyData?.messageCount
            : null}
        </MessageCount>
      </div>
    </div>
  );
}
