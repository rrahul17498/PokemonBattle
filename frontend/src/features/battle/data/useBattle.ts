import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { QUERY_KEYS } from "@/app/query/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { BattleEvents, BattleState, ConnectBattle, ConnectBattleEvents, PokemonActionResult, UserActionResult, UserActionInput, PokemonActionInput, EventAnimation, FormattedBattleResources, FormattedBattleState, PokemonAction } from "./models";
import { useSocketIO } from "@/features/battle/data/socketIO/useSocketIO";
import * as BattleAPIs from "./battleAPIs";
import { formatBattleResources } from "./battleUtils";
import renderActionText from "../battleArena/actionText";
import useBattleAction from "./useBattleAction";


type UseBattleReturn = {
    isBattleEventsRegistered: boolean,
    formattedBattleResources: FormattedBattleResources | undefined,
    formattedBattleState: FormattedBattleState | null,
    eventAnimationsList: EventAnimation[],
    sendUserActionEvent: (action: UserActionInput) => void,
    sendPokemonActionEvent: (action: PokemonActionInput) => void,
    updateEventAnimationsList: (eventAnimationList: EventAnimation[]) => void,
    displayPokemonResultAndUpdateBattleState: () => void
};

export const useBattle = (battleId: number, roomId: string, userId: number): UseBattleReturn => {

    const { socket, isConnected, battleRoom, setBattleRoom } = useSocketIO();
    const [isBattleResourceQueryEnabled, setIsBattleResourceQueryEnabled] = useState(Boolean(battleRoom));
    const [isBattleEventsRegistered, setIsBattleEventsRegistered] = useState(false);

    const { data: formattedBattleResources } = useQuery<FormattedBattleResources>({
        queryKey: [QUERY_KEYS.playerResourcesForBattle, battleId],
        queryFn: async() => {
            const battleResourcesData  = await BattleAPIs.getBattleResources(battleId, roomId);
            return formatBattleResources(battleResourcesData, userId);
        },
        staleTime: Infinity,
        enabled: isBattleResourceQueryEnabled
    });

    const {
        formattedBattleState, eventAnimationsList,
        loadPokemonActionResultAnimation, updateEventAnimationsList, saveBattleStateToBeUpdated,
        displayPokemonResultAndUpdateBattleState, updatePokemonActionInProgress
     } = useBattleAction(formattedBattleResources);

    
    


    useEffect(() => {
        if (socket && isConnected && formattedBattleResources) {
            socket.on(BattleEvents.POKEMON_ACTION_RESULT, (actionResult: PokemonActionResult) => {
                console.log("POKEMON_ACTION_RESULT: ", actionResult);
                loadPokemonActionResultAnimation(actionResult);
            });

            setIsBattleEventsRegistered(true);

            return () => {
                socket.off(BattleEvents.POKEMON_ACTION_RESULT);
            };
        }

    },[socket, isConnected, formattedBattleResources, loadPokemonActionResultAnimation]);


    useEffect(() => {
        if (socket && isConnected) {

            if (battleRoom) {
                socket.on(BattleEvents.BATTLE_STATE_UPDATE, (battleState: BattleState) => {
                    console.log("BATTLE_STATE_UPDATE: ", battleState);
                    saveBattleStateToBeUpdated(battleState);
                });
                socket.on(BattleEvents.USER_ACTION, (action: UserActionResult) => {
                    console.log("USER_ACTION: ", action);
                });
                socket.on(BattleEvents.USER_ACTION_RESULT, (action: UserActionResult) => {
                    console.log("USER_ACTION_RESULT: ", action);
                });
                socket.on(BattleEvents.POKEMON_ACTION, (action: PokemonAction) => {
                    console.log("POKEMON_ACTION: ", action);
                    updatePokemonActionInProgress(true);
                    toast.custom(renderActionText(action.sourceAttackName), { position: action.sourcePlayerId === userId ? "top-left" : "top-right", duration: 2000 });
                });

                setIsBattleResourceQueryEnabled(true);
    
                return () => {
                    socket.off(BattleEvents.BATTLE_STATE_UPDATE);
                    socket.off(BattleEvents.USER_ACTION);
                    socket.off(BattleEvents.USER_ACTION_RESULT);
                    socket.off(BattleEvents.POKEMON_ACTION);
                };
            }

            const joinRoomPayload: ConnectBattle = { user_id: userId, room_id: roomId, battle_id: battleId, did_join_room: false };
            socket.emit(ConnectBattleEvents.JOIN_BATTLE_ROOM, joinRoomPayload,(result: ConnectBattle) => {
                if (result.did_join_room) {  
                    setBattleRoom(result.room_id);
                    console.log("User joined battle room");
                    return toast.success("Connected", { position: "top-left" });
                }
                return toast.error("Failed to join battle room");
            });
        }
    }, [socket, isConnected, battleRoom, userId, battleId, roomId, setBattleRoom, saveBattleStateToBeUpdated, updatePokemonActionInProgress]);


    const sendUserActionEvent = (action: UserActionInput) => {
        socket.emit(BattleEvents.USER_ACTION, { ...action, roomId });
    };

    const sendPokemonActionEvent = (action: PokemonActionInput) => {
        socket.emit(BattleEvents.POKEMON_ACTION, { ...action, roomId });
    };
    

    return {
        isBattleEventsRegistered, formattedBattleResources, formattedBattleState, eventAnimationsList,
        sendUserActionEvent, sendPokemonActionEvent, updateEventAnimationsList, displayPokemonResultAndUpdateBattleState
    };
};
