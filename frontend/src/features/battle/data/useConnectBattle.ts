import apiClient from "@/app/api/apiClient";
import { API_END_POINTS } from "@/app/api/endpoints";
import { QUERY_KEYS } from "@/app/query/queryKeys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";



interface CreateBattleRequest {
    user_id: number
};

const createNewBattle = async(data: CreateBattleRequest) => {
    const response = await apiClient.post(API_END_POINTS.battle.create, data);

    return response.data;
};

const getAllBattles = async () => {
    const response = await apiClient.get(API_END_POINTS.battle.getAll);
    return response.data;
}



const useConnectBattle = () => {

    const queryClient = useQueryClient();

    const battlesQuery = useQuery({
        queryKey: [QUERY_KEYS.battles],
        queryFn: getAllBattles
    });

    const createBattleMutation = useMutation({
        mutationFn: createNewBattle,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.battles]})
        },
        onError: (e) => {
            console.error(e.message);
        }
    });

    return { createBattleMutation, battlesQuery };

};


export default useConnectBattle;
