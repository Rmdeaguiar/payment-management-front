import "./style.css";
import NoResult from "../../assets/no-result.svg";
import Paper from "../../assets/paper.svg";
import imgFiltro from "../../assets/btn-filtro.png";
import Arrows from "../../assets/arrows.svg";
import Edit from "../../assets/edit.svg";
import Delete from "../../assets/delete.svg";
import { useEffect, useState } from "react";
import api from "../../Services/api";
import useGlobal from "../../Hooks/useGlobal";
import formatDate from "../../Utils/formatdate";
import ChargeEdit from "../../Components/ChargeEdit";
import FunctionChargesFilter from "../../Utils/FunctionChargesFilter";

function Cobrancas() {
  const { getChargesPaid, getChargesPending, getChargesOverdue } =
    FunctionChargesFilter();
  const [localCharges, setLocalCharges] = useState([]);
  const [ascId, setAscId] = useState(false);
  const [ascName, setAscName] = useState(false);
  const [noResult, setNoResult] = useState(false);
  const {
    setHandleModal,
    setModalType,
    setCurrentCharge,
    charges,
    setCharges,
    chargeFilter,
    setChargeFilter,
    editCharge,
    setEditCharge,
    updateCharges,
  } = useGlobal();

  useEffect(() => {
    loadCharges();
  }, [updateCharges]);

  async function loadCharges() {
    try {
      const token = localStorage.getItem("token");

      const { data } = await api.get("/get-charges", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      if (chargeFilter) {
        let chargesLocalFilter = [];

        if (chargeFilter === "Pagas") {
          chargesLocalFilter = getChargesPaid(data);
        } else if (chargeFilter === "Previstas") {
          chargesLocalFilter = getChargesPending(data);
        } else if (chargeFilter === "Vencidas") {
          chargesLocalFilter = getChargesOverdue(data);
        }
        setCharges(chargesLocalFilter);
        setLocalCharges(chargesLocalFilter);
        setChargeFilter("");
        return;
      }
      setCharges(data.sort((a, b) => a.id - b.id));
      setLocalCharges(data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleChargeDetail(charge) {
    setCurrentCharge(charge);
    setModalType("chargedetails");
    setHandleModal("true");
  }

  function handleSearchCharges(e) {
    const search = e.target.value.toLowerCase();
    const filteredCharges = [];

    if (!search) {
      setNoResult(false);
      setCharges([...localCharges]);
    }

    if (!search && e.key === "Enter") {
      loadCharges();
    }
    if (e.key !== "Enter") {
      return;
    }

    if (e.target.value) {
      for (let charge of charges) {
        if (
          charge.nameclient.toLowerCase().includes(search) ||
          charge.id.toString().includes(search)
        ) {
          filteredCharges.push(charge);
        }
      }
      if (filteredCharges.length === 0) {
        setNoResult(true);
      }
      return setCharges([...filteredCharges]);
    }
    return setCharges([...localCharges]);
  }

  function orderChargesById() {
    setAscId(!ascId);

    if (ascId) {
      localCharges.sort((a, b) => a.id - b.id);
      return setCharges([...localCharges]);
    }
    localCharges.sort((a, b) => b.id - a.id);
    return setCharges([...localCharges]);
  }

  function orderChargesByName() {
    setAscName(!ascName);

    if (ascName) {
      localCharges.sort((a, b) => a.nameclient.localeCompare(b.nameclient));
      return setCharges([...localCharges]);
    }

    localCharges.sort((a, b) => b.nameclient.localeCompare(a.nameclient));
    return setCharges([...localCharges]);
  }

  function handleDeleteCharge(charge) {
    setCurrentCharge(charge);
    setModalType("chargedelete");
    setHandleModal("true");
  }

  function handleEditCharge(charge) {
    setCurrentCharge(charge);
    setEditCharge(true);
  }

  return (
    <div className="cobrancas-content">
      <div className="top-bar-cobrancas">
        <div className="content-img-charging">
          <img className="img-charging" src={Paper} alt="paper-charging" />
          <h1>Cobranças</h1>
        </div>
        <div className="content-filter">
          <img className="btn-filtro" src={imgFiltro} alt="btn-filtro" />
          <input
            className="input-search"
            placeholder="Pesquisa"
            onKeyDown={(e) => handleSearchCharges(e)}
          />
        </div>
      </div>

      <div className="details-charging-page">
        {noResult ? (
          <div className="no-result">
            <img src={NoResult} alt="Nenhum resultado encontrado" />
          </div>
        ) : (
          <>
            <div className="charging-data-subtitle">
              <h3>
                <img
                  src={Arrows}
                  alt="arrows"
                  onClick={() => orderChargesByName()}
                />
                Cliente
              </h3>
              <h3>
                <img
                  src={Arrows}
                  alt="arrows"
                  onClick={() => orderChargesById()}
                />
                ID Cob.
              </h3>
              <h3>Valor</h3>
              <h3>Data Venc.</h3>
              <h3>Status</h3>
              <h3>Descrição</h3>
              <p></p>
            </div>
            {charges.map((charge) => (
              <div key={charge.id} className="details-chargingpage-info">
                <span
                  className="charge-name"
                  onClick={() => handleChargeDetail(charge)}
                >
                  {charge.nameclient}
                </span>
                <span
                  className="charge-id"
                  onClick={() => handleChargeDetail(charge)}
                >
                  {charge.id}
                </span>
                <span className="charge-value">{`R$ ${charge.value},00`}</span>
                <span className="charge-date">
                  {formatDate(charge.due_date)}
                </span>
                <div className="status">
                  <span className={charge.statuscharge}>
                    {charge.statuscharge}
                  </span>
                </div>

                <span className="description-cobranca">
                  {charge.description}
                </span>
                <div className="description-charging">
                  <img
                    src={Edit}
                    onClick={() => handleEditCharge(charge)}
                    alt="edit"
                  />
                  <img
                    src={Delete}
                    onClick={() => handleDeleteCharge(charge)}
                    alt="delete"
                  />
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      {editCharge && <ChargeEdit />}
    </div>
  );
}

export default Cobrancas;
