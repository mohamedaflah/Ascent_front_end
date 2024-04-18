import { VideoCallDecline } from "@/components/users/VideoCallDecline";
import { VideoCallModal } from "@/components/users/VideoCallModal";
import { updateMessageStatus } from "@/redux/actions/messageAction";
import {
  removeOnlineUser,
  removeTypingUsers,
  setLastMessage,
  setOnlineUsers,
  setTypingUser,
  updateunreadMessageCountAndLastMessage,
} from "@/redux/reducers/chatReducer";
import {
  deleteMessageLocaly,
  setMessage,
} from "@/redux/reducers/messageReducer";
import { AppDispatch, RootState } from "@/redux/store";

import { Message } from "@/types/types.messagereducer";
import { User } from "@/types/types.user";
import React, { ReactNode, useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import io, { Socket } from "socket.io-client";

interface ChildProp {
  children: ReactNode;
}

const SocketContext = React.createContext<Socket | undefined>(undefined);

const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_URL;
export function SocketProvider({ children }: ChildProp) {
  const modalRef = useRef<HTMLButtonElement>(null);
  const declineRef = useRef<HTMLButtonElement>(null);

  const dispatch: AppDispatch = useDispatch();
  const {
    user,
    role,
  }: { user: User; role: "user" | "admin" | "company" | null } = useSelector(
    (state: RootState) => state.userData
  );
  const [videoCallState, setVideoCallState] = useState<{
    callId: string;
    recieverId: string;
    senderId: string;
    message: string;
    senderName: string;
    senderProfile: string;
  }>();
  const [declineCall, setDeclineCall] = useState<{
    callId: string;
    senderId: string;
    senderProfile: string;
    message: string;
    senderName: string;
    reciverId: string;
  }>();
  const { chatId, selectedUser } = useSelector(
    (state: RootState) => state.chats
  );

  const [socket, setSocket] = useState<Socket>();
  useEffect(() => {
    const socketInstance = io(SOCKET_SERVER_URL, {
      transports: ["websocket"],
      withCredentials: true,
      extraHeaders: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers":
          "DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range",
        "Access-Control-Expose-Headers": "Content-Length,Content-Range",
      },
    });
    setSocket(socketInstance);
    if (user) {
      socketInstance.emit("join-user", { id: user?._id, role: role });
    }
    socketInstance.on(
      "get-online-users",
      (users: { socketId: string; id: string }[]) => {
        dispatch(setOnlineUsers(users));
      }
    );
    socketInstance.on(
      "remove-online-user",
      (data: { id: string; socketId: string }) => {
        dispatch(removeOnlineUser(data));
      }
    );
    socketInstance.on("get-message", (msg: Message) => {
      if (chatId == msg.chatId) {
        dispatch(setMessage(msg));
        dispatch(setLastMessage({ reciverId: msg.senderId, message: msg }));
        dispatch(updateMessageStatus(String(msg?._id)));
      } else {
        dispatch(
          updateunreadMessageCountAndLastMessage({
            userId: msg.senderId,
            message: msg,
          })
        );
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

    socketInstance.on(
      "delete-message",
      (data: {
        chatId: string;
        senderId: string;
        recieverId: string;
        message: string;
        messageId: string;
      }) => {
        if (chatId == data.chatId || selectedUser?._id == data.recieverId) {
          dispatch(deleteMessageLocaly(data));
        }
      }
    );

    socketInstance?.on(
      "video-call",
      (data: {
        callId: string;
        recieverId: string;
        senderId: string;
        message: string;
        senderName: string;
        senderProfile: string;
      }) => {
        data;
        setVideoCallState({ ...data });
        modalRef.current?.click();
      }
    );

    socketInstance.on(
      "decline-call",
      (data: {
        callId: string;
        senderId: string;
        senderProfile: string;
        message: string;
        senderName: string;
        reciverId: string;
      }) => {
        data;
        setDeclineCall(data);
        declineRef.current?.click();
      }
    );
    return () => {
      socketInstance.disconnect();
    };
  }, [user, role, dispatch, chatId, selectedUser?._id]);

  return (
    <SocketContext.Provider value={socket}>
      <>
        <div className="hidden">
          <VideoCallModal videoCallData={videoCallState} ref={modalRef} />
          <VideoCallDecline data={declineCall} ref={declineRef} />
        </div>
        {children}
      </>
    </SocketContext.Provider>
  );
}

// Export the SocketContext to allow useContext in other components
export { SocketContext };
