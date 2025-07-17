import { Routes, Route } from "react-router";
import Home from "../pages/Home";
import Calculadora from "../pages/Calculadora";
import Sobre from "../pages/Sobre";
import Navbar from "../components/Navbar";
import Provas from "@/pages/Provas";

const routes = () => (
  <Routes>
    <Route element={<Navbar />}>
      <Route index element={<Home />} />
      <Route path="calculadora" element={<Calculadora />} />
      <Route path="sobre" element={<Sobre />} />
      <Route path="provas" element={<Provas />} />
    </Route>
  </Routes>
);

export default routes;
