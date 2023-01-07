import { useState } from 'react'
import logo from '../../img/logo.svg'
import AccountButton from '../AccountButton/AccountButton'
import NavBar from '../NavBar/NavBar'
import './Header.scss'
export default function Header() {
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
      <img src={logo} alt={'лого'} className='header__logo' />
      <button
        onClick={toggleBurgerButton}
        className={`header__button ${burgerIsOpen && 'header__button_opened'}`}
      />
      {burgerIsOpen && (
        <NavBar
          isOpen={burgerIsOpen}
          onClose={closeBurger}
          categories={['Пейзажи', 'Портреты', 'Автомобили', 'Спорт']}
        />
      )}
      <div className='header__headen-element'>
        <AccountButton />
      </div>
    </header>
  )
}
