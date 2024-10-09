import { createBrowserRouter } from "react-router-dom";


 const router = createBrowserRouter([
    // Open Routes
    {
        path: "/",
        lazy: async() => {
          const { LandingPage } = await import("../features/landingPage");  
          return { Component: LandingPage };
        }
    },


    // Protected Routes
 
]);

export default router;