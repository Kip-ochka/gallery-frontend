import React from 'react'
import './NavBar.scss'
import { NavLink } from 'react-router-dom'
import AccountButton from '../AccountButton/AccountButton'

interface NavBarProps {
  isOpen?: boolean
  onClose?: () => void
}

function NavBar({ isOpen, onClose }: NavBarProps) {
  return (
    <aside className={`navbar ${isOpen && 'navbar_opened'}`}>
      <div className="navbar__content">
        <NavLink to="/" onClick={onClose}>
          <p className="navbar__main-section">Все фотографии</p>
        </NavLink>
        <NavLink to="/" onClick={onClose}>
          <p className="navbar__section">Раздел 1</p>
        </NavLink>
        <NavLink to="/" onClick={onClose}>
          <p className="navbar__section">Раздел 2</p>
        </NavLink>
        <NavLink to="/" onClick={onClose}>
          <p className="navbar__section">Раздел 3</p>
        </NavLink>
        <NavLink to="/about" onClick={onClose}>
          <p className="navbar__main-section">Об Авторе</p>
        </NavLink>
        <div className="navbar__hidden-element">
          <AccountButton />
        </div>
      </div>
    </aside>
  )
}

export default NavBar
