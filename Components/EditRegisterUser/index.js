import "./style.css";
import { useEffect, useState } from "react";
import api from "../../Services/api";
import useGlobal from "../../Hooks/useGlobal";
import toast from "../../Utils/toast";
import InputInstance from "../InputInstance";
import checkForEmptyValues from "../../Utils/checkForEmptyValues";
import throwError from "../../Utils/throwError";
import validatePassword from "../../Utils/validatePassword";

function EditRegisterUser() {
  const { user, loadUser, setHandleModal } = useGlobal();
  const [updateUser, setUpdateUser] = useState({
    name: "",
    email: "",
    cpf: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    function fillUserInfo() {
      const info = { ...updateUser };
      info.name = user.name ? user.name : "";
      info.email = user.email ? user.email : "";
      info.cpf = user.cpf ? user.cpf : "";
      info.phone = user.phone ? user.phone : "";
      setUpdateUser(info);
    }
    fillUserInfo();
  }, [user]);

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

  async function handleSubmit(e) {
    e.preventDefault();

    const newError = { ...error };
    const values = [
      { name: updateUser.name },
      { email: updateUser.email },
      { password: updateUser.password },
      { confirmPassword: updateUser.confirmPassword },
    ];

    const checkEmptyResult = checkForEmptyValues(values);

    if (checkEmptyResult.isEmpty) {
      throwError(newError, setError, checkEmptyResult.empty, "emptyValue");
      return;
    }

    if (updateUser.password !== updateUser.confirmPassword) {
      const wrongInputs = ["password", "confirmPassword"];

      throwError(newError, setError, wrongInputs, "passwordMatch");
      return;
    }

    const checkPasswordValidation = validatePassword(updateUser.password);

    if (checkPasswordValidation.error) {
      const wrongInputs = ["password", "confirmPassword"];
      throwError(newError, setError, wrongInputs, checkPasswordValidation.type);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await api.put("/update-user", {
        name: updateUser.name,
        email: updateUser.email,
        cpf: updateUser.cpf,
        phone: updateUser.phone,
        password: updateUser.password,
      });

      toast.notifySucess("Usuario atualizado com sucesso");
      setHandleModal(false);
    } catch (error) {
      console.log(error);
      toast.notifyError(error.response.data);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="modal-form form-register edit-charge">
      <h1>Edite seu cadastro</h1>

      <InputInstance
        name="name"
        label="Nome*"
        error={error}
        setError={setError}
        state={updateUser}
        setState={setUpdateUser}
        placeholder="Digite seu nome"
      />

      <InputInstance
        name="email"
        label="Email*"
        error={error}
        setError={setError}
        state={updateUser}
        setState={setUpdateUser}
        placeholder="Digite seu e-mail"
      />

      <div className="double-label">
        <InputInstance
          name="cpf"
          label="CPF"
          state={updateUser}
          setState={setUpdateUser}
          placeholder="Digite seu CPF"
        />

        <InputInstance
          name="phone"
          label="Telefone"
          state={updateUser}
          setState={setUpdateUser}
          placeholder="Digite seu Telefone"
        />
      </div>

      <InputInstance
        name="password"
        label="Senha*"
        type="password"
        error={error}
        setError={setError}
        state={updateUser}
        setState={setUpdateUser}
        placeholder="Digite sua Senha"
      />

      <InputInstance
        name="confirmPassword"
        label="Confirmar Senha*"
        type="password"
        error={error}
        setError={setError}
        state={updateUser}
        setState={setUpdateUser}
        placeholder="Repita sua Senha"
      />

      <button onClick={handleSubmit}>Continuar</button>
    </form>
  );
}

export default EditRegisterUser;
