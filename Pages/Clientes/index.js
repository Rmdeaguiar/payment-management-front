import "./style.css";
import TopBarClients from "../../Components/topBarClients";
import ClientTable from "../../Components/ClientTable";
import ClientDetails from "../../Components/ClientDetails";
import { useState } from "react";
import { ClientProvider } from "../../Contexts/ClientContext";
import { useOutletContext } from "react-router-dom";

function Clientes() {
  const values = useOutletContext();

  // const [allClients, setAllClients] = useState(true);
  return (
    <ClientProvider>
      <div className="clientes-page-container">
        <TopBarClients />
        <ClientTable />

        {/* {!allClients && <ClientDetails />} */}
      </div>
    </ClientProvider>
  );
}

export default Clientes;
