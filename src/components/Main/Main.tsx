import {} from 'react'
import { Route, Routes } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../utils/hooks/reduxHooks'
import About from '../About/About'
import AddImage from '../AddImage/AddImage'
import NavBar from '../NavBar/NavBar'
import PhotoGallery from '../PhotoGallery/PhotoGallery'
import './Main.scss'

export default function Main() {
  const dispatch = useAppDispatch()
  const adminData = useAppSelector((state) => state.admin)

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
