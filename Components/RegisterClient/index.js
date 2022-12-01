import "./style.css";
import { useState } from "react";
import { TextField, InputLabel } from "@mui/material";
import InputMask from "react-input-mask";
import btnClientes from "../../assets/btn-clientes.png";
import api from "../../Services/api";
import toast from "../../Utils/toast";
import useGlobal from "../../Hooks/useGlobal";
import { SpaRounded } from "@mui/icons-material";
function RegisterClient({ closeModal, setSubmited }) {
  const { setHandleModal } = useGlobal();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [cpf, setCpf] = useState();
  const [phone, setPhone] = useState();
  const [adress, setAdress] = useState();
  const [complement, setComplement] = useState();
  const [cep, setCep] = useState();
  const [district, setDistrict] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [error, setError] = useState({
    name: {
      status: false,
      message: "",
    },
    email: {
      status: false,
      message: "",
    },
    cpf: {
      status: false,
      message: "",
    },
    phone: {
      status: false,
      message: "",
    },
  });

  function handleSubmitRegisterClient(e) {
    e.preventDefault();
    registerClient();
  }

  async function registerClient() {
    const newError = { ...error };
    if (
      !name ||
      !email ||
      !cpf ||
      !phone ||
      cpf.length < 14 ||
      phone.length < 16
    ) {
      if (!name) {
        newError.name = {
          status: true,
          message: "Este campo deve ser preenchido",
        };
      }

      if (!email) {
        newError.email = {
          status: true,
          message: "Este campo deve ser preenchido",
        };
      }

      if (!cpf || cpf.length < 14) {
        const message = cpf
          ? "Número de CPF inválido"
          : "Este campo deve ser preenchido";
        newError.cpf = {
          status: true,
          message,
        };
      }

      if (!phone || phone.length < 16) {
        const message = phone
          ? "Número de telefone inválido"
          : "Este campo deve ser preenchido";
        newError.phone = {
          status: true,
          message,
        };
      }

      return setError(newError);
    }

    try {
      const numberPhone = phone.match(/\d/gi).join("");
      const numberCpf = cpf.match(/\d/gi).join("");
      const numberCep = cep && cep.match(/\d/gi).join("");
      await api.post("/clients", {
        name,
        email,
        cpf: numberCpf,
        phone: numberPhone,
        cep: numberCep,
        publicplace: adress,
        complement,
        district,
        city,
        state,
      });
      toast.notifySucess("O cliente foi cadastrado com sucesso");
      setHandleModal(false);
      closeModal(false);
      setSubmited(true);
    } catch (error) {
      toast.notifyError(error.response.data);
    }
  }

  function changeValue(e, type) {
    switch (type) {
      case "name":
        setName(e.target.value);
        error.name.status && setError({ ...error, name: { status: false } });
        break;
      case "email":
        setEmail(e.target.value);
        error.email.status && setError({ ...error, email: { status: false } });
        break;
      case "phone":
        setPhone(e.target.value);
        error.phone.status && setError({ ...error, phone: { status: false } });
        break;
      case "cpf":
        setCpf(e.target.value);
        error.cpf.status && setError({ ...error, cpf: { status: false } });
        break;
      default:
        break;
    }
  }

  async function handleCep(event) {
    setCep(event);
    if (event.length === 9) {
      const numberCep = event.match(/\d/gi).join("");
      const response = await fetch(
        `https://viacep.com.br/ws/${numberCep}/json/`
      );
      const responseCep = await response.json();
      setAdress(responseCep.logradouro);
      setDistrict(responseCep.bairro);
      setCity(responseCep.localidade);
      setState(responseCep.uf);
    }
  }

  function clearInputs() {
    setName("");
    setEmail("");
    setCpf("");
    setPhone("");
    setAdress("");
    setComplement("");
    setCep("");
    setDistrict("");
    setCity("");
    setState("");
  }

  return (
    <>
      <form
        onSubmit={handleSubmitRegisterClient}
        className="modal-form form-registerClient"
      >
        <div className="info-modalClient">
          <img className="img-clientes" src={btnClientes} alt="clientes" />
          <h1>Cadastro do cliente</h1>
        </div>
        <div className="inputAndLabelName">
          <InputLabel
            className="input-label"
            error={error.name.status}
            htmlFor="name-input"
          >
            Nome*
          </InputLabel>
          <TextField
            placeholder="Digite o nome"
            className="input-label-edit form-input"
            error={error.name.status}
            variant="outlined"
            id="name-input"
            name="name"
            helperText={error.name.message}
            value={name}
            onChange={(e) => changeValue(e, "name")}
          />
          {!error.name.status && <span className="empty" />}
        </div>

        <div className="inputAndLabelEmail">
          <InputLabel
            error={error.email.status}
            className="input-label"
            htmlFor="email-input"
          >
            Email*
          </InputLabel>
          <TextField
            placeholder="Digite o e-mail"
            error={error.email.status}
            variant="outlined"
            id="email-input"
            className="form-input"
            name="email"
            helperText={error.email.message}
            value={email}
            onChange={(e) => changeValue(e, "email")}
          />
          {!error.email.status && <span className="empty" />}
        </div>

        <div className="double-field">
          <div className="client-cpf">
            <InputLabel
              className="input-label"
              error={error.cpf.status}
              htmlFor="cpf-input"
            >
              CPF*
            </InputLabel>
            <InputMask
              mask="999.999.999-99"
              value={cpf}
              disabled={false}
              maskChar=""
              name="cpf"
              onChange={(e) => changeValue(e, "cpf")}
            >
              {() => (
                <TextField
                  placeholder="Digite o CPF"
                  error={error.cpf.status}
                  helperText={error.cpf.message}
                  className="form-input"
                  fullWidth
                />
              )}
            </InputMask>
            {!error.cpf.status && <span className="empty" />}
          </div>
          <div className="client-phone">
            <InputLabel
              className="input-label"
              error={error.phone.status}
              htmlFor="phone-input"
            >
              Telefone*
            </InputLabel>
            <InputMask
              mask="(99) 9 9999-9999"
              value={phone}
              disabled={false}
              maskChar=""
              name="phone"
              onChange={(e) => changeValue(e, "phone")}
            >
              {() => (
                <TextField
                  placeholder="Digite o telefone"
                  error={error.phone.status}
                  helperText={error.phone.message}
                  className="form-input"
                  fullWidth
                />
              )}
            </InputMask>
            {!error.phone.status && <span className="empty" />}
          </div>
        </div>

        <div className="inputAndLabelAdress">
          <InputLabel className="input-label" htmlFor="adress-input">
            Endereço
          </InputLabel>
          <TextField
            placeholder="Digite o endereço"
            variant="outlined"
            id="adress-input"
            className="form-input"
            name="adress"
            value={adress}
            onChange={(e) => setAdress(e.target.value)}
          />
          <span className="empty" />
        </div>

        <div className="inputAndLabelComplement">
          <InputLabel className="input-label" htmlFor="complement-input">
            Complemento
          </InputLabel>
          <TextField
            placeholder="Digite o complemento"
            variant="outlined"
            id="complement-input"
            className="form-input"
            name="complement"
            value={complement}
            onChange={(e) => setComplement(e.target.value)}
          />
          <span className="empty" />
        </div>
        <div className="double-field">
          <div className="client-cep">
            <InputLabel className="input-label" htmlFor="cep-input">
              CEP
            </InputLabel>
            <InputMask
              mask="99999-999"
              value={cep}
              disabled={false}
              maskChar=""
              onChange={(e) => handleCep(e.target.value)}
            >
              {() => (
                <TextField
                  className="form-input"
                  placeholder="Digite o CEP"
                  fullWidth
                />
              )}
            </InputMask>
            <span className="empty" />
          </div>
          <div className="client-bairro">
            <InputLabel className="input-label" htmlFor="district-input">
              Bairro
            </InputLabel>
            <TextField
              placeholder="Digite o bairro"
              variant="outlined"
              id="district-input"
              className="form-input"
              name="district"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              fullWidth
            />
          </div>
        </div>
        <div className="double-field">
          <div className="client-cidade">
            <InputLabel className="input-label" htmlFor="city-input">
              Cidade
            </InputLabel>
            <TextField
              placeholder="Digite a cidade"
              variant="outlined"
              id="city-input"
              className="form-input"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              fullWidth
            />
            <span className="empty" />
          </div>
          <div className="client-uf">
            <InputLabel className="input-label" htmlFor="state-input">
              UF
            </InputLabel>
            <InputMask
              className="sdasdasd"
              mask="aa"
              value={state}
              disabled={false}
              maskChar=""
              onChange={(e) => setState(e.target.value)}
            >
              {() => (
                <TextField
                  className="input-Uf form-input"
                  placeholder="Digite a UF"
                  fullWidth
                />
              )}
            </InputMask>
            <span className="empty" />
          </div>
        </div>
        <div className="btns-registerClient">
          <button
            type="button"
            className="btn-cancelar-register"
            onClick={() => clearInputs()}
          >
            Cancelar
          </button>
          <button
            type="submit"
            onClick={handleSubmitRegisterClient}
            className="btn-aplicar-register"
          >
            Aplicar
          </button>
        </div>
      </form>
    </>
  );
}

export default RegisterClient;
