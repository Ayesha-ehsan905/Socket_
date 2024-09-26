import React, { createContext, useContext, useEffect, useState } from "react";
import { socket } from "./SocketConfig";

interface SocketContextProps {
  socket: typeof socket;
  isSocketConnected: boolean;
  connectSocket: () => void;
  disconnectSocket: () => void;
  disconnectSocketEvent: (event: string) => void;
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined);

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocketContext must be used within a SocketProvider");
  }
  return context;
};

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isSocketConnected, setIsSocketConnected] = useState(false);

  const connectSocket = () => {
    if (!socket.connected) {
      socket.connect();
    }
  };

  const disconnectSocket = () => {
    if (socket.connected) {
      socket.disconnect();
    }
  };

  const disconnectSocketEvent = (event: string) => {
    socket.off(event); // Remove specific event listeners
  };

  useEffect(() => {
    // Connect the socket when the component mounts
    if (!socket.connected) {
      connectSocket();
    }

    // Monitor socket connection state
    socket.on("connect", () => {
      console.log("Socket connected");
      setIsSocketConnected(true);
    });

    socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
      setIsSocketConnected(false);

      // Optionally handle reconnection logic here
      if (reason === "io server disconnect") {
        // If the server initiates the disconnect, reconnect manually
        connectSocket();
      }
    });

    return () => {
      // Clean up the event listeners on unmount
      socket.off("connect");
      socket.off("disconnect");
      disconnectSocket();
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
        isSocketConnected,
        connectSocket,
        disconnectSocket,
        disconnectSocketEvent,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
