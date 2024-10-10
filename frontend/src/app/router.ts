import { createBrowserRouter } from "react-router-dom";


 const router = createBrowserRouter([
    // Open Routes
    {
        path: "/",
        lazy: async() => {
          const { LandingPage } = await import("../features/landing");  
          return { Component: LandingPage };
        }
    },
    {
        path: "/register",
        lazy: async() => {
          const { Register } = await import("../features/users/components/register");  
          return { Component: Register };
        }
    },
    {
        path: "/login",
        lazy: async() => {
          const { Login } = await import("../features/users/components/login");  
          return { Component: Login };
        }
    },
    // {
    //     path: "/login",
    //     lazy: async() => {
    //       const { LandingPage } = await import("../features/landing");  
    //       return { Component: LandingPage };
    //     }
    // },


    // Protected Routes
 
]);

export default router;