import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AppRoutes from "./routes";
import useUser from "@/hooks/useUser";
import { SocketProvider } from "../socketIO";





export const ProtectedRoute = () => {
    const navigate = useNavigate();

    const { userQuery } = useUser();
 
    useEffect(() => {

        // if (!data) {
        //     navigate(AppRoutes.landing);
        // }
        
    }, [navigate, userQuery.data]);


    return (
    <SocketProvider userId={userQuery.data?.id}>
        <Outlet />
    </SocketProvider>
    );
};