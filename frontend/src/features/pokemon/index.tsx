import AppRoutes from '@/app/routing/routes';
import { AuthLayout } from '@/components/layouts/authLayout';
import Button from '@/components/ui/button';
import START_OFF_POKEMONS from "@/features/pokemon/startoffPokemons.json";
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { QueryKeys } from '../onboard/data/onBoardGuestUser';
import { GuestUserType } from '../onboard/data/models';
import { PokemonSchema } from './data/models';

export const SELECTED_POKEMON = START_OFF_POKEMONS.data[0];

export type PokemonType = {
    id: number,
    name: string,
    type: string,
    attacks: { name: string, src: string, power: number, accuracy: number, energy_consumed: number }[],
    image: string,
    pokemonTheme: { light: string, dark: string }
    };

export const Pokemon = () => {

     const queryClient = useQueryClient();
   
     const data: GuestUserType | undefined = queryClient.getQueryData([QueryKeys.GUEST_USER]);

     const selectedPokemon = START_OFF_POKEMONS.data.find((pokemon) => {
        const validatedPokemonData = PokemonSchema.parse(pokemon);
        return (validatedPokemonData.id == data?.owned_pokemons[0]);
    });

    console.log("data: ", data);

     const navigate = useNavigate();  

     const goToBattle = () => {
        navigate(AppRoutes.connectToBattle);
     };

  return (
    <AuthLayout hideLogo={true}>
        <div>
            <div className="flex items-center">
                <img
                src={selectedPokemon?.image}
                alt={"Pokemon Image"}
                className="h-48 mx-5"
                />
                <div className="ml-6">
                    <h2 className="text-2xl font-bold">
                        {selectedPokemon?.name}
                    </h2>
                    <h3 className="text-lg font-medium mt-2 mb-2">Type</h3>
                    <h4 className="bg-fire text-white text-sm py-2 px-4 rounded-lg w-fit mx-2">{SELECTED_POKEMON.type}</h4>
                    <div>
                    <h3 className="text-lg font-medium mt-4">Moves</h3>
                    <ul className="flex flex-wrap max-w-96">
                        {selectedPokemon?.attacks.map((attack) => (
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
