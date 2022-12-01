import "./style.css";
import btnHome from "../../assets/btn-home.png";
import btnHomePink from "../../assets/btn-homePink.png";
import btnClientes from "../../assets/btn-clientes.png";
import btnClientesPink from "../../assets/btn-clientesPink.png";
import btnCobrancas from "../../assets/btn-cobrancas.png";
import btnCobrancasPink from "../../assets/btn-cobrancasPink.png";
import { NavLink } from "react-router-dom";

function SideBar({ currentPage, setCurrentPage }) {
  return (
    <div className="content-sidebar">
      <div className="navlinks-wrapper">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            "nav-link" + (isActive ? " clickado" : "")
          }
          children={({ isActive }) => {
            const actualImg = isActive ? btnHomePink : btnHome;
            return (
              <div onClick={() => setCurrentPage("home")}>
                <img className="btn-homeImg" src={actualImg} alt="botao home" />
                <span>Home</span>
              </div>
            );
          }}
        />
        <NavLink
          to="/clientes"
          className={({ isActive }) =>
            "nav-link" + (isActive ? " clickado" : "")
          }
          children={({ isActive }) => {
            const actualImg = isActive ? btnClientesPink : btnClientes;
            return (
              <div onClick={() => setCurrentPage("clientes")}>
                <img className="btn-homeImg" src={actualImg} alt="botao home" />
                <span>Clientes</span>
              </div>
            );
          }}
        />
        <NavLink
          to="/cobrancas"
          className={({ isActive }) =>
            "nav-link" + (isActive ? " clickado" : "")
          }
          children={({ isActive }) => {
            const actualImg = isActive ? btnCobrancasPink : btnCobrancas;
            return (
              <div onClick={() => setCurrentPage("cobrancas")}>
                <img className="btn-homeImg" src={actualImg} alt="botao home" />
                <span>Cobranças</span>
              </div>
            );
          }}
        />
      </div>
    </div>
  );
}

export default SideBar;
