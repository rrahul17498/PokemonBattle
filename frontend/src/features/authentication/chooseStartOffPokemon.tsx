import PokeballIcon from "@/assets/icons/pokeball_side_icon_1.png";
import Button from "@/components/base/button";
import START_OFF_POKEMONS from "@/features/pokemon/startoffPokemons.json";
import { OnBoardInfoType } from "./data/models";
import { PokemonDataType, PokemonSchema } from "@/features/pokemon/data/models"



interface ChoosePokemonProps {
    onBoardInfo: OnBoardInfoType,
    updateOnBoardInfo: (data: OnBoardInfoType) => void
}


export const ChooseStartOffPokemon = ({ onBoardInfo, updateOnBoardInfo }: ChoosePokemonProps) => { 
    
    
    const onChoosePokemon = (pokemonData: PokemonDataType) => () => {
        updateOnBoardInfo({
            ...onBoardInfo,
            owned_pokemons: [pokemonData.id]
        })
    };


    return (
          <div>
              <h2 className="text-3xl font-semibold text-center mb-10">Choose Your Pokemon</h2>
              <div className="flex justify-between">
                  {START_OFF_POKEMONS.data.map((pokemonData, i) => {

                    const validatedPokemonData = PokemonSchema.parse(pokemonData);
                    
                    return (
                      <Button
                        key={`choose_pokemon_${i}`}
                        variant="container"
                        name={`choose_pokemon_${i}`}
                        className="hover:scale-110 transform transition-transform duration-200"
                        onClick={onChoosePokemon(validatedPokemonData)}
                        >
                          <img className="h-20 w-auto mx-auto mt-8 mb-4" src={PokeballIcon} alt="Pokeball" />
                      </Button>
                  )})}
              </div>
          </div>
    );
  };