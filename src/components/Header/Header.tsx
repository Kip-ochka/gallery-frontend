import React from 'react'
import logo from '../../img/logo.svg'
import account from '../../img/account.svg'
import './Header.scss'
function Header() {
  return (
    <header className="header">
      <img src={logo} alt={'лого'} className="header__logo" />
      <div className="header__account-wrapper">
        <p className="header__account-text">Аккаунт</p>
        <div className="header__account-logo" />
      </div>
    </header>
  )
}

export default Header
