import apiClient from "@/app/api/apiClient";

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

export const getActiveBattle = async (userId: number) => {
    const response = await apiClient.get(`/battles/active/${userId}`);
    return response.data;
}

export const deleteActiveBattle = async (battleId: number) => {
    const response = await apiClient.delete(`/battles/${battleId}`);
    return response.data;
}

export const getBattleState = (battleId: number) => async() => {
    const response = await apiClient.get(`/battles/${battleId}`)
    return response.data;
};