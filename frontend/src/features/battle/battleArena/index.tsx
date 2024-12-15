import { useEffect } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import useUser from "@/hooks/useUser";
import Spinner from "@/components/base/spinner";
import { BattleStatus } from "../data/models";
import { UserPanel } from "./userPanel";
import { useBattle } from "../data/useBattle";
import { OpponentPanel } from "./opponentPanel";
import BattleCompletedDialog from "./battleCompletedDialog";
import renderPokemonActionText from "./pokemonActionText";
import AttackAnimationPanel from "./attackAnimationPanel";


const BattleArena = () => {

  const { battleId, roomId } = useParams();
  const userData = useUser();

  const { formattedBattleResources, formattedBattleState, sendUserActionEvent, sendPokemonActionEvent , pokemonActionResultsList } = useBattle(Number(battleId), roomId as string, userData.id);


  useEffect(() => {
    const latestPokemonAction = pokemonActionResultsList[pokemonActionResultsList.length - 1];
    if (latestPokemonAction && formattedBattleResources) {
      if (latestPokemonAction.sourcePlayerId == formattedBattleResources.user.userId) {
        toast.custom(renderPokemonActionText("HIT"), { position: "top-right", duration: 2000 });
      } else if (latestPokemonAction.sourcePlayerId == formattedBattleResources.opponent.userId) {
        toast.custom(renderPokemonActionText("HIT"), { position: "top-left", duration: 2000 });
      }
    }
 
    }, [formattedBattleResources, pokemonActionResultsList, userData]);

  if (!formattedBattleResources || !formattedBattleState) {
    return <Spinner />;
  } 
    
  return (
    <main className="min-h-screen grid grid-cols-1-2-1 relative">
        <UserPanel
          { ...formattedBattleResources.user }
          { ...formattedBattleState.user }
          targetPokemonId={formattedBattleState.opponent.chosenPokemonId}
          sendUserActionEvent={sendUserActionEvent}
          sendPokemonActionEvent={sendPokemonActionEvent}
           />
        <AttackAnimationPanel />
        <OpponentPanel
         {...formattedBattleResources.opponent }
         { ...formattedBattleState.opponent }
          />
        {formattedBattleState.status == BattleStatus.COMPLETED &&  <BattleCompletedDialog isUserWinner={formattedBattleState.winner == userData.id} />}
    </main>
  );
};

export { BattleArena };
