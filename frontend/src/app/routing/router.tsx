import { createBrowserRouter } from "react-router-dom";
import APP_ROUTES from "./routes";
import ProtectedRoute from "./protectedRoute/index";
import { protectedRoutesConfig } from "./protectedRoute/data";


 const router = createBrowserRouter([
    // Open Routes
    {
        path: APP_ROUTES.landing,
        lazy: async() => {
          const { OnBoard } = await import("@/features/authentication"); 
          return { Component: OnBoard };
        }
    },
    {
      path: APP_ROUTES.pokemon(":pokemonId"),
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
          path: APP_ROUTES.protected.connectBattle.nestedPath,
          lazy: async() => {
            const { ConnectToBattle } = await import("@/features/battle");  
            return { Component: ConnectToBattle };
          }
        },
        {
          path: APP_ROUTES.protected.battle(":battleId/:roomId").nestedPath,
          lazy: async() => {
            const { BattleArena } = await import("@/features/battle");  
            return { Component: BattleArena };
          }
        }
      ]
    },
 
]);

export default router;