import PokeballIcon from "@/assets/icons/pokeball_side_icon_1.png";
import Button, { VariantType } from "@/components/ui/button";
import START_OFF_POKEMONS from "@/features/pokemon/startoffPokemons.json";
import { OnBoardInfoType } from "../users/data/models";
import { PokemonDataType, PokemonSchema } from "@/features/pokemon/data/models"



interface ChoosePokemonProps {
    onBoardInfo: OnBoardInfoType,
    updateOnBoardInfo: (data: OnBoardInfoType) => void
}


export const ChoosePokemon = ({ onBoardInfo, updateOnBoardInfo }: ChoosePokemonProps) => { 
    
    
    const onChoosePokemon = (pokemonData: PokemonDataType) => () => {
        updateOnBoardInfo({
            ...onBoardInfo,
            owned_pokemons: [pokemonData.id]
        })
    };


    return (
          <div>
              <h2 className="text-2xl font-semibold text-center mb-3">Choose Your Pokemon</h2>
              <div className="flex justify-between">
                  {START_OFF_POKEMONS.data.map((pokemonData, i) => {

                    const validatedPokemonData = PokemonSchema.parse(pokemonData);

                    console.log("pokemonData: ", pokemonData);
                    
                    return (
                      <Button
                        variant={VariantType.CONTAINER}
                        name={`choose_pokemon_${i}`}
                        className="mx-8 cursor-pointer"
                        onClick={onChoosePokemon(validatedPokemonData)}
                        >
                          <img className="h-20 w-auto mx-auto mt-8 mb-4" src={PokeballIcon} alt="Pokeball" />
                      </Button>
                  )})}
              </div>
          </div>
    );
  };