import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GuestUserSchema, GuestUserType, OnBoardInfoType } from "./models";
import { useNavigate } from "react-router-dom";
import AppRoutes from "@/app/routing/routes";
import apiClient from "@/app/api/apiClient";
import { API_END_POINTS } from "@/app/api/endpoints";
import { QUERY_KEYS } from "@/app/query/queryKeys";



type RegisterUserAPIBodyType = GuestUserType;

const registerGuestUser = async (data: RegisterUserAPIBodyType) => {
    const result = await apiClient.post(API_END_POINTS.user.createGuest, data);
    return result.data;
};


export const useOnBoard = () => {

    const queryClient = useQueryClient();

    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: registerGuestUser,
        onSuccess: (registeredGuestData) => {

        queryClient.setQueryData([QUERY_KEYS.user],registeredGuestData);

        const chosenPokemonId = registeredGuestData?.owned_pokemons[0];
        navigate(AppRoutes.pokemon(chosenPokemonId));
        },
        onError: (e) => {
            console.error(e.message);
        }
    });

    const createGuestUser = async (data: OnBoardInfoType) => {

        const validatedGuestData = GuestUserSchema.parse(data);

        mutation.mutate(validatedGuestData);
    };

    return { createGuestUser };

};
