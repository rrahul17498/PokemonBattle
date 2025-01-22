import { isAxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { QUERY_KEYS } from "@/app/query/queryKeys";
import { useSocketIO } from "@/features/battle/data/socketIO/useSocketIO";
import { BattleResources, ConnectBattle, ConnectBattleEvents } from "./models";
import APP_ROUTES from "@/app/routing/routes";
import * as BattleAPIs from "./battleAPIs";

const useConnectBattle = (userId: number) => {

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { socket, isConnected, battleRoom, setBattleRoom } = useSocketIO();

    const battlesQuery = useQuery({
        queryKey: [QUERY_KEYS.battles],
        queryFn: BattleAPIs.getAllBattles,
    });
    const activeBattleQuery = useQuery<BattleResources>({
        queryKey: [QUERY_KEYS.activeBattle],
        queryFn: BattleAPIs.getActiveBattle(userId),
        staleTime: Infinity,
        gcTime: Infinity,
        refetchOnMount: "always",
        retry: (failureCount, error) => {
            if (isAxiosError(error) && error.response?.status == 404) {
                return false;
            }
            return failureCount < 3;
        },
    });

    const createBattleMutation = useMutation({
        mutationFn: async() => { return await BattleAPIs.createNewBattle({ user_id: userId }); },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.activeBattle]});
        },
        onError: (e) => {
            console.error(e.message);
        }
    });
    const connectBattleMutation = useMutation({
        mutationFn: async(battleId: number) => { return await BattleAPIs.connectToBattle({ user_id: userId, battle_id: battleId }); },
        onSuccess: (data) => {
            const joinRoomPayload: ConnectBattle = { user_id: userId, room_id: data.room_id, battle_id: data.battle_id, did_join_room: false };
            socket.emit(ConnectBattleEvents.JOIN_BATTLE_ROOM, joinRoomPayload,(result: ConnectBattle) => {
                if (result.did_join_room) {
                    setBattleRoom(result.room_id);  
                    console.log("User joined battle room");
                    socket.emit(ConnectBattleEvents.INITIATE_BATTLE, result);
                }
            });
        },
        onError: (e) => {
            console.error(e.message);
        }
    });

    const deleteCreatedBattle = async () => {
        try {
            if (!activeBattleQuery.data) {
                return console.error("No active battles");
            }
            const result = await BattleAPIs.deleteActiveBattle(activeBattleQuery.data?.battle_id);
            queryClient.removeQueries({ queryKey: [QUERY_KEYS.activeBattle]});
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.battles] });
            return result;
          } catch (error) {
            console.error("Failed to delete battle:", error);
            toast.error("Failed to delete battle");
          }
    };


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

            socket.on(ConnectBattleEvents.BROADCAST_BATTLE_DELETED, (battleId: number) => {
                console.log("BROADCAST_BATTLE_DELETED: ", battleId);
                queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.battles]});
            });

            socket.on(ConnectBattleEvents.LOAD_BATTLE_RESOURCES, (data: { room_id: string, battle_id: number }) => {
                console.log("LOAD_BATTLE_RESOURCES: ", data.battle_id);
                const routingSubString = `${data.battle_id}/${data.room_id}`;
                navigate(APP_ROUTES.protected.battle(routingSubString).fullPath);
            });
        

            return () => {
                socket.off(ConnectBattleEvents.BROADCAST_BATTLE_CREATED);
                socket.off(ConnectBattleEvents.BROADCAST_BATTLE_CONNECTED);
                socket.off(ConnectBattleEvents.BROADCAST_BATTLE_DELETED);
                socket.off(ConnectBattleEvents.LOAD_BATTLE_RESOURCES);
            };
        }
 
    },[queryClient, navigate, userId, socket, isConnected]);

    useEffect(() => {
        if(socket && !battleRoom && activeBattleQuery.data) {
            const joinRoomPayload: ConnectBattle = { user_id: userId, room_id: activeBattleQuery.data.room_id, battle_id: activeBattleQuery.data.battle_id, did_join_room: false };
            socket.emit(ConnectBattleEvents.JOIN_BATTLE_ROOM, joinRoomPayload,(result: ConnectBattle) => {
                if (result.did_join_room) {  
                    setBattleRoom(result.room_id);
                    console.log("User joined battle room");
                    return toast.success("Battle room ready");
                }
                return toast.error("Failed to join battle session");
            });
        }
    }, [userId, socket, activeBattleQuery.data, battleRoom, setBattleRoom]);



    return { activeBattleQuery, createBattleMutation, connectBattleMutation, battlesQuery, deleteCreatedBattle };
};


export default useConnectBattle;
