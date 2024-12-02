import { z } from "zod";

export enum PokemonTypes {
    FIRE = "FIRE",
    WATER = "WATER",
    GRASS = "GRASS",
};

export const PokemonAttackSchema = z.object({
    id: z.number(),
    name: z.string(),
    mediaSrc: z.string(),
    power: z.number(),
    accuracy: z.number(),
    energy_consumed: z.number(),
});

export const PokemonSchema = z.object({
    id: z.number(),
    name: z.string(),
    type: z.nativeEnum(PokemonTypes),
    image: z.string(),
    attacks: z.array(PokemonAttackSchema),
});


export type PokemonDataType = z.infer<typeof PokemonSchema>;