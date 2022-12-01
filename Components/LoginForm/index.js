import './style.css'
import { TextField, InputLabel, Button } from '@mui/material'
import LoginOrSignin from '../LoginOrSignin'
import RecoverPassword from '../RecoverPassword'
import api from '../../Services/api'
import verifyPassword from '../../Utils/verifyPassword'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from '../../Utils/toast'
import InputInstance from '../InputInstance'

function LoginForm() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState({
    email: {
      status: false,
      message: '',
    },
    password: {
      status: false,
      message: '',
    },
  })

  async function submitLogin(e) {
    e.preventDefault()
    const newError = { ...error }

    if (!email || !password) {
      if (!email) {
        newError.email = {
          status: true,
          message: 'O email é obrigatório',
        }
      }

      if (!password) {
        newError.password = {
          status: true,
          message: 'A senha é obrigatória',
        }
      }
      setError(newError)
      return
    }

    const passwordValid = verifyPassword(password)

    Object.entries(passwordValid).forEach((msg) => {
      if (msg[1]) {
        newError.password = {
          status: true,
          message: msg[1],
        }
        return setError(newError)
      }
    })

    if (newError.password.status) return

    try {
      const response = await api.post('/login', {
        email,
        password,
      })
      console.log('SettingToken')
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('name', response.data.user.name)
      navigate('/home')
    } catch (error) {
      toast.notifyError(error.response.data)
      setPassword('')
    }
  }

  function changeValue(e, type) {
    const resetEmailError = () => {
      if (error.email.status) {
        setError({ ...error, email: { status: false } })
      }
    }

    const resetPasswordError = () => {
      if (error.password.status) {
        setError({ ...error, password: { status: false } })
      }
    }

    switch (type) {
      case 'email':
        setEmail(e.target.value)
        resetEmailError()
        break
      case 'password':
        setPassword(e.target.value)
        resetPasswordError()
        break
      default:
        break
    }
  }

  return (
    <div className="login-box">
      <form className="form" noValidate autoComplete="off">
        <h1 className="titulo-login">Faça seu login!</h1>
        <div className="email-container">
          <InputLabel
            className="input-label"
            error={error.email.status}
            htmlFor="login-email-input"
          >
            Email
          </InputLabel>
          <TextField
            className="login-email-input"
            placeholder="Digite seu e-mail"
            error={error.email.status}
            variant="outlined"
            id="login-email-input"
            helperText={error.email.message}
            value={email}
            onChange={(e) => changeValue(e, 'email')}
            fullWidth
          />
          {!error.email.status && <span className="empty" />}
        </div>
        <div className="password-container">
          <div className="label_recover">
            <InputLabel
              className="input-label"
              error={error.password.status}
              htmlFor="login-password-input"
            >
              Senha
            </InputLabel>
            <RecoverPassword />
          </div>
          <TextField
            className="login-password-input"
            placeholder="Digite sua senha"
            type="password"
            error={error.password.status}
            variant="outlined"
            id="login-password-input"
            helperText={error.password.message}
            value={password}
            onChange={(e) => changeValue(e, 'password')}
            fullWidth
          />
          {!error.password.status && <span className="empty" />}
        </div>
        <div className="btn-container">
          <Button
            className="sigin-btn"
            variant="contained"
            type="submit"
            onClick={submitLogin}
          >
            Entrar
          </Button>
        </div>
        <div className="link-text-container">
          <LoginOrSignin type="login" />
        </div>
      </form>
    </div>
  )
}

export default LoginForm
