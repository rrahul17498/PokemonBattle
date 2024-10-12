import { createBrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";



 const router = createBrowserRouter([
    // Open Routes
    {
        path: AppRoutes.landing,
        lazy: async() => {
          const { LandingPage } = await import("../../features/landing");  
          return { Component: LandingPage };
        }
    },
    {
        path: AppRoutes.trial,
        lazy: async() => {
          const { Trial } = await import("../../features/users/trial");  
          return { Component: Trial };
        }
    },
    {
      path: AppRoutes.onboard,
      lazy: async() => {
        const { OnBoard } = await import("../../features/users/onBoard");  
        return { Component: OnBoard };
      }
    },
    {
      path: AppRoutes.pokemon(":id"),
      lazy: async() => {
        const { Pokemon } = await import("../../features/pokemon");  
        return { Component: Pokemon };
      }
    },
    {
      path: AppRoutes.connectToBattle,
      lazy: async() => {
        const { ConnectToBattle } = await import("../../features/battle/connectToBattle");  
        return { Component: ConnectToBattle };
      }
    }


    // Protected Routes
 
]);

export default router;