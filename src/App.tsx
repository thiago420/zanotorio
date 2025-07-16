import { BrowserRouter } from "react-router";
import Routes from './routes';
import GlobalStyles from "./styles/GlobalStyles";
import './styles/style.css';

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </>
  )
}

export default App
