import "./style.css";
import SideBar from "../../Components/SideBar";
import HeaderMain from "../../Components/HeaderMain";
import ModalBox from "../../Components/ModalBox";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import useGlobal from "../../Hooks/useGlobal";

function Main() {
  const [modalType, setModalType] = useState("edituser");
  const [submited, setSubmited] = useState(false);
  const { handleModal, setHandleModal, loadUser, currentPage, setCurrentPage } = useGlobal();

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <>
      {handleModal && <ModalBox setSubmited={setSubmited} />}
      <div className="main-page-container">
        <SideBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <HeaderMain
          currentPage={currentPage}
          openModal={setHandleModal}
          modalType={setModalType}
        />
        <div className="main-content-wrapper">{<Outlet />}</div>
      </div>
    </>
  );
}

export default Main;
