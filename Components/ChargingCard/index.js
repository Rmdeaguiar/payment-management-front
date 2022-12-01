import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobal from "../../Hooks/useGlobal";
import "./styles.css";
import api from "../../Services/api";

function ChargingCard({ type, amount }) {
  const { setChargeFilter, setCurrentPage } = useGlobal();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [aditionalClass, setAdictionalClass] = useState("");
  const [listCharges, setListCharges] = useState([]);

  useEffect(() => {
    let titleCharge = "";
    async function changeCardType() {
      switch (type) {
        case "overdue":
          setAdictionalClass("overdue-charges");
          setTitle("Vencidas");
          titleCharge = "Vencida";
          break;
        case "provided":
          setAdictionalClass("provided-charges");
          setTitle("Previstas");
          titleCharge = "pendente";
          break;
        case "paid":
          setAdictionalClass("paid-charges");
          setTitle("Pagas");
          titleCharge = "pago";
          break;
        default:
          break;
      }
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      const { data: chargesApi } = await api.get("/get-charges", { headers });

      const chargesType = chargesApi.filter((charge) => {
        return charge.statuscharge === titleCharge;
      });

      setListCharges(chargesType);
    }
    changeCardType();
  }, [type]);

  function clientSituation(status) {
    navigate("/cobrancas");
    setCurrentPage("cobrancas");
    return setChargeFilter(status);
  }

  return (
    <div className={`container-charging ${type}-card`}>
      <div className="charging-title">
        <h2>{`Cobranças ${title}`}</h2>
        <div className={`amount-charges ${aditionalClass}`}>
          {listCharges.length}
        </div>
      </div>
      <div className="charging-info">
        <h2>Cliente</h2>
        <h2>ID da cob.</h2>
        <h2>Valor</h2>
      </div>

      {listCharges.slice(0, 4).map((charge) => (
        <div key={charge.id} className="charging-client">
          <h3>{charge.nameclient}</h3>
          <h3>{charge.id}</h3>
          <h3>R$ {charge.value},00</h3>
        </div>
      ))}

      <div className="see-all-charges">
        <span onClick={() => clientSituation(title)}>Ver todos</span>
      </div>
    </div>
  );
}

export default ChargingCard;
