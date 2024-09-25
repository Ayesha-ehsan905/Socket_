import { io } from "socket.io-client";
// import { socket_url } from "../utilis/constant";

const socketUrl = "https://dev-api.rps.pixelpaddle.com/";
// const socketUrl = "http://192.168.101.120:5000/";
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
