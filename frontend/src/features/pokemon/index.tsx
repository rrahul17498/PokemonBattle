import AppRoutes from '@/app/routing/routes';
import { AuthLayout } from '@/components/layouts/authLayout';
import Button from '@/components/ui/button';
import START_OFF_POKEMONS from "@/features/pokemon/startoffPokemons.json";
import { useNavigate, useParams } from 'react-router-dom';
import { PokemonSchema } from './data/models';



export type PokemonType = {
    id: number,
    name: string,
    type: string,
    attacks: { name: string, src: string, power: number, accuracy: number, energy_consumed: number }[],
    image: string,
    pokemonTheme: { light: string, dark: string }
    };

export const Pokemon = () => {

     const navigate = useNavigate();
     const { pokemonId } = useParams(); 

     const selectedPokemon = START_OFF_POKEMONS.data.find((pokemon) => {
        const validatedPokemonData = PokemonSchema.parse(pokemon);
        return (validatedPokemonData.id == Number(pokemonId));
    });


     const goToBattle = () => {
        console.log(AppRoutes.protected.connectBattle.full);
        navigate(AppRoutes.protected.connectBattle.full);
     };

     const goToNothin = () => {
        console.log(AppRoutes.protected.battle(2).full);
     };

  return (
    <AuthLayout>
        <div>
            <div className="flex items-center">
                <img
                src={selectedPokemon?.image}
                alt={"Pokemon Image"}
                className="w-48 mx-5"
                />
                <div className="ml-6">
                    <h2 className="text-2xl font-bold">
                        {selectedPokemon?.name}
                    </h2>
                    <h3 className="text-lg font-medium mt-2 mb-2">Type</h3>
                    <h4 className="bg-fire text-white text-sm py-2 px-4 rounded-lg w-fit mx-2">{selectedPokemon?.type}</h4>
                    <div>
                    <h3 className="text-lg font-medium mt-4">Moves</h3>
                    <ul className="flex flex-wrap max-w-96">
                        {selectedPokemon?.attacks.map((attack, i) => (
                            <li key={`attack_${i}`} className="list-none bg-black text-white text-sm  p-2 rounded-lg m-2">{attack.name}</li>
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
