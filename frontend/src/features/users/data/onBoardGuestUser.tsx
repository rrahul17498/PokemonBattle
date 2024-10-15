import { useQueryClient } from "@tanstack/react-query";
import { GuestUserSchema, OnBoardInfoType } from "./models";
import { useNavigate } from "react-router-dom";
import AppRoutes from "@/app/routing/routes";



export const useOnBoardGuestUser = () => {

    const queryClient = useQueryClient();

    const navigate = useNavigate();

    const completeOnboarding = (data: OnBoardInfoType) => {

        const validatedGuestData = GuestUserSchema.parse(data);

        queryClient.setQueryData(["guestUser"], validatedGuestData);

        navigate(AppRoutes.onboard);
    };

    return { completeOnboarding };

};
