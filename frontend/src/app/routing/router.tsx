import { createBrowserRouter } from "react-router-dom";
import AppRoutes, { protectedRoutesConfig } from "./routes";
import { ProtectedRoute } from "./protectedRoute";
import useUserSession from "@/hooks/useUserSession";



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
        const { OnBoard } = await import("@/features/authentication"); 
         
        return { Component: OnBoard };
      }
    },
    {
      path: AppRoutes.login,
      lazy: async() => {
        const { Login } = await import("@/features/authentication");  
        return { Component: Login };
      }
    },
    {
      path: AppRoutes.pokemon(":pokemonId"),
      lazy: async() => {
        const { Pokemon } = await import("@/features/pokemon");  
        return { Component: Pokemon };
      }
    },


    // Protected Routes

    {
      path: protectedRoutesConfig.root,
      element: (
        <ProtectedRoute />
      ),
      children: [
        {
          path: AppRoutes.protected.connectBattle.nestedPath,
          lazy: async() => {
            const { ConnectToBattle } = await import("@/features/battle");  
            return { Component: ConnectToBattle };
          }
        },
        {
          path: AppRoutes.protected.battle(":battleId/:roomId").nestedPath,
          lazy: async() => {
            const { BattleArena } = await import("@/features/battle");  
            return { Component: BattleArena };
          }
        }
      ]
    },
 
]);

export default router;