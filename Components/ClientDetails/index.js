import './styles.css'
import ImgClient from '../../assets/img-client.svg'
import Pencil from '../../assets/pencil.svg'
import Arrows from '../../assets/arrows.svg'
import Edit from '../../assets/edit.svg'
import Delete from '../../assets/delete.svg'
import useClient from '../../Hooks/useClient'
import api from '../../Services/api'
import toast from '../../Utils/toast'
import { useEffect, useState } from 'react'
import useGlobal from '../../Hooks/useGlobal'
import formatDate from '../../Utils/formatdate'
import ChargingModal from '../ChargingModal'

function ClientDetails() {

  const {
    setHandleModal,
    setModalType,
    setCurrentCharge,
    charges,
    client,
    chargingModal,
    setChargingModal
  } = useGlobal()
  const {
    currentClient,
    setCurrentClient,
  } = useClient()
  const [chargesCurrentClient, setChargesCurrentClient] = useState([])

  useEffect(() => {
    chargesOneClient()
  }, [charges])

  function handleUserEditModal() {
    setModalType('editclient')
    setHandleModal(true)
  }

  function handleDeleteModal(charge) {
    setModalType('chargedelete')
    setHandleModal('true')
    setCurrentCharge(charge)
  }

  async function chargesOneClient() {
    try {
      const token = localStorage.getItem('token')

      const response = await api.get(`/get-charges/${client.id}`)
      setChargesCurrentClient(response.data)
    } catch (error) {
      toast.notifyError(error.response.data)
    }
  }
  return (
    <>
      <h2 className="absolute-detail"> {'> Detalhes do cliente'}</h2>
      <div className="container-client-details">
        <div className="detail-title">
          <img src={ImgClient} alt="img-client" />
          <h1>{client.name}</h1>
        </div>
        <div className="client-data">
          <div className="client-data-title">
            <h2>Dados do Cliente</h2>
            <button onClick={handleUserEditModal}>
              <img src={Pencil} alt="pencil" />
              Editar Cliente
            </button>
          </div>
          <div className="client-data-info">
            <div className="twenty-five-percent">
              <h3>E-mail</h3>
              <span>{client.email}</span>
            </div>
            <div className="fifteen-percent">
              <h3>Telefone</h3>
              <span>{`(${client.phone.substr(0, 2)})${client.phone.substr(
                2,
                1,
              )} ${client.phone.substr(3, 4)}-${client.phone.substr(
                7,
                4,
              )}`}</span>
            </div>
            <div className="fifteen-percent">
              <h3>CPF</h3>
              <span>{`${client.cpf.substr(0, 3)}.${client.cpf.substr(
                3,
                3,
              )}.${client.cpf.substr(6, 3)}-${client.cpf.substr(9, 2)}`}</span>
            </div>
          </div>
          <div className="client-data-info">
            <div className="twenty-five-percent">
              <h3>Endereço</h3>
              <span>
                {client.publicplace ? client.publicplace : 'Não cadastrado'}
              </span>
            </div>
            <div className="fifteen-percent">
              <h3>Bairro</h3>
              <span>
                {client.district ? client.district : 'Não cadastrado'}
              </span>
            </div>
            <div className="fifteen-percent">
              <h3>Complemento</h3>
              <span>
                {client.complement ? client.complement : 'Não cadastrado'}
              </span>
            </div>
            <div className="fifteen-percent">
              <h3>CEP</h3>
              <span>{client.cep ? client.cep : 'Não cadastrado'}</span>
            </div>
            <div className="fifteen-percent">
              <h3>Cidade</h3>
              <span>{client.city ? client.city : 'Não cadastrado'}</span>
            </div>
            <div className="fifteen-percent">
              <h3>UF</h3>
              <span>{client.state ? client.state : 'Não cadastrado'}</span>
            </div>
          </div>
          <div className="details-charging">
            <div className="client-data-title">
              <h2>Cobranças do cliente</h2>
              <button onClick={() => setChargingModal(true)}>
                + Nova cobrança
              </button>
            </div>
            <div className="client-data-subtitle">
              <h3>
                <img src={Arrows} alt="arrows" />
                ID Cob.
              </h3>
              <h3>
                <img src={Arrows} alt="arrows" />
                Data de Venc.
              </h3>
              <h3>Valor</h3>
              <h3>Status</h3>
              <h3>Descrição</h3>
            </div>

            {chargesCurrentClient.map((charge) => (
              <div key={charge.id} className="details-charging-info">
                <span>{charge.id}</span>
                <span>{formatDate(charge.due_date)}</span>
                <span>{charge.value}</span>
                <div className="status">
                  <span className={charge.statuscharge}>
                    {charge.statuscharge}
                  </span>
                </div>
                <div className="description">
                  <h3>{charge.description}</h3>
                  <img src={Edit} alt="edit" />
                  <img
                    src={Delete}
                    onClick={() => handleDeleteModal(charge)}
                    alt="delete"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {chargingModal && <ChargingModal currentClient={currentClient} />}
    </>
  )
}

export default ClientDetails
