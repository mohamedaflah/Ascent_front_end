import profileImage from "@/assets/IMG 3.png";
import { RootState } from "@/redux/store";

import { Message } from "@/types/types.messagereducer";

import { useSelector } from "react-redux";
import TimeAgo from "../custom/LiveTime";
import { MessageControllerPopover } from "./MessageControllerPopover";
import { Ban } from "lucide-react";

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
      <div className="min-h-20   w-96 flex flex-row-reverse gap-2">
        <div className="h-full min-w-14 flex justify-start ">
          <img
            src={user?.icon ? user?.icon : profileImage}
            className="w-10 h-10 rounded-full object-cover"
            alt=""
          />
        </div>
        <div className="flex flex-col gap-2  ">
          <div className="w-full flex justify-between">
            {!message.deleteStatus && (
              <MessageControllerPopover
                key={message?._id}
                id={String(message?._id)}
              />
            )}
            <span></span>
            <span className="font-semibold text-[13px]">You </span>
          </div>
          {!message.deleteStatus ? (
            <>
              {message.content.type === "text" ? (
                <div className="flex flex-col w-full">
                  {message.content.type === "text" && (
                    <div className="divClass w-full p-2 rounded-sm bg-backgroundAccent ">
                      {message.content.content}
                    </div>
                  )}
                  <div className="maintxt text-textPrimary w-full pt-1 ">
                    <span>
                      <TimeAgo
                        timestamp={message?.createdAt as string | number | Date}
                      />
                    </span>
                  </div>
                </div>
              ) : message.content.type === "image" ? (
                <div className="relative">
                  <div
                    className={` ${
                      message.content.subcontent && " p-2"
                    }  rounded-md bg-backgroundAccent`}
                  >
                    <div className="flex flex-col w-full h-48 ">
                      <img
                        src={message.content.content}
                        className="w-full h-full object-cover rounded-sm"
                        alt=""
                      />
                    </div>
                    {message.content.subcontent && (
                      <div className="divClass mt-2">
                        {message.content.subcontent.content}
                      </div>
                    )}
                  </div>
                  <div className="maintxt text-textPrimary w-full pt-1 ">
                    <span>
                      <TimeAgo
                        timestamp={message?.createdAt as string | number | Date}
                      />
                    </span>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </>
          ) : (
            <>
              <div className="space-y-1">
                <div className="flex text-textPrimary black  gap-2 items-center border px-2 py-1 rounded-sm bg-backgroundAccent">
                  <Ban className="w-5" /> You deleted this message
                </div>
                <div>
                  <span>
                    <TimeAgo
                      timestamp={message?.createdAt as string | number | Date}
                    />
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
