import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { isNull } from "lodash";
import Video from "@/components/base/video";
import useUser from "@/hooks/useUser";
import Spinner from "@/components/base/spinner";
import { PlayerDataType } from "../data/models";
import { UserPanel } from "./userPanel";
import { useBattle } from "../data/useBattle";
import { OpponentPanel } from "./opponentPanel";
import { PokemonDataType } from "@/features/pokemon/data/models";

const formatPlayerData = (userId: number, userName: string, ownedPokemons: PokemonDataType[]): PlayerDataType => ({ userId, userName, ownedPokemons });

const BattleArena = () => {

    const { battleId, roomId } = useParams();
    const userData = useUser();
    const { battleResources, battleState, ...battleService } = useBattle(Number(battleId), roomId as string, userData?.id as number);

    const [attackSrc, setAttackSrc] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);


    const playerResourceData = useMemo<{ user: PlayerDataType, opponent: PlayerDataType, isUserFirstPlayer: boolean } | null>(() => {
        if(userData && battleResources) {
            const {
                first_player_id,
                first_player_name,
                first_player_owned_pokemons,
                second_player_id,
                second_player_name,
                second_player_owned_pokemons,
            } = battleResources;
            
            const isUserFirstPlayer = userData?.id == first_player_id;
            
            const formattedFirstPlayer = formatPlayerData(first_player_id, first_player_name, first_player_owned_pokemons);
            const formattedSecondPlayer = formatPlayerData(second_player_id, second_player_name, second_player_owned_pokemons);
    
            return {
              isUserFirstPlayer,
              user: isUserFirstPlayer ? formattedFirstPlayer : formattedSecondPlayer,
              opponent: isUserFirstPlayer ? formattedSecondPlayer : formattedFirstPlayer
            };
        }

        return null;
    }, [battleResources, userData]);

  const pokemonsState = playerResourceData && battleState ? {
     user: playerResourceData.isUserFirstPlayer ? battleState.firstPlayerPokemonsState : battleState.secondPlayerPokemonsState,
     opponent: playerResourceData.isUserFirstPlayer ? battleState.secondPlayerPokemonsState : battleState.firstPlayerPokemonsState ,
    } : { user: [], opponent: [] };

    useEffect(() => {
      // const latestAction = battleService.pokemonActionResultsList[battleService.pokemonActionResultsList.length - 1];

      // if (latestAction && latestAction.source == playerData?.user.userId) {
      // }

  }, [battleService.pokemonActionResultsList]);


    const onAttackEnd = () => {
        setAttackSrc(null);
    };

    useEffect(() => {
        if (!isNull(attackSrc) && videoRef.current) {
            videoRef.current.load();
            videoRef.current.play();
        } 
    },[attackSrc]);

  if (!playerResourceData || !battleState) {
    return <Spinner />
  } 
    
  return (
    <main className="min-h-screen grid grid-cols-1-2-1">
        <UserPanel
          { ...playerResourceData?.user }
          { ...battleService }
          pokemonsState={pokemonsState.user}
           />
        <section className="border-border border-x flex justify-around p-6 rounded bg-black">
             <Video
                ref={videoRef}
                src={!isNull(attackSrc) ? attackSrc : ""}
                autoPlay={false}
                hide={false}
                onEnded={onAttackEnd}
                />
        </section>
        <OpponentPanel
         {...playerResourceData?.opponent }
         { ...battleService }
         pokemonsState={pokemonsState?.opponent}
          />
    </main>
  );
};

export { BattleArena };
