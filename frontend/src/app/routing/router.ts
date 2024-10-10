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
        path: AppRoutes.register,
        lazy: async() => {
          const { Register } = await import("../../features/users/components/register");  
          return { Component: Register };
        }
    },
    {
        path: AppRoutes.login,
        lazy: async() => {
          const { Login } = await import("../../features/users/components/login");  
          return { Component: Login };
        }
    },


    // Protected Routes
 
]);

export default router;