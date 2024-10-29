import apiClient from "@/app/api/apiClient";
import { API_END_POINTS } from "@/app/api/endpoints";
import { QUERY_KEYS } from "@/app/query/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { Battle, BattleEvents, UserAction, UserActionResult } from "./models";
import { useSocketIO } from "@/hooks/useSocketIO";
import { useEffect, useState } from "react";


const getBattleState = (battleId: number) => async() => {
    const response = await apiClient.get(API_END_POINTS.battle.getBattle(battleId))
    return response.data;
};

type UseBattleHookData = {
    battleState: Battle,
    sendUserActionEvent: (action: UserAction) => void,
    userActionResultsList: UserActionResult[]
};

export const useBattle = (battleId: number, roomId: string): UseBattleHookData => {

    const { socket, isConnected } = useSocketIO();

    const [userActionResultsList, setUserActionResultsList] = useState<UserActionResult[]>([]);

    const { data: battleState } = useQuery({
        queryKey: [QUERY_KEYS.battleState, battleId],
        queryFn: getBattleState(battleId),
        staleTime: Infinity,
        gcTime: Infinity
    });

    useEffect(() => {
        if (socket && isConnected) {
            socket.on(BattleEvents.USER_ACTION_RESULT, (action: UserActionResult) => {
                setUserActionResultsList((prev) => ([...prev, action]));
            });
        }
    },[socket, isConnected]);

    const sendUserActionEvent = (action: UserAction) => {
        socket.emit(BattleEvents.USER_ACTION, { ...action, roomId })
    };

    // const sendPokemonActionEvent = () => {
        
    // };

    return { battleState, sendUserActionEvent, userActionResultsList };
};
