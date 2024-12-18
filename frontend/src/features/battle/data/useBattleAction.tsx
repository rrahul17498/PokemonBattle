import { useEffect, useState } from "react";
import { BattleEvents, BattleState, EventAnimation, EventAnimationAlignment, FormattedBattleResources, PokemonActionResult, PokemonActionTypes } from "./models";
import { formatBattleState, getAttackMediaSrc } from "./battleUtils";
import toast from "react-hot-toast";
import renderActionText from "../battleArena/actionText";



const useBattleAction = (formattedBattleResources: FormattedBattleResources | undefined) => {

    const [battleState, setBattleState] = useState<BattleState | null>(null);
    const [battleStateToBeUpdated, setBattleStateToBeUpdated] = useState<BattleState | null>(null);
    const [eventAnimationsList, setEventAnimationsList] = useState<EventAnimation[]>([]);
    const [pokemonActionInProgress, setPokemonActionInProgress] = useState(false);
    const [pokemonActionResultsToBeDisplayed, setPokemonActionResultsToBeDisplayed] = useState<PokemonActionResult[]>([]);

    const formattedBattleState = battleState && formattedBattleResources ? formatBattleState(battleState, formattedBattleResources.isUserFirstPlayer) : null;

    console.log("battleState: ", battleState);
    console.log("battleStateToBeUpdated: ", battleStateToBeUpdated);
    console.log("eventAnimationsList: ", eventAnimationsList);

    const updatePokemonActionInProgress = (actionInProgress: boolean) => {
        setPokemonActionInProgress(actionInProgress);
    };

    const addEventAnimation = (eventAnimationObj: EventAnimation) => {
        setEventAnimationsList((prev) => ([...prev, eventAnimationObj]));
    };

    const updateEventAnimationsList = (updatedEventAnimationList: EventAnimation[]) => {
        setEventAnimationsList(updatedEventAnimationList);
    };

    const saveBattleStateToBeUpdated = (battleState: BattleState) => {
        setBattleStateToBeUpdated(battleState);
    };


    const savePokemonActionResultToBeDisplayed = (pokemonActionResult: PokemonActionResult) => {
        setPokemonActionResultsToBeDisplayed((prev) => [...prev, pokemonActionResult]);
    };

    const loadPokemonActionResultAnimation = (actionResult: PokemonActionResult) => {
        if (formattedBattleResources) {
            addEventAnimation({
                eventType: BattleEvents.POKEMON_ACTION_RESULT,
                actionType: PokemonActionTypes.ATTACK,
                actionId: actionResult.sourceAttackId,
                alignment: EventAnimationAlignment.LEFT,
                mediaSrc: getAttackMediaSrc(actionResult.sourceAttackId, actionResult.sourcePlayerId, formattedBattleResources)
            });
            savePokemonActionResultToBeDisplayed(actionResult);
        }
    };

    const displayPokemonResultAndUpdateBattleState = () => {
        if (!eventAnimationsList.length) {
            if (pokemonActionResultsToBeDisplayed.length > 0) {
                    pokemonActionResultsToBeDisplayed.forEach((actionResult) => {
                            if (actionResult.sourcePlayerId == formattedBattleResources?.user.userId) {
                                toast.custom(renderActionText("HIT"), { position: "top-right", duration: 2000 });
                            } else if (actionResult.sourcePlayerId == formattedBattleResources?.opponent.userId) {
                                toast.custom(renderActionText("HIT"), { position: "top-left", duration: 2000 });
                            }
                    });

                    setPokemonActionResultsToBeDisplayed([]);
            }

            setBattleState(battleStateToBeUpdated);
            setBattleStateToBeUpdated(null);
            setPokemonActionInProgress(false);
        }     
    };

    useEffect(() => {
        if (!pokemonActionInProgress && battleStateToBeUpdated) {
            setBattleState(battleStateToBeUpdated);
            setBattleStateToBeUpdated(null);
        }
    }, [pokemonActionInProgress, battleStateToBeUpdated]);



    return {
        formattedBattleState, eventAnimationsList,
        loadPokemonActionResultAnimation, updateEventAnimationsList, saveBattleStateToBeUpdated,
        savePokemonActionResultToBeUpdated: savePokemonActionResultToBeDisplayed, displayPokemonResultAndUpdateBattleState, updatePokemonActionInProgress 
     }
};

export default useBattleAction;