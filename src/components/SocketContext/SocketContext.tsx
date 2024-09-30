import React, { createContext, useEffect } from "react";
import { io } from "socket.io-client";

interface SocketContextProps {
  socket: typeof socket;
  // isSocketConnected: boolean;
  disconnectSocketEvent: (event: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const app = (window as any).Telegram?.WebApp;

if (app) app.ready();

// Check if initDataUnsafe and user exist
const chat_Id = app.initDataUnsafe?.user?.id;

console.log(chat_Id, "id");
// const socketUrl = "http://192.168.101.120:5000/";
const socketUrl = "https://dev-api.rps.pixelpaddle.com/";
const socket = io(socketUrl, {
  autoConnect: true,
  query: { chatId: chat_Id },
  // reconnection: true, // Enable reconnection (default is true)
  reconnectionAttempts: Infinity,
  // reconnectionDelay: 2000, // Time between reconnection attempts (in milliseconds)
});
export const SocketContext = createContext<SocketContextProps | undefined>(
  undefined
);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // const [isSocketConnected, setIsSocketConnected] = useState(false);

  const disconnectSocketEvent = (event: string) => {
    socket.off(event); // Remove specific event listeners
  };

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }
    // socket.on(SocketEvents.CONNECT, (data) => {
    //   if (data.message) {
    //     setIsSocketConnected(true);
    //     console.log("Socket connected successfully", data);
    //   } else console.log("Socket  disconnected ");
    // });

    // socket.on(SocketEvents.DISCONNECT, () => {
    //   setIsSocketConnected(false);
    //   console.log("Socket  disconnected ");
    // });
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
