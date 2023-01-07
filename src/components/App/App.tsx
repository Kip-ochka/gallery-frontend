import React from 'react'
import { Route, Routes } from 'react-router'
import AuthPage from '../AuthPage/AuthPage'
import Header from '../Header/Header'
import Main from '../Main/Main'
import './App.scss'

function App() {
  return (
    <div className="page">
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
    </div>
  )
}

export default App
