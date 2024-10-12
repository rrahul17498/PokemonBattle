import AppRoutes from '@/app/routing/routes';
import { AuthLayout } from '@/components/layouts/authLayout';
import Button from '@/components/ui/button';
import START_OFF_POKEMONS from "@/features/pokemon/startoffPokemons.json";
import { useNavigate } from 'react-router-dom';

const SELECTED_POKEMON = START_OFF_POKEMONS.data[0];

export const Pokemon = () => {

  const navigate = useNavigate();  

  const goToBattle = () => {
    navigate(AppRoutes.connectToBattle);
  };

  return (
    <AuthLayout hideLogo={true}>
        <div>
            <div className="flex items-center">
                <img
                src={SELECTED_POKEMON.image}
                alt={"Pokemon Image"}
                className="h-48 mx-5"
                />
                <div className="ml-6">
                    <h2 className="text-2xl font-bold">
                        {SELECTED_POKEMON?.name}
                    </h2>
                    <h3 className="text-lg font-medium mt-2 mb-2">Type</h3>
                    <h4 className="bg-fire text-white text-sm py-2 px-4 rounded-lg w-fit mx-2">{SELECTED_POKEMON.type}</h4>
                    <div>
                    <h3 className="text-lg font-medium mt-4">Moves</h3>
                    <ul className="flex flex-wrap max-w-96">
                        {SELECTED_POKEMON.attacks.map((attack) => (
                            <li className="list-none bg-black text-white text-sm  p-2 rounded-lg m-2">{attack.name}</li>
                            ))}
                    </ul>
                    </div>
                </div>
            </div>
            <div className="mt-8">
                <Button onClick={goToBattle} name="battle">Go to Battle</Button>
            </div>
        </div>
    
    </AuthLayout>
  );
};
