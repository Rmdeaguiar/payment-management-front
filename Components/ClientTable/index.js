import "./styles.css";
import Arrows from "../../assets/arrows.svg";
import ButtonCharge from "../../assets/btn-charge.svg";
import NoResult from "../../assets/no-result.svg";
import { useState, useEffect } from "react";
import api from "../../Services/api";
import useClient from "../../Hooks/useClient";
import useGlobal from "../../Hooks/useGlobal";
import ChargingModal from "../ChargingModal";
import FunctionClientsFilter from "../../Utils/FunctionClientsFilter";
import { useNavigate } from "react-router-dom";

function ClientTable({ submited, setSubmited, setAllClients }) {
  const {
    setClient,
    chargingModal,
    setChargingModal,
    clientFilter,
    setClientFilter,
  } = useGlobal();
  const {
    currentClient,
    setCurrentClient,
    clients,
    setClients,
    setLocalClients,
    localClients,
    noClients,
  } = useClient();
  const { getClientsDay, getClientsDefaulter } = FunctionClientsFilter();
  const [asc, setAsc] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadClients();
    if (submited) {
      setSubmited(false);
    }
  }, [submited]);

  async function loadClients() {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/get-clients", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });

      if (clientFilter) {
        let clientsLocalFilter = [];

        if (clientFilter === "Inadimplente") {
          clientsLocalFilter = getClientsDefaulter(response.data);
        } else if (clientFilter === "Em dia") {
          clientsLocalFilter = getClientsDay(response.data);
        }
        setClients(clientsLocalFilter);
        setLocalClients(clientsLocalFilter);
        setClientFilter("");
        return;
      }

      setClients(response.data.sort((a, b) => a.name.localeCompare(b.name)));
      setLocalClients(response.data);
    } catch (error) {}
  }

  function handleClientDetail(client) {
    // setAllClients(false)
    setCurrentClient(client);
    setClient(client);
    navigate(`${client.id}`);
  }

  function handleChargingModal(client) {
    setCurrentClient(client);
    setChargingModal(true);
  }

  function orderClientsByName() {
    setAsc(!asc);

    if (asc) {
      localClients.sort((a, b) => a.name.localeCompare(b.name));
      return setClients([...localClients]);
    }

    localClients.sort((a, b) => b.name.localeCompare(a.name));
    return setClients([...localClients]);
  }

  return (
    <>
      <div className="container-table">
        <div className="table-wrapper">
          <div className="table-title">
            <h2>
              <img
                src={Arrows}
                alt="arrows"
                onClick={() => orderClientsByName()}
              />
              Cliente
            </h2>
            <h2>CPF</h2>
            <h2>E-mail</h2>
            <h2>Telefone</h2>
            <h2>Status</h2>
            <h2>Criar Cobrança</h2>
          </div>
          {noClients ? (
            <div className="no-result">
              <img src={NoResult} alt="Nenhum resultado encontrado" />
            </div>
          ) : (
            clients.map((client) => (
              <div key={client.id} className="table-clients">
                <h3 onClick={() => handleClientDetail(client)}>
                  {client.name}
                </h3>
                <h3
                  onClick={() => handleClientDetail(client)}
                >{`${client.cpf.substr(0, 3)}.${client.cpf.substr(
                  3,
                  3
                )}.${client.cpf.substr(6, 3)}-${client.cpf.substr(9, 2)}`}</h3>
                <div
                  onClick={() => handleClientDetail(client)}
                  className="table-email"
                >
                  <h3>{client.email}</h3>
                </div>
                <h3
                  onClick={() => handleClientDetail(client)}
                >{`(${client.phone.substr(0, 2)}) ${client.phone.substr(
                  2,
                  1
                )} ${client.phone.substr(3, 4)}-${client.phone.substr(
                  7,
                  4
                )}`}</h3>
                <div
                  onClick={() => handleClientDetail(client)}
                  className={
                    client.status === "Inadimplente"
                      ? "defaulter-clients-table"
                      : "day-clients-table"
                  }
                >
                  <h3>{client.status}</h3>
                </div>
                <img
                  src={ButtonCharge}
                  alt="btn-charge"
                  onClick={() => handleChargingModal(client)}
                />
              </div>
            ))
          )}
        </div>
      </div>
      {chargingModal && <ChargingModal currentClient={currentClient} />}
    </>
  );
}

export default ClientTable;
