import * as React from 'react';
import { Link } from 'react-router-dom';
import PokemonLogo from '@/assets/logos/pokemon.png';

type LayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const AuthLayout = ({ children, title }: LayoutProps) => {
  return (
      <main className="flex min-h-screen flex-col bg-background py-12 sm:px-6 lg:px-8">
        <section className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <Link className="flex items-center text-white" to="/">
                <img className="h-24 w-auto" src={PokemonLogo} alt="Pokemon Battle" />
            </Link>
          </div>
          <h2 className="mt-16 text-center text-3xl font-medium text-gray-900">
            {title}
          </h2>
        </section>

        <section className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
            {children}
          </div>
        </section>
      </main>
  );
};
