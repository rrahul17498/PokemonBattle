import { ThemeProvider } from 'styled-components';
import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from "./query/client";
import router from './routing/router';
import theme from './theme';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';


function App() {

  return (
    <QueryClientProvider client={queryClient}>
      {import.meta.env.DEV && <ReactQueryDevtools />}
      <ThemeProvider theme={theme}>
         <RouterProvider router={router}/>
         <Toaster reverseOrder={true} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
