import * as React from 'react';
import { Link } from 'react-router-dom';
import PokemonLogo from '@/assets/logos/pokemon.png';

type LayoutProps = {
  children: React.ReactNode;
};

export const AuthLayout = ({ children }: LayoutProps) => {
  return (
      <main className="flex flex-col justify-center min-h-screen bg-background">
        <section className="sm:shadow sm:rounded-lg sm:mx-auto">
         <img className="h-24 w-auto mx-auto mt-8 mb-4" src={PokemonLogo} alt="Pokemon Battle" />
          <div className="px-12 py-8 w-96">
            {children}
          </div>
        </section>
      </main>
  );
};
