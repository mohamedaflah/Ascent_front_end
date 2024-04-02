import { ChatIntro } from "@/components/Messages/ChatIntro";
import { ChatTopbar } from "@/components/Messages/ChatTopBar";
import { SearchBox } from "@/components/Messages/SearchBox";

import { Paperclip, SendHorizontal, Smile } from "lucide-react";
import profileImage from "@/assets/IMG 3.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import {
  getAllUsersforChat,
  getAllcompaniesforchat,
} from "@/redux/actions/chatActions";
import welcomeChatImage from '@/assets/undraw_chat_bot_re_e2gj.svg'
import { CompanyCard } from "@/components/Messages/CompanyCard";
import { UserCard } from "@/components/Messages/UserCard";
import { Company } from "@/types/oneCompanyType";
import { User } from "@/types/types.user";
export function Messages() {
  const { role } = useSelector((state: RootState) => state.userData);
  const { companies, users,selectedUser } = useSelector((state: RootState) => state.chats);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if (role == "user") {
      dispatch(getAllcompaniesforchat());
    } else if (role == "company") {
      dispatch(getAllUsersforChat());
    }
  }, [dispatch, role]);
  type CompanyUser = Company & { role: "company" };
  type RegularUser = User & { role: "user" | "admin" };

  // Type assertion to assert the type of selectedUser
  const companyUser = selectedUser as CompanyUser;
  const regularUser = selectedUser as RegularUser;
  return (
    <main className="w-full ">
      <main className="w-[95%] md:w-[95%] mx-auto h-screen grid grid-cols-10">
        <div className="col-span-10 sm:col-span-4  lg:col-span-3 border-r ">
          <div className="mx-auto md:m-0 flex flex-col h-full w-[90%] ">
            <div className="w-full h-28  flex items-end">
              <div className="h-[70%] w-full flex items-start">
                <SearchBox />
              </div>
            </div>
            <div className="w-full h-full lg:h-[600px]   overflow-y-auto">
              {role == "user" ? (
                <>
                  {companies?.map((value) => (
                    <CompanyCard
                      className="border-b"
                      companyData={value}
                      key={value?._id}
                    />
                  ))}
                </>
              ) : (
                <>
                  {users&&users?.map((value) => (
                    <UserCard
                      className="border-b"
                      key={value?._id}
                      userData={value}
                    />
                  ))}
                  {/* <UserCard className="border-b" />
                  <UserCard className="border-b" /> */}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="col-span-6 lg:col-span-7 hidden sm:flex  items-center justify-center  ">
          {selectedUser?(
            <div className="grid grid-rows-10 grid-cols-1 h-[91%]  w-full justify-center">
            <div className="w-full row-span-1 border-b ">
              <ChatTopbar />
            </div>
            <div className="w-full row-span-8 overflow-y-auto">
              <div className="w-[95%] mx-auto">
                <div className="w-full pt-4 flex flex-col">
                  <ChatIntro />
                </div>
                <div className="w-full h-10 flex items-center mt-3 ">
                  <div className="w-full h-[2px] border"></div>
                  <div className="min-w-24 px-1  h-full flex items-center justify-center border shadow-sm">
                    Today
                  </div>
                  <div className="w-full h-[2px] border"></div>
                </div>
                <div className="mt-3">
                  <div className="w-full flex justify-start">
                    <div className="min-h-20  w-96 flex ">
                      <div className="h-full w-14 flex justify-start ">
                        <img
                          src={profileImage}
                          className="w-10 h-10 rounded-full object-cover"
                          alt=""
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="">
                          <span className="font-semibold text-[14px]">
                            {role==="company"?regularUser.firstname:companyUser.name}
                          </span>
                        </div>
                        <div className="flex flex-col w-full">
                          <div className="w-full p-2 border">
                            Hey I am Mohammed Aflah k askdfljaskldfja slkdfjkals
                            fdklasjdflkasdfjlkj
                          </div>
                          <div className="maintxt text-textPrimary w-full pt-1 ">
                            <span>12mins ago</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex justify-end">
                    <div className="min-h-20  w-96 flex flex-row-reverse gap-2">
                      <div className="h-full w-14 flex justify-start ">
                        <img
                          src={profileImage}
                          className="w-10 h-10 rounded-full object-cover"
                          alt=""
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="w-full flex justify-end">
                          <span className="font-semibold text-[14px]">You</span>
                        </div>
                        <div className="flex flex-col w-full">
                          <div className="w-full p-2  bg-backgroundAccent/50 rounded-sm">
                            Hey I am Mohammed Aflah k askdfljaskldfja slkdfjkals
                            fdklasjdflkasdfjlkj
                          </div>
                          <div className="maintxt text-textPrimary w-full pt-1 flex justify-end ">
                            <span>12mins ago</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full row-span-1  flex items-center ">
              <div className=" h-[70%] w-[95%]  grid grid-cols-12 mx-auto border">
                <div className="col-span-10 grid grid-cols-12 grid-rows-1">
                  <div className="col-span-1 flex items-center text-textPrimary justify-center  ">
                    <Paperclip className="w-5" />
                  </div>
                  <div className="col-span-11">
                    <input
                      type="text"
                      className="w-full h-full bg-transparent outline-none"
                      placeholder="Send message"
                    />
                  </div>
                </div>
                <div className="col-span-1 flex items-center justify-end pr-2 text-textPrimary">
                  <Smile className="w-5" />
                </div>
                <div className="col-span-1 p-2">
                  <div className="w-14 h-full bg-primary flex items-center justify-center text-white">
                    <SendHorizontal className="w-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          ):(
            <div>
              <img src={welcomeChatImage} className="w-96" alt="" />
            </div>
          )}
        </div>
      </main>
    </main>
  );
}
