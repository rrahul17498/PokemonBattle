import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AppRoutes from "./routes";
import useUser from "@/hooks/useUser";





export const ProtectedRoute = () => {
    const navigate = useNavigate();

    const { getUserQuery: { data } } = useUser();
 
    useEffect(() => {

        if (!data) {
            navigate(AppRoutes.landing);
        }
        
    }, [data, navigate]);


    return (
    <>
        <Outlet />
    </>
    );
};