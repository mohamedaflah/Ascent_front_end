import { ChatIntro } from "@/components/Messages/ChatIntro";
import { ChatTopbar } from "@/components/Messages/ChatTopBar";
import { SearchBox } from "@/components/Messages/SearchBox";

import {  SendHorizontal, Smile } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import {
  getAllUsersforChat,
  getAllcompaniesforchat,
} from "@/redux/actions/chatActions";
import welcomeChatImage from "@/assets/undraw_chat_bot_re_e2gj.svg";
import { CompanyCard } from "@/components/Messages/CompanyCard";
import { UserCard } from "@/components/Messages/UserCard";

import { SocketContext } from "@/contexts/SocketContext";
import { createMessage, getAllMessages } from "@/redux/actions/messageAction";
import { MyChatCard } from "@/components/Messages/MyChatcad";
import { SenderCard } from "@/components/Messages/SenderCard";
import { SendMessage } from "@/types/types.message";
import { Message } from "@/types/types.messagereducer";
import { v4 as uuid } from "uuid";
import { PapperClipPopover } from "@/components/Messages/ChatContentClipPoppover";
export function Messages() {
  const { role, user } = useSelector((state: RootState) => state.userData);
  const { companies, users, selectedUser, chatId } = useSelector(
    (state: RootState) => state.chats
  );
  const { messages } = useSelector((state: RootState) => state.message);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if (role == "user") {
      dispatch(getAllcompaniesforchat());
    } else if (role == "company") {
      dispatch(getAllUsersforChat());
    }
  }, [dispatch, role]);
  const socket = useContext(SocketContext);

  const { typingUsers } = useSelector((state: RootState) => state.chats);
  const handleSendMessage = () => {
    if (!messageContent) {
      return;
    }
    const username =
      role === "company" ? user.name : `${user.firstname} ${user.lastname}`;

    const sendBody: SendMessage = {
      chatId: String(chatId),
      content: {
        type: "text",
        content: messageContent,
      },
      senderId: user?._id,
      senderName: username,
      senderProfile: user?.icon ? user?.icon : "",
    };
    const socketSendBody: Message = {
      senderId: user?._id,
      senderName: username,
      senderProfile: user?.icon ? user?.icon : "",
      status: "unread",
      _id: uuid(),
      content: {
        type: "text",
        content: messageContent,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      ChatId: chatId,
    };
    socket?.emit("send-message", {
      data: socketSendBody,
      reciverId: selectedUser?._id,
    });
    dispatch(createMessage(sendBody));
    setMessageContent("");
  };

  const handleTyping = (e: ChangeEvent<HTMLInputElement>) => {
    setMessageContent(e.target.value);
    const username =
      role === "company" ? user.name : `${user.firstname} ${user.lastname}`;
    socket?.emit("typing", {
      chatId: chatId,
      senderName: username,
      message: "typing",
      senderId: user?._id,
      recievedId: selectedUser?._id,
    });

    setTimeout(() => {
      socket?.emit("stopTyping", {
        chatId: chatId,
        message: "stop typing",
        recieverdId: selectedUser?._id,
        senderId: user?._id,
      });
    }, 2300);
  };

  const [messageContent, setMessageContent] = useState<string>("");
  useEffect(() => {
    if (chatId) {
      dispatch(getAllMessages(String(chatId)));
    }
  }, [dispatch, chatId, selectedUser]);
  useEffect(() => {
    scrollChatArea();
  }, [messages]);
  function scrollChatArea() {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }
  const scrollRef = useRef<HTMLDivElement>(null);
  return (
    <main className="w-full  ">
      <main className="w-[95%] md:w-[95%] mx-auto h-screen grid grid-cols-10">
        <div className="col-span-10 sm:col-span-4  lg:col-span-3 border-r h-screen  ">
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
                  {users &&
                    users?.map((value) => (
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
        <div className="col-span-6 lg:col-span-7 hidden sm:flex  items-center justify-center h-screen  ">
          {selectedUser ? (
            <div className="grid grid-rows-10 grid-cols-1 h-[91%]  w-full justify-center">
              <div className="w-full row-span-1 border-b ">
                <ChatTopbar />
              </div>
              <div
                className="w-full row-span-8 overflow-y-auto"
                ref={scrollRef}
              >
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
                  <div className="mt-3 space-y-2 overflow-hidden">
                    {messages?.map((message) => (
                      <>
                        {message.senderId === user._id ? (
                          <MyChatCard message={message} />
                        ) : (
                          <SenderCard message={message} />
                        )}
                      </>
                    ))}
                    {typingUsers?.includes(String(selectedUser?._id)) && (
                      <div className="w-full flex justify-start h-10 gap-1 ">
                        <div className="flex h-full gap-1 border items-center p-3 rounded-3xl dark:border-none">
                          <span className="w-5 h-5 block bg-backgroundAccent rounded-full animate-pulse"></span>
                          <span className="w-5 h-5 block bg-backgroundAccent rounded-full animate-bounce"></span>
                          <span className="w-5 h-5 block bg-backgroundAccent rounded-full animate-bounce"></span>
                        </div>
                      </div>
                    )}
                    {/* <MyChatCard /> */}
                  </div>
                </div>
              </div>
              <div className="w-full row-span-1  flex items-center ">
                <div className=" h-[70%] w-[95%]  grid grid-cols-12 mx-auto border">
                  <div className="col-span-10 grid grid-cols-12 grid-rows-1">
                    <div className="col-span-1 flex items-center text-textPrimary justify-center  ">
                      <PapperClipPopover/>
                      
                    </div>
                    <div className="col-span-11">
                      <input
                        type="text"
                        className="w-full h-full bg-transparent outline-none"
                        placeholder="Send message"
                        value={messageContent}
                        onChange={handleTyping}
                      />
                    </div>
                  </div>
                  <div className="col-span-1 flex items-center justify-end pr-2 text-textPrimary">
                    <Smile className="w-5" />
                  </div>
                  <div className="col-span-1 p-2">
                    <button
                      className={`w-14 h-full bg-primary flex items-center justify-center text-white`}
                      onClick={handleSendMessage}
                    >
                      <SendHorizontal className="w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <img src={welcomeChatImage} className="w-96" alt="" />
            </div>
          )}
        </div>
      </main>
    </main>
  );
}
