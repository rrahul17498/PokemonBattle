import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import theme from './theme';
import LandingPage from '../components/landingPage';
import BattleGround from '../components/battleGround';
import RouteDefinitions from './routes';


const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
        <Routes>
          <Route path={RouteDefinitions.open.root} element={<LandingPage />}  />
          <Route path={RouteDefinitions.open.battleground} element={<BattleGround />}  />
        </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App;
