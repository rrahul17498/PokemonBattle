import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { isNull } from "lodash";
import Video from "@/components/base/video";
import useUser from "@/hooks/useUser";
import Spinner from "@/components/base/spinner";
import { PlayerResourceDataType, PlayerStateDataType, PokemonStateType } from "../data/models";
import { UserPanel } from "./userPanel";
import { useBattle } from "../data/useBattle";
import { OpponentPanel } from "./opponentPanel";
import { PokemonDataType } from "@/features/pokemon/data/models";

const formatPlayerResourceData = (userId: number, userName: string, ownedPokemons: PokemonDataType[]): PlayerResourceDataType => ({ userId, userName, ownedPokemons });

const formatPlayerStateData = (chosenPokemonId: number, pokemonsState: PokemonStateType[]): PlayerStateDataType => ({ chosenPokemonId, pokemonsState });

const BattleArena = () => {

    const { battleId, roomId } = useParams();
    const userData = useUser();
    const { battleResources, battleState, sendUserActionEvent, sendPokemonActionEvent} = useBattle(Number(battleId), roomId as string, userData?.id as number);

    const [attackSrc, setAttackSrc] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const playerResourceMaster = useMemo<{ user: PlayerResourceDataType, opponent: PlayerResourceDataType, isUserFirstPlayer: boolean } | null>(() => {

        if (!userData || !battleResources) {
            return null;
        }


        const {
            first_player_id,
            first_player_name,
            first_player_owned_pokemons,
            second_player_id,
            second_player_name,
            second_player_owned_pokemons,
        } = battleResources;
        
        const isUserFirstPlayer = userData?.id == first_player_id;
        
        const formattedFirstPlayerResource = formatPlayerResourceData(first_player_id, first_player_name, first_player_owned_pokemons);
        const formattedSecondPlayerResource = formatPlayerResourceData(second_player_id, second_player_name, second_player_owned_pokemons);

        return {
          isUserFirstPlayer,
          user: isUserFirstPlayer ? formattedFirstPlayerResource : formattedSecondPlayerResource,
          opponent: isUserFirstPlayer ? formattedSecondPlayerResource : formattedFirstPlayerResource
        };
        
    }, [battleResources, userData]);

    const getPlayerStateMaster = () => {
        if (!playerResourceMaster || !battleState) {
            return null
        }

        const formattedFirstPlayerState = formatPlayerStateData(battleState?.firstPlayerChosenPokemonId, battleState?.firstPlayerPokemonsState);
        const formattedSecondPlayerState = formatPlayerStateData(battleState?.secondPlayerChosenPokemonId, battleState?.secondPlayerPokemonsState);
        
        return {
          user: playerResourceMaster.isUserFirstPlayer ? formattedFirstPlayerState : formattedSecondPlayerState,
          opponent: playerResourceMaster.isUserFirstPlayer ? formattedSecondPlayerState : formattedFirstPlayerState
        };
    };  

    const playerStateMaster = getPlayerStateMaster();

    const onAttackEnd = () => {
        setAttackSrc(null);
    };

    useEffect(() => {
        if (!isNull(attackSrc) && videoRef.current) {
            videoRef.current.load();
            videoRef.current.play();
        } 
    },[attackSrc]);

  if (!playerResourceMaster || !battleState || !playerStateMaster) {
    return <Spinner />
  } 
    
  return (
    <main className="min-h-screen grid grid-cols-1-2-1">
        <UserPanel
          { ...playerResourceMaster.user }
          { ...playerStateMaster.user }
          targetPokemonId={playerStateMaster.opponent.chosenPokemonId}
          sendUserActionEvent={sendUserActionEvent}
          sendPokemonActionEvent={sendPokemonActionEvent}
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
         {...playerResourceMaster.opponent }
         { ...playerStateMaster.opponent }
          />
    </main>
  );
};

export { BattleArena };
