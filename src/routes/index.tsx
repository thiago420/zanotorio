import { Routes, Route } from "react-router";
import Home from "../pages/Home";
import Calculadora from "../pages/Calculadora";
import Sobre from "../pages/Sobre";
import Navbar from "../components/Navbar";
import Provas from "@/pages/Provas";
import DraggableBox from "@/pages/teste";
import Configuracao from "@/pages/Configuracao";

const routes = () => (
  <Routes>
    <Route element={<Navbar />}>
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
