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
          const { Register } = await import("../../features/users/register");  
          return { Component: Register };
        }
    },


    // Protected Routes
 
]);

export default router;