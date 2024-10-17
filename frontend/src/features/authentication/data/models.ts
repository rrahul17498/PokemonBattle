import { z } from "zod";


// Schemas
export const UserSchema = z.object({
    id: z.number(),
    name: z.string().min(3, { message: "Minimum 3 letters"}),
    email: z.string().email(),
    password: z.string().min(6, { message: "Minimum 6 letters"}),
    rating: z.number(),
    owned_pokemons: z.array(z.number()),
});

export const GuestUserSchema = UserSchema.pick({ name: true, owned_pokemons: true });


// Types
export type GuestUserType = z.infer<typeof GuestUserSchema>;

export type OnBoardInfoType = GuestUserType & {
    step: number
};





