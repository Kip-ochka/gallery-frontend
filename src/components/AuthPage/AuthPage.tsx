import { useEffect, useState } from 'react'
import './AuthPage.scss'
import logo from '../../img/logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks'
import { adminAuth, setToken } from '../../store/adminSlice'

function AuthPage() {
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const handleSubmit = (evt: any) => {
    evt.preventDefault()
    dispatch(adminAuth(password))
      .then((data) => {
        const toSetToken = data.payload
        dispatch(setToken(toSetToken))
        localStorage.setItem('token', toSetToken.token)
      })
      .then(() => {
        navigate('/')
      })
  }

  return (
    <main className="auth">
      <div className="auth__content">
        <div className="auth__title-wrapper">
          <Link to="/">
            <img src={logo} alt="Logo" className="auth__logo" />
          </Link>
          <h1 className="auth__title">Добро пожаловать!</h1>
        </div>
        <form className="auth__form">
          <fieldset className="auth__fieldset">
            <label className="auth__label">
              Пароль
              <input
                type="password"
                className="auth__input"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </fieldset>
          <button className="auth__button" type="submit" onClick={handleSubmit}>
            Войти
          </button>
        </form>
        <p
          onClick={() => {
            navigate(-1)
          }}
          className="auth__back"
        >
          &larr; Назад
        </p>
      </div>
    </main>
  )
}

export default AuthPage
