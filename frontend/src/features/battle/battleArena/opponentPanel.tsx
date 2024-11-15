import { useEffect, useState } from "react";
import PokeballIcon from '@/assets/icons/pokeball_side_icon_1.png';
import PokeballOpenIcon from '@/assets/icons/pokeball_open_1.png';
import { PokemonDataType } from "../../pokemon/data/models";
import { PokemonActionResult, PokemonState, USER_ACTION_TYPES, UserActionResult } from "../data/models";
import Button from "@/components/base/button";
import { isNull } from "lodash";

interface UserAttackWindowLayoutProps {
    userId: number,
    userName: string,
    ownedPokemons: PokemonDataType[],
    userActionResultsList: UserActionResult[],
    pokemonActionResultsList: PokemonActionResult[],
    pokemonsState: PokemonState[]
}

export const OpponentPanel = (
    {
         userId: opponentId,
         userName: opponentName,
         ownedPokemons = [],
         userActionResultsList,
         pokemonActionResultsList,
         pokemonsState
         }: UserAttackWindowLayoutProps
) => {

    const [chosenPokemon, setChosenPokemon] = useState<PokemonDataType | null>(null);

    useEffect(() => {
        const latestAction = userActionResultsList[userActionResultsList.length - 1];

        if (latestAction && latestAction.sourceId == opponentId) {


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

    }, [opponentId, ownedPokemons, userActionResultsList]);

    useEffect(() => {
  
    }, [chosenPokemon, pokemonActionResultsList]);

    const renderPokemonHealth = () => {
        const pokemonState = pokemonsState.find(({ id }) => chosenPokemon?.id == id);
        if (!pokemonState) {
            return null;
        }

        const pokemonHealth = pokemonState.health * 100;
        return <div className={`w-[${pokemonHealth}%] h-2.5 rounded-full ${pokemonHealth < 50 ? "bg-health-low" : "bg-health-high"}`}></div>;
    };

    return (
        <section className="border-border border flex flex-col justify-end">
        {!isNull(chosenPokemon) ? <div className="mb-4">
            <div className="w-2/3 bg-gray-200 rounded-full h-2.5 mx-auto mb-12 dark:bg-gray-700">
                 {renderPokemonHealth()}
            </div>
            <div className="mb-6">
                 <h3 className="text-center text-3xl text-pokemonHealth-low font-sans font-bold"></h3>
            </div>
            <img className="max-w-60 mx-auto animate-pokemon-render" src={chosenPokemon?.image} />
            <h3 className="mt-3 p-3 font-semibold text-2xl">{chosenPokemon?.name}</h3>
            <h4 className="px-3 text-lg font-medium mb-2">Moves</h4>
            {/* <div className="min-h-20">

            </div> */}
            <ul className="flex flex-wrap p-3">
                {chosenPokemon?.attacks.map((attack, index) => (
                    <li key={`user_attack_${index}`} className="mx-2 my-1 list-none">
                        <Button
                         name={`user_trigger_attack_${index}`}
                         variant="small"
                         onClick={undefined}
                         >
                            {attack.name}
                        </Button>
                    </li>
                ))}
            </ul>
        </div> : null}
        <div>
            <h3 className="text-xl font-medium p-3">{opponentName}</h3>
            <ul className="grid grid-cols-3 p-3">
                 {
                    ownedPokemons.map((pokemon: PokemonDataType, i) => {
                        const isPokemonSelected = pokemon.id == chosenPokemon?.id;
                        return (
                        <li key={`user_pokemon_${i}`}>
                            <button name={`pokeball_${i}`} onClick={undefined} disabled={true}>
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