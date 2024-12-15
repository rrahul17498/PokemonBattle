import apiClient from "@/app/api/apiClient";
import { BattleResources } from "./models";

interface CreateBattleRequest {
    user_id: number
};

export const createNewBattle = async(data: CreateBattleRequest) => {
    const response = await apiClient.post("/battles/create", data);

    return response.data;
};

interface ConnectBattleRequest {
    user_id: number,
    battle_id: number
};

export const connectToBattle = async(data: ConnectBattleRequest) => {
    const response = await apiClient.post("/battles/connect", data);

    return response.data;
};

export const getAllBattles = async () => {
    const response = await apiClient.get("/battles");
    return response.data;
}

export const getActiveBattle = (userId: number) => async () => {
    const response = await apiClient.get(`/battles/active/${userId}`);
    return response.data;
}

export const deleteActiveBattle = async (battleId: number) => {
    const response = await apiClient.delete(`/battles/${battleId}`);
    return response.data;
}

export const getBattleResources = async(battleId: number, roomId: string): Promise<BattleResources> => {
    const response = await apiClient.get(`/battles/${battleId}/load/${roomId}`);
    return response.data;
};