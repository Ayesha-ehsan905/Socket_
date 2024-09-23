import { io } from "socket.io-client";

const socketUrl = "https://dev-api.rps.pixelpaddle.com/";
const socket = io(socketUrl, { autoConnect: true }); // Disable auto-connect

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
