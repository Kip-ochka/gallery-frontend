import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from '../../hok/ProtectedRoute'
import { checkAuth, setToken } from '../../store/adminSlice'
import { addTag, fetchGetTags } from '../../store/tagInterface'
import testApi from '../../testapi/testapi'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks'
import AuthPage from '../AuthPage/AuthPage'
import Header from '../Header/Header'
import Main from '../Main/Main'
import './App.scss'
import { unwrapResult } from '@reduxjs/toolkit'

function App() {
  const { loading, isLogged } = useAppSelector((state) => state.admin)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const token = localStorage.getItem('token')
    dispatch(checkAuth(token))
  }, [])

  useEffect(() => {
    dispatch(fetchGetTags()).then(unwrapResult)
  }, [dispatch])

  return (
    <div className="page">
      {loading ? (
        <p>loading...</p>
      ) : (
        <Routes>
          <Route
            path="/auth"
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
