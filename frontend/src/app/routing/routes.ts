import { getProtectedRoute } from "./protectedRoute/data";


const APP_ROUTES =  {
    landing: "/",
    pokemon: (id: number | string) => `/pokemon/${id}`,
    protected: {
        connectBattle: getProtectedRoute("connect"),
        battle: (id: number | string) => getProtectedRoute(`battle/${id}`),
    }
 } as const;

 export default APP_ROUTES;