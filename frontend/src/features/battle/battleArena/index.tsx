import { useParams } from "react-router-dom";
import useUser from "@/hooks/useUser";
import Spinner from "@/components/base/spinner";
import { BattleStatus } from "../data/models";
import { UserPanel } from "./userPanel";
import { useBattle } from "../data/useBattle";
import { OpponentPanel } from "./opponentPanel";
import BattleCompletedDialog from "./battleCompletedDialog";
import AttackAnimationPanel from "./attackAnimationPanel";


const BattleArena = () => {

  const { battleId, roomId } = useParams();
  const userData = useUser();

  const {
    isBattleEventsRegistered, formattedBattleResources, formattedBattleState, eventAnimationsList, pokemonActionInProgress,
    sendUserActionEvent, sendPokemonActionEvent, updateEventAnimationsList, displayPokemonResultAndUpdateBattleState, updatePokemonActionInProgress
  } = useBattle(Number(battleId), roomId as string, userData.id);

  const isBattleReady = formattedBattleResources && formattedBattleState && isBattleEventsRegistered; 

  if (!isBattleReady) {
    return <Spinner />;
  } 
    
  return (
    <main className="min-h-screen grid grid-cols-1-2-1 relative">
        <UserPanel
          { ...formattedBattleResources.user }
          { ...formattedBattleState.user }
          targetPokemonId={formattedBattleState.opponent.chosenPokemonId}
          pokemonActionInProgress={pokemonActionInProgress}
          updatePokemonActionInProgress={updatePokemonActionInProgress}
          sendUserActionEvent={sendUserActionEvent}
          sendPokemonActionEvent={sendPokemonActionEvent}
           />
        <AttackAnimationPanel
          eventAnimationsList={eventAnimationsList}
          formattedBattleResources={formattedBattleResources}
          updateEventAnimationsList={updateEventAnimationsList}
          displayPokemonResultAndUpdateBattleState={displayPokemonResultAndUpdateBattleState}
         />
        <OpponentPanel
         {...formattedBattleResources.opponent }
         { ...formattedBattleState.opponent }
          />
        {formattedBattleState.status == BattleStatus.COMPLETED &&  <BattleCompletedDialog isUserWinner={formattedBattleState.winner == userData.id} />}
    </main>
  );
};

export { BattleArena };
