import ChooseYourPokemon from './choosePokemon';
import { AuthLayout } from '@/components/layouts/authLayout';

export const OnBoard = () => {

  return (
    <main className="w-full h-full">
    <section className="flex justify-center items-center h-full">
      <div className="border border-border w-[1000px] p-6 rounded">
        <div className="w-full">
          <ChooseYourPokemon />
        </div>
      </div>
    </section>
  </main>
  );
};
