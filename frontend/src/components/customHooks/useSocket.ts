import { useCallback, useEffect, useState } from "react";
import io from "socket.io-client";



interface UseSocketConfig {
    room: string,
    userId: number
};

interface SocketMessage {
    room: string,
    source: string,
    battle_data: string,
    userId: number
};

export const useSocket = (config: UseSocketConfig) => {

    const [room] = useState<string>(config.room);
    const [userId] = useState<number>(config.userId);

    const [socket, setSocket] = useState<unknown>(null);
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [socketResponse, setSocketResponse] = useState<SocketMessage | null>(null);


    const sendMessage = useCallback((payload: string) => {

        console.log("Room: ", room);
        console.log("Payload: ", payload);

        if (socket) {
            console.log("Socket Active: ", true);

            socket.emit("add_message", {
                room,
                source: "CLIENT",
                battle_data: payload,
                user_id: userId
              });
        }
    }, [room, socket]);

    useEffect(() => {
    
       console.log(`Initiating socket connection...`);

       const socketBaseUrl = import.meta.env.VITE_SOCKET_BASE_URL;
       
       const newSocket = io(socketBaseUrl, { reconnection: false, query: { room, user_id: userId } });

       newSocket.on("connect", () => {
        console.log(`Socket connection successful`);

        setIsConnected(true);
        
       });

       newSocket.on("disconnect", () => {
        console.log(`Socket disconnected`);
       });

       newSocket.on("get_message", (response: SocketMessage) => {

        setSocketResponse(response);

        console.log("Response: ", response);
         
       });

       setSocket(newSocket);

       return () => {
        newSocket.disconnect();
        setSocket(null);
       };

    }, [room]);


    console.log("Room", config.room);
    console.log("isConnected", isConnected);


    return { socketResponse, sendMessage };

};