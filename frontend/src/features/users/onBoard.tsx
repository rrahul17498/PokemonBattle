import { useMemo, useState } from 'react';
import { GuestUserSchema } from './data/models';
import { z } from 'zod';
import PokemonLogo from '@/assets/logos/pokemon.png';
import { ChoosePokemon } from '@/features/pokemon/choosePokemon';
import { GuestForm } from './guestForm';
import { useOnBoardGuestUser } from './data/onBoardGuestUser';


type OnBoardInfoType = z.infer<typeof GuestUserSchema> & {
    step: number
};

const ONBOARD_STEPS = [
    {
        component: GuestForm,
        hasLogo: true,
    },
    {
        component: ChoosePokemon,
        hasLogo: false,
    }
];

export const OnBoard = () => {  
  
  const [onBoardInfo, setOnBoardInfo] = useState<OnBoardInfoType>({ name: "", owned_pokemons: [], step: 0 });  

  const { completeOnboarding } = useOnBoardGuestUser();


    const updateOnBoardInfoAndGoToNextStep = (data: OnBoardInfoType) => {
        const lastStep = ONBOARD_STEPS.length - 1;

        if (data.step == lastStep) {
            completeOnboarding(data);
        } else if(data.step >= 0 && data.step < lastStep) {

            setOnBoardInfo({ ...data, step: data.step + 1 });
        }
    };


  const { component: Component, hasLogo } = useMemo(() => (ONBOARD_STEPS[onBoardInfo.step]), [onBoardInfo.step]);

  return (
    <main className="flex flex-col justify-center min-h-screen bg-background">
        <section className="sm:shadow sm:rounded-lg sm:mx-auto">
            {hasLogo && <img className="h-24 w-auto mx-auto mt-8 mb-4" src={PokemonLogo} alt="Pokemon Battle" />}
            <div className="px-12 py-8 w-fit min-w-96">
                <Component onBoardInfo={onBoardInfo} updateOnBoardInfo={updateOnBoardInfoAndGoToNextStep}  />
            </div>
        </section>
    </main>
  );
};