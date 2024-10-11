import { AuthLayout } from '@/components/layouts/authLayout';
import PokeballIcon from "@/assets/icons/pokeball_side_icon_1.png";
import { Link } from '@/components/ui/link';


const POKEMONS = ["Charmander", "Bulbasaur", "Squirtle"];


export const OnBoard = () => {

  return (
    <AuthLayout hideLogo={true}>
        {/* <ChooseYourPokemon /> */}
        <div>
            <h2 className="text-2xl font-semibold text-center mb-3">Choose Your Pokemon</h2>
            <div className="flex justify-between">
                {POKEMONS.map(() => (
                    <Link className="mx-8 cursor-pointer" to="/pokemon">
                        <img className="h-20 w-auto mx-auto mt-8 mb-4" src={PokeballIcon} alt="Pokeball" />
                    </Link>
                ))}
            </div>
        </div>
    </AuthLayout>
  );
};
