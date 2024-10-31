import apiClient from "@/app/api/apiClient";
import { API_END_POINTS } from "@/app/api/endpoints";
import { QUERY_KEYS } from "@/app/query/queryKeys";
import { useSocketIO } from "@/hooks/useSocketIO";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { ConnectBattle, ConnectBattleEvents, JoinRoomResult } from "./models";
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



const useConnectBattle = (userId: number) => {

    const { socket, isConnected } = useSocketIO();
    const navigate = useNavigate();

    const queryClient = useQueryClient();
    const battlesQuery = useQuery({
        queryKey: [QUERY_KEYS.battles],
        queryFn: getAllBattles,
        staleTime: 1000 * 10
    });

    const createBattleMutation = useMutation({
        mutationFn: createNewBattle,
        onSuccess: (data) => {
            const joinRoomPayload: ConnectBattle = { user_id: userId, room_id: data.room_id, battle_id: data.battle_id, did_join_room: false }
            socket.emit(ConnectBattleEvents.JOIN_BATTLE_ROOM, joinRoomPayload, (result: ConnectBattle) => {
                if (result.did_join_room) {  
                    return toast.success("Battle created");
                }

                return toast.error("Failed to join battle room");
            });
        },
        onError: (e) => {
            console.error(e.message);
        }
    });


    const connectBattleMutation = useMutation({
        mutationFn: connectToBattle,
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
                navigate(AppRoutes.protected.battle(routingSubString).full, { replace: true })
            });
        }
    },[socket, isConnected, queryClient, navigate]);


    return { createBattleMutation, connectBattleMutation, battlesQuery };
};


export default useConnectBattle;
