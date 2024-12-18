import { useEffect, useState } from "react";
import PokeballIcon from '@/assets/icons/pokeball_side_icon_1.png';
import PokeballOpenIcon from '@/assets/icons/pokeball_open_1.png';
import { PokemonDataType, PokemonStatus } from "../../pokemon/data/models";
import { PokemonActionResult, PokemonStateType } from "../data/models";
import Button from "@/components/base/button";
import { isNull } from "lodash";
import PokemonHealthBar from "./pokemonHealthBar";
import toast from "react-hot-toast";
import { cn } from "@/utils/cn";
import { ButtonVariantType } from "@/components/base/button/types";

interface UserAttackWindowLayoutProps {
    userId: number,
    userName: string,
    ownedPokemons: PokemonDataType[],
    chosenPokemonId: number,
    pokemonsState: PokemonStateType[],
}

export const OpponentPanel = (
    {
         userId: opponentId,
         userName: opponentName,
         ownedPokemons = [],
         chosenPokemonId,
         pokemonsState,
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
        if (!chosenPokemonId || !pokemonsState) {
            return;
        }

        const chosenPokemonState = pokemonsState[chosenPokemonId];
        if (!chosenPokemonState) {
            console.error("Invalid pokemon id recieved: ", chosenPokemonId);
            toast.error("Invalid pokemon id"); 
            return;
        }
        setChosenPokemonState(chosenPokemonState);
    }, [chosenPokemonId, pokemonsState]);

    return (
        <section className="border-border border flex flex-col justify-end">
        {!isNull(chosenPokemonResource)
         ? <div className="">
             <img className={cn("max-w-60 mx-auto animate-pokemon-render", { "grayscale": chosenPokemonState?.status == PokemonStatus.DEFEATED})}src={chosenPokemonResource?.image} />
                <h3 className="mt-3 p-3 font-semibold text-2xl">{chosenPokemonResource?.name}</h3>
                <div className="pl-3 pr-6 py-4">
                  <PokemonHealthBar className="" pokemonState={chosenPokemonState} />
                </div>
                <h4 className="px-3 pb-3 text-lg font-medium">Moves</h4>
                <ul className="flex flex-wrap px-3 min-h-20">
                    {chosenPokemonResource?.attacks.map((attack, index) => (
                        <li key={`user_attack_${index}`} className="mx-2 my-1 list-none">
                            <Button
                            name={`user_trigger_attack_${index}`}
                            className="cursor-not-allowed bg-primary-light"
                            variant={ButtonVariantType.SMALL}
                            onClick={undefined}
                            >{attack.name}</Button>
                        </li>
                    ))}
                </ul>
        </div> : null}
        <div>
            <h3 className="text-xl font-medium px-3 mt-4">{opponentName}</h3>
            <ul className="grid grid-cols-3 p-3">
                 {
                    ownedPokemons.map((pokemon: PokemonDataType, i) => {
                        const isPokemonSelected = pokemon.id == chosenPokemonId;
                        return (
                        <li key={`user_pokemon_${i}`}>
                            <Button name={`pokeball_${i}`} variant={ButtonVariantType.CONTAINER} className="opacity-100" disabled={true}>
                                <img className={cn("h-12 mx-auto", { "grayscale": chosenPokemonState?.status == PokemonStatus.DEFEATED })} src={isPokemonSelected ? PokeballOpenIcon : PokeballIcon} />
                                <h5 className="text-center mt-2 text-sm">{pokemon.name}</h5>
                            </Button>
                        </li>
                    )})
                }
            </ul>
        </div>
    </section>
    );
}