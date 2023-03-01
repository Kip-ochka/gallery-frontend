import './NavBar.scss';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks';
import { INavBarProps } from '../../types/models';
import { logout } from '../../store/adminSlice';

function NavBar({ isOpen, onClose }: INavBarProps) {
  const { isLogged } = useAppSelector((state) => state.admin);
  const { sections } = useAppSelector((state) => state.sections);
  const dispatch = useAppDispatch();

  return (
    <aside
      className={`navbar ${isOpen && 'navbar_opened'}`}
      onClick={(e) => {
        e.stopPropagation();
        onClose && onClose();
      }}
    >
      <div
        className='navbar__content'
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className='navbar__container'>
          <NavLink
            to='/'
            className={`navbar__main-section ${
              !isLogged && 'navbar__main-section_state_hidden'
            }`}
            onClick={onClose}
          >
            Все фотографии
          </NavLink>
          {sections.map((e: any) => (
            <NavLink
              to={`/sections/${e.sectionId}`}
              onClick={onClose}
              key={e.sectionId}
              className='navbar__main-section'
            >
              {e.section}
            </NavLink>
          ))}
        </div>
        <NavLink to='/about' onClick={onClose} className='navbar__main-section'>
          Об Авторе
        </NavLink>
        <div className='navbar__container'>
          <NavLink
            to='/add-image'
            className={`navbar__main-section ${
              !isLogged && 'navbar__main-section_state_hidden'
            }`}
            onClick={onClose}
          >
            Добавить фото
          </NavLink>
          <NavLink
            to='/edit-sections'
            className={`navbar__main-section ${
              !isLogged && 'navbar__main-section_state_hidden'
            }`}
            onClick={onClose}
          >
            Редактировать секции
          </NavLink>
        </div>
        <div className='navbar__hidden-element'>
          {isLogged ? (
            <button
              className='navbar__logout-button'
              onClick={() => {
                dispatch(logout());
                localStorage.clear();
              }}
            >
              Выйти
            </button>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
export default NavBar;
