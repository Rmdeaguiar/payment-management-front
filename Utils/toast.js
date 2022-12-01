import {toast} from 'react-toastify'

toast.configure()

const notifySucess = (mensagem) => {
  toast.success(mensagem, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2000,
    closeOnClick: true,
    pauseOnHover: false,
  })
}
const notifyError = (mensagem) => {
  toast.error(mensagem, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })
}

export default { notifySucess, notifyError }