import { useMemo, useState } from 'react';
import { OnBoardInfoType } from './data/models';
import { ChooseStartOffPokemon } from '@/features/onboard/chooseStartOffPokemon';
import { GuestForm } from './guestForm';
import { useOnBoard } from './data/useOnBoard';


const ONBOARD_STEPS = [
    {
        component: GuestForm,
        hasLogo: true,
    },
    {
        component: ChooseStartOffPokemon,
        hasLogo: false,
    }
];

export const OnBoard = () => {  
  
  const [onBoardInfo, setOnBoardInfo] = useState<OnBoardInfoType>({ name: "", owned_pokemons: [], step: 0 });  

  const { completeOnboarding } = useOnBoard();


    const updateOnBoardInfoAndGoToNextStep = (data: OnBoardInfoType) => {
        const lastStep = ONBOARD_STEPS.length - 1;

        if (data.step == lastStep) {
            completeOnboarding(data);
        } else if(data.step >= 0 && data.step < lastStep) {

            setOnBoardInfo({ ...data, step: data.step + 1 });
        }
    };


  const { component: Component } = useMemo(() => (ONBOARD_STEPS[onBoardInfo.step]), [onBoardInfo.step]);

  return (
    <main className="h-full flex justify-center items-center">
        <section className="shadow-lg rounded-lg w-full max-w-[600px] min-h-96 p-12">
                <Component onBoardInfo={onBoardInfo} updateOnBoardInfo={updateOnBoardInfoAndGoToNextStep}  />
        </section>
    </main>
  );
};