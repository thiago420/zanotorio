import { Routes, Route } from "react-router";
import Home from "../pages/Home";
import Calculadora from "../pages/Calculadora";
import Sobre from "../pages/Sobre";
import Navbar from "../components/Navbar";

const routes = () => (
  <Routes>
    <Route element={<Navbar />}>
      <Route index element={<Home />} />
      <Route path="calculadora" element={<Calculadora />} />
      <Route path="sobre" element={<Sobre />} />
    </Route>
  </Routes>
);

export default routes;
