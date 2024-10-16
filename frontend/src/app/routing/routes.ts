
const AppRoutes =  {
    landing: "/",
    onboard: "/onboard",
    login: "/login",
    pokemon: (id: number | string) => `/pokemon/${id}`,
    connectToBattle: "/connect",
    battle: (id: number | string) => `/battle/${id}`,
 };

 export default AppRoutes;