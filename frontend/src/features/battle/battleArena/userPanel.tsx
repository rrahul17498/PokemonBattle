import { useEffect, useState } from "react";
import PokeballIcon from '@/assets/icons/pokeball_side_icon_1.png';
import PokeballOpenIcon from '@/assets/icons/pokeball_open_1.png';
import { PokemonDataType, PokemonStatus } from "../../pokemon/data/models";
import { PokemonActionTypes, PokemonActionInput, PokemonStateType, USER_ACTION_TYPES, UserActionInput } from "../data/models";
import Button from "@/components/base/button";
import { isNull } from "lodash";
import PokemonHealthBar from "./pokemonHealthBar";
import toast from "react-hot-toast";
import { cn } from "@/utils/cn";
import renderPokemonActionText from "./pokemonActionText";

interface UserPanelProps {
    userId: number,
    userName: string,
    ownedPokemons: PokemonDataType[],
    chosenPokemonId: number,
    pokemonsState: PokemonStateType[],
    targetPokemonId: number,
    sendUserActionEvent: (action: UserActionInput) => void,
    sendPokemonActionEvent: (action: PokemonActionInput) => void,
}

export const UserPanel = (
    {
         userId,
         userName,
         ownedPokemons = [],
         chosenPokemonId,
         pokemonsState,
         targetPokemonId,
         sendUserActionEvent,
         sendPokemonActionEvent,
         }: UserPanelProps
) => {

    const [chosenPokemonResource, setChosenPokemonResource] = useState<PokemonDataType | null>(null);
    const [chosenPokemonState, setChosenPokemonState] = useState<PokemonStateType | null>(null);
    const [isActionInProgress, setIsActionInProgress] = useState<boolean>(false);


    useEffect(() => {
        if (!chosenPokemonId) { 
            return setChosenPokemonResource(null);
        }
        
        const chosenPokemonData = ownedPokemons.find((pokemon) => pokemon.id == chosenPokemonId);
            if (!chosenPokemonData) {
                console.error("Invalid pokemon id recieved: ", chosenPokemonId);
                toast.error("Invalid pokemon id"); 
                return;
            }
            return setChosenPokemonResource(chosenPokemonData);
    }, [userId, ownedPokemons, chosenPokemonId]);

    useEffect(() => {
        if (!chosenPokemonId || !pokemonsState) {
            return;
        }

        const userChosenPokemonState = pokemonsState[chosenPokemonId];
        if (!userChosenPokemonState) {
            console.error("Invalid pokemon id recieved: ", chosenPokemonId);
            toast.error("Invalid pokemon id"); 
            return;
        }
        setChosenPokemonState(userChosenPokemonState);
        setIsActionInProgress(false);
    }, [chosenPokemonId, pokemonsState]);


    const toggleChosenPokemon = (pokemonId: number) => () => {
        if(chosenPokemonId) {
                return sendUserActionEvent({ type: USER_ACTION_TYPES.WITHDRAW_POKEMON, pokemonId: pokemonId, playerId: userId });
            }

        return sendUserActionEvent({ type: USER_ACTION_TYPES.CHOOSE_POKEMON, pokemonId: pokemonId, playerId: userId }); 
    };

    const onTriggerAttack = (pokemonId: number, attackId: number, attackName: string) => () => {
        if (sendPokemonActionEvent) {
            setIsActionInProgress(true);
            sendPokemonActionEvent({ type: PokemonActionTypes.ATTACK, sourceAttackId: attackId, sourceAttackName: attackName, sourcePlayerId: userId, sourcePokemonId: pokemonId, targetPokemonId  });
            return toast.custom(renderPokemonActionText(attackName), { position: "top-left", duration: 2000 });
            
        }
    }


    return (
        <section className="border-border border flex flex-col justify-end">
        {!isNull(chosenPokemonResource)
        ? <div className="">
            <img className={cn("max-w-60 mx-auto animate-pokemon-render", { "grayscale": chosenPokemonState?.status == PokemonStatus.DEFEATED})} src={chosenPokemonResource?.image} />
            <h3 className="mt-3 px-3 font-semibold text-2xl">{chosenPokemonResource?.name}</h3>
            <div className="pl-3 pr-6 py-4">
                <PokemonHealthBar className="" pokemonState={chosenPokemonState} />
            </div>
            <h4 className="px-3 pb-3 text-lg font-medium">Moves</h4>
            <ul className="flex flex-wrap px-3 min-h-20">
                {chosenPokemonResource.attacks.map((attack, index) => (
                    <li key={`user_attack_${index}`} className="mx-2 my-1 list-none">
                        <Button
                        name={`user_trigger_attack_${index}`}
                        variant="small"
                        onClick={!isActionInProgress ? onTriggerAttack(chosenPokemonId, attack.id, attack.name) : undefined}
                        >
                            {attack.name}
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
        : null}
        <div>
            <h3 className="text-xl font-medium px-3 mt-4">{userName}</h3>
            <ul className="grid grid-cols-3 p-3">
                 {
                    ownedPokemons.map((pokemon: PokemonDataType, i) => {
                        const isPokemonSelected = pokemon.id == chosenPokemonResource?.id;
                        return (
                        <li key={`user_pokemon_${i}`}>
                            <button name={`pokeball_${i}`} onClick={toggleChosenPokemon(pokemon.id)}>
                                <img className={cn("h-12 mx-auto", { "grayscale": chosenPokemonState?.status == PokemonStatus.DEFEATED })} src={isPokemonSelected ? PokeballOpenIcon : PokeballIcon} />
                                <h5 className="text-center w-20 mt-2 text-sm">{pokemon.name}</h5>
                            </button>
                    </li>
                    )})
                }
            </ul>
        </div>
    </section>
    );
}