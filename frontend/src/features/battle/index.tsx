import { useEffect, useRef, useState } from "react";
import { isNull } from "lodash";
import Button from "@/components/ui/button";
import STARTOFF_POKEMONS from "../pokemon/startoffPokemons.json";
import { SELECTED_POKEMON } from "../pokemon";
import { PokemonType } from "../pokemon/index";
import PokeballIcon from '@/assets/icons/pokeball_side_icon_1.png';
import PokeballOpenIcon from '@/assets/icons/pokeball_open_1.png';
import Video from "@/components/ui/video";
import { UserAttackWindowLayout } from "./components/userAttackLayout";



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
        <UserAttackWindowLayout />
        <section className="border-border border-x flex justify-around p-6 rounded bg-black">
             <Video
                ref={videoRef}
                src={!isNull(attackSrc) ? attackSrc : ""}
                autoPlay={false}
                hide={false}
                onEnded={onAttackEnd}
                />
        </section>
        <UserAttackWindowLayout />
    </main>
  );
};
