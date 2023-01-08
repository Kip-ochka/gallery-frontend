import React, { useState } from 'react'
import './NavBar.scss'
import { NavLink } from 'react-router-dom'
import AccountButton from '../AccountButton/AccountButton'

interface NavBarProps {
  isOpen?: boolean
  onClose?: () => void
  categories: string[]
}

function NavBar({ isOpen, onClose, categories }: NavBarProps) {
  const [extended, setExtended] = useState(false)
  return (
    <aside className={`navbar ${isOpen && 'navbar_opened'}`}>
      <div className="navbar__content">
        <NavLink to="/" className="navbar__main-section" onClick={onClose}>
          Все фотографии
        </NavLink>
        <div className="navbar__container">
          <p
            className="navbar__main-section"
            onClick={() => setExtended(!extended)}
          >
            Фото по категориям
          </p>
          {categories.map((e) => (
            <NavLink
              to={`/`}
              onClick={onClose}
              key={e}
              className={`navbar__section ${
                extended && 'navbar__section_state_hidden'
              }`}
            >
              {e}
            </NavLink>
          ))}
        </div>
        <NavLink to="/about" onClick={onClose} className="navbar__main-section">
          Об Авторе
        </NavLink>
        <NavLink
          to="/contacts"
          onClick={onClose}
          className="navbar__main-section"
        >
          Контакты
        </NavLink>
        <div className="navbar__hidden-element">
          <AccountButton />
        </div>
      </div>
    </aside>
  )
}

export default NavBar
