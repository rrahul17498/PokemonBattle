import { ThemeProvider } from 'styled-components';
import theme from './theme';
import LandingPage from './components/landingPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BattleGround from './components/battleGround';
import RouteDefinitions from './routes';

function App() {

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
       <Routes>
         <Route path={RouteDefinitions.open.root} element={<LandingPage />}  />
         <Route path={RouteDefinitions.open.battleground} element={<BattleGround />}  />
       </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App;
