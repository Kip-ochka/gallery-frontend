import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from '../../hok/ProtectedRoute'
import { checkAuth } from '../../store/adminSlice'
import { fetchGetTags } from '../../store/tagInterface'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks'
import AuthPage from '../AuthPage/AuthPage'
import Header from '../Header/Header'
import Main from '../Main/Main'
import './App.scss'
import { getSections } from '../../store/sectionsSlice'
import Preloader from '../Preloader/Preloader'
import { SECRET_PATH } from '../../utils/constants'

function App() {
  const [load, setIsLoad] = useState(true)
  const { isLogged } = useAppSelector((state) => state.admin)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const token = localStorage.getItem('token')
    Promise.all([
      dispatch(checkAuth(token)),
      dispatch(getSections()),
      dispatch(fetchGetTags()),
    ]).then(() => {
      setIsLoad(false)
    })
  }, [])

  return (
    <div className="page">
      {load ? (
        <div className="page__preloader-wrapper">
          <Preloader />
        </div>
      ) : (
        <Routes>
          <Route
            path={`${SECRET_PATH}`}
            element={
              <ProtectedRoute component={AuthPage} condition={!isLogged} />
            }
          />
          <Route
            path="/*"
            element={
              <>
                <Header />
                <Main />
              </>
            }
          />
        </Routes>
      )}
    </div>
  )
}

export default App
