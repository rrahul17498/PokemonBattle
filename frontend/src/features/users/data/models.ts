import { z } from "zod";


// Schemas
export const GuestUserSchema = z.object({
    name: z.string().min(3),
    owned_pokemons: z.array(z.number()),
});



// Types

export type GuestUserType = z.infer<typeof GuestUserSchema>;

export type OnBoardInfoType = GuestUserType & {
    step: number
};





