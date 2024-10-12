
const AppRoutes =  {
    landing: "/",
    trial: "/trial",
    onboard: "/onboard",
    pokemon: (id: number | string) => `/pokemon/${id}`,
    connectToBattle: "/connect"
 };

 export default AppRoutes;