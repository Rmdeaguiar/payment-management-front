import './styles.css'
import { useEffect, useState } from "react";
import api from "../../Services/api";
import toast from "../../Utils/toast";
import InputInstance from "../InputInstance";
import checkForEmptyValues from "../../Utils/checkForEmptyValues";
import throwError from "../../Utils/throwError";
import Paper from '../../assets/paper.svg'
import GrayCircle from '../../assets/gray-circle.svg';
import CheckCircle from '../../assets/check-circle.svg'
import CloseIcon from '../../assets/btn-close.png'
import useGlobal from "../../Hooks/useGlobal";

function ChargingModal({ currentClient }) {

    const { currentCharge, chargingModal, setChargingModal } = useGlobal();

    const [status, setStatus] = useState('pendente');
    const [newCharging, setNewCharging] = useState({
        client_id: currentClient.name,
        name: "",
        description: "",
        statuscharge: "",
        value: "",
        due_date: "",
    });

    useEffect(() => {
        function fillUserInfo() {

            const info = { ...newCharging };
            info.name = currentClient.name;
            setNewCharging(info);
        }

        fillUserInfo();
    }, []);

    const [error, setError] = useState({
        name: {
            status: false,
            message: "",
        },
        description: {
            status: false,
            message: "",
        },
        due_date: {
            status: false,
            message: "",
        },
        value: {
            status: false,
            message: "",
        },
    });

    async function handleSubmit(e) {
        e.preventDefault();

        const newError = { ...error };
        const values = [
            { name: currentClient.name },
            { description: newCharging.description },
            { due_date: newCharging.due_date },
            { value: newCharging.value },
            { statuscharge: status },
        ];

        const checkEmptyResult = checkForEmptyValues(values);
        console.log(newCharging)
        if (checkEmptyResult.isEmpty) {
            throwError(newError, setError, checkEmptyResult.empty, "emptyValue");
            return;
        }

        try {
            const token = localStorage.getItem("token");

            const response = await api.post("/charges", {
                client_id: currentClient.id,
                nameclient: newCharging.name,
                description: newCharging.description,
                statuscharge: status,
                value: newCharging.value,
                due_date: newCharging.due_date,
            });

            toast.notifySucess("Cobrança cadastrada com sucesso!");
            setChargingModal(false);

        } catch (error) {
            console.log(error);
            toast.notifyError(error.response.data);
        }
    }

    return (
        <div className='charging-modal-container'>
            <div className="charging-modal-form">
                <div className="close-icon">
                    <img src={CloseIcon} alt="close-icon" onClick={() => setChargingModal(false)} />
                </div>
                <form onSubmit={handleSubmit} className="modal-form form-register">
                    <div className="charging-modal-title">
                        <img src={Paper} alt='paper' />
                        <h1>Cadastro de Cobrança</h1>
                    </div>

                    <InputInstance
                        name="name"
                        label="Nome*"
                        error={error}
                        setError={setError}
                        state={newCharging}
                        setState={setNewCharging}
                        placeholder="Digite seu Nome..."
                    />

                    <div className="description-input">
                        <InputInstance
                            name="description"
                            label="Descrição*"
                            error={error}
                            setError={setError}
                            state={newCharging}
                            setState={setNewCharging}
                            placeholder="Digite a descrição"
                        />
                    </div>

                    <div className="double-label">
                        <InputInstance
                            name="due_date"
                            label="Vencimento*"
                            error={error}
                            setError={setError}
                            state={newCharging}
                            setState={setNewCharging}
                            placeholder="Data de vencimento"
                            type='date'
                        />
                        <InputInstance
                            name="value"
                            label="Valor*"
                            error={error}
                            setError={setError}
                            state={newCharging}
                            setState={setNewCharging}
                            placeholder="Digite o valor"
                        />
                    </div>
                    <div className="status-charging">
                        <span>Status*</span>
                        <div className="button-status-charging">
                            <button type="button" onClick={() => setStatus('pago')}>
                                <img alt="status" src={status === 'pago' ? CheckCircle : GrayCircle} /> Cobrança Paga
                            </button>
                            <button type="button" onClick={() => setStatus('pendente')}>
                                <img alt="status" src={status === 'pendente' ? CheckCircle : GrayCircle} />Cobrança Pendente
                            </button>
                        </div>

                    </div>

                    <div className="btn-new-charging">
                        <div className="cancel-charging">
                            <button type="button" onClick={() => setChargingModal(false)} >Cancelar</button>
                        </div>

                        <button onClick={handleSubmit}>Aplicar</button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default ChargingModal;
