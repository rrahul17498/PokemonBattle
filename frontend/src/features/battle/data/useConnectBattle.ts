import apiClient from "@/app/api/apiClient";
import { API_END_POINTS } from "@/app/api/endpoints";
import { QUERY_KEYS } from "@/app/query/queryKeys";
import { useSocketIO } from "@/hooks/useSocketIO";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Battle, ConnectBattle, ConnectBattleEvents } from "./models";
import { useNavigate } from "react-router-dom";
import AppRoutes from "@/app/routing/routes";
import toast from "react-hot-toast";



interface CreateBattleRequest {
    user_id: number
};

const createNewBattle = async(data: CreateBattleRequest) => {
    const response = await apiClient.post(API_END_POINTS.battle.create, data);

    return response.data;
};

interface ConnectBattleRequest {
    user_id: number,
    battle_id: number
};

const connectToBattle = async(data: ConnectBattleRequest) => {
    const response = await apiClient.post(API_END_POINTS.battle.connect, data);

    return response.data;
};

const getAllBattles = async () => {
    const response = await apiClient.get(API_END_POINTS.battle.getAll);
    return response.data;
}

const getActiveBattle = async (userId: number) => {
    const response = await apiClient.get(API_END_POINTS.battle.getActiveBattle(userId));
    return response.data;
}



const useConnectBattle = (userId: number) => {

    const { socket, isConnected } = useSocketIO();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [isEventsRegistered, setIsEventsRegistered] = useState<boolean>(false);

    const battlesQuery = useQuery({
        queryKey: [QUERY_KEYS.battles],
        queryFn: getAllBattles,
        staleTime: 1000 * 10
    });

    const activeBattleQuery = useQuery<Battle>({
        queryKey: [QUERY_KEYS.activeBattle],
        queryFn: async() => { return getActiveBattle(userId)},
        staleTime: Infinity,
    });

    const createBattleMutation = useMutation({
        mutationFn: async() => { return await createNewBattle({ user_id: userId }); },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.activeBattle]}); 
        },
        onError: (e) => {
            console.error(e.message);
        }
    });


    const connectBattleMutation = useMutation({
        mutationFn: async(battleId: number) => { return await connectToBattle({ user_id: userId, battle_id: battleId }); },
        onSuccess: (data) => {
            const joinRoomPayload: ConnectBattle = { user_id: userId, room_id: data.room_id, battle_id: data.battle_id, did_join_room: false };
            socket.emit(ConnectBattleEvents.JOIN_BATTLE_ROOM, joinRoomPayload,(result: ConnectBattle) => {
                if (result.did_join_room) {  
                    socket.emit(ConnectBattleEvents.INITIATE_BATTLE_LOAD, result);
                }
            });
        },
        onError: (e) => {
            console.error(e.message);
        }
    });


    useEffect(() => {
        if (socket && isConnected) {
            console.log("RUN")
            socket.on(ConnectBattleEvents.BROADCAST_BATTLE_CREATED, (battleId: number) => {
                console.log("BROADCAST_BATTLE_CREATED: ", battleId);
                queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.battles]});
            });

            socket.on(ConnectBattleEvents.BROADCAST_BATTLE_CONNECTED, (battleId: number) => {
                console.log("BROADCAST_BATTLE_CONNECTED: ", battleId);
                queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.battles]});
            });

            socket.on(ConnectBattleEvents.LOAD_BATTLE_RESOURCES, (data: { room_id: string, battle_id: number }) => {
                const routingSubString = `${data.battle_id}/${data.room_id}`;
                navigate(AppRoutes.protected.battle(routingSubString).full);
            });
            setIsEventsRegistered(true);

            return () => {
                socket.off(ConnectBattleEvents.BROADCAST_BATTLE_CREATED);
                socket.off(ConnectBattleEvents.BROADCAST_BATTLE_CONNECTED);
                socket.off(ConnectBattleEvents.LOAD_BATTLE_RESOURCES);
            };
        }
    },[userId, socket, isConnected, queryClient, navigate, setIsEventsRegistered]);

    useEffect(() => {
        if(isEventsRegistered && activeBattleQuery.data) {
            const joinRoomPayload: ConnectBattle = { user_id: userId, room_id: activeBattleQuery.data.room_id, battle_id: activeBattleQuery.data.battle_id, did_join_room: false };
            socket.emit(ConnectBattleEvents.JOIN_BATTLE_ROOM, joinRoomPayload,(result: ConnectBattle) => {
                if (result.did_join_room) {  
                    console.log("User joined battle room")
                    return toast.success("Battle created");
                }
                return toast.error("Failed to join battle room");
            });
        }
    }, [userId, socket, isEventsRegistered, activeBattleQuery.data]);


    return { activeBattleQuery, createBattleMutation, connectBattleMutation, battlesQuery };
};


export default useConnectBattle;
