import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { QUERY_KEYS } from "@/app/query/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { BattleResources, BattleEvents, BattleState, ConnectBattle, ConnectBattleEvents, PokemonActionResult, UserActionResult, UserActionInput, PokemonActionInput, EventAnimation, PokemonActionTypes, EventAnimationAlignment, PlayerResourceData, FormattedBattleResources, FormattedBattleState, PokemonAction } from "./models";
import { useSocketIO } from "@/features/battle/data/socketIO/useSocketIO";
import * as BattleAPIs from "./battleAPIs";
import { formatBattleResources, formatBattleState, createPlayerResourceObj } from "./battleUtils";
import useUser from "@/hooks/useUser";
import renderPokemonActionText from "../battleArena/pokemonActionText";


type UseBattle = {
    formattedBattleResources: FormattedBattleResources | null | undefined,
    formattedBattleState: FormattedBattleState | null,
    sendUserActionEvent: (action: UserActionInput) => void,
    sendPokemonActionEvent: (action: PokemonActionInput) => void,
    userActionResultsList: UserActionResult[],
    pokemonActionResultsList: PokemonActionResult[]
};

export const useBattle = (battleId: number, roomId: string, userId: number): UseBattle => {

    const { socket, isConnected, battleRoom, setBattleRoom } = useSocketIO();
    
    const [isBattleResourceQueryEnabled, setIsBattleResourceQueryEnabled] = useState(Boolean(battleRoom));
    const [userActionResultsList, setUserActionResultsList] = useState<UserActionResult[]>([]);
    const [pokemonActionResultsList, setPokemonActionResultsList] = useState<PokemonActionResult[]>([]);
    const [battleState, setBattleState] = useState<BattleState | null>(null);
    const [currentEventAnimation, setCurrentEventAnimation] = useState<EventAnimation>();

    const { data: formattedBattleResources } = useQuery<FormattedBattleResources>({
        queryKey: [QUERY_KEYS.playerResourcesForBattle, battleId],
        queryFn: async() => {
            const battleResourcesData  = await BattleAPIs.getBattleResources(battleId, roomId);
            return formatBattleResources(battleResourcesData, userId);
        },
        staleTime: Infinity,
        enabled: isBattleResourceQueryEnabled
    });

    const formattedBattleState = battleState && formattedBattleResources ? formatBattleState(battleState, formattedBattleResources.isUserFirstPlayer) : null;

    useEffect(() => {
        if (socket && isConnected && formattedBattleResources) {
            socket.on(BattleEvents.USER_ACTION_RESULT, (action: UserActionResult) => {
                console.log("USER_ACTION_RESULT: ", action);
                setUserActionResultsList((prev) => ([...prev, action]));
            });

            socket.on(BattleEvents.POKEMON_ACTION, (action: PokemonAction) => {
                console.log("POKEMON_ACTION: ", action);
                if (action.sourcePlayerId != userId) {
                    toast.custom(renderPokemonActionText(action.sourceAttackName), { position: "top-right", duration: 2000 });
                }
            });

            socket.on(BattleEvents.POKEMON_ACTION_RESULT, (action: PokemonActionResult) => {
                console.log("POKEMON_ACTION_RESULT: ", action);
                
                setCurrentEventAnimation({
                    eventType: BattleEvents.POKEMON_ACTION_RESULT,
                    actionType: PokemonActionTypes.ATTACK,
                    actionId: action.sourceAttackId,
                    alignment: EventAnimationAlignment.LEFT
                });
                setPokemonActionResultsList((prev) => ([...prev, action]));
            });

            return () => {
                socket.off(BattleEvents.USER_ACTION_RESULT);
                socket.off(BattleEvents.POKEMON_ACTION_RESULT);
                socket.off(BattleEvents.BATTLE_STATE_UPDATE);
            };
        }

    },[socket, isConnected, userId, formattedBattleResources]);

    useEffect(() => {

    }, []);


    useEffect(() => {
        if (socket && !battleRoom) {
            const joinRoomPayload: ConnectBattle = { user_id: userId, room_id: roomId, battle_id: battleId, did_join_room: false };
            socket.emit(ConnectBattleEvents.JOIN_BATTLE_ROOM, joinRoomPayload,(result: ConnectBattle) => {
                if (result.did_join_room) {  
                    setBattleRoom(result.room_id);
                    console.log("User joined battle room");
                    setIsBattleResourceQueryEnabled(true);
                    socket.on(BattleEvents.BATTLE_STATE_UPDATE, (battleState: BattleState) => {
                        console.log("BATTLE_STATE_UPDATE: ", battleState);
                        setBattleState(battleState);
                    });
                    return toast.success("Connected", { position: "top-left" });
                }
                return toast.error("Failed to join battle room");
            });
        }
    }, [socket, battleRoom, setBattleRoom, userId, battleId, roomId]);


    const sendUserActionEvent = (action: UserActionInput) => {
        socket.emit(BattleEvents.USER_ACTION, { ...action, roomId });
    };

    const sendPokemonActionEvent = (action: PokemonActionInput) => {
        socket.emit(BattleEvents.POKEMON_ACTION, { ...action, roomId });
    };
    

    return { formattedBattleResources, formattedBattleState, sendUserActionEvent, sendPokemonActionEvent, userActionResultsList, pokemonActionResultsList };
};
