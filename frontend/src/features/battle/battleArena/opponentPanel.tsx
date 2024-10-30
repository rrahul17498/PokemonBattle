import { useEffect, useState } from "react";
import { PokemonDataType } from "../../pokemon/data/models";
import { POKEMON_ACTION_TYPES, PokemonAction, PokemonActionResult, USER_ACTION_TYPES, UserAction, UserActionResult } from "../data/models";
import { ActionPanelLayout } from "./actionPanelLayout";

interface UserAttackWindowLayoutProps {
    userId: number,
    userName: string,
    ownedPokemons: PokemonDataType[],
    userActionResultsList: UserActionResult[],
    pokemonActionResultsList: PokemonActionResult[]
}

export const OpponentPanel = (
    {
         userId,
         userName,
         ownedPokemons = [],
         userActionResultsList,
         pokemonActionResultsList
         }: UserAttackWindowLayoutProps
) => {

    const [chosenPokemon, setChosenPokemon] = useState<PokemonDataType | null>(null);


    useEffect(() => {
        // const latestAction = userActionResultsList[userActionResultsList.length - 1];

        // if (latestAction && latestAction.sourceId == userId) {

        //     if (latestAction.type == USER_ACTION_TYPES.CHOOSE_POKEMON) {
        //         const pokemonData = ownedPokemons.find((pokemon) => latestAction.payload == pokemon.id);
        //         if (pokemonData) {
        //             setChosenPokemon(pokemonData);
        //         } else {
        //             console.error("Invalid pokemon id recieved: ", latestAction.payload);
        //         }
        //     }

        //     if (latestAction.type == USER_ACTION_TYPES.WITHDRAW_POKEMON) {
        //         setChosenPokemon(null);
        //     }
           
        // }

    }, [userId, ownedPokemons,userActionResultsList]);

    useEffect(() => {
  
    }, [chosenPokemon, pokemonActionResultsList]);

    return (
        <ActionPanelLayout
         readOnly={true}
         userName={userName}
         ownedPokemons={ownedPokemons}
         chosenPokemon={chosenPokemon}
           />
    );
}