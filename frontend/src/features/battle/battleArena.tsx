import { useEffect, useMemo, useRef, useState } from "react";
import { isNull } from "lodash";
import Button from "@/components/ui/button";
import STARTOFF_POKEMONS from "../pokemon/startoffPokemons.json";
import { SELECTED_POKEMON } from "../pokemon";
import { PokemonType } from "../pokemon/index";
import PokeballIcon from '@/assets/icons/pokeball_side_icon_1.png';
import PokeballOpenIcon from '@/assets/icons/pokeball_open_1.png';
import Video from "@/components/ui/video";
import { UserAttackWindowLayout } from "./userAttackLayout";
import { useParams } from "react-router-dom";
import { useBattle } from "./data/useBattle";
import { Battle, PlayerDataType } from "./data/models";



const BattleArena = () => {
    const { battleId, roomId } = useParams();

    const { battleState } = useBattle(Number(battleId));

    const [selectedPokemon, setSelectedPokemon] = useState<PokemonType | null>(null);

    const [attackSrc, setAttackSrc] = useState<string | null>(null);

    const videoRef = useRef<HTMLVideoElement | null>(null);

    const playerData = useMemo(() => {
        if (!battleState) {
            return { firstPlayer: {}, secondPlayer: {} };
        } 

        const {
            first_player_id,
            first_player_name,
            first_player_owned_pokemons,
            second_player_id,
            second_player_name,
            second_player_owned_pokemons,
        } = battleState;
    
        return {
            firstPlayer: {
                userId: first_player_id,
                userName: first_player_name,
                ownedPokemons: first_player_owned_pokemons,
            },
            secondPlayer: {
                userId: second_player_id,
                userName: second_player_name,
                ownedPokemons: second_player_owned_pokemons,
            },
        };
    }, [battleState]);

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
        if (!isNull(attackSrc) && videoRef.current) {
            videoRef.current.load();
            videoRef.current.play();
        } 
    },[attackSrc]);

    
  return (
    <main className="min-h-screen grid grid-cols-1-2-1">
        <UserAttackWindowLayout {...playerData.firstPlayer} />
        <section className="border-border border-x flex justify-around p-6 rounded bg-black">
             <Video
                ref={videoRef}
                src={!isNull(attackSrc) ? attackSrc : ""}
                autoPlay={false}
                hide={false}
                onEnded={onAttackEnd}
                />
        </section>
        <UserAttackWindowLayout {...playerData.secondPlayer} />
    </main>
  );
};

export default BattleArena;
