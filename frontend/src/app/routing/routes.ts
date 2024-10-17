

export const protectedRoutesConfig = {
    root: "/app",
}

type ProtectedRoute = {
    nestedPath: string;
    relative: string;
    full: string;
};

const getProtectedRoute = (nestedPath: string): ProtectedRoute => {
    return { nestedPath, relative: `./${nestedPath}`, full: `${protectedRoutesConfig.root}/${nestedPath}` }
};


const AppRoutes =  {
    landing: "/",
    onboard: "/onboard",
    login: "/login",
    pokemon: (id: number | string) => `/pokemon/${id}`,

    protected: {
        connectBattle: getProtectedRoute("connect"),
        battle: (id: number | string) => getProtectedRoute(`battle/${id}`),
    }
 } as const;

 export default AppRoutes;