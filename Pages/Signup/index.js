import "./style.css";
import 'react-toastify/dist/ReactToastify.min.css'
import StepperSignUp from "../../Components/StepperSignUp";
import StepperLine from "../../Components/StepperLine";
import Success from "../../assets/success.svg";
import CloseEye from "../../assets/closeEye.svg";
import OpenEye from "../../assets/openEye.svg";
import verifyPassword from '../../Utils/verifyPassword';
import api from '../../Services/api'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from '../../Utils/toast'

function Signup() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [seePassword, setSeePassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    name: {
      status: false,
      message: "",
    },
    email: {
      status: false,
      message: "",
    },
    password: {
      status: false,
      message: "",
    },
    confirmPassword: {
      status: false,
      message: "",
    },
  });
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  function changeValue(e, type) {

    const resetNameError = () => {
      if (error.name.status) {
        setError({ ...error, name: { status: false } });
      }
    };

    const resetEmailError = () => {
      if (error.email.status) {
        setError({ ...error, email: { status: false } });
      }
    };

    const resetPasswordError = () => {
      if (error.password.status) {
        setError({ ...error, password: { status: false } });
      }
    };

    const resetConfirmPasswordError = () => {
      if (error.confirmPassword.status) {
        setError({ ...error, confirmPassword: { status: false } });
      }
    };

    switch (type) {
      case "name":
        setForm({ ...form, [e.target.name]: e.target.value });
        resetNameError();
        break;
      case "email":
        setForm({ ...form, [e.target.name]: e.target.value });
        resetEmailError();
        break;
      case "password":
        setForm({ ...form, [e.target.name]: e.target.value });
        resetPasswordError();
        break;
      case "confirmPassword":
        setForm({ ...form, [e.target.name]: e.target.value });
        resetConfirmPasswordError();
        break;
      default:
        break;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const newError = { ...error };

    if (!form.name || !form.email) {

      if (!form.name) {
        newError.name = {
          status: true,
          message: "O nome é obrigatório",
        };
      }
      if (!form.email) {
        newError.email = {
          status: true,
          message: "O email é obrigatório",
        };
      }
      setError(newError);
      return;
    }

    let entrouObj = false

    if (activeStep === 1) {

      if (!form.password || !form.confirmPassword) {

        if (!form.password) {
          newError.password = {
            status: true,
            message: "A senha é obrigatória",
          };
        }
        if (!form.confirmPassword) {
          newError.confirmPassword = {
            status: true,
            message: "A senha de confirmação é obrigatória"
          }
        }
        setError(newError)
        return;
      }

      if (form.password !== form.confirmPassword) {
        return toast.notifyError("As senhas não coincidem")
      }

      const passwordValid = verifyPassword(form.password)

      Object.entries(passwordValid).forEach((msg) => {
        if (msg[1]) {
          entrouObj = true;
          newError.password = {
            status: true,
            message: msg[1]
          };
          return setError(newError)
        }
      })
    }

    if (entrouObj) {
      return;
    }

    if (form.name && form.email && form.password && form.confirmPassword) {

      try {
        const response = await api.post('/sign-up', form)
        setActiveStep(2);
        handleNext()
        return;
      } catch (error) {
        return toast.notifyError(error.response.data)
      }
    }
    handleNext();
  }

  return (
    <div className="signup-page-container">
      <div className="signup-container-left">
        <StepperSignUp activeStep={activeStep} />
      </div>
      <div className="signup-container-right">
        {activeStep === 0 && (
          <>
            <h2>Adicione seus dados</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Nome*</label>
              <div className={error.name.status ? 'error-signup error-name' : ''}>
                <input
                  placeholder="Digite seu nome"
                  value={form.name}
                  name="name"
                  type="text"
                  onChange={(e) => changeValue(e, "name")}
                />
                {error.name.status && <span>{error.name.message}</span>}
              </div>
              <label htmlFor="email">E-mail*</label>
              <div className={error.email.status ? 'error-signup error-email' : ''}>
                <input
                  placeholder="Digite seu e-mail"
                  value={form.email}
                  name="email"
                  type="text"
                  onChange={(e) => changeValue(e, "email")}
                />
                {error.email.status && <span>{error.email.message}</span>}
              </div>
              <button onClick={handleSubmit}>Continuar</button>
              <span>
                Já possui uma conta? Faça seu{" "}
                <a onClick={() => navigate("/")}>Login!</a>
              </span>
            </form>
          </>
        )}
        {activeStep === 1 && (
          <>
            <h2>Escolha uma senha</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="password">Senha*</label>
              <div className={error.password.status ? "input-password error-signup error-password" : "input-password"}>
                <input
                  name="password"
                  value={form.password}
                  type={seePassword ? "text" : "password"}
                  onChange={(e) => changeValue(e, "password")}
                />
                <img
                  src={seePassword ? OpenEye : CloseEye}
                  alt="eye"
                  onClick={() => setSeePassword(!seePassword)}
                />
                {error.password.status && <span>{error.password.message}</span>}
              </div>
              <label htmlFor="confirmPassword">Repita a senha*</label>
              <div className={error.confirmPassword.status ? "input-password error-signup error-password" : "input-password"}>
                <input
                  name="confirmPassword"
                  value={form.confirmPassword}
                  type={seePassword ? "text" : "password"}
                  onChange={(e) => changeValue(e, "confirmPassword")}
                />
                <img
                  src={seePassword ? OpenEye : CloseEye}
                  alt="eye"
                  onClick={() => setSeePassword(!seePassword)}
                />
                {error.confirmPassword.status && <span>{error.confirmPassword.message}</span>}
              </div>
              <button>Entrar</button>
              <span>
                Já possui uma conta? Faça seu{" "}
                <a onClick={() => navigate("/")}>Login!</a>
              </span>
            </form>
          </>
        )}
        {activeStep === 3 && (
          <>
            <div className="success">
              <img src={Success} alt="success" />
              <h2>Cadastro realizado com sucesso!</h2>
            </div>
            <button onClick={() => navigate("/")}>Ir para Login</button>
          </>
        )}
        <div className="stepper-line"></div>
        <StepperLine activeStep={activeStep + 1} />
      </div>
    </div>
  );
}

export default Signup;


