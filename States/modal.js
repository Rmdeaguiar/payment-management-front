import { useState } from "react";

function ModalStates() {
  const [handleModal, setHandleModal] = useState(false);
  const [modalType, setModalType] = useState("edituser");
  const [submited, setSubmited] = useState(false);
  const [test, setTeste] = useState("Xablaus 123");

  return {
    handleModal,
    setHandleModal,
    modalType,
    setModalType,
    submited,
    setSubmited,
    test,
  };
}

export default ModalStates;
