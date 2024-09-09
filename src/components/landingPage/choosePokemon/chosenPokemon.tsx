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
                 <S.AttackSection>
                    <S.Attack>Vine Whip</S.Attack>
                    <S.Attack>Razor Leaf</S.Attack>
                    <S.Attack>Solar Beam</S.Attack>
                 </S.AttackSection>
                </S.PokemonDetails>
            </S.PokemonCardSubContent>
            <S.PokemonCardContentHeading>
                You have chosen {pokemon?.name} !
            </S.PokemonCardContentHeading>
           </S.Container>
   );
};