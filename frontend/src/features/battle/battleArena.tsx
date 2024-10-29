import { useEffect, useMemo, useRef, useState } from "react";
import { isNull } from "lodash";
import { PokemonType } from "../pokemon/index";
import Video from "@/components/ui/video";
import { UserAttackWindowLayout } from "./userAttackLayout";
import { useParams } from "react-router-dom";
import { useBattle } from "./data/useBattle";
import { PlayerDataType } from "./data/models";
import useUserSession from "@/hooks/useUserSession";
import Spinner from "@/components/ui/spinner";
import { PokemonDataType } from "../pokemon/data/models";

const formatPlayerData = (userId: number, userName: string, ownedPokemons: PokemonDataType[]): PlayerDataType => ({ userId, userName, ownedPokemons });

const BattleArena = () => {

    const { battleId, roomId } = useParams();
    const { battleState, sendUserActionEvent, userActionResultsList } = useBattle(Number(battleId), roomId as string);
    const userSessionData = useUserSession();
    const [attackSrc, setAttackSrc] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);


    const playerData = useMemo<{ user: PlayerDataType, opponent: PlayerDataType } | null>(() => {
        if(userSessionData && battleState) {
            const {
                first_player_id,
                first_player_name,
                first_player_owned_pokemons,
                second_player_id,
                second_player_name,
                second_player_owned_pokemons,
            } = battleState;
            
            const isUserFirstPlayer = userSessionData?.id == battleState?.first_player_id;
            const formattedFirstPlayer = formatPlayerData(first_player_id, first_player_name, first_player_owned_pokemons);
            const formattedSecondPlayer = formatPlayerData(second_player_id, second_player_name, second_player_owned_pokemons);
    
            return (isUserFirstPlayer
            ? { user: formattedFirstPlayer, opponent: formattedSecondPlayer }
             : { user: formattedSecondPlayer, opponent: formattedFirstPlayer });
        }

        return null;
    }, [battleState, userSessionData]);


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
        <UserAttackWindowLayout
          sendUserActionEvent={sendUserActionEvent}
          userActionResultsList={userActionResultsList}
          {...playerData?.user}
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
        <UserAttackWindowLayout
         readOnly={true}
         userActionResultsList={userActionResultsList}
         {...playerData?.opponent }
          />
    </main>
  );
};

export default BattleArena;
