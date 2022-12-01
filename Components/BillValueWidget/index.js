import "./style.css";
import { useEffect, useState } from "react";
import PaidIcon from "../../assets/icone-cobranca-paga.png";
import OverdueIcon from "../../assets/icone-cobranca-vencida.png";
import ExpectedIcon from "../../assets/icone-cobranca-previstas.png";
import api from "../../Services/api";

function BillValueWidget({ type }) {
  const [icon, setIcon] = useState("");
  const [endpoint, setEndpoint] = useState("");
  const [value, setValue] = useState("0");
  const [text, setText] = useState("");
  const [typeOfCharge, setTypeOfCharge] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
    definingType();
    gettingValues();
  }, []);

  useEffect(() => {
    if (data) {
      settingValues();
    }
  }, [data]);

  function definingType() {
    switch (type) {
      case "paid":
        setIcon(PaidIcon);
        setText("Pagas");
        setTypeOfCharge("pago");
        break;
      case "overdue":
        setIcon(OverdueIcon);
        setText("Vencidas");
        setTypeOfCharge("Vencida");
        break;
      case "expected":
        setIcon(ExpectedIcon);
        setText("Previstas");
        setTypeOfCharge("pendente");
        break;
      default:
        break;
    }
  }

  async function gettingValues() {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      const { data } = await api.get("/get-charges", { headers });
      setData(data);
    } catch (error) {
      console.log(error);
    }
  }

  function settingValues() {
    const resumeCharge = data.filter((charge) => {
      return charge.statuscharge === typeOfCharge;
    });

    let sumOfCharges = 0;
    for (let charge of resumeCharge) {
      sumOfCharges += Number(charge.value);
    }
    setValue(sumOfCharges);
  }

  return (
    <div className={`widget ${type}`} endpoint={endpoint}>
      {icon && (
        <div className="widget-container">
          <img className="widget-icon" src={icon} alt="" />
          <div className="widget-wrapper">
            <h3>{`Cobranças ${text}`}</h3>
            <p className="value">R$ {value.toLocaleString("pt-Br")},00</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default BillValueWidget;
