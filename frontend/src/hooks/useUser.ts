import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/app/query/queryKeys";
import { UserQueryData } from "@/app/query/models";



const useUser = () => {
    const queryClient = useQueryClient();
    return queryClient.getQueryData([QUERY_KEYS.user]) as UserQueryData;
}

export default useUser;