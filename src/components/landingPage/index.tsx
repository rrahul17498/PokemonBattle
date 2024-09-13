import * as S from './styles';
import ChooseYourPokemon from './choosePokemon';

export default function LandingPage() {
   return (
   <S.Main>
      <S.Section>
        <S.LandingFormCard>
          <S.LandingFormCardContent>
            <ChooseYourPokemon />
          </S.LandingFormCardContent>
        </S.LandingFormCard>
      </S.Section>
   </S.Main>
   );
};