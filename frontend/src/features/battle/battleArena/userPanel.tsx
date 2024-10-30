import { useEffect, useState } from "react";
import { PokemonDataType } from "../../pokemon/data/models";
import { POKEMON_ACTION_TYPES, PokemonAction, PokemonActionResult, USER_ACTION_TYPES, UserAction, UserActionResult } from "../data/models";
import { ActionPanelLayout } from "./actionPanelLayout";

interface UserAttackWindowLayoutProps {
    userId: number,
    userName: string,
    ownedPokemons: PokemonDataType[],
    readOnly?: boolean,
    sendUserActionEvent?: (action: UserAction) => void,
    sendPokemonActionEvent?: (action: PokemonAction) => void,
    userActionResultsList: UserActionResult[],
    pokemonActionResultsList: PokemonActionResult[]
}

export const UserPanel = (
    {
         userId,
         userName,
         ownedPokemons = [],
         sendUserActionEvent,
         sendPokemonActionEvent,
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
        // const latestAction = pokemonActionResultsList[pokemonActionResultsList.length - 1];
  
        // if (latestAction && latestAction.sourceId == chosenPokemon?.id) {
            
        // }
  
    }, [chosenPokemon, pokemonActionResultsList]);

    const onChoosePokemon = (pokemonId: number) => () => {
        if(sendUserActionEvent) {
            if(chosenPokemon) {
                return sendUserActionEvent({ type: USER_ACTION_TYPES.WITHDRAW_POKEMON, payload: pokemonId, sourceId: userId });
            }

            return sendUserActionEvent({ type: USER_ACTION_TYPES.CHOOSE_POKEMON, payload: pokemonId, sourceId: userId });
        }   
    };

    const onAttackTrigger = (attackId: number) => () => {
        if (sendPokemonActionEvent) {
            return sendPokemonActionEvent({ type: POKEMON_ACTION_TYPES.ATTACK, payload: attackId, sourceId: userId });
        }
    };

    return (
        <ActionPanelLayout
         userName={userName}
         ownedPokemons={ownedPokemons}
         chosenPokemon={chosenPokemon}
         onChoosePokemon={onChoosePokemon}
         onAttackTrigger={onAttackTrigger}
           />
    );
}