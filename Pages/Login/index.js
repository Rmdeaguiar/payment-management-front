import "./style.css";
import LoginForm from "../../Components/LoginForm";

function Login() {
  return (
    <div className="login-page-container">
      <div className="login-rightside-container">
        <p>Gerencie todos os pagamentos da sua empresa em um só lugar.</p>
      </div>
      <div className="login-leftside-container">
        <div className="login-form-container">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default Login;
