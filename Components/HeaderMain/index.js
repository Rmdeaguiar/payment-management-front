import "./style.css";
import edit from "../../assets/icon-edit.svg";
import exit from "../../assets/icon-exit.svg";
import down from "../../assets/icon-down.svg";
import { useEffect, useState } from "react";
import toast from "../../Utils/toast";
import { useNavigate } from "react-router-dom";
import useGlobal from "../../Hooks/useGlobal";
import removeVogaisString from "../../Utils/NameInitialFunction";
function HeaderMain({ currentPage }) {
  const navigate = useNavigate();
  const userName = localStorage.getItem("name");
  const [modalHeader, setModalHeader] = useState(false);
  const [title, setTitle] = useState("Resumo das cobranças");
  const { setHandleModal, setModalType } = useGlobal();
  const initalName = removeVogaisString(userName);

  useEffect(() => {
    function changeTitle() {
      switch (currentPage) {
        case "home":
          setTitle("Resumo das cobranças");
          break;
        case "clientes":
          setTitle("Clientes");
          break;
        case "cobrancas":
          setTitle("Cobranças");
          break;
        default:
          break;
      }
    }
    changeTitle();
  }, [currentPage, title]);

  function handleUserEditModal() {
    setModalType("edituser");
    setHandleModal(true);
  }

  function exitLogin() {
    localStorage.clear();
    toast.notifySucess(`Até logo, ${userName}`);
    navigate("/login");
  }

  return (
    <div className="card-header">
      <div className="header-wrapper">
        <div className="header-content flex">
          {currentPage === "home" ? <h1>{title}</h1> : <h2 className="color-green">{title}</h2>}
          <div className="flex user">
            <div className="border-name">
              <h3 className="color-green">{initalName.toUpperCase()}</h3>
            </div>
            <h3 className="color-green name-user">{userName}</h3>
            <img
              src={down}
              alt="seta baixo"
              className="icon-down"
              onClick={() => setModalHeader(!modalHeader)}
            />
            {modalHeader && (
              <div className="modal-header">
                <img
                  src={edit}
                  alt="botão editar"
                  className="btn-edit"
                  onClick={handleUserEditModal}
                />
                <img
                  onClick={() => exitLogin()}
                  src={exit}
                  alt="botão sair"
                  className="btn-exit"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderMain;
