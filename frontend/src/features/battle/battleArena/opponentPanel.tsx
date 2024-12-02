import { useEffect, useState } from "react";
import PokeballIcon from '@/assets/icons/pokeball_side_icon_1.png';
import PokeballOpenIcon from '@/assets/icons/pokeball_open_1.png';
import { PokemonDataType } from "../../pokemon/data/models";
import { PokemonStateType } from "../data/models";
import Button from "@/components/base/button";
import { isNull } from "lodash";
import PokemonHealthBar from "./pokemonHealthBar";
import toast from "react-hot-toast";

interface UserAttackWindowLayoutProps {
    userId: number,
    userName: string,
    ownedPokemons: PokemonDataType[],
    chosenPokemonId: number,
    pokemonsState: PokemonStateType[]
}

export const OpponentPanel = (
    {
         userId: opponentId,
         userName: opponentName,
         ownedPokemons = [],
         chosenPokemonId,
         pokemonsState
         }: UserAttackWindowLayoutProps
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
    }, [opponentId, ownedPokemons, chosenPokemonId]);

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


    return (
        <section className="border-border border flex flex-col justify-end">
        {!isNull(chosenPokemonResource) ? <div className="mb-4 mt-12">
            <PokemonHealthBar className="mb-24" pokemonState={chosenPokemonState} /> 
            <img className="max-w-60 mx-auto animate-pokemon-render" src={chosenPokemonResource?.image} />
            <h3 className="mt-3 p-3 font-semibold text-2xl">{chosenPokemonResource?.name}</h3>
            <h4 className="px-3 text-lg font-medium mb-2">Moves</h4>
            <ul className="flex flex-wrap p-3">
                {chosenPokemonResource?.attacks.map((attack, index) => (
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
                        const isPokemonSelected = pokemon.id == chosenPokemonId;
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