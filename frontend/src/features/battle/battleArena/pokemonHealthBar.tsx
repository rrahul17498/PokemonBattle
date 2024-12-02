import { cn } from "@/utils/cn";
import { PokemonStateType } from "../data/models";


type PokemonHealthBarProps = {
    pokemonState: PokemonStateType | undefined | null,
    className: string
}

const PokemonHealthBar = ({ pokemonState, className }: PokemonHealthBarProps) => {
    const pokemonHealth = pokemonState ? pokemonState.health : 0;
    return (
        <div className={cn("w-2/3 bg-gray-200 rounded-full h-2.5 mx-auto dark:bg-gray-700", className)}>
            <div style={{ width: `${pokemonHealth}%`, backgroundColor: pokemonHealth < 50 ? "var(--health-low)" : "var(--health-high)" }}  className={"h-2.5 rounded-full"}></div>
        </div>
    );
    
};

export default PokemonHealthBar;