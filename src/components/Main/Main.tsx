import { useEffect } from 'react'
import { Route, Routes } from 'react-router'
import { useAppSelector } from '../../utils/hooks/reduxHooks'
import About from '../About/About'
import AddImage from '../AddImage/AddImage'
import NavBar from '../NavBar/NavBar'
import PhotoGallery from '../PhotoGallery/PhotoGallery'
import './Main.scss'

export default function Main() {
  const adminData = useAppSelector((state) => state.admin)
  useEffect(() => {
    console.log(localStorage.getItem('token'))
  }, [])
  return (
    <main className="main">
      <NavBar categories={['Пейзажи', 'Портреты', 'Автомобили', 'Спорт']} />
      <Routes>
        <Route path={'/'} element={<PhotoGallery />} />
        <Route path="/about" element={<About />} />
        <Route path="/add-image" element={<AddImage />} />
      </Routes>
    </main>
  )
}
