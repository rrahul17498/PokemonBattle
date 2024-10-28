import { SocketIOContext } from "@/app/socketIO";
import { useContext } from "react";

export const useSocketIO = () => useContext(SocketIOContext);