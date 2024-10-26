import { PokemonSchema } from "@/features/pokemon/data/models";
import { z } from "zod"

export enum BattleEvents {
    BROADCAST_BATTLE_CREATED = "BROADCAST_BATTLE_CREATED",
    BROADCAST_BATTLE_CONNECTED = "BROADCAST_BATTLE_CONNECTED",
    JOIN_BATTLE_ROOM = "JOIN_BATTLE_ROOM"
}


enum BattleStatus {
    CREATED = "CREATED",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED"
}

// type BattleAttack = {
//     id: number,
//     name: string,
//     sourcePokemon: number,
//     sourceUser: number,
//     targetPokemon: number,
//     targetUser: number
// }


const Battle = z.object({
    id: z.number(),
    room_id: z.string(),
    status: z.nativeEnum(BattleStatus),
    first_player_id: z.number(),
    first_player_name: z.string(),
    first_player_owned_pokemons: z.array(PokemonSchema),
    second_player_id:  z.number(),
    second_player_name: z.string(),
    second_player_owned_pokemons: z.array(PokemonSchema),
    winner: z.number(),
});


export type Battle = z.infer<typeof Battle>;

export type JoinRoomResult = {
    didJoinRoom: boolean
};