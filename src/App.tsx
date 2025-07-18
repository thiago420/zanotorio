import { BrowserRouter } from "react-router";
import Routes from "./routes";
import "@hellouxpavel/cssanimation";
import "./styles/global.css";
import { ThemeProvider } from "./components/ThemeProvider";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="theme-mode">
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
