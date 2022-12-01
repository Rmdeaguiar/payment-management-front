import './style.css'
import exclamationImg from '../../assets/exclamation-img.png'
import useGlobal from '../../Hooks/useGlobal'
import api from '../../Services/api'
import toast from '../../Utils/toast'
function ChargeDelete(){
    const {setHandleModal,currentCharge,charges,setCharges} = useGlobal()

   async function deleteCharge(){

        try {
            await api.delete(`/charges-delete/${currentCharge.id}`)
            setHandleModal(false)

           const chargesfilter = charges.filter((charge)=>{
                return charge.id !== currentCharge.id
            })
            setCharges(chargesfilter)

            toast.notifySucess('Cobrança excluída com sucesso!')
        } catch (error) {
            setHandleModal(false)
            toast.notifyError(error.response.data)
        }
    }
    return (
        <div className='chargedelete-container'>
            <img src={exclamationImg} alt='exclamation'/>
            <h1>Tem certeza de deseja excluir esta cobrança?</h1>
            <div className='chargedelete-btns'>
                <button onClick={()=> setHandleModal(false)} className='btn-nao'>Não</button>
                <button onClick={()=> deleteCharge()} className='btn-sim'>Sim</button>
            </div>
        </div>
    )
}


export default ChargeDelete