import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AttackAnimationsInfoMap, BattleEvents, BattleState, EventAnimation, FormattedBattleResources, PokemonActionResult, PokemonActionTypes } from "../../../data/models";
import { formatBattleState, getAttackAnimationsList, getAttackExecAlignment } from "../../../data/battleUtils";
import renderActionText from "../../actionText";
import { useLoadAnimations } from "./useLoadAnimations";



const useBattleAction = (formattedBattleResources: FormattedBattleResources | undefined) => {

    const [battleState, setBattleState] = useState<BattleState | null>(null);
    const [battleStateToBeUpdated, setBattleStateToBeUpdated] = useState<BattleState | null>(null);
    const [eventAnimationsList, setEventAnimationsList] = useState<EventAnimation[]>([]);
    const [pokemonActionInProgress, setPokemonActionInProgress] = useState(false);
    const [pokemonActionResultsToBeDisplayed, setPokemonActionResultsToBeDisplayed] = useState<PokemonActionResult[]>([]);
    const [attackAnimationsInfoMap, setAttackAnimationsInfoMap] = useState<AttackAnimationsInfoMap>(new Map());

    // Preloaded attack animations
    const { isAnimationsLoaded, loadedAnimationBlobUrlsWithAlignment } = useLoadAnimations(attackAnimationsInfoMap);

    const formattedBattleState = battleState && formattedBattleResources ? formatBattleState(battleState, formattedBattleResources.isUserFirstPlayer) : null;

    const updatePokemonActionInProgress = (isActionInProgress: boolean) => {
        setPokemonActionInProgress(isActionInProgress);
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
            const preloadedAttackInfo = loadedAnimationBlobUrlsWithAlignment.get(actionResult.sourceAttackId);
            if (!preloadedAttackInfo) {
                console.error("Preloaded attack animation does not exist");
                return;
            }

            const execAlignment = getAttackExecAlignment(actionResult.sourcePlayerId, formattedBattleResources.user.userId);
            addEventAnimation({
                eventType: BattleEvents.POKEMON_ACTION_RESULT,
                actionType: PokemonActionTypes.ATTACK,
                actionId: actionResult.sourceAttackId,
                invertAnimation: execAlignment != preloadedAttackInfo.alignment,
                mediaSrc: preloadedAttackInfo.blobUrl
            });
            savePokemonActionResultToBeDisplayed(actionResult);
        }
    };

    const displayPokemonActionResults = () => {
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

            updatePokemonActionInProgress(false);
        }     
    };

    useEffect(() => {
        if (formattedBattleResources) {
            const formattedattackAnimationList = getAttackAnimationsList(formattedBattleResources);
            setAttackAnimationsInfoMap(formattedattackAnimationList);
        }
    }, [formattedBattleResources, setAttackAnimationsInfoMap]);

    useEffect(() => {
        if (!pokemonActionInProgress && battleStateToBeUpdated) {
            setBattleState(battleStateToBeUpdated);
            setBattleStateToBeUpdated(null);
        }
    }, [pokemonActionInProgress, battleStateToBeUpdated]);



    return {
        formattedBattleState, eventAnimationsList, pokemonActionInProgress, isAnimationsLoaded,
        loadPokemonActionResultAnimation, updateEventAnimationsList, saveBattleStateToBeUpdated,
        displayPokemonActionResults, updatePokemonActionInProgress 
     }
};

export default useBattleAction;