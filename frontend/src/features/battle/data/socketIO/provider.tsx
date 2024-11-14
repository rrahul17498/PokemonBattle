import useUser from "@/hooks/useUser";
import { createContext, Dispatch, ReactElement, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import io from "socket.io-client";
import { ConnectBattleEvents, ConnectBattle, Battle } from "../models";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/app/query/queryKeys";


type SocketContext = {
    socket: typeof io | null,
    isConnected: boolean,
    joinedBattleRoom: string | null,
    setJoinedBattleRoom: Dispatch<SetStateAction<string | null>>
};

const defaultSocketIOData = {
    socket: null,
    isConnected: false,
    joinedBattleRoom: null,
    setJoinedBattleRoom: () => {},
};

export const SocketIOContext = createContext<SocketContext>(defaultSocketIOData);

type SocketProvider = {
    children: ReactElement,
};

export const SocketProvider = ({ children }: SocketProvider) => {
    const userData = useUser();
    const queryClient = useQueryClient();
    const [socket, setSocket] = useState<typeof io | null>(defaultSocketIOData.socket);
    const [isConnected, setIsConnected] = useState<boolean>(defaultSocketIOData.isConnected);
    const [joinedBattleRoom, setJoinedBattleRoom] = useState<string | null>(defaultSocketIOData.joinedBattleRoom);


    useEffect(() => {
        if(userData) {
            console.log("Initiating socket connection...");
            const socketBaseUrl = import.meta.env.VITE_SOCKET_BASE_URL;
            const newSocket = io(socketBaseUrl, {
                 reconnection: true,
                 reconnectionAttempts: 5,
                 reconnectionDelay: 2000,
                 query: { user_id: userData.id  }
                 });
     
            newSocket.on("connect", () => {
             console.log(`Socket connection successful`);
             setIsConnected(true);
            });
     
            newSocket.on("disconnect", () => {
             console.log(`Socket disconnected`);
             setIsConnected(false);
             setJoinedBattleRoom(null);
             toast.error("Disconnected");
            });

            newSocket.on("reconnect", () => {
                console.log(`Socket re-connecting...`);
                const activeBattleData = queryClient.getQueryData<Battle>([QUERY_KEYS.activeBattle]);
                if (!activeBattleData) return toast.error("Failed to reconnect");
                const joinRoomPayload: ConnectBattle = { user_id: userData.id, room_id: activeBattleData?.room_id, battle_id: activeBattleData?.battle_id, did_join_room: false };
                newSocket.emit(ConnectBattleEvents.JOIN_BATTLE_ROOM, joinRoomPayload,(result: ConnectBattle) => {
                    if (result.did_join_room) {  
                        setJoinedBattleRoom(result.room_id);
                        console.log("User joined battle room");
                        return toast.success("Battle room ready");
                    }
                    return toast.error("Failed to join battle room");
                });
                setIsConnected(true);
                console.log(`Socket re-connect successful`);
               });
     
            setSocket(newSocket);
     
            return () => {
             newSocket.disconnect();
             setSocket(null);
             setIsConnected(false);
            };
        }
     }, [queryClient, userData]);

     
    return(
        <SocketIOContext.Provider value={{ socket, isConnected, joinedBattleRoom, setJoinedBattleRoom }}>
            {children}
        </SocketIOContext.Provider>
    );
};


