import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { QUERY_KEYS } from "@/app/query/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { Battle, BattleEvents, ConnectBattle, ConnectBattleEvents, PokemonAction, PokemonActionResult, UserAction, UserActionResult } from "./models";
import { useSocketIO } from "@/hooks/useSocketIO";
import * as BattleAPIs from "./battleAPIs";


type UseBattleReturn = {
    battleState: Battle,
    sendUserActionEvent: (action: UserAction) => void,
    sendPokemonActionEvent: (action: PokemonAction) => void,
    userActionResultsList: UserActionResult[],
    pokemonActionResultsList: PokemonActionResult[]
};

export const useBattle = (battleId: number, roomId: string, userId: number): UseBattleReturn => {

    const { socket, isConnected, joinedBattleRoom, setJoinedBattleRoom } = useSocketIO();
    const [isEventsRegistered, setIsEventsRegistered] = useState(false);

    const [userActionResultsList, setUserActionResultsList] = useState<UserActionResult[]>([]);
    const [pokemonActionResultsList, setPokemonActionResultsList] = useState<PokemonActionResult[]>([]);

    const { data: battleState } = useQuery<Battle>({
        queryKey: [QUERY_KEYS.battleState, battleId],
        queryFn: BattleAPIs.getBattleState(battleId),
        staleTime: Infinity,
    });

    useEffect(() => {
        if (socket && isConnected) {
            socket.on(BattleEvents.USER_ACTION_RESULT, (action: UserActionResult) => {
                console.log("USER_ACTION_RESULT: ", action);
                setUserActionResultsList((prev) => ([...prev, action]));
            });

            socket.on(BattleEvents.POKEMON_ACTION_RESULT, (action: PokemonActionResult) => {
                console.log("POKEMON_ACTION_RESULT: ", action);
                setUserActionResultsList((prev) => ([...prev, action]));
            });

            return () => {
                socket.off(BattleEvents.USER_ACTION_RESULT);
                socket.off(BattleEvents.POKEMON_ACTION_RESULT);
            };
        }
    },[socket, isConnected]);

    useEffect(() => {
        if (isEventsRegistered && battleState && !joinedBattleRoom) {
            const joinRoomPayload: ConnectBattle = { user_id: userId, room_id: battleState.room_id, battle_id: battleState.battle_id, did_join_room: false };
            socket.emit(ConnectBattleEvents.JOIN_BATTLE_ROOM, joinRoomPayload,(result: ConnectBattle) => {
                if (result.did_join_room) {  
                    setJoinedBattleRoom(true);
                    console.log("User joined battle room");
                    return toast.success("Joined battle room");
                }
                return toast.error("Failed to join battle room");
            });
        }
    }, [battleState, joinedBattleRoom, setJoinedBattleRoom, isEventsRegistered, socket, userId])

    const sendUserActionEvent = (action: UserAction) => {
        socket.emit(BattleEvents.USER_ACTION, { ...action, roomId })
    };

    const sendPokemonActionEvent = (action: UserAction) => {
        socket.emit(BattleEvents.POKEMON_ACTION, { ...action, roomId })
    };

    return { battleState, sendUserActionEvent, sendPokemonActionEvent, userActionResultsList, pokemonActionResultsList };
};
