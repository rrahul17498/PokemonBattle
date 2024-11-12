import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { QUERY_KEYS } from "@/app/query/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { Battle, BattleEvents, BattleState, ConnectBattle, ConnectBattleEvents, PokemonAction, PokemonActionResult, UserAction, UserActionResult } from "./models";
import { useSocketIO } from "@/features/battle/data/socketIO/useSocketIO";
import * as BattleAPIs from "./battleAPIs";


type UseBattleReturn = {
    battleState: BattleState | undefined,
    battleResources: Battle | undefined,
    sendUserActionEvent: (action: UserAction) => void,
    sendPokemonActionEvent: (action: PokemonAction) => void,
    userActionResultsList: UserActionResult[],
    pokemonActionResultsList: PokemonActionResult[]
};

export const useBattle = (battleId: number, roomId: string, userId: number): UseBattleReturn => {

    const { socket, isConnected, joinedBattleRoom, setJoinedBattleRoom } = useSocketIO();
    const [isEventsRegistered, setIsEventsRegistered] = useState(false);
    const [isBattleResourceQueryEnabled, setIsBattleResourceQueryEnabled] = useState(Boolean(joinedBattleRoom));

    const [userActionResultsList, setUserActionResultsList] = useState<UserActionResult[]>([]);
    const [pokemonActionResultsList, setPokemonActionResultsList] = useState<PokemonActionResult[]>([]);
    const [battleState, setBattleState] = useState<BattleState>();

    const { data: battleResources } = useQuery<Battle>({
        queryKey: [QUERY_KEYS.battleResources, battleId],
        queryFn: BattleAPIs.loadBattle(battleId, roomId),
        staleTime: Infinity,
        enabled: isBattleResourceQueryEnabled
    });

    useEffect(() => {
        if (socket && isConnected && !isEventsRegistered) {
            console.log("Registering Events...");
            socket.on(BattleEvents.USER_ACTION_RESULT, (action: UserActionResult) => {
                console.log("USER_ACTION_RESULT: ", action);
                setUserActionResultsList((prev) => ([...prev, action]));
            });

            socket.on(BattleEvents.POKEMON_ACTION_RESULT, (action: PokemonActionResult) => {
                console.log("POKEMON_ACTION_RESULT: ", action);
                setPokemonActionResultsList((prev) => ([...prev, action]));
            });

            socket.on(BattleEvents.BATTLE_STATE_UPDATE, (battleState: BattleState) => {
                console.log("BATTLE_STATE_UPDATE: ", battleState);
                setBattleState(battleState);
            });

            return setIsEventsRegistered(true);
        }

        if (isEventsRegistered) {
            return () => {
                socket.off(BattleEvents.USER_ACTION_RESULT);
                socket.off(BattleEvents.POKEMON_ACTION_RESULT);
            };
        }

    },[socket, isConnected, isEventsRegistered]);

    useEffect(() => {
        if (isEventsRegistered && !joinedBattleRoom) {
            const joinRoomPayload: ConnectBattle = { user_id: userId, room_id: roomId, battle_id: battleId, did_join_room: false };
            socket.emit(ConnectBattleEvents.JOIN_BATTLE_ROOM, joinRoomPayload,(result: ConnectBattle) => {
                if (result.did_join_room) {  
                    setJoinedBattleRoom(result.room_id);
                    console.log("User joined battle room");
                    setIsBattleResourceQueryEnabled(true);
                    return toast.success("Connected", { position: "top-left" });
                }
                return toast.error("Failed to join battle room");
            });
        }
    }, [socket, isEventsRegistered, joinedBattleRoom, setJoinedBattleRoom, userId, battleId, roomId]);

    useEffect(() => {}, []);

    const sendUserActionEvent = (action: UserAction) => {
        socket.emit(BattleEvents.USER_ACTION, { ...action, roomId })
    };

    const sendPokemonActionEvent = (action: UserAction) => {
        socket.emit(BattleEvents.POKEMON_ACTION, { ...action, roomId })
    };

    return { battleResources, battleState, sendUserActionEvent, sendPokemonActionEvent, userActionResultsList, pokemonActionResultsList };
};
