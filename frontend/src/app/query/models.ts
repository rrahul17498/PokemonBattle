

export type UserSession = {
    token: string,
    id: number,
    name: string,
    owned_pokemons: number[]
};

export type AllowedUserSession = {
    id: number,
    name: string,
    owned_pokemons: number[]
};