import { unwrapResult } from '@reduxjs/toolkit'
import { useEffect, useState } from 'react'
import DragFile from '../DragFile/DragFile'
import { getAbout, setAboutMe, updateAvatar } from '../../store/adminSlice'
import { IFileUrl, IFormTextValues, IUpdateAvatar } from '../../types/models'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks'
import './About.scss'
import { useForm } from '../../utils/hooks/useForm'
import {
  defaultValues,
  iconInputsData,
  icons,
} from '../../utils/initalConstansForAbout'

function About() {
  const { aboutMe, isLogged, aboutLoading, avatar } = useAppSelector(
    (state) => state.admin
  )
  const token = localStorage.getItem('token')
  const dispatch = useAppDispatch()
  const [redacted, setRedacted] = useState(false)
  const [file, setFile] = useState<File[]>()
  const [fileUrl, setFileUrl] = useState<IFileUrl>({})
  const { values, handleChange, setValues } = useForm(defaultValues)

  const handleAboutMeUpdate = (values: IFormTextValues, token: string) => {
    if (token) {
      dispatch(setAboutMe({ token, textValue: values }))
        .then(unwrapResult)
        .then(() => {
          setRedacted(false)
          setFile(undefined)
          setFileUrl({})
        })
    }
  }
  const handelAvatarUpdate = (data: IUpdateAvatar) => {
    if (data.file) {
      dispatch(updateAvatar({ file: data.file, token: data.token })).then(
        () => {
          setFile(undefined)
          setFileUrl({})
        }
      )
    }
  }

  useEffect(() => {
    dispatch(getAbout()).then((data) => {
      if (data.payload === null) {
        setValues(defaultValues)
      } else {
        setValues(data.payload)
      }
      console.log(data.payload)
    })
  }, [dispatch])

  return (
    <section className="about">
      <div className="about__container">
        {redacted ? (
          file ? (
            <img src={fileUrl.url} alt="avatar" />
          ) : (
            <DragFile setFile={setFile} setFileUrl={setFileUrl} />
          )
        ) : (
          <img src={avatar} alt="Фотография автора" className="about__photo" />
        )}

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
                            value={
                              values[`${item.inputName}` as keyof typeof values]
                            }
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
                  if (file && token) {
                    handelAvatarUpdate({ file, token })
                  }
                  handleAboutMeUpdate(values, token!)
                }}
              >
                Сохранить
              </button>
              <button
                className="about__form-button about__form-button_cancel"
                onClick={() => {
                  setRedacted((v) => !v)
                  setFile(undefined)
                  setFileUrl({})
                }}
              >
                Отмена
              </button>
            </div>
          </div>
        ) : aboutLoading ? null : (
          <div className="about__wrapper">
            <h1 className="about__author-name">{aboutMe?.name}</h1>
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
            <p className="about__description">{aboutMe?.about}</p>
            {aboutMe?.clients !== '' && (
              <div>
                <h3 className="about__subtitle">CLIENTS</h3>
                <p className="about__clients-descriptiob">{aboutMe?.clients}</p>
              </div>
            )}
            <ul className="about__contacts-list">
              {aboutMe?.email !== '' && (
                <li className="about__contacts-item">
                  <p className="about__contacts-title">
                    E-mail.
                    <span className="about__contacts-email-adress">
                      {aboutMe?.email}
                    </span>
                  </p>
                </li>
              )}
              {aboutMe?.tel !== '' && (
                <li className="about__contacts-item">
                  <p className="about__contacts-title">
                    Tel.
                    <span className="about__contacts-telephone-number">
                      {aboutMe?.tel}
                    </span>
                  </p>
                </li>
              )}
            </ul>
            <ul className="social-network">
              {icons.map((item, index) => {
                if (aboutMe !== null) {
                  if (
                    aboutMe[`${item.link}` as keyof typeof aboutMe] !== '' &&
                    aboutMe[`${item.link}` as keyof typeof aboutMe]
                  ) {
                    return (
                      <li className="social-newtwork__item" key={index}>
                        <a
                          href={aboutMe[`${item.link}` as keyof typeof aboutMe]}
                          className="social-network__link"
                          target="_blank"
                          rel="noreferrer"
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
                }
                return null
              })}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}

export default About
