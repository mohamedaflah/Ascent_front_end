import { RootState } from "@/redux/store";
import { Company } from "@/types/oneCompanyType";
import { Message } from "@/types/types.messagereducer";
import { User } from "@/types/types.user";
import { useSelector } from "react-redux";
import profileImage from "@/assets/IMG 3.png";
import TimeAgo from "../custom/LiveTime";
interface ChildProp {
  message: Message;
}
export function SenderCard({ message }: ChildProp) {
  const { selectedUser } = useSelector((state: RootState) => state.chats);
  const { role } = useSelector((state: RootState) => state.userData);

  type CompanyUser = Company & { role: "company" };
  type RegularUser = User & { role: "user" | "admin" };
  const companyUser = selectedUser as CompanyUser;
  const regularUser = selectedUser as RegularUser;
  return (
    <div className={`w-full flex justify-start`} key={message?._id}>
      <div className="min-h-20  w-96 flex ">
        <div className="h-full min-w-14 flex justify-start ">
          <img
            src={message.senderProfile ? message.senderProfile : profileImage}
            className="w-10 h-10 rounded-full object-cover"
            alt=""
          />
        </div>
        <div className="flex flex-col gap-2  ">
          <div className="">
            <span className="font-semibold text-[12px]">
              {role === "company" ? regularUser.firstname : companyUser.name}
            </span>
          </div>

          {message.content.type === "text" ? (
            <div className="flex flex-col w-full">
              {message.content.type === "text" && (
                <div className="divClass w-full p-2 border ">
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
                  message.content.subcontent && "border p-2"
                }  rounded-md`}
              >
                <div className="flex flex-col w-full h-48  ">
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
        </div>
      </div>
    </div>
  );
}
