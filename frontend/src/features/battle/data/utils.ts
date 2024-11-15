import { PokemonDataType } from "@/features/pokemon/data/models";
import { BattleState, PlayerDataType, PokemonState } from "./models";


export const formatPlayerData = (userId: number, userName: string, ownedPokemons: PokemonDataType[]): PlayerDataType => ({ userId, userName, ownedPokemons });

export const formatPokemonHealthStats = (id: number, health: number ) => ({ id, health });

export const getPokemonsState = (battleState: BattleState, isUserFirstPlayer: boolean): { user: PokemonState[], opponent: PokemonState[] } => {
      const {
         firstPlayerPokemon1Id,
         firstPlayerPokemon1Health,
         firstPlayerPokemon2Id,
         firstPlayerPokemon2Health,
         firstPlayerPokemon3Id,
         firstPlayerPokemon3Health,
         secondPlayerPokemon1Id,
         secondPlayerPokemon1Health,
         secondPlayerPokemon2Id,
         secondPlayerPokemon2Health,
         secondPlayerPokemon3Id,
         secondPlayerPokemon3Health
        } = battleState;

        const firstPlayerPokemons = [
            formatPokemonHealthStats(firstPlayerPokemon1Id, firstPlayerPokemon1Health),
            formatPokemonHealthStats(firstPlayerPokemon2Id, firstPlayerPokemon2Health),
            formatPokemonHealthStats(firstPlayerPokemon3Id, firstPlayerPokemon3Health),
          ];

        const secondPlayerPokemons = [
            formatPokemonHealthStats(secondPlayerPokemon1Id, secondPlayerPokemon1Health),
            formatPokemonHealthStats(secondPlayerPokemon2Id, secondPlayerPokemon2Health),
            formatPokemonHealthStats(secondPlayerPokemon3Id, secondPlayerPokemon3Health),
          ];

        if (isUserFirstPlayer) {
            return {
                user: firstPlayerPokemons,
                opponent: secondPlayerPokemons
            };
        }

        return {
            user: secondPlayerPokemons,
            opponent: firstPlayerPokemons
        };
  };
 