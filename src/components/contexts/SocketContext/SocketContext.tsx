import React, { createContext, useEffect } from "react";
import { io } from "socket.io-client";
import { socket_url } from "../../../utilis/constant";
import { returnTelegramID } from "../../../utilis/function";

interface SocketContextProps {
  socket: typeof socket;
  disconnectSocketEvent: (event: string) => void;
}

const socketUrl = socket_url;
const socket = io(socketUrl, {
  autoConnect: true,
  query: { chatId: returnTelegramID() },
  reconnection: true, // Enable reconnection (default is true)
  reconnectionAttempts: Infinity,
  reconnectionDelay: 2000, // Time between reconnection attempts (in milliseconds)
});
export const SocketContext = createContext<SocketContextProps | undefined>(
  undefined
);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const disconnectSocketEvent = (event: string) => {
    socket.off(event); // Remove specific event listeners
  };

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    console.log("socket connection status  from status :", socket.connected);

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
        // isSocketConnected,
        disconnectSocketEvent,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
