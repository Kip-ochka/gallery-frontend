import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../img/logo.svg'
import { useAppSelector } from '../../utils/hooks/reduxHooks'
import AccountButton from '../AccountButton/AccountButton'
import NavBar from '../NavBar/NavBar'
import './Header.scss'
export default function Header() {
  const { isLogged, token } = useAppSelector((state) => state.admin)
  const [burgerIsOpen, setBurgerIsOpen] = useState(false)
  const toggleBurgerButton = () => {
    if (burgerIsOpen) {
      setBurgerIsOpen(false)
    } else {
      setBurgerIsOpen(true)
    }
  }
  const closeBurger = () => {
    setBurgerIsOpen(false)
  }

  return (
    <header className='header'>
      <Link to='/'>
        <img src={logo} alt={'лого'} className='header__logo' />
      </Link>
      <button
        onClick={toggleBurgerButton}
        className={`header__button ${burgerIsOpen && 'header__button_opened'}`}
      />
      {burgerIsOpen && <NavBar isOpen={burgerIsOpen} onClose={closeBurger} />}
      <div className='header__headen-element'>
        {isLogged ? null : <AccountButton />}
      </div>
    </header>
  )
}
