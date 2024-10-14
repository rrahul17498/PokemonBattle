import { useQueryClient } from "@tanstack/react-query";
import { GuestUserNameFormSchema, GuestUserSchema } from "./models";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import AppRoutes from "@/app/routing/routes";



export const useOnBoardGuestUser = () => {

    const queryClient = useQueryClient();

    const navigate = useNavigate();

    const cacheUserName = (data: z.infer<typeof GuestUserNameFormSchema>) => {

        const guestData = GuestUserSchema.parse({
            ...data,
            owned_pokemons: []
        });

        console.log("guestData: ", guestData);

        queryClient.setQueryData(["guestUser"], guestData);

        navigate(AppRoutes.onboard);
    };



    return { cacheUserName };

};
