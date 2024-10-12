import { AuthLayout } from '@/components/layouts/authLayout';
import PokeballIcon from "@/assets/icons/pokeball_side_icon_1.png";
import { Link } from '@/components/ui/link';
import START_OFF_POKEMONS from "@/features/pokemon/startoffPokemons.json";


export const OnBoard = () => {

  return (
    <AuthLayout hideLogo={true}>
        <div>
            <h2 className="text-2xl font-semibold text-center mb-3">Choose Your Pokemon</h2>
            <div className="flex justify-between">
                {START_OFF_POKEMONS.data.map((pokemonData) => (
                    <Link className="mx-8 cursor-pointer" to={`/pokemon/${pokemonData.id}`}>
                        <img className="h-20 w-auto mx-auto mt-8 mb-4" src={PokeballIcon} alt="Pokeball" />
                    </Link>
                ))}
            </div>
        </div>
    </AuthLayout>
  );
};
