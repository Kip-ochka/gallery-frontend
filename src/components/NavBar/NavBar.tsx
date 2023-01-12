import { useState } from 'react'
import './NavBar.scss'
import { NavLink } from 'react-router-dom'
import AccountButton from '../AccountButton/AccountButton'
import { useAppSelector } from '../../utils/hooks/reduxHooks'
import { INavBarProps } from '../../types/models'

enum EXTENDABLE_BLOCKS {
  PHOTOS_BY_CATEGORIES = 'photos-per-categories',
}

function NavBar({ isOpen, onClose }: INavBarProps) {
  const { isLogged } = useAppSelector((state) => state.admin)
  const [extended, setExtended] = useState<EXTENDABLE_BLOCKS | null>(null)
  const categories = ['Пейзажи', 'Портреты', 'Автомобили', 'Спорт']

  return (
    <aside className={`navbar ${isOpen && 'navbar_opened'}`}>
      <div className="navbar__content">
        <NavLink to="/" className="navbar__main-section" onClick={onClose}>
          Все фотографии
        </NavLink>
        <div className="navbar__container">
          <p
            className="navbar__main-section"
            onClick={() =>
              extended === EXTENDABLE_BLOCKS.PHOTOS_BY_CATEGORIES
                ? setExtended(null)
                : setExtended(EXTENDABLE_BLOCKS.PHOTOS_BY_CATEGORIES)
            }
          >
            Фото по категориям
          </p>
          {categories.map((e) => (
            <NavLink
              to={`/`}
              onClick={onClose}
              key={e}
              className={`navbar__section ${
                extended !== EXTENDABLE_BLOCKS.PHOTOS_BY_CATEGORIES &&
                'navbar__section_state_hidden'
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
          {isLogged ? null : <AccountButton />}
        </div>

        <NavLink
          to="/add-image"
          className={`navbar__main-section ${!isLogged && 'hidden'}`}
          onClick={onClose}
        >
          Добавить фото
        </NavLink>
        <NavLink
          to="/tags"
          className={`navbar__main-section ${!isLogged && 'hidden'}`}
          onClick={onClose}
        >
          Редактировать секции
        </NavLink>
        <NavLink
          to="/sections"
          className={`navbar__main-section ${!isLogged && 'hidden'}`}
          onClick={onClose}
        >
          Редактировать теги
        </NavLink>
      </div>
    </aside>
  )
}
export default NavBar
