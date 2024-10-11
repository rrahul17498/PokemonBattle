
const AppRoutes =  {
    landing: "/",
    trial: "/trial",
    onboard: "/onboard",
    pokemon: (id: number | string) => `/pokemon/${id}`
 };

 export default AppRoutes;