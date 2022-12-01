import "./style.css";
import BillValueWidget from "../../Components/BillValueWidget";
import ChargingCard from "../../Components/ChargingCard";
import ClientCard from "../../Components/ClientCard";
import { useEffect } from "react";

function Home() {
  const billType = ["paid", "overdue", "expected"];
  const cardType = ["overdue", "provided", "paid"];
  const customerInfoType = ["not-ok", "ok"];

  return (
    <div className="home-page-container">
      <div className="home-page-wrapper">
        <div className="bill-resume">
          {billType.map((type) => (
            <BillValueWidget key={type} type={type} />
          ))}
        </div>
        <div className="resume-cards">
          {cardType.map((card) => (
            <ChargingCard key={card} type={card} amount="4" />
          ))}
        </div>

        <div className="bottom-card">
          {customerInfoType.map((info) => (
            <ClientCard key={info} type={info} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
