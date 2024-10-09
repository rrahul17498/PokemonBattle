import * as React from 'react';
// import logo from '@/assets/logo.svg';

type LayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const AuthLayout = ({ children, title }: LayoutProps) => {
  return (
      <main className="flex min-h-screen flex-col justify-center bg-background py-12 sm:px-6 lg:px-8">
        <section className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            {/* <Link className="flex items-center text-white" to="/">
              <img className="h-24 w-auto" src={logo} alt="Workflow" />
            </Link> */}
          </div>
          <h2 className="mt-3 text-center text-3xl font-bold text-gray-900">
            {title}
          </h2>
        </section>

        <section className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
            {children}
          </div>
        </section>
      </main>
  );
};
