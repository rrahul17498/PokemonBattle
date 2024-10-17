import { z } from "zod";

// Schemas

enum PokemonType {
    FIRE = "FIRE",
    WATER = "WATER",
    GRASS = "GRASS",
};

export const PokemonAttackSchema = z.object({
    name: z.string(),
    mediaSrc: z.string(),
    power: z.number(),
    accuracy: z.number(),
    energy_consumed: z.number(),
});

export const PokemonSchema = z.object({
    id: z.number(),
    name: z.string(),
    type: z.nativeEnum(PokemonType),
    image: z.string(),
    attacks: z.array(PokemonAttackSchema),
});



// Types

export type PokemonDataType = z.infer<typeof PokemonSchema>;