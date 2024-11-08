import { SocketIOContext } from "@/features/battle/data/socketIO/provider";
import { useContext } from "react";

export const useSocketIO = () => useContext(SocketIOContext);