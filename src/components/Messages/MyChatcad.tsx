import profileImage from "@/assets/IMG 3.png";
import { RootState } from "@/redux/store";

import { Message } from "@/types/types.messagereducer";

import { useSelector } from "react-redux";
import TimeAgo from "../custom/LiveTime";

interface ChildProp {
  message: Message;
}
export function MyChatCard({ message }: ChildProp) {
  // const { selectedUser } = useSelector((state: RootState) => state.chats);
  const { user } = useSelector((state: RootState) => state.userData);

  // type CompanyUser = Company & { role: "company" };
  // type RegularUser = User & { role: "user" | "admin" };

  return (
    <div className="w-full flex justify-end">
      <div className="min-h-20  w-96 flex flex-row-reverse gap-2">
        <div className="h-full w-14 flex justify-start ">
          <img
            src={user?.icon ? user?.icon : profileImage}
            className="w-10 h-10 rounded-full object-cover"
            alt=""
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="w-full flex justify-end">
            <span className="font-semibold text-[13px]">You</span>
          </div>
          <div className="flex flex-col w-full">
            {message.content.type === "text" && (
              <div className="w-full p-2  bg-backgroundAccent/50 rounded-sm">
                {message.content.content}
              </div>
            )}
            <div className="maintxt text-textPrimary w-full pt-1 flex justify-end ">
              <span>
                <TimeAgo
                  timestamp={message?.createdAt as string | number | Date}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
