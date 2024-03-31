import { ChatTopbar } from "@/components/Messages/ChatTopBar";
import { SearchBox } from "@/components/Messages/SearchBox";
import { UserCard } from "@/components/Messages/UserCard";
import { Meh, Paperclip, SendHorizontal } from "lucide-react";

export function Messages() {
  return (
    <main className="w-full ">
      <main className="w-[95%] md:w-[95%] mx-auto h-screen grid grid-cols-10">
        <div className="  col-span-3 border-r ">
          <div className="flex flex-col h-full w-[90%] ">
            <div className="w-full h-28  flex items-end">
              <div className="h-[70%] w-full flex items-start">
                <SearchBox />
              </div>
            </div>
            <div className="w-full h-full lg:h-[600px]   overflow-y-auto">
              <UserCard className="border-b bg-backgroundAccent" />
              <UserCard className="border-b" />
              <UserCard className="border-b" />
            </div>
          </div>
        </div>
        <div className="col-span-7 flex items-center justify-center  ">
          <div className="grid grid-rows-10 grid-cols-1 h-[91%]  w-full justify-center">
            <div className="w-full row-span-1 border-b ">
              <ChatTopbar />
            </div>
            <div className="w-full row-span-8"></div>
            <div className="w-full row-span-1  flex items-center ">
              <div className=" h-[70%] w-[95%] bg-slate-50 grid grid-cols-12 mx-auto border">
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
                  <Meh className="w-5" />
                </div>
                <div className="col-span-1 p-2">
                  <div className="w-14 h-full bg-primary flex items-center justify-center text-white">
                    <SendHorizontal className="w-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </main>
  );
}
