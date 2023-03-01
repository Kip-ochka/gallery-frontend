import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../img/logo/logo.svg';

import { logout } from '../../store/adminSlice';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks';
import NavBar from '../NavBar/NavBar';
import './Header.scss';
export default function Header() {
  const dispatch = useAppDispatch();
  const { isLogged } = useAppSelector((state) => state.admin);
  const [burgerIsOpen, setBurgerIsOpen] = useState(false);
  const toggleBurgerButton = () => {
    if (burgerIsOpen) {
      setBurgerIsOpen(false);
    } else {
      setBurgerIsOpen(true);
    }
  };
  const closeBurger = () => {
    setBurgerIsOpen(false);
  };

  useEffect(() => {
    window.addEventListener('resize', closeBurger);

    return () => window.removeEventListener('resize', closeBurger);
  }, []);

  const sectionsData = useAppSelector((state) => state.sections);
  return (
    <header className='header'>
      <Link to={`${`/sections/${sectionsData.sections[0]?.sectionId}`}`}>
        <div className='header__logo'>
          <img src={logo} alt={'лого'} className='header__logo' />
        </div>
      </Link>
      <button
        onClick={toggleBurgerButton}
        className={`header__button ${burgerIsOpen && 'header__button_opened'}`}
      />
      {burgerIsOpen && <NavBar isOpen={burgerIsOpen} onClose={closeBurger} />}
      <div className='header__headen-element'>
        {isLogged ? (
          <button
            className='header__logout-button'
            onClick={() => {
              dispatch(logout());
              localStorage.clear();
            }}
          >
            Выйти
          </button>
        ) : null}
      </div>
    </header>
  );
}
