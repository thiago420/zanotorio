import { BrowserRouter } from "react-router";
import Routes from "./routes";
import "@hellouxpavel/cssanimation";
import "./styles/global.css";
import { ThemeProvider } from "./components/ThemeProvider";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
