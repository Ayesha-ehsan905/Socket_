import { io } from "socket.io-client";

const socketUrl = "http://192.168.101.115:5000/";
// const socketUrl = "https://dev-api.rps.pixelpaddle.com/";

export const socket = io(socketUrl, { autoConnect: false });
