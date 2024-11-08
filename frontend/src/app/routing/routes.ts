import { getProtectedRoute, protectedRoutesPrefix } from "./protectedRoute/data";


const APP_ROUTES =  {
    landing: "/",
    pokemon: (id: number | string) => `/pokemon/${id}`,
    protected: {
        connectBattle: getProtectedRoute(protectedRoutesPrefix.battle, "connect"),
        battle: (id: number | string) => getProtectedRoute(protectedRoutesPrefix.battle, `battle/${id}`),
    }
 } as const;

 export default APP_ROUTES;