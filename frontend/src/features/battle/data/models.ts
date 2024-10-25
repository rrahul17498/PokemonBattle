import { PokemonType } from "@/features/pokemon"

export enum BattleEvents {
    BATTLE_CREATED = "BATTLE_CREATED",
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


export type Battle = {
    id: number,
    status: BattleStatus,
    first_player_id: number,
    first_player_name: string,
    first_player_owned_pokemons: PokemonType[],
    second_player_id:  number,
    second_player_name: string,
    second_player_owned_pokemons: PokemonType[],
    winner: number,
}