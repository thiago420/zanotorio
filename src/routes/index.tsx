import { Routes, Route } from "react-router";
import Navbar from "../components/Navbar";
import { ModeToggle } from "@/components/ModeToggle";
import Home from "../pages/Home";
import Calculadora from "../pages/Calculadora";
import Provas from "@/pages/Provas";
import Configuracao from "@/pages/Configuracao";
import Sobre from "../pages/Sobre";
import DraggableBox from "@/pages/teste";

const routes = () => (
  <Routes>
    <Route element={(
      <>
        <ModeToggle />
        <Navbar />
      </>
    )}>
      <Route index element={<Home />} />
      <Route path="calculadora" element={<Calculadora />} />
      <Route path="provas" element={<Provas />} />
      <Route path="configuracao" element={<Configuracao />} />
      <Route path="sobre" element={<Sobre />} />
      <Route path="teste" element={<DraggableBox />} />
      <Route path="*" element={<span>404</span>} />
    </Route>
  </Routes>
);

export default routes;
