import styled from "styled-components";
import { NavLink } from "react-router";

export const NavbarContainer = styled.div`
  position: fixed;
  top: 1rem;
  left: 50%;
  display: flex;
  height: 1.8rem;
  transform: translateX(-50%);
`;

export const Navlink = styled(NavLink)`
  all: unset;
  font-family: Arial, Helvetica, sans-serif;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  transition: ease-in-out 0.3s background-color;
  cursor: pointer;
  color: #fff;

  &:hover {
    background-color: rgba(136, 255, 0, 0.2);
  };
`;
