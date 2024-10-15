import AppRoutes from "@/app/routing/routes";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export const LandingPage = () => {

    const navigate = useNavigate();

    useEffect(() => {
        navigate(AppRoutes.onboard);
    }, [navigate]);

    return (
        <div>Landing Page</div>
    );
};