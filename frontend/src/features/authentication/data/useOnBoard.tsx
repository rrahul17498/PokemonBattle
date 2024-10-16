import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GuestUserSchema, GuestUserType, OnBoardInfoType } from "./models";
import { useNavigate } from "react-router-dom";
import AppRoutes from "@/app/routing/routes";
import apiClient from "@/app/apiClient";


export enum QueryKeys {
    GUEST_USER = "guestUser",
}

const API_REGISTER_GUEST = `/users/guest`;


type RegisterUserAPIBodyType = GuestUserType;

const registerGuestUser = async (data: RegisterUserAPIBodyType) => {
    const result = await apiClient.post(API_REGISTER_GUEST, data);

    return result.data;
};


export const useOnBoard = () => {

    const queryClient = useQueryClient();

    const navigate = useNavigate();

    const completeOnboarding = async (data: OnBoardInfoType) => {

        const validatedGuestData = GuestUserSchema.parse(data);

        const registeredGuestData = await registerGuestUser(validatedGuestData);

        queryClient.setQueryData([QueryKeys.GUEST_USER], registeredGuestData);

        const chosenPokemonId = registeredGuestData?.owned_pokemons[0];

        navigate(AppRoutes.pokemon(chosenPokemonId));
    };

    return { completeOnboarding };

};
