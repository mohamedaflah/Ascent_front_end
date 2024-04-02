import { RootState } from "@/redux/store";
import { User } from "@/types/types.user";
import React, { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io, { Socket } from "socket.io-client";

interface ChildProp {
  children: ReactNode;
}

const SocketContext = React.createContext<Socket | undefined>(undefined);

const SOCKET_SERVER_URL = import.meta.env.VITE_COMMUNICATION_SERVICE;

export function SocketProvider({ children }: ChildProp) {
  const {user,role}:{user:User,role:"user"|"admin"|"company"|null} = useSelector((state: RootState) => state.userData);
  const [socket, setSocket] = useState<Socket>();
  useEffect(() => {
    const socketInstance = io(SOCKET_SERVER_URL);
    setSocket(socketInstance);
    socketInstance.emit("join-user",{id:user?._id,role:role})
    return () => {
      socketInstance.disconnect();
    };
  }, [user,role]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

// Export the SocketContext to allow useContext in other components
export { SocketContext };
