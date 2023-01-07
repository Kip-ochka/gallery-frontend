import { Route, Routes } from 'react-router'
import About from '../About/About'
import NavBar from '../NavBar/NavBar'
import PhotoGallery from '../PhotoGallery/PhotoGallery'
import './Main.scss'

export default function Main() {
  return (
    <main className='main'>
      <NavBar categories={['Пейзажи', 'Портреты', 'Автомобили', 'Спорт']} />
      <Routes>
        <Route path={'/'} element={<PhotoGallery />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </main>
  )
}
