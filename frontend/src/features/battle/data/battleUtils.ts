import { PokemonDataType } from "@/features/pokemon/data/models";
import { PlayerResourceData, PokemonStateType, PlayerStateData, BattleResources, BattleState } from "./models";


export const createPlayerResourceObj = (userId: number, userName: string, ownedPokemons: PokemonDataType[]): PlayerResourceData => ({ userId, userName, ownedPokemons });

export const formatBattleResources = (battleResources: BattleResources, userId: number) => {
    const {
        battle_id,
        room_id,
        first_player_id,
        first_player_name,
        first_player_owned_pokemons,
        second_player_id,
        second_player_name,
        second_player_owned_pokemons,
    } = battleResources;
    
    const isUserFirstPlayer = userId == first_player_id;
    const formattedFirstPlayerResource = createPlayerResourceObj(first_player_id, first_player_name, first_player_owned_pokemons);
    const formattedSecondPlayerResource = createPlayerResourceObj(second_player_id, second_player_name, second_player_owned_pokemons);

    return {
      battleId: battle_id,
      roomId: room_id,
      isUserFirstPlayer,
      user: isUserFirstPlayer ? formattedFirstPlayerResource : formattedSecondPlayerResource,
      opponent: isUserFirstPlayer ? formattedSecondPlayerResource : formattedFirstPlayerResource
    };
};



export const createPlayerStateObj = (chosenPokemonId: number, pokemonsState: PokemonStateType[]): PlayerStateData => ({ chosenPokemonId, pokemonsState });

export const formatBattleState = (battleState: BattleState, isUserFirstPlayer: boolean) => {



  const formattedFirstPlayerState = createPlayerStateObj(battleState?.firstPlayerChosenPokemonId, battleState?.firstPlayerPokemonsStates);
  const formattedSecondPlayerState = createPlayerStateObj(battleState?.secondPlayerChosenPokemonId, battleState?.secondPlayerPokemonsStates);
  
  return {
    status: battleState.status,
    winner: battleState.winner,
    user: isUserFirstPlayer ? formattedFirstPlayerState : formattedSecondPlayerState,
    opponent: isUserFirstPlayer ? formattedSecondPlayerState : formattedFirstPlayerState
  };
}; 