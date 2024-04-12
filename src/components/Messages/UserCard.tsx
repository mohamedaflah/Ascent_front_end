import defaultProfile from "@/assets/IMG 3.png";
import { createOneTwoOneChat } from "@/redux/actions/chatActions";
import { AppDispatch, RootState } from "@/redux/store";

import { User } from "@/types/types.user";
import { useDispatch, useSelector } from "react-redux";
import { MessageCount } from "./MessageCountShow";
import { useEffect } from "react";

import { FileText, Headphones, Image, Video } from "lucide-react";
interface ChildProp {
  className?: string;
  userData?: User;
}
export function UserCard({ className, userData }: ChildProp) {
  const dispatch: AppDispatch = useDispatch();
  const { typingUsers } = useSelector((state: RootState) => state.chats);
  const {
    user,
    role,
  }: { user: User; role: "company" | "user" | "admin" | null } = useSelector(
    (state: RootState) => state.userData
  );
  const handleCreateChat = (id: string) => {
    dispatch(
      createOneTwoOneChat({
        firstId: String(user?._id),
        secondId: id,
        role: String(role),
      })
    );
  };

  useEffect(() => {
    console.log(userData?.firstname, " -> ", userData);
  }, [userData]);
  return (
    <div
      className={`w-full h-20  p-3 ${className} cursor-pointer`}
      onClick={() => handleCreateChat(String(userData?._id))}
    >
      <div className="w-full h-full  grid grid-cols-10 items-center relative">
        <div className="col-span-2 sm:col-span-3 md:col-span-2 h-full ">
          <div className="h-full w-14  overflow-hidden flex items-center justify-center">
            <img
              src={userData?.icon ? userData?.icon : defaultProfile}
              className="w-12 h-12 rounded-full object-cover"
              alt=""
            />
          </div>
        </div>
        <div className="col-span-8 sm:col-span-7 md:col-span-8 flex flex-col gap-2 ">
          <div className="flex justify-between">
            <span className="company_text text-[15px] flex gap-3 line-clamp-1 font-semibold items-center">
              {userData?.firstname}
              <div className="w-[4px] h-[4px] rounded-full  bg-primary"></div>
            </span>
            <span className="maintxt text-textPrimary">12 mins ago</span>
          </div>
          <div className="maintxt w-full line-clamp-1 text-textPrimary/60 ">
            <span>
              {typingUsers?.includes(String(userData?._id)) ? (
                <>
                  <span className="text-green-400">typing...</span>
                </>
              ) : (
                <span>
                  {userData?.lastMessage?.content.content ? (
                    userData.lastMessage.content.type === "text" ? (
                      userData.lastMessage?.content.content
                    ) : userData.lastMessage.content.type === "image" ? (
                      <span className="flex gap-1 items-center">
                        <Image className="text-sm w-4" /> Image{" "}
                      </span>
                    ) : userData.lastMessage.content.type === "audio" ? (
                      <span className="flex gap-1 items-center">
                        <Headphones className="text-sm w-4" /> Audio{" "}
                      </span>
                    ) : userData.lastMessage.content.type === "video" ? (
                      <span className="flex gap-1 items-center">
                        <Video className="text-sm w-4" /> Video{" "}
                      </span>
                    ) : userData.lastMessage.content.type === "doc" ? (
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
          {userData?.messageCount && userData?.messageCount > 0
            ? userData?.messageCount
            : null}
        </MessageCount>
      </div>
    </div>
  );
}
