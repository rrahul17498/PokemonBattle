import { PokemonState } from "../data/models";


type PokemonHealthBarProps = {
    pokemonState: PokemonState | undefined
}

const PokemonHealthBar = ({ pokemonState }: PokemonHealthBarProps) => {
    const pokemonHealth = pokemonState ? pokemonState.health * 100 : 0;

    console.log("pokemonHealth: ", pokemonHealth);
    return (
        <div className="w-2/3 bg-gray-200 rounded-full h-2.5 mx-auto mb-12 dark:bg-gray-700">
            <div style={{ width: `${pokemonHealth}%`, backgroundColor: pokemonHealth < 50 ? "var(--health-low)" : "var(--health-high)" }}  className={"h-2.5 rounded-full"}></div>;
        </div>
    );
    
};

export default PokemonHealthBar;