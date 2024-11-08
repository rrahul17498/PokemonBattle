import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { isNull } from "lodash";
import Video from "@/components/base/video";
import useUser from "@/hooks/useUser";
import Spinner from "@/components/base/spinner";
import { PlayerDataType, POKEMON_ACTION_TYPES } from "../data/models";
import { PokemonDataType } from "../../pokemon/data/models";
import { UserPanel } from "./userPanel";
import { useBattle } from "../data/useBattle";
import { OpponentPanel } from "./opponentPanel";

const formatPlayerData = (userId: number, userName: string, ownedPokemons: PokemonDataType[]): PlayerDataType => ({ userId, userName, ownedPokemons });

const BattleArena = () => {

    const { battleId, roomId } = useParams();
    const userSessionData = useUser();
    const battleService = useBattle(Number(battleId), roomId as string, userSessionData?.id as number);
    const [attackSrc, setAttackSrc] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);


    const playerData = useMemo<{ user: PlayerDataType, opponent: PlayerDataType } | null>(() => {
        if(userSessionData && battleService.battleState) {
            const {
                first_player_id,
                first_player_name,
                first_player_owned_pokemons,
                second_player_id,
                second_player_name,
                second_player_owned_pokemons,
            } = battleService.battleState;
            
            const isUserFirstPlayer = userSessionData?.id == battleService.battleState?.first_player_id;
            const formattedFirstPlayer = formatPlayerData(first_player_id, first_player_name, first_player_owned_pokemons);
            const formattedSecondPlayer = formatPlayerData(second_player_id, second_player_name, second_player_owned_pokemons);
    
            return (isUserFirstPlayer
            ? { user: formattedFirstPlayer, opponent: formattedSecondPlayer }
             : { user: formattedSecondPlayer, opponent: formattedFirstPlayer });
        }

        return null;
    }, [battleService.battleState, userSessionData]);

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

  if (!playerData) {
    return <Spinner />
  } 
    
  return (
    <main className="min-h-screen grid grid-cols-1-2-1">
        <UserPanel
          { ...playerData?.user }
          { ...battleService }
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
         {...playerData?.opponent }
         { ...battleService }
          />
    </main>
  );
};

export { BattleArena };
