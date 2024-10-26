import apiClient from "@/app/api/apiClient";
import { API_END_POINTS } from "@/app/api/endpoints";
import { QUERY_KEYS } from "@/app/query/queryKeys";
import { useQuery } from "@tanstack/react-query"



const getUserDetails = async () => {
    const response = await apiClient.get(API_END_POINTS.user.get);
    return response.data;
};


const useUser = () => {
    const userQuery = useQuery({
        queryKey: [QUERY_KEYS.user],
        queryFn: getUserDetails,
        enabled: false
    });

    return { userQuery }

    
};

export default useUser;