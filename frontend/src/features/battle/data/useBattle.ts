import apiClient from "@/app/api/apiClient";
import { API_END_POINTS } from "@/app/api/endpoints";
import { QUERY_KEYS } from "@/app/query/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { Battle } from "./models";


const getBattleState = (battleId: number) => async() => {
    const response = await apiClient.get(API_END_POINTS.battle.getBattle(battleId))
    return response.data;
};



export const useBattle = (battleId: number) => {

    const { data: battleState } = useQuery({
        queryKey: [QUERY_KEYS.battleState, battleId],
        queryFn: getBattleState(battleId),
        staleTime: Infinity,
        gcTime: Infinity
    });

    return { battleState } as { battleState: Battle };
};
