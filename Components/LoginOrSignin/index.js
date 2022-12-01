import "./style.css";
import { useNavigate } from 'react-router-dom';
function LoginOrSignin({ type }) {
  const navigate = useNavigate()
  return (
    <div className={type === "login" ? "link_login" : "link_signup"}>
      {type === "login" ? (
        <p>
          Ainda não possui uma conta?{" "}
          <strong onClick={() => navigate('/signup')} className="link_signup_btn">Cadastre-se</strong>
        </p>
      ) : (
        <p>
          Já possui uma conta? Faça seu{" "}
          <strong className="link_login_btn">Login</strong>
        </p>
      )}
    </div>
  );
}

export default LoginOrSignin;
