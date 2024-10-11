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


    // Protected Routes
 
]);

export default router;