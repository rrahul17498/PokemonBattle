import apiClient from "@/app/api/apiClient";
import { API_END_POINTS } from "@/app/api/endpoints";
import { QUERY_KEYS } from "@/app/query/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { Battle, BattleEvents, PokemonAction, PokemonActionResult, UserAction, UserActionResult } from "./models";
import { useSocketIO } from "@/hooks/useSocketIO";
import { useEffect, useState } from "react";


const getBattleState = (battleId: number) => async() => {
    const response = await apiClient.get(API_END_POINTS.battle.getBattle(battleId))
    return response.data;
};

type UseBattleService = {
    battleState: Battle,
    sendUserActionEvent: (action: UserAction) => void,
    sendPokemonActionEvent: (action: PokemonAction) => void,
    userActionResultsList: UserActionResult[],
    pokemonActionResultsList: PokemonActionResult[]
};

export const useBattle = (battleId: number, roomId: string): UseBattleService => {

    const { socket, isConnected } = useSocketIO();

    const [userActionResultsList, setUserActionResultsList] = useState<UserActionResult[]>([]);
    const [pokemonActionResultsList, setPokemonActionResultsList] = useState<PokemonActionResult[]>([]);

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

            socket.on(BattleEvents.POKEMON_ACTION_RESULT, (action: PokemonActionResult) => {
                setUserActionResultsList((prev) => ([...prev, action]));
            });
        }
    },[socket, isConnected]);

    const sendUserActionEvent = (action: UserAction) => {
        socket.emit(BattleEvents.USER_ACTION, { ...action, roomId })
    };

    const sendPokemonActionEvent = (action: UserAction) => {
        socket.emit(BattleEvents.POKEMON_ACTION, { ...action, roomId })
    };

    return { battleState, sendUserActionEvent, sendPokemonActionEvent, userActionResultsList, pokemonActionResultsList };
};
