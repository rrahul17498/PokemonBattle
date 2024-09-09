import * as S from './styles';
import { PokemonInterface } from './index';

export default function ChosenPokemon({ pokemon }: { pokemon: PokemonInterface | null }) {
   return (
          <S.Container>
            <S.PokemonCardSubContent>
                <S.PokemonCardSubContentElem>
                    <S.PokemonCardSubContentElemImg src={pokemon?.image} />
                </S.PokemonCardSubContentElem>
                <S.PokemonDetails>
                 <S.PokemonDetailsHeading>Type</S.PokemonDetailsHeading> 
                 <S.PokemonType $colorTheme={pokemon?.pokemonTheme}>{pokemon?.type}</S.PokemonType> 
                 <S.PokemonDetailsHeading>Attacks</S.PokemonDetailsHeading> 
                 <S.AttackSection>
                    {pokemon?.attacks.map((attack) => (
                        <S.Attack>{attack.name}</S.Attack>
                    ))}
                 </S.AttackSection>
                </S.PokemonDetails>
            </S.PokemonCardSubContent>
            <S.PokemonCardContentHeading>
                You have chosen {pokemon?.name} !
            </S.PokemonCardContentHeading>
            <S.GoToBattle>Go to Battle</S.GoToBattle>
           </S.Container>
   );
};