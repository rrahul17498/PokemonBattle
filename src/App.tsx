import { ThemeProvider } from 'styled-components';
import theme from './theme';
import LandingPage from './components/landingPage';

function App() {

  return (
    <ThemeProvider theme={theme}>
     <LandingPage />
    </ThemeProvider>
  )
}

export default App;
