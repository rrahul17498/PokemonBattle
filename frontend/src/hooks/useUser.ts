import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/app/query/queryKeys";



const useUser = () => {
    const queryClient = useQueryClient();
    return  queryClient.getQueryData([QUERY_KEYS.user]);
}

export default useUser;