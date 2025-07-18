import { BrowserRouter } from "react-router";
import Routes from "./routes";
import "@hellouxpavel/cssanimation";
import "./styles/global.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { TooltipProvider } from "./components/animate-ui/radix/tooltip";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="theme-mode">
        <TooltipProvider>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
