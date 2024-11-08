import apiClient from "@/app/api/apiClient";
import { GuestUserType } from "./models";


type RegisterUserAPIBodyType = GuestUserType;

export const registerGuestUser = async (data: RegisterUserAPIBodyType) => {
    const result = await apiClient.post("/auth/register/guest", data);
    return result.data;
};