import { removeTypingUsers, setTypingUser } from "@/redux/reducers/chatReducer";
import { setMessage } from "@/redux/reducers/messageReducer";
import { AppDispatch, RootState } from "@/redux/store";

import { Message } from "@/types/types.messagereducer";
import { User } from "@/types/types.user";
import React, { ReactNode, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import io, { Socket } from "socket.io-client";

interface ChildProp {
  children: ReactNode;
}

const SocketContext = React.createContext<Socket | undefined>(undefined);

const SOCKET_SERVER_URL = import.meta.env.VITE_COMMUNICATION_SERVICE;
export function SocketProvider({ children }: ChildProp) {
  const dispatch: AppDispatch = useDispatch();
  const {
    user,
    role,
  }: { user: User; role: "user" | "admin" | "company" | null } = useSelector(
    (state: RootState) => state.userData
  );
  const { chatId } = useSelector((state: RootState) => state.chats);
  const [socket, setSocket] = useState<Socket>();
  useEffect(() => {
    const socketInstance = io(SOCKET_SERVER_URL);
    setSocket(socketInstance);
    socketInstance.emit("join-user", { id: user?._id, role: role });
    socketInstance.on("get-message", (msg: Message) => {
      if (chatId == msg.ChatId) {
        dispatch(setMessage(msg));
      }
    });
    socketInstance.on(
      "typing",
      (data: {
        chatId: string;
        senderName: string;
        message: string;
        senderId: string;
        recievedId: string;
      }) => {
        dispatch(setTypingUser(data.senderId));
      }
    );

    socketInstance.on(
      "stopTyping",
      (data: {
        chatId: string;
        message: string;
        recieverdId: string;
        senderId: string;
      }) => {
        dispatch(removeTypingUsers(data.senderId));
      }
    );
    return () => {
      socketInstance.disconnect();
    };
  }, [user, role, dispatch, chatId]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

// Export the SocketContext to allow useContext in other components
export { SocketContext };
