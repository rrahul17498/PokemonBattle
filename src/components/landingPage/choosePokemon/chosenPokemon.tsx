import * as S from './styles';
import { PokemonInterface } from './index';


export default function ChosenPokemon({ pokemon }: { pokemon: PokemonInterface | null }) {
   return (
          <S.Container>
            <S.PokemonCardSubContent>
                <S.PokemonCardSubContentElem>
                    <S.PokemonCardSubContentElemImg src={pokemon?.image} />
                </S.PokemonCardSubContentElem>
                <S.AttackSection>
                 <S.Attack></S.Attack>
                </S.AttackSection>
            </S.PokemonCardSubContent>
            <S.PokemonCardContentHeading>
                You have chosen {pokemon?.name} !
            </S.PokemonCardContentHeading>
           </S.Container>
   );
};