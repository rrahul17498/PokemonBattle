import apiClient from "@/app/api/apiClient";
import { API_END_POINTS } from "@/app/api/endpoints";
import { QUERY_KEYS } from "@/app/query/queryKeys";
import { useSocketIO } from "@/hooks/useSocketIO";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { BattleEvents, JoinRoomResult } from "./models";
import { useNavigate } from "react-router-dom";
import AppRoutes from "@/app/routing/routes";



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



const useConnectBattle = () => {

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
        onSuccess: ({ room_id: roomId }) => {
            socket.emit(BattleEvents.JOIN_BATTLE_ROOM, roomId);
        },
        onError: (e) => {
            console.error(e.message);
        }
    });


    const connectBattleMutation = useMutation({
        mutationFn: connectToBattle,
        onSuccess: ({ room_id: roomId }) => {
            socket.emit(BattleEvents.JOIN_BATTLE_ROOM, roomId,({ didJoinRoom }: JoinRoomResult) => {
                if (didJoinRoom) {
                    navigate(AppRoutes.protected.battle(roomId).full)
                }
            });
        },
        onError: (e) => {
            console.error(e.message);
        }
    });


    useEffect(() => {
        if (socket && isConnected) {

            socket.on(BattleEvents.BROADCAST_BATTLE_CREATED, (battleId: number) => {
                console.log("BROADCAST_BATTLE_CREATED: ", battleId);
                queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.battles]});
            });

            socket.on(BattleEvents.BROADCAST_BATTLE_CONNECTED, (battleId: number) => {
                console.log("BROADCAST_BATTLE_CONNECTED: ", battleId);
                queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.battles]});
            });
        }
    },[socket, isConnected, queryClient]);


    return { createBattleMutation, connectBattleMutation, battlesQuery };
};


export default useConnectBattle;
