import { createContext, useState } from "react";
import useGlobalProvider from "../Hooks/useGlobalProvider";
import ModalStates from "../States/modal";

const GlobalContext = createContext();

export function GlobalProvider(props) {
  const globalProvider = useGlobalProvider();

  const modalStates = ModalStates();
  const [client, setClient] = useState({})
  const [currentCharge, setCurrentCharge] = useState({})
  const [charges, setCharges] = useState([]);
  const [editCharge, setEditCharge] = useState(false)
  const [chargingModal, setChargingModal] = useState(false);
  const [updateCharges, setUpdateCharges] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");

  const values = { ...globalProvider, ...modalStates, client, setClient, currentCharge, setCurrentCharge, charges, setCharges, editCharge, setEditCharge, chargingModal, setChargingModal, updateCharges, setUpdateCharges, currentPage, setCurrentPage };
  return (
    <GlobalContext.Provider value={values}>
      {props.children}
    </GlobalContext.Provider>
  );
}

export default GlobalContext;
