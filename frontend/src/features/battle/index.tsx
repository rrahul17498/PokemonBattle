import { useEffect, useRef, useState } from "react";
import { isNull } from "lodash";
import Button from "@/components/ui/button";
import STARTOFF_POKEMONS from "../pokemon/startoffPokemons.json";
import { SELECTED_POKEMON } from "../pokemon";
import { PokemonType } from "../pokemon/index";
import PokeballIcon from '@/assets/icons/pokeball_side_icon_1.png';
import PokeballOpenIcon from '@/assets/icons/pokeball_open_1.png';
import Video from "@/components/ui/video";



export const Battle = () => {
    const [selectedPokemon, setSelectedPokemon] = useState<PokemonType | null>(null);

    const [attackSrc, setAttackSrc] = useState<string | null>(null);

    const videoRef = useRef<HTMLVideoElement | null>(null);

    const onChoose = (pokemonDetails: PokemonType) => () => {
        setSelectedPokemon(pokemonDetails.id == selectedPokemon?.id ? null : pokemonDetails);
    };

    const onTrigger = (attack_src: string) => () => {
        setAttackSrc(attack_src);
    };

    const onAttackEnd = () => {
        setAttackSrc(null);
    };

    useEffect(() => {
        console.log("attackID: ", attackSrc);
        if (!isNull(attackSrc) && videoRef.current) {
            videoRef.current.load();
            videoRef.current.play();
        } 
    },[attackSrc]);
    
  return (
    <main className="min-h-screen grid grid-cols-1-2-1">
        <section className="border-border border flex flex-col justify-end">
            <div className="mb-4">
                <img className="max-w-60 mx-auto" src={selectedPokemon?.image} />
                <h3 className="mt-3 p-3 font-semibold text-2xl">{selectedPokemon?.name}</h3>
                <h4 className="px-3 text-lg font-medium mb-2">Moves</h4>
                <ul className="flex flex-wrap p-3">
                    {SELECTED_POKEMON.attacks.map((attack, index) => (
                        <li key={`user_attack_${index}`} className="mx-2 my-1 list-none">
                            <Button
                             name={`user_trigger_attack_${index}`}
                             variant="small"
                             onClick={onTrigger(attack.src)}
                             >
                                {attack.name}
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3 className="text-xl font-medium p-3">Rahul Radhakrishna</h3>
                <ul className="grid grid-cols-3 p-3">
                     {
                        STARTOFF_POKEMONS.data.map((pokemon, i) => {
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
        <section className="border-border border-x flex justify-around p-6 rounded bg-black">
             <Video
                ref={videoRef}
                src={!isNull(attackSrc) ? attackSrc : ""}
                autoPlay={false}
                hide={false}
                onEnded={onAttackEnd}
                />
        </section>
        <section className="border-border border">

        </section>

    </main>
  );
};
