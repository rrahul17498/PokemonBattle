import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export const LandingPage = () => {

    const navigate = useNavigate();

    useEffect(() => {
        navigate("/register");
    }, [navigate]);

    return (
        <div>Landing Page</div>
    );
};