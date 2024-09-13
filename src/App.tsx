import { ThemeProvider } from 'styled-components';
import theme from './theme';
import LandingPage from './components/landingPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BattleGround from './components/battleGround';

function App() {

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
       <Routes>
         <Route path='/' element={<LandingPage />}  />
         <Route path='/battle' element={<BattleGround />}  />
       </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App;
