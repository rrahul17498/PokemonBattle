import apiClient from "@/app/api/apiClient";
import { AxiosError } from "axios";
import Cookies from "js-cookie";

export const protectedRoutesPrefix = {
    root: "/app",
    battle: "/app/battle"
}

type ProtectedRoute = {
    nestedPath: string;
    fullPath: string;
};

export const getProtectedRoute = (prefix: string, nestedPath: string): ProtectedRoute => {
    return { nestedPath, fullPath: `${prefix}/${nestedPath}` }
};

export const validateTokenAndGetUser = async () => {
    const token = Cookies.get("token");
    if (!token) {
        return { isValid: false };
    }

    try {
        // TO USE TOKEN VALIDATION API
        const response = await apiClient.get(`/users/guest/${token}`);
        return { ...response.data, isValid: true };
    } catch(error) {
        if (error instanceof AxiosError) {
            console.error('Token validation failed:', error.response?.data.message); 
         }
         console.error('An unexpected error occurred:', error);
         return { isValid: false };
    }
 };