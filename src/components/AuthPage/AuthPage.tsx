import React from 'react'
import './AuthPage.scss'
import logo from '../../img/logo.svg'
import { Link, useNavigate } from 'react-router-dom'

function AuthPage() {
  const navigate = useNavigate()
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
              />
            </label>
          </fieldset>
          <button className="auth__button" type="submit">
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
