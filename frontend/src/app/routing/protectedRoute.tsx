import { useCallback, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AppRoutes from "./routes";
import { SocketProvider } from "../socketIO";
import Cookies from "js-cookie";
import { QUERY_KEYS } from "../query/queryKeys";
import apiClient from "../api/apiClient";
import { API_END_POINTS } from "../api/endpoints";
import { queryClient } from "../query/client";
import { AxiosError } from "axios";
import Spinner from "@/components/ui/spinner";
import useUserSession from "@/hooks/useUserSession";
import { AllowedUserSession } from "../query/models";


const validateToken = async (token: string) => {
   queryClient.setQueryData([QUERY_KEYS.userSession], { token });

   try {
    const response = await apiClient.get(API_END_POINTS.user.get(token));
    return { ...response.data, token, isValid: true };
   } catch(error) {
        if (error instanceof AxiosError) {
            console.error('Token validation failed:', error.response?.data.message);

            return { isValid: false };
        }
   }
};


export const ProtectedRoute = () => {
    const navigate = useNavigate();

    const userSession: AllowedUserSession | null = useUserSession();

    const loadUserSession = useCallback(async() => {
        const token = Cookies.get("token");
        if (!token) {
            return navigate(AppRoutes.landing);
        }

        const { isValid, ...updatedUserData } = await validateToken(token);
        if (isValid) {
            return queryClient.setQueryData([QUERY_KEYS.userSession], updatedUserData);
        }

        return navigate(AppRoutes.landing);
    }, [navigate]);

    useEffect(() => {
        if(!userSession) {
            loadUserSession();
        } 
    }, [loadUserSession, userSession]);

    
    if (!userSession?.id) {
        return (<Spinner message="Loading User Session..." />)
    }

    return (
    <SocketProvider userId={userSession.id}>
        <Outlet />
     </SocketProvider>
    );
};