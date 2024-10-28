import Button from "@/components/ui/button";
import { PokemonType } from "@/features/pokemon";
import { useState } from "react";
import STARTOFF_POKEMONS from "../pokemon/startoffPokemons.json";
import PokeballIcon from '@/assets/icons/pokeball_side_icon_1.png';
import PokeballOpenIcon from '@/assets/icons/pokeball_open_1.png';
import { isNull } from "lodash";
import { PokemonDataType } from "../pokemon/data/models";
import { PlayerDataType } from "./data/models";



export const UserAttackWindowLayout = ({ userId, userName, ownedPokemons = [] }: PlayerDataType) => {

    const [selectedPokemon, setSelectedPokemon] = useState<PokemonDataType | null>(null);

    const onChoose = (pokemonDetails: PokemonDataType) => () => {
        setSelectedPokemon(pokemonDetails.id == selectedPokemon?.id ? null : pokemonDetails);
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
        {!isNull(selectedPokemon) ? <div className="mb-4">
            <div className="w-2/3 bg-gray-200 rounded-full h-2.5 mx-auto mb-12 dark:bg-gray-700">
                 <div className="h-2.5 rounded-full" style={{ width: "40%", backgroundColor: getHealthStatusColor(40) }}></div>
            </div>
            <div className="mb-6">
                 <h3 className="text-center text-3xl text-pokemonHealth-low font-sans font-bold">HIT !</h3>
            </div>
            <img className="max-w-60 mx-auto animate-shake" src={selectedPokemon?.image} />
            <h3 className="mt-3 p-3 font-semibold text-2xl">{selectedPokemon?.name}</h3>
            <h4 className="px-3 text-lg font-medium mb-2">Moves</h4>
            <ul className="flex flex-wrap p-3">
                {selectedPokemon?.attacks.map((attack, index) => (
                    <li key={`user_attack_${index}`} className="mx-2 my-1 list-none">
                        <Button
                         name={`user_trigger_attack_${index}`}
                         variant="small"
                         onClick={onTrigger(attack.mediaSrc)}
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
                    ownedPokemons.map((pokemon, i) => {
                        const isPokemonSelected = pokemon.id == selectedPokemon?.id;
                        return (
                        <li key={`user_pokemon_${i}`}>
                            <button name={`pokeball_${i}`} onClick={onChoose(pokemon)}>
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