import { useEffect, useState } from "react";
import PokeballIcon from '@/assets/icons/pokeball_side_icon_1.png';
import PokeballOpenIcon from '@/assets/icons/pokeball_open_1.png';
import { PokemonDataType } from "../../pokemon/data/models";
import { POKEMON_ACTION_TYPES, PokemonActionInput, PokemonStateType, USER_ACTION_TYPES, UserActionInput } from "../data/models";
import Button from "@/components/base/button";
import { isNull } from "lodash";
import PokemonHealthBar from "./pokemonHealthBar";
import toast from "react-hot-toast";

interface UserPanelProps {
    userId: number,
    userName: string,
    ownedPokemons: PokemonDataType[],
    chosenPokemonId: number,
    pokemonsState: PokemonStateType[],
    targetPokemonId: number,
    sendUserActionEvent: (action: UserActionInput) => void,
    sendPokemonActionEvent: (action: PokemonActionInput) => void,
}

export const UserPanel = (
    {
         userId,
         userName,
         ownedPokemons = [],
         chosenPokemonId,
         pokemonsState,
         targetPokemonId,
         sendUserActionEvent,
         sendPokemonActionEvent,
         }: UserPanelProps
) => {

    const [chosenPokemonResource, setChosenPokemonResource] = useState<PokemonDataType | null>(null);
    const [chosenPokemonState, setChosenPokemonState] = useState<PokemonStateType | null>(null);


    useEffect(() => {
        if (!chosenPokemonId) { 
            return setChosenPokemonResource(null);
        }
        
        const chosenPokemonData = ownedPokemons.find((pokemon) => pokemon.id == chosenPokemonId);
            if (!chosenPokemonData) {
                console.error("Invalid pokemon id recieved: ", chosenPokemonId);
                toast.error("Invalid pokemon id"); 
                return;
            }
            return setChosenPokemonResource(chosenPokemonData);
    }, [userId, ownedPokemons, chosenPokemonId]);

    useEffect(() => {
        if (!chosenPokemonId) {
            return;
        }

        const chosenPokemonState = pokemonsState.find((pokemonState) => pokemonState.id == chosenPokemonId);
        if (!chosenPokemonState) {
            console.error("Invalid pokemon id recieved: ", chosenPokemonId);
            toast.error("Invalid pokemon id"); 
            return;
        }
        setChosenPokemonState(chosenPokemonState);
    }, [chosenPokemonId, pokemonsState]);


    const toggleChosenPokemon = (pokemonId: number) => () => {
        if(chosenPokemonId) {
                return sendUserActionEvent({ type: USER_ACTION_TYPES.WITHDRAW_POKEMON, pokemonId: pokemonId, playerId: userId });
            }

        return sendUserActionEvent({ type: USER_ACTION_TYPES.CHOOSE_POKEMON, pokemonId: pokemonId, playerId: userId }); 
    };

    const onTriggerAttack = (pokemonId: number, attackId: number) => () => {
        if (sendPokemonActionEvent) {
            return sendPokemonActionEvent({ type: POKEMON_ACTION_TYPES.ATTACK, sourceAttackId: attackId, sourcePlayerId: userId, sourcePokemonId: pokemonId, targetPokemonId  });
        }
    }

    return (
        <section className="border-border border flex flex-col justify-end">
        {!isNull(chosenPokemonResource)
        ? <div className="mb-4 mt-12">
            <PokemonHealthBar className="mb-24" pokemonState={chosenPokemonState} /> 
            <img className="max-w-60 mx-auto animate-pokemon-render" src={chosenPokemonResource?.image} />
            <h3 className="mt-3 p-3 font-semibold text-2xl">{chosenPokemonResource?.name}</h3>
            <h4 className="px-3 text-lg font-medium mb-2">Moves</h4>
            <ul className="flex flex-wrap p-3 min-h-20">
                {chosenPokemonResource.attacks.map((attack, index) => (
                    <li key={`user_attack_${index}`} className="mx-2 my-1 list-none">
                        <Button
                        name={`user_trigger_attack_${index}`}
                        variant="small"
                         onClick={onTriggerAttack(chosenPokemonId, attack.id)}
                        >
                            {attack.name}
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
        : null}
        <div>
            <h3 className="text-xl font-medium p-3">{userName}</h3>
            <ul className="grid grid-cols-3 p-3">
                 {
                    ownedPokemons.map((pokemon: PokemonDataType, i) => {
                        const isPokemonSelected = pokemon.id == chosenPokemonResource?.id;
                        return (
                        <li key={`user_pokemon_${i}`}>
                            <button name={`pokeball_${i}`} onClick={toggleChosenPokemon(pokemon.id)}>
                                <img className="h-12 mx-auto" src={isPokemonSelected ? PokeballOpenIcon : PokeballIcon} />
                                <h5 className="text-center w-20 mt-2 text-sm">{pokemon.name}</h5>
                            </button>
                    </li>
                    )})
                }
            </ul>
        </div>
    </section>
    );
}