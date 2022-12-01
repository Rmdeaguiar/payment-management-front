import "./style.css";
import { useEffect, useState } from "react";
import EditRegisterUser from "../EditRegisterUser";
import RegisterClient from "../RegisterClient";
import EditClient from "../EditClient";
import ChargeDetails from '../ChargeDetails';
import ChargeDelete from '../ChargeDelete';
import closeBtn from "../../assets/btn-close.png";
import useGlobal from "../../Hooks/useGlobal";

function ModalBox({ setSubmited }) {
  const [currentModal, setCurrentModal] = useState("");
  const [aditionalClass, setAditionalClass] = useState("");
  const { modalType: type, setHandleModal: closeModal } = useGlobal();

  useEffect(() => {
    switchModal();
  }, [type]);

  function switchModal() {
    switch (type) {
      case "edituser":
        setCurrentModal(<EditRegisterUser />);
        setAditionalClass("modal-edituser");
        break;
      case "registerclient":
        setCurrentModal(<RegisterClient />);
        setAditionalClass("modal-register-client");
        break;
      case "editclient":
      setCurrentModal(<EditClient />);
      setAditionalClass("modal-edit-client");
      break
      case "chargedetails":
      setCurrentModal(<ChargeDetails />);
      setAditionalClass("modal-chargedetails");
      break
      case "chargedelete":
        setCurrentModal(<ChargeDelete />);
        setAditionalClass("modal-chargedelete");
        break
      default:
        break;
    }
  }

  function handleCloseModal(e) {
    e.preventDefault();
    console.log("entrou");
    const targetClass = e.target.classList;
    if (targetClass.contains("btn-close")) {
      closeModal(false);
    }
  }

  return (
    <div className="modalbox-backscreen">
      <div className={`modal-container ${aditionalClass}`}>
        <img
          className="btn-close"
          src={closeBtn}
          alt="Botão de Fechar"
          onClick={(e) => handleCloseModal(e)}
        />
        {currentModal}
      </div>
    </div>
  );
}

export default ModalBox;
