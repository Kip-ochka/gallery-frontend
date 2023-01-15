import { unwrapResult } from '@reduxjs/toolkit'
import { useEffect, useState } from 'react'
import userPhoto from '../../img/user-photo.png'
import { getAbout, setAboutMe } from '../../store/adminSlice'
import { IFormTextValues, IsetAboutMe } from '../../types/models'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks'
import './About.scss'
import { useForm } from '../../utils/hooks/useForm'
import {
  defaultValues,
  iconInputsData,
  icons,
} from '../../utils/initalConstansForAbout'

function About() {
  const { aboutMe, isLogged, aboutLoading } = useAppSelector(
    (state) => state.admin
  )
  const token = localStorage.getItem('token')
  const dispatch = useAppDispatch()
  const [redacted, setRedacted] = useState(false)
  const checkData = () => {
    if (!aboutMe) {
      return defaultValues
    } else {
      return {
        name: aboutMe.name,
        about: aboutMe.about,
        clients: aboutMe.clients,
        email: aboutMe.email,
        tel: aboutMe.tel,
        fs: aboutMe.fs,
        inst: aboutMe.inst,
        linkedin: aboutMe.linkedin,
        behance: aboutMe.behance,
        vk: aboutMe.vk,
        tg: aboutMe.tg,
        pin: aboutMe.pin,
        tw: aboutMe.tw,
      }
    }
  }

  const { values, handleChange, setValues } = useForm(checkData())
  const handleAboutMeUpdate = (values: IFormTextValues, token: string) => {
    const json = JSON.stringify(values)
    if (token) {
      dispatch(setAboutMe({ token, textValue: json }))
        .then(unwrapResult)
        .then(() => {
          setRedacted(false)
        })
    }
  }
  useEffect(() => {
    dispatch(getAbout()).then((data) => {
      setValues(data.payload)
    })
  }, [dispatch])

  return (
    <section className="about">
      <div className="about__container">
        <img src={userPhoto} alt="Фотография автора" className="about__photo" />
        {redacted ? (
          <div className="about__grid-column">
            <form className="about__form">
              <ul className="about__list">
                <li className="about__list-item">
                  <label className="about__label">
                    Name:
                    <input
                      type="text"
                      className="about__input"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                    />
                  </label>
                </li>
                <li className="about__list-item">
                  <label className="about__label">
                    About:
                    <textarea
                      className="about__textarea"
                      name="about"
                      value={values.about}
                      onChange={handleChange}
                    />
                  </label>
                </li>
                <li className="about__list-item">
                  <label className="about__label">
                    Client list:
                    <textarea
                      className="about__textarea"
                      name="clients"
                      value={values.clients}
                      onChange={handleChange}
                    />
                  </label>
                </li>
                <li className="about__list-item">
                  <label className="about__label">
                    E-mail:
                    <input
                      type="email"
                      className="about__input"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                    />
                  </label>
                </li>
                <li className="about__list-item">
                  <label className="about__label">
                    Tel.:
                    <input
                      type="tel"
                      className="about__input"
                      name="tel"
                      value={values.tel}
                      onChange={handleChange}
                    />
                  </label>
                </li>
              </ul>
              <ul className="about__list about__list_social">
                {iconInputsData.map((item, index) => {
                  return (
                    <div key={index}>
                      <li className="about__list-item">
                        <label className="about__label">
                          {item.title}
                          <input
                            type="url"
                            className="about__input"
                            name={`${item.inputName}`}
                            value={values[`${item.inputName}`]}
                            onChange={handleChange}
                            placeholder={
                              'Если вы это видите, то ссылка-иконка этой соцсети отображаться не будет'
                            }
                          />
                        </label>
                      </li>
                    </div>
                  )
                })}
              </ul>
            </form>
            <div className="about__buttons">
              <button
                className="about__form-button about__form-button_save"
                type="submit"
                onClick={(e) => {
                  e.preventDefault()
                  handleAboutMeUpdate(values, token!)
                }}
              >
                Сохранить
              </button>
              <button
                className="about__form-button about__form-button_cancel"
                onClick={() => {
                  setRedacted((v) => !v)
                }}
              >
                Отмена
              </button>
            </div>
          </div>
        ) : aboutLoading ? null : (
          <div className="about__wrapper">
            <h1 className="about__author-name">{values.name}</h1>
            <div className="about__title-wrapper">
              <h2 className="about__title">About</h2>
              {isLogged ? (
                <button
                  className="about__redact-button"
                  onClick={() => {
                    setRedacted((v) => !v)
                  }}
                />
              ) : null}
            </div>
            <p className="about__description">{values.about}</p>
            <div>
              <h3 className="about__subtitle">CLIENTS</h3>
              <p className="about__clients-descriptiob">{values.clients}</p>
            </div>
            <ul className="about__contacts-list">
              <li className="about__contacts-item">
                <p className="about__contacts-title">
                  E-mail.
                  <span className="about__contacts-email-adress">
                    {values.email}
                  </span>
                </p>
              </li>
              <li className="about__contacts-item">
                <p className="about__contacts-title">
                  Tel.
                  <span className="about__contacts-telephone-number">
                    {values.tel}
                  </span>
                </p>
              </li>
            </ul>
            <ul className="social-network">
              {icons.map((item, index) => {
                if (values[`${item.link}`] !== '') {
                  return (
                    <li className="social-newtwork__item" key={index}>
                      <a
                        href={values[`${item.link}`]}
                        className="social-network__link"
                        target="_blank"
                      >
                        <img
                          src={item.icon}
                          alt={`${item.link}`}
                          className="social-network__icon"
                        />
                      </a>
                    </li>
                  )
                } else {
                  return null
                }
              })}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}

export default About
