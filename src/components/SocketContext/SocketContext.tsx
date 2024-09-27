import React, { createContext, useEffect, useState } from "react";
import { SocketEvents } from "../../utilis/enum";
import { io } from "socket.io-client";

interface SocketContextProps {
  socket: typeof socket;
  isSocketConnected: boolean;
  disconnectSocketEvent: (event: string) => void;
}

// const socketUrl = "http://192.168.101.96:5000/";
const socketUrl = "https://dev-api.rps.pixelpaddle.com/";

const socket = io(socketUrl, { autoConnect: true });
export const SocketContext = createContext<SocketContextProps | undefined>(
  undefined
);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isSocketConnected, setIsSocketConnected] = useState(false);

  const disconnectSocketEvent = (event: string) => {
    socket.off(event); // Remove specific event listeners
  };

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }
    socket.on(SocketEvents.CONNECT, (data) => {
      if (data.message) {
        setIsSocketConnected(true);
        console.log("Socket connected successfully");
      } else console.log("Socket  disconnected ");
    });

    socket.on(SocketEvents.DISCONNECT, () => {
      setIsSocketConnected(false);
      console.log("Socket connected successfully");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
        isSocketConnected,
        disconnectSocketEvent,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
