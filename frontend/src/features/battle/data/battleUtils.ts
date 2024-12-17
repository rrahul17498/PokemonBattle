import { PokemonAttackDataType, PokemonDataType } from "@/features/pokemon/data/models";
import { PlayerResourceData, PokemonStateType, PlayerStateData, BattleResources, BattleState, FormattedBattleResources } from "./models";


export const createPlayerResourceObj = (userId: number, userName: string, ownedPokemons: PokemonDataType[]): PlayerResourceData => {
  const attackList = ownedPokemons.reduce<PokemonAttackDataType[]>((acc, pokemon: PokemonDataType) => {
  return acc.concat(pokemon.attacks);
  }, []);
  return { userId, userName, ownedPokemons, attackList };
};

export const formatBattleResources = (battleResources: BattleResources, userId: number) => {
    const {
        battle_id,
        room_id,
        first_player_id: firstPlayerId,
        first_player_name: firstPlayerName,
        first_player_owned_pokemons: firstPlayerOwnedPokemons,
        second_player_id: secondPlayerId,
        second_player_name: secondPlayerName,
        second_player_owned_pokemons: secondPlayerOwnedPokemons,
    } = battleResources;
    
    const isUserFirstPlayer = userId == firstPlayerId;
    const formattedFirstPlayerResource = createPlayerResourceObj(firstPlayerId, firstPlayerName, firstPlayerOwnedPokemons);
    const formattedSecondPlayerResource = createPlayerResourceObj(secondPlayerId, secondPlayerName, secondPlayerOwnedPokemons);

    return {
      battleId: battle_id,
      roomId: room_id,
      isUserFirstPlayer,
      user: isUserFirstPlayer ? formattedFirstPlayerResource : formattedSecondPlayerResource,
      opponent: isUserFirstPlayer ? formattedSecondPlayerResource : formattedFirstPlayerResource
    };
};



export const createPlayerStateObj = (userId: number, currentTurn: number, chosenPokemonId: number, pokemonsState: PokemonStateType[]): PlayerStateData => ({ id: userId, isCurrentTurn: currentTurn == userId, chosenPokemonId, pokemonsState});

export const formatBattleState = (battleState: BattleState, isUserFirstPlayer: boolean) => {

  const formattedFirstPlayerState = createPlayerStateObj(battleState.firstPlayerId, battleState.currentTurn, battleState?.firstPlayerChosenPokemonId, battleState?.firstPlayerPokemonsStates);
  const formattedSecondPlayerState = createPlayerStateObj(battleState.secondPlayerId, battleState.currentTurn, battleState?.secondPlayerChosenPokemonId, battleState?.secondPlayerPokemonsStates);
  
  return {
    status: battleState.status,
    winner: battleState.winner,
    user: isUserFirstPlayer ? formattedFirstPlayerState : formattedSecondPlayerState,
    opponent: isUserFirstPlayer ? formattedSecondPlayerState : formattedFirstPlayerState
  };
}; 


export const getAttackMediaSrc = (attackId: number, sourcePlayerId: number, formattedBattleResources: FormattedBattleResources) => {
  const attackList = sourcePlayerId == formattedBattleResources.user.userId ? formattedBattleResources.user.attackList : formattedBattleResources.opponent.attackList;
  const attackObj = attackList.find((attack) => attack.id === attackId);
  return attackObj ? attackObj.media_src : null;
}