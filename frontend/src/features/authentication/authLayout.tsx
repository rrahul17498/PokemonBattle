import * as React from 'react';
import PokemonLogo from '@/assets/logos/pokemon.png';


type AuthLayoutProps = {
  children: React.ReactNode;
};

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className="h-full flex justify-center items-center">
        <section className="shadow-lg rounded-lg w-full max-w-[600px] min-h-96 p-12">
          {children}
        </section>
    </main>
  );
};
