import useUser from "@/hooks/useUser";
import { createContext, Dispatch, ReactElement, SetStateAction, useEffect, useState } from "react";
import io from "socket.io-client";


type SocketContext = {
    socket: typeof io | null,
    isConnected: boolean,
    joinedBattleRoom: boolean,
    setJoinedBattleRoom: Dispatch<SetStateAction<boolean>>
};

const defaultSocketIOData = {
    socket: null,
    isConnected: false,
    joinedBattleRoom: false,
    setJoinedBattleRoom: () => {},
};

export const SocketIOContext = createContext<SocketContext>(defaultSocketIOData);

type SocketProvider = {
    children: ReactElement,
};

export const SocketProvider = ({ children }: SocketProvider) => {
    const userData = useUser();
    const [socket, setSocket] = useState<typeof io | null>(defaultSocketIOData.socket);
    const [isConnected, setIsConnected] = useState<boolean>(defaultSocketIOData.isConnected);
    const [joinedBattleRoom, setJoinedBattleRoom] = useState<boolean>(defaultSocketIOData.joinedBattleRoom);

    useEffect(() => {
        if(userData) {
            console.log("Initiating socket connection...");
            const socketBaseUrl = import.meta.env.VITE_SOCKET_BASE_URL;
            const newSocket = io(socketBaseUrl, { reconnection: false, query: { user_id: userData.id  } });
     
            newSocket.on("connect", () => {
             console.log(`Socket connection successful`);
             setIsConnected(true);
            });
     
            newSocket.on("disconnect", () => {
             console.log(`Socket disconnected`);
             setIsConnected(false);
            });
     
            setSocket(newSocket);
     
            return () => {
             newSocket.disconnect();
             setSocket(null);
             setIsConnected(false);
            };
        }
     }, [userData]);

     
    return(
        <SocketIOContext.Provider value={{ socket, isConnected, joinedBattleRoom, setJoinedBattleRoom }}>
            {children}
        </SocketIOContext.Provider>
    );
};


