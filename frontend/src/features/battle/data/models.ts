import { PokemonDataType } from "@/features/pokemon/data/models";
import { z } from "zod"


// Connect Battle

export type ConnectBattle = {
    user_id: number,
    room_id: string,
    battle_id: number,
    did_join_room: boolean
}


// Player Data

export type PlayerResourceDataType = {
    userId: number,
    userName: string,
    ownedPokemons: PokemonDataType[]
};

export type PlayerStateDataType = {
    chosenPokemonId: number,
    pokemonsState: PokemonStateType[]
}


// Battle
export enum BattleStatus {
    CREATED = "CREATED",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED"
}


export type BattleResource = {
    battle_id: number,
    room_id: string,
    status: BattleStatus,
    first_player_id: number,
    first_player_name: string,
    first_player_owned_pokemons: PokemonDataType[],
    second_player_id:  number,
    second_player_name: string,
    second_player_owned_pokemons: PokemonDataType[],
    winner: number,
};

export enum ConnectBattleEvents {
    BROADCAST_BATTLE_CREATED = "BROADCAST_BATTLE_CREATED",
    BROADCAST_BATTLE_CONNECTED = "BROADCAST_BATTLE_CONNECTED",
    BROADCAST_BATTLE_DELETED = "BROADCAST_BATTLE_DELETED",
    JOIN_BATTLE_ROOM = "JOIN_BATTLE_ROOM",
    INITIATE_BATTLE = "INITIATE_BATTLE",
    LOAD_BATTLE_RESOURCES = "LOAD_BATTLE_RESOURCES"
}

export enum BattleEvents {
    USER_ACTION = "USER_ACTION",
    USER_ACTION_RESULT = "USER_ACTION_RESULT",
    POKEMON_ACTION = "POKEMON_ACTION",
    POKEMON_ACTION_RESULT = "POKEMON_ACTION_RESULT",
    BATTLE_STATE_UPDATE = "BATTLE_STATE_UPDATE"
}

export enum USER_ACTION_TYPES {
    CHOOSE_POKEMON = "CHOOSE_POKEMON",
    WITHDRAW_POKEMON = "WITHDRAW_POKEMON"
}

export enum POKEMON_ACTION_TYPES {
    ATTACK = "ATTACK",
}

export type UserAction = {
    roomId: string,
    type: string,
    playerId: number,
    pokemonId: number,
};

export type UserActionInput = Omit<UserAction, "roomId" | "completed">;

export type UserActionResult = {
    roomId: string,
    type: string,
    playerId: number,
    pokemonId: number,
    success: boolean
};

export type PokemonAction = {
    roomId: string,
    type: string,
    sourcePlayerId: number,
    sourcePokemonId: number,
    sourceAttackId: number,
    targetPokemonId: number,
};

export type PokemonActionInput = Omit<PokemonAction, "roomId" | "completed">;

export type PokemonActionResult = {
    roomId: string,
    type: string,
    sourcePlayerId: number,
    sourcePokemonId: number,
    sourceAttackId: number,
    targetPokemonId: number
    success: boolean
};

export type BattleState = {
    roomId: string;
    battleId: number;
    status: BattleStatus;
    firstPlayerId: number;
    firstPlayerChosenPokemonId: number,
    firstPlayerPokemonsState: PokemonStateType[];
    secondPlayerId: number;
    secondPlayerChosenPokemonId: number,
    secondPlayerPokemonsState: PokemonStateType[];
    winner: number;
};

export type PokemonStateType = {
    id: number,
    health: number
}
