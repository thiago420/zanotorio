import { Outlet } from "react-router";
import { NavbarContainer, Navlink } from "./styles";

const Navbar = () => {
  return (
    <>
      <NavbarContainer>
        <Navlink to="/">Home</Navlink>
        <Navlink to="/calculadora">Calculadora</Navlink>
        <Navlink to="/provas">Provas</Navlink>
        <Navlink to="/sobre">Sobre</Navlink>
      </NavbarContainer>
      <Outlet />
    </>
  );
};

export default Navbar;
