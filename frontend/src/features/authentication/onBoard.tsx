import { useMemo, useState } from 'react';
import { OnBoardInfoType } from './data/models';
import { ChooseStartOffPokemon } from '@/features/authentication/chooseStartOffPokemon';
import { GuestForm } from './guestForm';
import { useOnBoard } from './data/useOnBoard';
import { AuthLayout } from '@/features/authentication/authLayout';
import useSession from '@/hooks/useSession';


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

  const { createGuestUser } = useOnBoard();


  const updateOnBoardInfoAndGoToNextStep = (data: OnBoardInfoType) => {
        const lastStep = ONBOARD_STEPS.length - 1;

        if (data.step == lastStep) {
            createGuestUser(data);
        } else if(data.step >= 0 && data.step < lastStep) {
            setOnBoardInfo({ ...data, step: data.step + 1 });
        }
    };


  const { component: Component } = useMemo(() => (ONBOARD_STEPS[onBoardInfo.step]), [onBoardInfo.step]);

  return (
    <AuthLayout>
        <Component onBoardInfo={onBoardInfo} updateOnBoardInfo={updateOnBoardInfoAndGoToNextStep}  />
    </AuthLayout>
  );
};