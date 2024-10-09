import { createBrowserRouter } from "react-router-dom";


 const router = createBrowserRouter([
    {
        path: "/",
        lazy: async() => {
          const { LandingPage } = await import("../components/landingPage");  
          return { Component: LandingPage };
        }
    },
    {
        path: "/user",
    },
    {
        path: "/join-battle",
    },
    {
        path: "/battle",
        lazy: async() => {
          const { BattleGround } = await import("../components/battleGround");  
          return { Component: BattleGround };
        }
    },
]);

export default router;