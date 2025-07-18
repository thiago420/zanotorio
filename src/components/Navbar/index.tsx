import { motion } from "motion/react";
import { NavLink, Outlet, useLocation } from "react-router";

const tabs = [
  { id: "/", label: "Início" },
  { id: "/calculadora", label: "Calculadora" },
  { id: "/provas", label: "Provas" },
  { id: "/configuracao", label: "Configuração" },
  { id: "/sobre", label: "Sobre" },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <>
      <div className="fixed top-4 left-1/2 flex -translate-x-1/2 space-x-1">
        {tabs.map((tab) => (
          <NavLink
            to={tab.id}
            key={tab.id}
            className={`${
              location.pathname === tab.id ? "text-white" : "hover:text-accent-foreground/80"
            } relative cursor-pointer rounded-full px-3 py-1.5 text-sm font-medium text-accent-foreground outline-sky-400 transition focus-visible:outline-2`}
            style={{
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {location.pathname === tab.id && (
              <motion.span
                layoutId="bubble"
                className="bg-ring absolute inset-0 z-10 rounded-md mix-blend-overlay"
                transition={{ type: "spring", bounce: 0, duration: 0.6 }}
              />
            )}
            {tab.label}
          </NavLink>
        ))}
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
