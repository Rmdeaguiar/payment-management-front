import "./styles.css";
import ClientNotOk from "../../assets/cliente-inadimplente.png";
import ClientOk from "../../assets/cliente-ok.svg";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGlobal from "../../Hooks/useGlobal";
import api from "../../Services/api";

function ClientCard({ amount, type }) {
  const navigate = useNavigate();
  const src = type === "ok" ? ClientOk : ClientNotOk;
  const [adictionalClass, setAdictionalClass] = useState("");
  const [title, setTitle] = useState("");
  const [listClients, setListClients] = useState([]);
  const { setClientFilter, setCurrentPage } = useGlobal();
  const [titleCharge, setTitleCharge] = useState("");

  useEffect(() => {
    async function changeCardType() {
      switch (type) {
        case "ok":
          setAdictionalClass("day-clients");
          setTitle("Clientes em dia");
          setTitleCharge("Em dia");
          break;
        case "not-ok":
          setAdictionalClass("defaulters-clients");
          setTitle("Clientes Inadimplentes");
          setTitleCharge("Inadimplente");
          break;
        default:
          break;
      }
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      const { data: clientsApi } = await api.get("/get-clients", { headers });

      const clientsType = clientsApi.filter((client) => {
        return client.status === titleCharge;
      });
      setListClients(clientsType);
    }
    changeCardType();
  }, [type, listClients]);

  function clientSituation(status) {
    navigate("/clientes");
    setCurrentPage("clientes");
    return setClientFilter(status);
  }

  return (
    <div className={`container-clients ${type}`}>
      <div className="clients-title">
        <div className="clients-title-icon">
          <img src={src} alt="icon" />
          <h2>{title}</h2>
        </div>
        <div className={`amount-clients ${adictionalClass}`}>
          {listClients.length}
        </div>
      </div>
      <div className="clients-info">
        <h2>Clientes</h2>
        <h2>ID do Clie.</h2>
        <h2>CPF</h2>
      </div>

      {listClients.slice(0, 4).map((client) => (
        <div key={client.id} className="clients-client">
          <h3>{client.name}</h3>
          <h3>{client.id}</h3>
          <h3>{client.cpf}</h3>
        </div>
      ))}

      <div className="see-all-clients">
        <span onClick={() => clientSituation(titleCharge)}>Ver todos</span>
      </div>
    </div>
  );
}

export default ClientCard;
