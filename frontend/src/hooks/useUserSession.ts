/* eslint-disable @typescript-eslint/no-unused-vars */
import { AllowedUserSession, UserSession } from "@/app/query/models";
import { QUERY_KEYS } from "@/app/query/queryKeys";
import { useQuery, useQueryClient } from "@tanstack/react-query";



const useUserSession = () => {
    const queryClient = useQueryClient();

    const { data: userSession } = useQuery<UserSession>({
        queryKey: [QUERY_KEYS.userSession]
    });

    if (!userSession) {
        return null;
    }

    const { token, ...allowedUserSession } = userSession;

    return allowedUserSession as AllowedUserSession;
}

export default useUserSession;