import { useState } from 'react';
import { isNull } from 'lodash';
import * as S from './styles';
import ChosenPokemon from './chosenPokemon';
import STARTOFF_POKEMONS from './startoffPokemons.json';


export interface PokemonInterface {
    id: number,
    name: string,
    type: string,
    image: string,
    pokemonTheme: { light: string, dark: string }
    };

export default function ChooseYourPokemon() {
   const [selectedPokemon, setSelectedPokemon] = useState<PokemonInterface | null>(null);
   const [isPokemonSubmitted, setIsPokemonSubmitted] = useState<boolean>(false);
   
   const selectPokemon = (pokemon: PokemonInterface) => () => {
      setSelectedPokemon(pokemon);
   };

   const onPokemonSubmit = () => {
    setIsPokemonSubmitted(true);
   };

   if(isPokemonSubmitted) {
    return <ChosenPokemon pokemon={selectedPokemon} />;
   }

   return (
          <S.Container>
            <S.PokemonCardContentHeading>
                Choose Your Pokemon
            </S.PokemonCardContentHeading>
            <S.PokemonCardSubContent>
                {STARTOFF_POKEMONS.data.map((pokemon: PokemonInterface, i: number) => (
                <S.PokemonCardSubContentElemInteractive
                    key={`startoff_pokemon_${i}`}
                    $elemTheme={pokemon.pokemonTheme}
                    $isSelected={pokemon.id == selectedPokemon?.id}
                    onClick={selectPokemon(pokemon)}
                    >
                    <S.PokemonCardSubContentElemImg src={pokemon.image} />
                    <S.PokemonCardSubContentElemHeading>{pokemon.name}</S.PokemonCardSubContentElemHeading>
                </S.PokemonCardSubContentElemInteractive>
                ))}
            </S.PokemonCardSubContent>
            <S.ChooseButton $isPokemonSelected={!isNull(selectedPokemon)} onClick={onPokemonSubmit}>I Choose You!</S.ChooseButton>
           </S.Container>
   );
};