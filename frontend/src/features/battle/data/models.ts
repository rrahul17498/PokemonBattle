import { PokemonSchema } from "@/features/pokemon/data/models";
import { z } from "zod"


// Player Data

export const PlayerData = z.object({
    userId: z.number(),
    userName: z.string(),
    ownedPokemons: z.array(PokemonSchema)
});

export type PlayerDataType = z.infer<typeof PlayerData>;

// Battle
export enum BattleStatus {
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
    battle_id: z.number(),
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

export enum ConnectBattleEvents {
    BROADCAST_BATTLE_CREATED = "BROADCAST_BATTLE_CREATED",
    BROADCAST_BATTLE_CONNECTED = "BROADCAST_BATTLE_CONNECTED",
    JOIN_BATTLE_ROOM = "JOIN_BATTLE_ROOM",
    INITIATE_BATTLE_LOAD = "INITIATE_BATTLE_LOAD",
    LOAD_BATTLE_RESOURCES = "LOAD_BATTLE_RESOURCES"
}

export enum BattleEvents {
    USER_ACTION = "USER_ACTION",
    USER_ACTION_RESULT = "USER_ACTION_RESULT",
    POKEMON_ACTION = "POKEMON_ACTION",
    POKEMON_ACTION_RESULT = "POKEMON_ACTION_RESULT"
}

export enum USER_ACTION_TYPES {
    CHOOSE_POKEMON = "CHOOSE_POKEMON",
    WITHDRAW_POKEMON = "WITHDRAW_POKEMON"
}

export enum POKEMON_ACTION_TYPES {
    ATTACK = "ATTACK",
}

export type UserAction = {
    type: string,
    sourceId: number,
    payload: object | number | string,
};

export type UserActionResult = {
    roomId: string,
    type: string,
    sourceId: number,
    payload: object | number | string,
};

export type PokemonAction = {
    type: string,
    sourceId: number,
    payload: object | number | string,
};

export type PokemonActionResult = {
    roomId: string,
    type: string,
    sourceId: number,
    payload: object | number | string,
};
