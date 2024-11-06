import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import AppRoutes from "@/app/routing/routes";
import apiClient from "@/app/api/apiClient";
import { API_END_POINTS } from "@/app/api/endpoints";
import { QUERY_KEYS } from "@/app/query/queryKeys";
import { GuestUserSchema, GuestUserType, OnBoardInfoType } from "./models";
import toast from "react-hot-toast";
import { useEffect } from "react";



type RegisterUserAPIBodyType = GuestUserType;

const registerGuestUser = async (data: RegisterUserAPIBodyType) => {
    const result = await apiClient.post(API_END_POINTS.user.createGuest, data);
    return result.data;
};


export const useOnBoard = () => {

    const queryClient = useQueryClient();

    const navigate = useNavigate();

    const storeTokenInCookies = (token: string) => {
        Cookies.set("token", token, { expires: 7, sameSite: "Strict", secure: true }); 
    };

    const mutation = useMutation({
        mutationFn: registerGuestUser,
        onSuccess: (registeredGuestData) => {
        storeTokenInCookies(registeredGuestData.token);   
        queryClient.setQueryData([QUERY_KEYS.userSession],registeredGuestData);
        const chosenPokemonId = registeredGuestData?.owned_pokemons[0];
        navigate(AppRoutes.pokemon(chosenPokemonId));
        },
        onError: (e) => {
            console.error(e.message);
        }
    });

    const createGuestUser = async (data: OnBoardInfoType) => {
        const validatedGuestData = GuestUserSchema.parse(data);
        toast.promise(
            mutation.mutateAsync(validatedGuestData),
             {
                 loading: "Creating Guest...",
                 success: ({ name }) => <b>Welcome {name}</b>,
                 error: <b>Guest creation failed</b>
            }
            );
    };

    useEffect(() => {
        Cookies.remove("token");
        queryClient.clear();
    }, [queryClient]);

    return { createGuestUser };

};
