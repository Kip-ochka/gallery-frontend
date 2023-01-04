import React from 'react'
import { Route, Routes } from 'react-router'
import About from '../About/About'
import NavBar from '../NavBar/NavBar'
import PhotoGallery from '../PhotoGallery/PhotoGallery'
import './Main.scss'

function Main() {
  return (
    <main className="main">
      <Routes>
        <Route path="/" element={<PhotoGallery />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <NavBar />
    </main>
  )
}

export default Main
