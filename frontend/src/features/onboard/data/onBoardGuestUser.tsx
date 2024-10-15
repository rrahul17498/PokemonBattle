import { useQueryClient } from "@tanstack/react-query";
import { GuestUserSchema, OnBoardInfoType } from "./models";
import { useNavigate } from "react-router-dom";
import AppRoutes from "@/app/routing/routes";


export enum QueryKeys {
    GUEST_USER = "guestUser",
}


export const useOnBoardGuestUser = () => {

    const queryClient = useQueryClient();

    const navigate = useNavigate();

    const completeOnboarding = (data: OnBoardInfoType) => {

        const validatedGuestData = GuestUserSchema.parse(data);

        queryClient.setQueryData([QueryKeys.GUEST_USER], validatedGuestData);

        navigate(AppRoutes.onboard);
    };

    return { completeOnboarding };

};
