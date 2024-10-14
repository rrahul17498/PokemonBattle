import { z } from "zod";


export const GuestUserSchema = z.object({
    name: z.string().min(3),
    owned_pokemons: z.array(z.number()),
});

export const GuestUserNameFormSchema = GuestUserSchema.pick({ name: true });





