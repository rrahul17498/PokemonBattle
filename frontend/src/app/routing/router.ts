import { createBrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";



 const router = createBrowserRouter([
    // Open Routes
    {
        path: AppRoutes.landing,
        lazy: async() => {
          const { LandingPage } = await import("@/features/landing");  
          return { Component: LandingPage };
        }
    },
    {
      path: AppRoutes.onboard,
      lazy: async() => {
        const { OnBoard } = await import("@/features/onboard");  
        return { Component: OnBoard };
      }
    },
    {
      path: AppRoutes.pokemon(":id"),
      lazy: async() => {
        const { Pokemon } = await import("@/features/pokemon");  
        return { Component: Pokemon };
      }
    },
    {
      path: AppRoutes.connectToBattle,
      lazy: async() => {
        const { ConnectToBattle } = await import("@/features/battle/connectToBattle");  
        return { Component: ConnectToBattle };
      }
    },
    {
      path: AppRoutes.battle(":id"),
      lazy: async() => {
        const { Battle } = await import("@/features/battle");  
        return { Component: Battle };
      }
    }


    // Protected Routes
 
]);

export default router;