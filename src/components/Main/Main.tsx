import React from 'react'
import NavBar from '../NavBar/NavBar'
import PhotoGallery from '../PhotoGallery/PhotoGallery'
import './Main.scss'

function Main() {
  return (
    <main className="main">
      <PhotoGallery />
      <NavBar />
    </main>
  )
}

export default Main
