import { ChatIntro } from "@/components/Messages/ChatIntro";
import { ChatTopbar } from "@/components/Messages/ChatTopBar";
import { SearchBox } from "@/components/Messages/SearchBox";

import { SendHorizontal } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import {
  fetchUnreadAndLastMessage,
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
import { groupMessagesByDate } from "@/util/groupMessages";
import {
  setMessage,
  updateMessageStatusLocaly,
} from "@/redux/reducers/messageReducer";
import { EmojiPickerPopover } from "@/components/Messages/PickerPopover";
import { setLastMessage, setMessageCount } from "@/redux/reducers/chatReducer";
import { UserCardSkelton } from "@/components/Messages/UsersCardSkelton";

export function Messages() {
  const { role, user } = useSelector((state: RootState) => state.userData);
  const {
    companies,
    users,
    selectedUser,
    chatId,
    loading: chatLoading,
  } = useSelector((state: RootState) => state.chats);
  const { messages } = useSelector((state: RootState) => state.message);
  const dispatch: AppDispatch = useDispatch();
  const [initialLoad, setInitialLoad] = useState<boolean>(true);
  useEffect(() => {
    if (initialLoad) {
      if (role === "user") {
        dispatch(getAllcompaniesforchat()).then((res) => {
          console.log("🚀 ~ dispatch ~ res:", res);
          dispatch(fetchUnreadAndLastMessage({ userId: user?._id })).then(
            (res) => {
              console.log("🚀 ~ dispatch ~ res:", res);
            }
          );
          setInitialLoad(false)
          
        });
      } else if (role === "company") {
        dispatch(getAllUsersforChat()).then((res) => {
          console.log("🚀 ~ dispatch ~ res: user", res);
          dispatch(fetchUnreadAndLastMessage({ userId: user?._id })).then(
            (res) => {
              console.log("🚀 ~ dispatch ~ res:", res);
            }
          );
          setInitialLoad(false)
        });
      }
    }
  }, [dispatch, role, user]);

  // Effect to fetch unread messages for companies
  // useEffect(() => {
  //   if (initialLoad && role === "company" && users) {
  //     dispatch(fetchUnreadAndLastMessage({ userId: user?._id })).then((res) => {
  //       console.log("🚀 ~ dispatch ~ res:", res);
  //     });
  //     setInitialLoad(false); // Set flag to false to prevent re-running these initializations.
  //   }
  // }, [dispatch, role, user?._id, users, initialLoad]);

  // // Effect to fetch unread messages for users
  // useEffect(() => {
  //   if (initialLoad && role === "user" && companies) {
  //     dispatch(fetchUnreadAndLastMessage({ userId: user?._id })).then((res) => {
  //       console.log("🚀 ~ dispatch ~ res:", res);
  //     });
  //     setInitialLoad(false); // Set flag to false to prevent re-running these initializations.
  //   }
  // }, [dispatch, role, user?._id, companies, initialLoad]);

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
    sendBody;
    console.log(user?._id);
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
      chatId: chatId,
    };
    socket?.emit("send-message", {
      data: socketSendBody,
      reciverId: selectedUser?._id,
    });
    alert(`${socketSendBody.senderId} <--> ${selectedUser?._id}`)
    dispatch(setMessage(socketSendBody));
    dispatch(
      setLastMessage({ reciverId: selectedUser?._id, message: socketSendBody })
    );
    dispatch(createMessage(socketSendBody));
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
    }, 2000);
  };

  const [messageContent, setMessageContent] = useState<string>("");
  useEffect(() => {
    if (chatId) {
      dispatch(getAllMessages(String(chatId))).then((res) => {
        console.log("🚀 ~ dispatch ~ res):", res);
        dispatch(
          updateMessageStatusLocaly({
            chatId: String(chatId),
            userId: String(selectedUser?._id),
          })
        );
        dispatch(setMessageCount(selectedUser?._id));
      });
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
    <main className="w-full ">
      <main className="w-[95%] md:w-[95%] mx-auto h-screen   flex">
        {/*h-screen*/}
        <div className="col-span-10 sm:col-span-4  lg:col-span-3 md:border-r md:w-[550px] w-full  h-screen ">
          {" "}
          {/*h-screen*/}
          <div className="mx-auto md:m-0 flex flex-col h-full w-[90%] transition-all duration-500 ">
            <div className="w-full h-28  flex items-end">
              <div className="h-[70%] w-full flex items-start">
                <SearchBox />
              </div>
            </div>
            <div className="w-full h-full lg:h-[600px] scrollbar-hide   overflow-y-auto">
              {chatLoading ? (
                <>
                  {Array.from({ length: 10 }, (_, index) => (
                    <UserCardSkelton key={index} />
                  ))}
                </>
              ) : (
                <>
                  {role == "user" ? (
                    <>
                      {companies &&
                        [...companies]
                          .sort((a, b) => {
                            const dateA = new Date(
                              a?.lastMessage?.createdAt ?? 0
                            );
                            const dateB = new Date(
                              b?.lastMessage?.createdAt ?? 0
                            );
                            return dateB.getTime() - dateA.getTime();
                          })
                          .map((value) => (
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
                        [...users]
                          .sort((a, b) => {
                            const dateA = new Date(
                              a.lastMessage?.createdAt ?? 0
                            );
                            const dateB = new Date(
                              b.lastMessage?.createdAt ?? 0
                            );
                            return dateB.getTime() - dateA.getTime();
                          })
                          .map((value) => (
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
                </>
              )}
            </div>
          </div>
        </div>
        <div className="col-span-6 lg:col-span-7 hidden sm:flex w-full  items-center justify-center h-screen  ">
          {selectedUser ? (
            <div className="grid grid-rows-10 grid-cols-1 h-[91%]  w-full justify-center">
              <div className="w-full row-span-1 border-b ">
                <ChatTopbar />
              </div>
              <div
                className="w-full row-span-8 overflow-y-auto scrollbar-hide"
                ref={scrollRef}
              >
                <div className="w-[95%] mx-auto">
                  <div className="w-full pt-4 flex flex-col">
                    <ChatIntro />
                  </div>
                  {/* start */}
                  {Object.entries(groupMessagesByDate(messages)).map(
                    ([date, messages], index) => (
                      <div className="">
                        <div className="w-full h-10 flex items-center mt-3 ">
                          <div className="w-full h-[1px] border"></div>
                          <div className="min-w-24 px-1  h-full flex items-center justify-center border shadow-sm">
                            {date}
                          </div>
                          <div className="w-full h-[1px] border"></div>
                        </div>
                        <div
                          className="mt-3 space-y-2 overflow-hidden "
                          key={index}
                        >
                          {messages?.map((message, index) => (
                            <>
                              {message.senderId === user?._id ? (
                                <MyChatCard
                                  message={message}
                                  key={message?._id}
                                  Idx={index}
                                />
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
                    )
                  )}
                  {/* end */}
                </div>
              </div>
              <div className="w-full row-span-1  flex items-center ">
                <div className=" h-[70%] w-[95%]  grid grid-cols-12 mx-auto border">
                  <div className="col-span-10 grid grid-cols-12 grid-rows-1">
                    <div className="col-span-1 flex items-center text-textPrimary justify-center  ">
                      <PapperClipPopover />
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
                    <EmojiPickerPopover
                      key={uuid()}
                      setText={setMessageContent}
                    />
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
