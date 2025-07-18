import { Routes, Route } from "react-router";
import Navbar from "../components/Navbar";
import ConfiguracaoMenu from "@/components/Configuracao";
import { ModeToggle } from "@/components/ModeToggle";
import Home from "../pages/Home";
import Calculadora from "../pages/Calculadora";
import Provas from "@/pages/Provas";
import Sobre from "../pages/Sobre";
import PhysicsDraggable from "@/pages/teste";

const routes = () => (
  <Routes>
    <Route element={(
      <>
        <Navbar />
        <ModeToggle />
        <ConfiguracaoMenu />
      </>
    )}>
      <Route index element={<Home />} />
      <Route path="calculadora" element={<Calculadora />} />
      <Route path="provas" element={<Provas />} />
      <Route path="sobre" element={<Sobre />} />
      <Route path="teste" element={<PhysicsDraggable />} />
      <Route path="*" element={<span>404</span>} />
    </Route>
  </Routes>
);

export default routes;
