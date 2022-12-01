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
import formatDate from '../../Utils/formatdate';

function ChargeEdit() {

    const { editCharge, setEditCharge, currentCharge, updateCharges, setUpdateCharges } = useGlobal();

    const [status, setStatus] = useState('pendente');
    const [newCharging, setNewCharging] = useState({
        client_id: currentCharge.client_id,
        name: "",
        description: "",
        statuscharge: "",
        value: "",
        due_date: "",
    });

    useEffect(() => {
        setStatus(currentCharge.statuscharge)
        function fillUserInfo() {
            const info = { ...newCharging };
            info.name = currentCharge.nameclient;
            info.description = currentCharge.description;
            info.value = currentCharge.value;
            info.due_date = formatDate(currentCharge.due_date)
            info.status = status
            setNewCharging(info);
            console.log(newCharging)
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
            { name: newCharging.name },
            { description: newCharging.description },
            { due_date: newCharging.due_date },
            { value: newCharging.value },
            { statuscharge: status },
        ];

        const checkEmptyResult = checkForEmptyValues(values);
        if (checkEmptyResult.isEmpty) {
            throwError(newError, setError, checkEmptyResult.empty, "emptyValue");
            return;
        }

        console.log(currentCharge);

        try {
            const token = localStorage.getItem("token");

            const response = await api.put(`/charges/${currentCharge.id}`, {
                client_id: currentCharge.client_id,
                nameclient: newCharging.name,
                description: newCharging.description,
                statuscharge: status,
                value: newCharging.value,
                due_date: newCharging.due_date,
            });

            toast.notifySucess("Cobrança atualizada com sucesso!");
            setUpdateCharges(!updateCharges)
            setEditCharge(false);

        } catch (error) {
            console.log(error);
            toast.notifyError(error.response.data);
        }
    }

    return (
        <div className='charging-modal-container'>
            <div className="charging-modal-form">
                <div className="close-icon">
                    <img src={CloseIcon} alt="close-icon" onClick={() => setEditCharge(false)} />
                </div>
                <form onSubmit={handleSubmit} className="modal-form form-register">
                    <div className="charging-modal-title">
                        <img src={Paper} alt='paper' />
                        <h1>Edição de Cobrança</h1>
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
                            <button type="button" onClick={() => setEditCharge(false)} >Cancelar</button>
                        </div>

                        <button onClick={handleSubmit}>Aplicar</button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default ChargeEdit;
