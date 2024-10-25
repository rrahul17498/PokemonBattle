import { useCallback, useEffect, useState } from "react";
import io from "socket.io-client";


type UseSocketConfig = {
    room: string,
    userId: number
};


export const useSocket = (config: UseSocketConfig) => {
    const [socket, setSocket] = useState<typeof io | null>(null);
    const [isConnected, setIsConnected] = useState<boolean>(false);


    useEffect(() => {
       console.log("Initiating socket connection...");
       console.log(config);
       const socketBaseUrl = import.meta.env.VITE_SOCKET_BASE_URL;
       const newSocket = io(socketBaseUrl, { reconnection: false, query: { room: config.room, user_id: config.userId } });

       

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

    }, []);


    return { socket, isConnected };

};