import { useState } from 'react';
import * as S from './styles';
import theme from '../../../theme';

const STARTOFF_POKEMONS = [
   { id: 1, name: 'Charmander', img: 'src/assets/images/Charmander.png' , pokemonTheme: { light: theme.BRICK_RED_EXTRA_LIGHT, dark: theme.BRICK_RED_LIGHT }},
   { id: 2, name: 'Bulbasaur', img: 'src/assets/images/Bulbasaur.png', pokemonTheme: { light: theme.SUGARCANE, dark: theme.LA_PALMA }},
   { id: 3, name: 'Squirtle', img: 'src/assets/images/Squirtle.png', pokemonTheme: { light: theme.PERI_WINKLE, dark: theme.DODGER_BLUE }}
]

export interface PokemonInterface {
    id: number,
    name: string,
    pokemonTheme: { light: string, dark: string }
    };

export default function ChooseYourPokemon() {
   const [selectedPokemon, setSelectedPokemon] = useState<PokemonInterface | null>(null);
   
   const selectPokemon = (pokemon: PokemonInterface) => () => {
      setSelectedPokemon(pokemon);
   };

   return (
          <S.Container>
            <S.PokemonFormCardContentHeading>
                Choose Your Pokemon
            </S.PokemonFormCardContentHeading>
            <S.PokemonFormCardSubContent>
                {STARTOFF_POKEMONS.map((pokemon, i) => (
                <S.PokemonFormCardSubContentElem
                    key={`startoff_pokemon_${i}`}
                    elemTheme={pokemon.pokemonTheme}
                    isSelected={pokemon.id == selectedPokemon?.id}
                    onClick={selectPokemon(pokemon)}
                    >
                    <S.PokemonFormCardSubContentElemImg src={pokemon.img} />
                    <S.PokemonFormCardSubContentElemHeading>{pokemon.name}</S.PokemonFormCardSubContentElemHeading>
                </S.PokemonFormCardSubContentElem>
                ))}
            </S.PokemonFormCardSubContent>
            <S.ChooseButton selectedPokemon={selectedPokemon}>I Choose You!</S.ChooseButton>
           </S.Container>
   );
};