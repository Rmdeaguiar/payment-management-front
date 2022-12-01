import './style.css'
import imgCobrancas from '../../assets/btn-cobrancas.png'
import useGlobal from '../../Hooks/useGlobal'
import formatDate from '../../Utils/formatdate';
function ChargeDetails() {
  const { currentCharge } = useGlobal();
  console.log(currentCharge)
  return (
    <div className="details-charge-container">
      <div className="details-charge-title">
        <img className="img-charge" src={imgCobrancas} alt="" />
        <h1>Detalhe da Cobrança</h1>
      </div>
      <div>
        <h2>Nome</h2>
        <span>{currentCharge.nameclient}</span>
      </div>
      <div>
        <h2>Descrição</h2>
        <p>{currentCharge.description}</p>
      </div>
      <div className='flex-row'>
      <div className="flex-column">
        <div>
          <h2>Vencimento</h2> <span>{formatDate(currentCharge.due_date)}</span>
        </div>
        <div>
          <h2>ID cobranças</h2> <span>{currentCharge.id}</span>
        </div>
      </div>
      <div className="flex-column">
        <div>
          <h2>Valor</h2> <span>{currentCharge.value}</span>
        </div>
        <div>
          <h2>Status</h2> <span className={currentCharge.statuscharge}>{currentCharge.statuscharge}</span>
        </div>
      </div>
    </div>
    </div>
  )
}

export default ChargeDetails
