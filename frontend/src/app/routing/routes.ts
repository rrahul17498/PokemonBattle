
const AppRoutes =  {
    landing: "/",
    trial: "/trial",
    onboard: "/onboard",
    pokemon: (id: number | string) => `/pokemon/${id}`,
    connectToBattle: "/connect",
    battle: (id: number | string) => `/battle/${id}`,
 };

 export default AppRoutes;