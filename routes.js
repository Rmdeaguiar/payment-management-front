import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Main from "./Pages/Main";
import Home from "./Pages/Home";
import Clientes from "./Pages/Clientes";
import Cobrancas from "./Pages/Cobrancas";
import { GlobalProvider } from "./Contexts/GlobalContext";
import ClientDetails from "./Components/ClientDetails";
import {
  Routes,
  Route,
  Outlet,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

function AppRoutes() {
  function PrivateRoute({ redirect, reverse }) {
    const authentication = localStorage.getItem("token");
    return authentication ? <Outlet /> : <Navigate to={redirect} />;
  }

  function ConditionalRoutes() {
    const authentication = localStorage.getItem("token");

    return authentication ? <Navigate to="/home" /> : <Outlet />;
  }

  return (
    <div className="App">
      <GlobalProvider>
        <Routes>
          <Route element={<ConditionalRoutes />}>
            <Route path="/" element={<Login />}>
              <Route path="/login" />
            </Route>

            <Route path="/signup" element={<Signup />} />
          </Route>

          <Route element={<PrivateRoute redirect="/" />}>
            <Route path="/*" element={<Main />}>
              <Route path="home" element={<Home />} />
              <Route path="clientes">
                <Route path="" element={<Clientes />} />
                <Route path=":id" element={<ClientDetails />} />
              </Route>
              <Route path="cobrancas" element={<Cobrancas />} />
              <Route path="*" element={<h1>Essa rota não existe</h1>} />
            </Route>
          </Route>
        </Routes>
      </GlobalProvider>
    </div>
  );
}

export default AppRoutes;
