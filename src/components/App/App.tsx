import { unwrapResult } from '@reduxjs/toolkit'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router'
import ProtectedRoute from '../../hok/ProtectedRoute'
import { checkAuth, setToken } from '../../store/adminSlice'
import { addTag } from '../../store/tagInterfaceSlice'
import testApi from '../../testapi/testapi'
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
  // useEffect(() => {
  //   testApi
  //     .getTags()
  //     .then((res) => res.forEach((e) => dispatch(addTag(e)).then((data) => {})))
  // }, [])
  return (
    <div className='page'>
      {loading ? (
        <p>loading...</p>
      ) : (
        <Routes>
          <Route
            path='/auth'
            element={
              <ProtectedRoute component={AuthPage} condition={!isLogged} />
            }
          />
          <Route
            path='/*'
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
