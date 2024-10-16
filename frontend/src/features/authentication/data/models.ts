import { z } from "zod";


// Schemas
export const UserSchema = z.object({
    id: z.number(),
    name: z.string().min(3, { message: "Name should have atleast 3 letter"}),
    email: z.string(),
    password: z.string(),
    rating: z.number(),
    owned_pokemons: z.array(z.number()),
});

export const GuestUserSchema = UserSchema.pick({ name: true, owned_pokemons: true });


// Types
export type GuestUserType = z.infer<typeof GuestUserSchema>;

export type OnBoardInfoType = GuestUserType & {
    step: number
};





