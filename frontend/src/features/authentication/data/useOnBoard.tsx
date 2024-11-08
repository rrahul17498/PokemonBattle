import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import APP_ROUTES from "@/app/routing/routes";
import { GuestUserSchema, OnBoardInfoType } from "./models";
import * as UserAPIs from "./userAPIs";


export const useOnBoard = () => {

    const queryClient = useQueryClient();

    const navigate = useNavigate();

    const storeTokenInCookies = (token: string) => {
        Cookies.set("token", token, { expires: 7, sameSite: "Strict", secure: true }); 
    };

    const mutation = useMutation({
        mutationFn: UserAPIs.registerGuestUser,
        onSuccess: ({ token, ...registeredGuestData }) => {
        storeTokenInCookies(token);
        const chosenPokemonId = registeredGuestData?.owned_pokemons[0];
        navigate(APP_ROUTES.pokemon(chosenPokemonId));
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
