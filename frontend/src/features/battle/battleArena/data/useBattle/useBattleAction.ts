import { useEffect, useState } from "react";
import { AttackAnimations, BattleEvents, BattleState, EventAnimation, EventAnimationAlignment, FormattedBattleResources, PokemonActionResult, PokemonActionTypes } from "../../../data/models";
import { formatBattleState, getAttackAnimationsList, getPreloadedAttackBlobUrl } from "../../../data/battleUtils";
import toast from "react-hot-toast";
import renderActionText from "../../actionText";
import { useLoadAnimations } from "./useLoadAnimations";



const useBattleAction = (formattedBattleResources: FormattedBattleResources | undefined) => {

    const [battleState, setBattleState] = useState<BattleState | null>(null);
    const [battleStateToBeUpdated, setBattleStateToBeUpdated] = useState<BattleState | null>(null);
    const [eventAnimationsList, setEventAnimationsList] = useState<EventAnimation[]>([]);
    const [pokemonActionInProgress, setPokemonActionInProgress] = useState(false);
    const [pokemonActionResultsToBeDisplayed, setPokemonActionResultsToBeDisplayed] = useState<PokemonActionResult[]>([]);
    const [attackAnimationsList, setAttackAnimationsList] = useState<AttackAnimations>(new Map());

    const { isAnimationsLoaded, loadedAnimationBlobUrls } = useLoadAnimations(attackAnimationsList);

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
            addEventAnimation({
                eventType: BattleEvents.POKEMON_ACTION_RESULT,
                actionType: PokemonActionTypes.ATTACK,
                actionId: actionResult.sourceAttackId,
                alignment: EventAnimationAlignment.LEFT,
                mediaSrc: getPreloadedAttackBlobUrl(actionResult.sourceAttackId, loadedAnimationBlobUrls)
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

            updatePokemonActionInProgress(false);
        }     
    };

    useEffect(() => {
        if (formattedBattleResources) {
            const formattedattackAnimationList = getAttackAnimationsList(formattedBattleResources);
            setAttackAnimationsList(formattedattackAnimationList);
        }
    }, [formattedBattleResources, setAttackAnimationsList]);

    useEffect(() => {
        if (!pokemonActionInProgress && battleStateToBeUpdated) {
            setBattleState(battleStateToBeUpdated);
            setBattleStateToBeUpdated(null);
        }
    }, [pokemonActionInProgress, battleStateToBeUpdated]);



    return {
        formattedBattleState, eventAnimationsList, pokemonActionInProgress, isAnimationsLoaded,
        loadPokemonActionResultAnimation, updateEventAnimationsList, saveBattleStateToBeUpdated,
        displayPokemonResultAndUpdateBattleState, updatePokemonActionInProgress 
     }
};

export default useBattleAction;