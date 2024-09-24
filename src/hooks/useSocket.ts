import { io } from "socket.io-client";
import { socket_url } from "../utilis/constant";

const socketUrl = socket_url; //for env
const socket = io(socketUrl, { autoConnect: false }); // Disable auto-connect

export const useSocket = () => {
  const connectSocket = () => {
    if (!socket.connected) {
      socket.connect();
    }
  };

  const disconnectSocketEvent = (event: string) => {
    socket.off(event); // Remove specific event listeners
  };
  const disconnectSocket = () => {
    if (socket.connected) {
      socket.disconnect();
    }
  };

  // const;
  //   useEffect(() => {
  //     connectSocket();

  //     return () => {
  //       socket.disconnect(); // Ensure socket disconnection on cleanup
  //     };
  //   }, []); // Only run on mount

  return {
    socket,
    connectSocket,
    disconnectSocketEvent,
    disconnectSocket,
  };
};
