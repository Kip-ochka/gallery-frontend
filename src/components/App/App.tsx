import { unwrapResult } from '@reduxjs/toolkit'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router'
import { checkAuth, setToken } from '../../store/adminSlice'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks'
import AuthPage from '../AuthPage/AuthPage'
import Header from '../Header/Header'
import Main from '../Main/Main'
import './App.scss'

function App() {
  const { loading, isLogged } = useAppSelector((state) => state.admin)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const token = localStorage.getItem('token')
    dispatch(checkAuth(token))
  }, [])
  return (
    <div className="page">
      {loading ? (
        <p>loading...</p>
      ) : (
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
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
