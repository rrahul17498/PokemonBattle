import Button from "@/components/ui/button";
import { useEffect, useState } from "react";
import PokeballIcon from '@/assets/icons/pokeball_side_icon_1.png';
import PokeballOpenIcon from '@/assets/icons/pokeball_open_1.png';
import { isNull } from "lodash";
import { PokemonDataType } from "../pokemon/data/models";
import { USER_ACTION_TYPES, UserAction, UserActionResult } from "./data/models";

interface UserAttackWindowLayoutProps {
    userId: number,
    userName: string,
    ownedPokemons: PokemonDataType[],
    readOnly?: boolean,
    sendUserActionEvent?: (action: UserAction) => void,
    userActionResultsList: UserActionResult[]
}

export const UserAttackWindowLayout = (
    {
         userId,
         userName,
         ownedPokemons = [],
         readOnly = false,
         sendUserActionEvent,
         userActionResultsList
         }: UserAttackWindowLayoutProps
) => {

    const [chosenPokemon, setChosenPokemon] = useState<PokemonDataType | null>(null);


    useEffect(() => {
        console.log("userActionResultsList:", userActionResultsList);

        const latestAction = userActionResultsList[userActionResultsList.length - 1];

        if (latestAction && latestAction.source == userId) {

            if (latestAction.type == USER_ACTION_TYPES.CHOOSE_POKEMON) {
                const pokemonData = ownedPokemons.find((pokemon) => latestAction.payload == pokemon.id);
                if (pokemonData) {
                    setChosenPokemon(pokemonData);
                } else {
                    console.error("Invalid pokemon id recieved: ", latestAction.payload);
                }
            }

            if (latestAction.type == USER_ACTION_TYPES.WITHDRAW_POKEMON) {
                setChosenPokemon(null);
            }
           
        }

    }, [userId, ownedPokemons,userActionResultsList]);

    const onChoose = (pokemonId: number) => () => {
        // setSelectedPokemon(pokemonDetails.id == selectedPokemon?.id ? null : pokemonDetails);
        if(sendUserActionEvent) {
            if(chosenPokemon) {
                return sendUserActionEvent({ type: USER_ACTION_TYPES.WITHDRAW_POKEMON, payload: pokemonId, source: userId });
            }

            return sendUserActionEvent({ type: USER_ACTION_TYPES.CHOOSE_POKEMON, payload: pokemonId, source: userId });
        }   
    };

    const onTrigger = (attack_src: string) => () => {
        // setAttackSrc(attack_src);
    };

    const getHealthStatusColor = (healthValue: number) => {

        if (healthValue < 50) {
            return "var(--pokemon-health-low)";
        }

        return "var(--pokemon-health-high)";
    };

    return (
        <section className="border-border border flex flex-col justify-end">
        {!isNull(chosenPokemon) ? <div className="mb-4">
            <div className="w-2/3 bg-gray-200 rounded-full h-2.5 mx-auto mb-12 dark:bg-gray-700">
                 <div className="h-2.5 rounded-full" style={{ width: "40%", backgroundColor: getHealthStatusColor(40) }}></div>
            </div>
            <div className="mb-6">
                 <h3 className="text-center text-3xl text-pokemonHealth-low font-sans font-bold">HIT !</h3>
            </div>
            <img className="max-w-60 mx-auto animate-shake" src={chosenPokemon?.image} />
            <h3 className="mt-3 p-3 font-semibold text-2xl">{chosenPokemon?.name}</h3>
            <h4 className="px-3 text-lg font-medium mb-2">Moves</h4>
            <ul className="flex flex-wrap p-3">
                {chosenPokemon?.attacks.map((attack, index) => (
                    <li key={`user_attack_${index}`} className="mx-2 my-1 list-none">
                        <Button
                         name={`user_trigger_attack_${index}`}
                         variant="small"
                         onClick={readOnly ? undefined : onTrigger(attack.mediaSrc)}
                         >
                            {attack.name}
                        </Button>
                    </li>
                ))}
            </ul>
        </div> : null}
        <div>
            <h3 className="text-xl font-medium p-3">{userName}</h3>
            <ul className="grid grid-cols-3 p-3">
                 {
                    ownedPokemons.map((pokemon: PokemonDataType, i) => {
                        const isPokemonSelected = pokemon.id == chosenPokemon?.id;
                        return (
                        <li key={`user_pokemon_${i}`}>
                            <button name={`pokeball_${i}`} onClick={readOnly ? undefined : onChoose(pokemon.id)} disabled={readOnly}>
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