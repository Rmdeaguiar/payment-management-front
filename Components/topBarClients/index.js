import "./style.css";
import imgClients from "../../assets/btn-clientes.png";
import imgFiltro from "../../assets/btn-filtro.png";
import useGlobal from "../../Hooks/useGlobal";
import useClient from '../../Hooks/useClient'

function TopBarClients() {
  const { setModalType, setHandleModal } = useGlobal();
  const { clients, setClients, localClients, setNoClients } = useClient();

  function handleOpenModal() {
    setModalType("registerclient");
    setHandleModal(true);
  }

  function handleSearchClients(e) {
    const search = e.target.value.toLowerCase();
    const filteredClients = [];

    if (search.length <= 1) {
      setNoClients(false);
      setClients([...localClients])
    }
    if (e.key !== 'Enter') {
      return
    }

    if (e.target.value) {
      for (let client of clients) {
        if (client.name.toLowerCase().includes(search) || (client.cpf.toString()).includes(search) || client.email.includes(search)) {
          filteredClients.push(client);
        }
      }
      if (filteredClients.length === 0) {
        setNoClients(true)
      }
      return setClients([...filteredClients]);
    }
    return setClients([...localClients]);
  }



  return (
    <div className="top-bar-content">
      <div className="content-imgClient">
        <img className="img-clients" src={imgClients} alt="btn-clientes" />
        <h1>Clientes</h1>
      </div>
      <div className="content-filter">
        <button className="btn-add-client" onClick={handleOpenModal}>
          + Adicionar cliente
        </button>
        <img className="btn-filtro" src={imgFiltro} alt="btn-filtro" />
        <input className="input-search" placeholder="Pesquisa" onKeyDown={(e) => handleSearchClients(e)} />
      </div>
    </div>
  );
}

export default TopBarClients;
