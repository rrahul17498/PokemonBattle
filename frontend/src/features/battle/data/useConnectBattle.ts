import apiClient from "@/app/api/apiClient";
import { API_END_POINTS } from "@/app/api/endpoints";
import { QUERY_KEYS } from "@/app/query/queryKeys";
import { useSocket } from "@/hooks/useSocket";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { BattleEvents } from "./models";



interface CreateBattleRequest {
    user_id: number
};

const createNewBattle = async(data: CreateBattleRequest) => {
    const response = await apiClient.post(API_END_POINTS.battle.create, data);

    return response.data;
};

const getAllBattles = async () => {
    const response = await apiClient.get(API_END_POINTS.battle.getAll);
    return response.data;
}



const useConnectBattle = () => {
    const queryClient = useQueryClient();
    const battlesQuery = useQuery({
        queryKey: [QUERY_KEYS.battles],
        queryFn: getAllBattles,
        staleTime: 1000 * 10
    });

    const createBattleMutation = useMutation({
        mutationFn: createNewBattle,
        onError: (e) => {
            console.error(e.message);
        }
    });

    const { socket, isConnected } = useSocket({ room: "battles_to_connect", userId: 1 });

    useEffect(() => {
        if (socket && isConnected) {
            socket.on(BattleEvents.BATTLE_CREATED, (battleObj: object) => {
                console.log("Socket recieved", battleObj);
                queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.battles]});
            });
        }
    },[socket, isConnected, queryClient]);

    return { createBattleMutation, battlesQuery };

};


export default useConnectBattle;
